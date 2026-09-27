# SilkCue ====[ UNDER CONSTRUCTION ]====

**Free, open-source, and privacy-first line learning for actors.**

SilkCue is a single-file Progressive Web App (PWA) designed to be the ultimate digital scene partner. It reads the other characters' lines aloud, listens for yours, and keeps your rehearsal moving forward. Give it a shot and see if it beets using your flimsy paper script.

## The Main Juice

### Interactive Rehearsal
* **Auto-Cueing:** SilkCue uses Text-to-Speech to read the rest of the cast's lines and stage directions.
* **Voice Recognition:** Speak your lines and the app automatically grades your accuracy and advances. 
* **Dual Speech Engines:** 
  * **Native (Cloud):** Uses your browser's built-in Web Speech API for fast, lightweight recognition.
  * **On-Device (Offline):** Falls back to a local **Whisper-tiny** model via Transformers.js. This is a game-changer for **Firefox** users (which lacks native speech recognition) and anyone who wants total audio privacy. Your audio *never* leaves your device.
* **Blind Recall Mode:** Black out your lines to test your memorization. The app will still listen and grade your accuracy.
* **Smart Skip:** If your character is offstage for 2+ pages, SilkCue notices and offers to jump ahead so you don't waste time listening to scenes you aren't in.

### Smart Script Parsing
* **Multi-Format Import:** Upload `.pdf`, `.txt`, `.html`, or simply paste your script directly into the app.
* **Auto-Character Detection:** Automatically identifies characters, groups aliases (e.g., merging "CAPT. SMOLLETT" and "SMOLLETT"), and counts lines.
* **Character Management:** Easily rename characters, detach mis-grouped aliases, or merge duplicate characters.

### Script Viewer & Editor
* **Full Script View:** Read through the entire parsed script with clean, stage-play formatting.
* **Highlighting:** Tap any line to highlight it for quick reference.
* **Multi-Select & Delete:** Long-press to enter selection mode. Bulk-delete distracting stage directions, cut scenes, or typo-ridden text blocks (with a 5-second "Undo" safety net).
* **Instant Search:** Filter the script view to find specific cues or stage directions instantly.

### Installable PWA & Offline Support
* **Add to Home Screen:** Install it on iOS or Android like a native app.
* **100% Local Storage:** Your scripts and rehearsal progress are saved in your browser's `localStorage`. Nothing is ever uploaded to a server.
* **True Offline Mode:** Once the initial voice models and libraries are cached, SilkCue works perfectly without an internet connection.

---

## Installation & Deployment

SilkCue is a zero-build, single-file application, but how you run it determines the PWA experience.

### 1. Local Use (Simplest)
Just double-click `SilkCue.html`. It works fully offline (uploads, rehearsal, settings, both listening engines).
* **iOS (Safari):** Tap Share then Tap **Add to Home Screen**. It launches full-screen as a standalone app with the theatre-mask icon.
* **Desktop:** Works perfectly as a local file or via a local server (e.g., `python -m http.server`).

### 2. True PWA Install (Android & Desktop Chrome/Edge)
Android's installability rules require an **HTTPS-hosted manifest and service worker**. A local `file://` page cannot trigger the native "Install App" prompt on Android. 

To get the true "Install App" experience, host the app alongside its companion files on any static HTTPS host (GitHub Pages, Netlify, Vercel, Cloudflare Pages)

---

(Note: The HTML has a brace. If you just open the file locally without the companion files, it automatically generates an inline manifest and service worker via Blobs so local usage still works perfectly.)

# Info

**Tech Stack**
Vanilla JavaScript (ES5/ES6) - No React, no Vue, no build step required.
HTML5 / CSS3 - Custom CSS variables for a beautiful, theatrical "dark mode" UI with a subtle backdrop.
Web Speech API - Native browser TTS and STT.
Transformers.js - Powers the on-device Whisper-tiny fallback for offline/private voice recognition in browsers like Firefox.
PDF.js - Client-side PDF text extraction and layout parsing.

**Privacy & Data**
No Servers: There is no backend database.
No Tracking: There are no analytics scripts lol do not worry
Local Only: All scripts, settings, and rehearsal states are stored exclusively in your browser's localStorage. If you clear your browser data, your scripts will be deleted.
Audio Privacy: If you select the "On-device" voice engine in Settings (or use Firefox), your microphone audio is processed locally in your browser via WebAssembly. It is never transmitted over the network.


**Whisper Model**
If you select the "On-device" engine (or use a browser without native speech recognition), the app pulls Xenova/whisper-tiny.en from Hugging Face's CDN the first time it is used. That first download (~40MB) requires an internet connection; after that, the browser caches it and it works fully offline. If a user never touches the on-device option, nothing is downloaded at all.



*License*
This project is open-source and free to use, modify, and distribute under the MIT License.
