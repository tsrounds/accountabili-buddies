# Accountabili-Buddy Mascot — Rive Animation Specification

Reference asset: line-art chibi monster — egg-shaped body, small horns, hooded sleepy eyes, slit mouth, two stubby legs, two arms ending in wings (or wing-like hand fans) extending sideways. Single-color black stroke on transparent.

The animation system targets Rive's State Machine runtime (rive-react / rive-react-native). All easing is `cubicBezier(0.45, 0, 0.55, 1)` ("smoothInOut") unless otherwise stated. Frame rate authoring target: **60 fps**. All loops use seamless start/end keyframes.

---

## 1. Rig & Bone Hierarchy

```
root (translation pivot at body center)
└── body_root            // overall float + squash anchor
    ├── body_mesh        // mesh deform target for squash/stretch
    ├── head             // bone, rotation pivot at neck
    │   ├── horn_L
    │   ├── horn_R
    │   ├── eye_L        // bone with blend-shape for blink
    │   ├── eye_R
    │   ├── brow_L       // for Smirk / Annoyed / Thinking
    │   ├── brow_R
    │   └── mouth        // bone with morphs: neutral, smile, smirk, frown, o
    ├── wing_L           // bone with feather sub-bones for sway
    │   ├── feather_L_1
    │   ├── feather_L_2
    │   └── feather_L_3
    ├── wing_R           // mirrored
    │   ├── feather_R_1
    │   ├── feather_R_2
    │   └── feather_R_3
    ├── leg_L
    └── leg_R
```

Mesh deformers attached to `body_mesh` via 4 control vertices (top, bottom, left, right) drive squash/stretch without breaking the outline weight.

---

## 2. Timeline Animations

All timelines authored in seconds. `*_loop` animations are marked **Loop**; one-shots are **One Shot**; additives are **Additive** and stacked on top of the active base state by the state machine.

### 2.1 `Float_Loop` — base ambient (Loop, 3.2s)

| Time | `body_root.y` | `body_mesh.scaleY` | `body_mesh.scaleX` | `head.rotation` |
|------|---------------|--------------------|--------------------|-----------------|
| 0.00 | 0 px          | 1.000              | 1.000              | 0°              |
| 0.80 | -6 px         | 1.012              | 0.992              | +0.4°           |
| 1.60 | -8 px         | 1.000              | 1.000              | 0°              |
| 2.40 | -2 px         | 0.988              | 1.008              | -0.3°           |
| 3.20 | 0 px          | 1.000              | 1.000              | 0°              |

- Vertical bob amplitude: 8 px max — premium, not bouncy.
- Squash/stretch capped at ±1.2% scale; outline thickness compensated via Rive's "Constant" stroke setting so lines don't visually thin.
- Head counter-rotation lags body by 120 ms for weight feel.

### 2.2 `WingSway_Loop` (Loop, 2.4s, **Additive**)

Sinusoidal sway, wings offset 180° from each other for an "alive" asymmetry.

| Bone | 0.0s | 0.6s | 1.2s | 1.8s | 2.4s |
|------|------|------|------|------|------|
| `wing_L.rotation` | 0° | +5° | 0° | -3° | 0° |
| `wing_R.rotation` | 0° | -5° | 0° | +3° | 0° |
| `feather_*_1.rotation` | 0° | +2° | 0° | -2° | 0° |
| `feather_*_3.rotation` (tip) | 0° | +6° | 0° | -4° | 0° |

Feather tips lead the root by 80 ms (overlapping action). Curve: easeInOutSine.

### 2.3 `Blink_OneShot` (One Shot, 180ms)

| Time | `eye_L.blinkBlend` | `eye_R.blinkBlend` |
|------|--------------------|--------------------|
| 0 ms   | 0.00 | 0.00 |
| 70 ms  | 1.00 | 1.00 |
| 110 ms | 1.00 | 1.00 |
| 180 ms | 0.00 | 0.00 |

Eyes close top-down (upper lid only — keeps the sleepy hood) using a single morph target. Right eye trails left by 12 ms for a hand-drawn feel.

### 2.4 `Idle_Pose` (Loop, 0.1s — static rest)

Neutral mouth, brows level. Acts as the base layer the additives sit on.

### 2.5 `Happy_Pose` (One Shot → Loop, 400 ms in, 2.0s loop)

- `mouth.morph`: neutral → smile over 320 ms (easeOutBack, overshoot 5%).
- `brow_L/R.y`: +2 px (raised).
- `eye_L/R.scaleY`: 0.85 (slight squint of joy).
- `body_root.y`: extra -3 px float bias (additive to Float_Loop).
- Wings: sway amplitude scaled to **1.4×** during Happy.

### 2.6 `Smirk_Pose` (One Shot → Loop, 350 ms in)

- `mouth.morph`: neutral → smirk (right corner +3 px, left -1 px).
- `brow_R.rotation`: +6° (cocked up).
- `brow_L.rotation`: -2°.
- `head.rotation`: +1.5° tilt held.
- Float amplitude reduced to **0.7×** — confident, more still.

### 2.7 `Annoyed_Pose` (One Shot → Loop, 280 ms in)

- `brow_L/R.rotation`: inner ends down 8° (furrow).
- `brow_L/R.y`: -3 px.
- `mouth.morph`: neutral → frown (-2 px corners).
- `eye_L/R.blinkBlend`: 0.25 (heavier hood).
- Wings sway amplitude **0.5×**, frequency **1.3×** (twitchy).
- Subtle 6 Hz body shudder additive, 0.5 px amplitude, ramped down over 600 ms then idle.

### 2.8 `Thinking_Pose` (One Shot → Loop, 500 ms in, 3.6s loop)

- `head.rotation`: oscillates -3° → +3° over 3.6s (easeInOutSine).
- `brow_L.y`: -2 px, `brow_R.y`: +3 px (asymmetric quizzical).
- `mouth.morph`: neutral → small "o" (10%).
- `eye_L/R.lookX`: -4 px → +4 px synced with head tilt, lagged 200 ms.
- One `Blink_OneShot` fires at t=1.8s of every loop (deliberate, not random).

### 2.9 `Land_Settle` (One Shot, 250 ms) — transition helper

Used when leaving any expressive state back to Idle. Small body squash 1.03 → 1.00 with eased recovery. Prevents pose snaps.

---

## 3. State Machine

Name: **MascotSM**

### 3.1 Layers

| Layer | Purpose | Default |
|-------|---------|---------|
| `Base` | Mood pose (Idle / Happy / Smirk / Annoyed / Thinking) | `Idle` |
| `Ambient` | Always-on `Float_Loop` + `WingSway_Loop` (additive) | active |
| `Blink` | Eye morph driver | `EyesOpen` |

Layered playback means mood changes never interrupt floating or breathing — only swap the pose layer.

### 3.2 Inputs

| Name | Type | Default | Notes |
|------|------|---------|-------|
| `mood` | Number | 0 | 0=Idle, 1=Happy, 2=Smirk, 3=Annoyed, 4=Thinking |
| `trigBlink` | Trigger | — | Fired by Blink layer's internal timer OR externally |
| `energy` | Number (0–1) | 0.5 | Scales Float amplitude and WingSway speed |
| `reducedMotion` | Boolean | false | Honors OS reduce-motion setting |

### 3.3 Base layer states & transitions

```
            ┌────────► Happy ──┐
            │                  │
Entry ─► Idle ◄─────────────────┤
            │                  │
            ├────────► Smirk ──┤
            │                  │
            ├────────► Annoyed─┤
            │                  │
            └────────► Thinking┘
```

Transitions (all bidirectional Idle ↔ Pose):

| From → To | Condition | Duration | Curve |
|-----------|-----------|----------|-------|
| `Idle → Happy`    | `mood == 1` | 320 ms | easeOutBack |
| `Idle → Smirk`    | `mood == 2` | 280 ms | easeOutCubic |
| `Idle → Annoyed`  | `mood == 3` | 220 ms | easeOutQuad |
| `Idle → Thinking` | `mood == 4` | 400 ms | easeInOutCubic |
| `Any → Idle`      | `mood == 0` | 350 ms (via `Land_Settle`) | easeInOutCubic |
| `Pose → Pose` (non-Idle direct) | mood change | routes through Idle with 180 ms cross-fade | smoothInOut |

Exit time is **disabled** on all pose transitions so mood changes feel responsive.

### 3.4 Ambient layer

Single state `AmbientPlay` looping `Float_Loop` and `WingSway_Loop` simultaneously. Speed multipliers bound to inputs:
- `Float_Loop.speed = lerp(0.85, 1.15, energy)`
- `WingSway_Loop.speed = lerp(0.9, 1.25, energy)`
- When `reducedMotion == true`: both speeds → 0.6×, body_root.y range scaled to 30%, wing rotation range scaled to 40%.

### 3.5 Blink layer (randomized)

States: `EyesOpen` → `Blinking` → `EyesOpen`.

Random blink driver runs inside Rive using a Number input `blinkTimer` advanced by the runtime, but the cleanest pattern is **external scheduling**:

```ts
// host code (React Native / web)
function scheduleBlink(sm) {
  const min = 2200; // ms
  const max = 5400;
  const delay = min + Math.random() * (max - min);
  setTimeout(() => {
    sm.input('trigBlink').fire();
    // 8% chance of double-blink for personality
    if (Math.random() < 0.08) {
      setTimeout(() => sm.input('trigBlink').fire(), 220);
    }
    scheduleBlink(sm);
  }, delay);
}
```

Suppression rules:
- No blink within 600 ms of a `mood` change (prevents collision with pose's own eye animation).
- Thinking state owns its own scheduled blink at t=1.8s — external scheduler is paused while `mood == 4`.

---

## 4. Timing Philosophy

The goal is a **character-select screen** feel — Tekken, Street Fighter VI, Marvel Rivals — not a Saturday morning cartoon.

- **Float period 3.2s**: slow enough to read as "breathing," fast enough to never feel frozen.
- **Squash/stretch ≤ 1.2%**: just enough to suggest soft mass; over 3% reads as bouncy/childish.
- **Wing sway 2.4s, asymmetric**: prevents the "windshield wiper" symmetry that cheapens mascot rigs.
- **Pose transitions 220–400 ms**: snappy enough to feel reactive to taps, slow enough to feel weighty. Avoid <180 ms (snappy/UI-feeling) and >500 ms (sluggish).
- **Overlapping action**: head lags body 120 ms; wing tips lead roots 80 ms; eyes lag head 200 ms in Thinking. This single rule does more for "premium" feel than any other.
- **Randomization budget**: only blink interval and the 8% double-blink. Everything else is deterministic — random body movement makes characters look drunk, not alive.
- **Hold frames**: Happy and Smirk hold their peak pose for ~160 ms before settling into their loop. Holds sell the emotion.

---

## 5. Runtime Integration

```tsx
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

export function Mascot({ mood = 0 }: { mood?: 0|1|2|3|4 }) {
  const { rive, RiveComponent } = useRive({
    src: '/rive/mascot.riv',
    stateMachines: 'MascotSM',
    autoplay: true,
  });

  const moodInput   = useStateMachineInput(rive, 'MascotSM', 'mood');
  const blinkInput  = useStateMachineInput(rive, 'MascotSM', 'trigBlink');
  const energyInput = useStateMachineInput(rive, 'MascotSM', 'energy');
  const rmInput     = useStateMachineInput(rive, 'MascotSM', 'reducedMotion');

  useEffect(() => { if (moodInput) moodInput.value = mood; }, [moodInput, mood]);

  useEffect(() => {
    if (!blinkInput || mood === 4) return;
    let alive = true;
    const tick = () => {
      const delay = 2200 + Math.random() * 3200;
      setTimeout(() => {
        if (!alive) return;
        blinkInput.fire();
        if (Math.random() < 0.08) setTimeout(() => alive && blinkInput.fire(), 220);
        tick();
      }, delay);
    };
    tick();
    return () => { alive = false; };
  }, [blinkInput, mood]);

  useEffect(() => {
    if (!rmInput) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    rmInput.value = mq.matches;
    mq.addEventListener('change', e => { rmInput.value = e.matches; });
  }, [rmInput]);

  return <RiveComponent />;
}
```

---

## 6. Export Checklist

- [ ] `.riv` exported with all 5 mood timelines + 2 ambient loops + blink one-shot.
- [ ] State machine `MascotSM` with inputs: `mood`, `trigBlink`, `energy`, `reducedMotion`.
- [ ] Stroke set to **Constant** (not "Scale with object") so squash doesn't thin the outline.
- [ ] Artboard 1024×1024 with 64 px safe padding.
- [ ] Tested at 30 fps and 120 fps playback — no jitter at loop seams.
- [ ] Verified seamless loop: `Float_Loop[0] == Float_Loop[3.2s]` for all driven properties.
- [ ] File size target: **< 80 KB** (.riv).
