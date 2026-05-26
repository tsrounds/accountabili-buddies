# Accountabili-Buddies — iOS

Native SwiftUI port of the Accountabili-Buddies habit-accountability app.
See [`../IOS_APP_SPEC.md`](../IOS_APP_SPEC.md) for the full spec.

## Requirements

- **Xcode 16+** on macOS (the project uses file-system-synchronized groups,
  `objectVersion 77`).
- iOS 16+ device or simulator.

## Run it

1. Open `AccountabiliBuddies.xcodeproj` in Xcode.
2. Xcode resolves the Firebase Swift Package automatically on first open
   (File ▸ Packages ▸ Resolve Package Versions if it doesn't).
   - Package: `https://github.com/firebase/firebase-ios-sdk` (11.x)
   - Products linked: `FirebaseCore`, `FirebaseAuth`, `FirebaseFirestore`
3. Pick the **AccountabiliBuddies** scheme + a simulator and press **Run** (⌘R).

`GoogleService-Info.plist` for the `accountabili-buddies` Firebase project is
already included.

## Phone auth notes

The app signs in with **Firebase Phone Auth** (SMS code). For this to work the
Firebase console for `accountabili-buddies` must have:

- **Authentication ▸ Sign-in method ▸ Phone** enabled.
- **Firestore** created (in production or test mode).

On the simulator (no APNs), Firebase falls back to a reCAPTCHA web flow that
redirects back via the URL scheme already configured in `Info.plist`
(`app-1-198599137573-ios-05b7e5753289fb17b9e2cc`). For frictionless testing,
add a **test phone number** in the Firebase console
(Authentication ▸ Sign-in method ▸ Phone ▸ "Phone numbers for testing"), e.g.
`+1 555-123-4567` with code `123456`, and use those in the app.

## Suggested Firestore rules (dev)

The app reads/writes the `ab_*` collections described in the spec. For initial
testing you can use authenticated-only rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{db}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

Tighten these before any real launch.

## Project structure

```
AccountabiliBuddies/
  AccountabiliBuddiesApp.swift   app entry + Firebase init + root routing
  Theme.swift                    colors, fonts, button/card styles
  Models.swift                   models + streak/progress logic
  FirebaseService.swift          Auth + Firestore data layer
  Roasts.swift                   AB's passive-aggressive lines
  Components/                    Mascot, ZoneScaffold, ProgressRing, Confetti, form controls
  Auth/                          AuthViewModel + LoginView
  Home/                          HomeView
  Challenge/                     Detail / Create / Join / CheckIn
  Resources/Fonts/               BebasNeue-Regular.ttf
  GoogleService-Info.plist
  Info.plist
```

## Not in v1

SMS check-in blasts, weekly recap, roast dossiers, photo proof, push
notifications, public discovery, profile editing. The Firestore schema leaves
room for these.
