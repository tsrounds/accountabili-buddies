---
description: Start the Accountabili-Buddies Vite dev server for local preview
---

# Preview

**Production / branch previews**: https://accountabili-buddies.vercel.app
Every pushed branch gets an automatic Vercel preview URL visible in the Vercel dashboard.

# Run Dev Server (local only)

Start the dev server in the background and verify it's ready:

```bash
pkill -f 'vite' 2>/dev/null; sleep 1
npm run dev -- --host 0.0.0.0 --port 5173 > /tmp/vite-dev.log 2>&1 &
echo $! > /tmp/dev.pid
timeout 30 bash -c 'until curl -sf http://localhost:5173 >/dev/null; do sleep 1; done' && echo "Dev server ready at http://localhost:5173"
```

Check logs if it doesn't come up:
```bash
cat /tmp/vite-dev.log
```

Stop the server:
```bash
kill $(cat /tmp/dev.pid) 2>/dev/null; pkill -f 'vite' 2>/dev/null
```

## Notes
- App: React + Vite + Tailwind + Firebase
- Default port: 5173
- The `--host 0.0.0.0` flag exposes it on all network interfaces for remote container access
- No `.env` is needed to start the dev server; Firebase features that require credentials will show auth errors in the browser console
