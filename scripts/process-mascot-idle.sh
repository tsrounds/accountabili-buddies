#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# process-mascot-idle.sh
#
# Converts a folder of MP4 idle animations (character on solid BLACK background,
# black outlines on white fill — the Accountabili-Buddies mascot style) into
# web-ready transparent assets for the React PWA.
#
# OUTPUTS for each input:
#   - <name>.webp  – animated WebP w/ alpha (universal, primary delivery)
#   - <name>.webm  – VP9+alpha (smaller, Chrome/Firefox/Android only — iOS Safari
#                    ignores VP9 transparency, so this is optional)
#   - <name>.png   – first frame, transparent (poster + static fallback)
#
# USAGE:
#   ./process-mascot-idle.sh <input_dir> <output_dir> [pingpong|oneshot]
#
#   Example (default pingpong loop):
#     ./scripts/process-mascot-idle.sh ./raw-animations ./public/mascot
#
#   Example (no loop — play once forward):
#     ./scripts/process-mascot-idle.sh ./raw-animations ./public/mascot oneshot
#
# REQUIRES: ffmpeg with libwebp_anim and libvpx-vp9 (both bundled in
# Homebrew's ffmpeg on Mac: `brew install ffmpeg`).
#
# TUNABLES (edit below if Procreate export style changes):
#   CROP   – tight bounding-box crop. Re-run cropdetect if the character is
#            framed differently in new exports.
#   SIZE   – final square dimension. 480 is enough for ~160-200px mobile display
#            at 2.5-3x DPR. Bump to 720 for desktop hero use.
#   FPS    – 12 reads as smooth for hand-drawn idle. Drop to 8 for files even
#            smaller; lift to 24 if you notice stutter.
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

IN_DIR="${1:-./raw-animations}"
OUT_DIR="${2:-./public/mascot}"
MODE="${3:-pingpong}"      # pingpong | oneshot
mkdir -p "$OUT_DIR"

# Tuned for the original 1440x1440 Procreate exports. If a new export changes
# the character's bounding box, re-run `ffmpeg -i input.mp4 -vf cropdetect ...`
# and update these numbers.
CROP="crop=1178:1178:154:139"
SIZE=480
FPS=12

# ── Background-removal chain ────────────────────────────────────────────────
# The character has BLACK outlines on a BLACK background, which makes a naïve
# chromakey-on-black useless (it would delete every line). The fix is a soft
# luminance mask built from a heavily-blurred copy of the frame: the wide
# Gaussian lets the WHITE interior bleed across the thin outlines, so when the
# blurred frame is thresholded the entire silhouette (outlines included) lands
# above the threshold. The original (unblurred) frame is composited against
# that mask via alphamerge.
KEY="split[a][b];[b]format=gray,gblur=sigma=8,curves=all='0/0 0.08/0 0.15/1 1/1',gblur=sigma=2[mask];[a][mask]alphamerge,format=yuva420p"

# ── Seamless-loop chain ─────────────────────────────────────────────────────
# The source animations were not authored as cycles, so frame N ≠ frame 0 —
# leaving the natural loop visibly "snaps" at the seam. The fix is ping-pong:
# play forward, then play in reverse, so the last frame of the file IS frame 1,
# which loops smoothly to frame 0 on the next iteration.
#
# We trim the first AND last frame of the reverse stream, otherwise the
# turnaround would hold the peak frame for two ticks and the boundary would
# hold frame 0 for two ticks. With a 120-frame source:
#   forward         : 0, 1, 2, …, 119      (120 frames)
#   reverse trimmed : 118, 117, …, 2, 1    (118 frames)
#   loop back to 0 → seam-free
case "$MODE" in
  pingpong)
    LOOP=",split[fwd][src];[src]reverse,trim=start_frame=1:end_frame=119,setpts=PTS-STARTPTS[rev];[fwd][rev]concat=n=2:v=1"
    ;;
  oneshot)
    LOOP=""
    ;;
  *)
    echo "Unknown mode '$MODE'. Use 'pingpong' or 'oneshot'." >&2
    exit 1
    ;;
esac

FILTER="${CROP},${KEY},scale=${SIZE}:${SIZE}:flags=lanczos,fps=${FPS}${LOOP}"

echo "Mode: $MODE"
echo "Reading from: $IN_DIR"
echo "Writing to:   $OUT_DIR"
echo

shopt -s nullglob
for src in "$IN_DIR"/*.mp4; do
  base="$(basename "$src" .mp4)"
  echo ">>> $base"

  # 1) Animated WebP (PRIMARY — works on every modern browser incl. iOS 14+)
  ffmpeg -y -loglevel error -i "$src" -filter_complex "$FILTER" \
    -c:v libwebp_anim -lossless 0 -quality 80 -loop 0 -an \
    "$OUT_DIR/${base}.webp"

  # 2) WebM/VP9 with alpha (OPTIONAL — smaller for Chromium browsers. Drop this
  #    block if you don't want to maintain dual formats.)
  ffmpeg -y -loglevel error -i "$src" -filter_complex "$FILTER" \
    -c:v libvpx-vp9 -pix_fmt yuva420p -b:v 0 -crf 32 -auto-alt-ref 0 -row-mt 1 \
    -metadata:s:v:0 alpha_mode="1" -an \
    "$OUT_DIR/${base}.webm"

  # 3) First-frame PNG (poster + prefers-reduced-motion fallback). We don't
  #    want the ping-pong applied to this — just one clean still — so re-run
  #    without the LOOP suffix.
  STATIC_FILTER="${CROP},${KEY},scale=${SIZE}:${SIZE}:flags=lanczos"
  ffmpeg -y -loglevel error -i "$src" -filter_complex "$STATIC_FILTER" \
    -frames:v 1 -update 1 \
    "$OUT_DIR/${base}.png"
done

echo ""
echo "Done. Files in $OUT_DIR:"
ls -lh "$OUT_DIR"
