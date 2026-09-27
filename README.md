# SilkCue — what changed

## The app-breaking bug
Your `state` object was missing a comma after `importing: false`, which is a
JavaScript syntax error — the entire `<script>` block failed to parse, so the
app never rendered anything at all. That's fixed.

## Other fixes / improvements
- **Icons**: `icon.svg` is now used everywhere — rasterized into real PNGs
  (16/32/180/192/512px) and embedded directly in the HTML as the favicon,
  apple-touch-icon, and PWA manifest icons. The old placeholder icon is gone.
- **Background**: `background.jpg` is compressed and embedded as a subtle,
  darkened backdrop behind the app (it sits behind a dark gradient so text
  stays fully readable — matches the existing curtain/brass theme).
- **Microphone permission on first launch**: the very first time someone
  opens the app, they now see a short "Enable Microphone" screen *before*
  anything else, so `getUserMedia` is requested up front instead of silently
  failing or interrupting mid-rehearsal. Choosing "Not now" just skips it —
  they can still use the manual "Done — next line" button, and can re-check
  permission later from Settings → Microphone access.
- **On-device fallback listening engine**: the app already used the
  browser's built-in `SpeechRecognition` (Chrome/Edge/Safari) to listen for
  lines. That API doesn't exist in Firefox, and it isn't private (audio is
  sent to a cloud provider). I added a second engine that runs
  **Whisper-tiny** entirely on-device via [transformers.js], recording with
  the Web Audio API, detecting when you've stopped speaking the same way the
  native engine does, then transcribing locally. It downloads once (~40MB)
  and is cached by the browser for offline use after that. In **Settings**
  you can choose:
  - *Automatic* — uses the browser engine when available (fastest), falls
    back to on-device otherwise
  - *Browser (cloud)* — force the native engine
  - *On-device (offline)* — force Whisper, even if the browser engine exists
  (The engine-choice row only appears when both are actually available in
  your browser.)
- Fixed a few smaller consistency issues around the listening engine so
  "restart listening", "skip line", and the various status banners all work
  correctly with whichever engine is active.

[transformers.js]: https://github.com/xenova/transformers.js

## Installing as an app (not just a bookmark)

### Just double-click `SilkCue.html` (simplest)
It's still one self-contained file — you can open it directly and it works
fully offline (uploads, rehearsal, settings, both listening engines).
- **iOS**: open it in Safari, tap Share → **Add to Home Screen**. It launches
  full-screen, no browser chrome, with the theatre-mask icon.
- **Android (Chrome)**: opening a local file gets you a bookmark shortcut,
  not a true installed app — Android's full "Install app" prompt requires
  the page to be served over `https://`. See below for that.

### For a real "Install app" prompt on Android (and a nicer install on
### desktop Chrome/Edge too)
Android's installability rules require an https-hosted manifest + service
worker — a `file://` page can't satisfy that no matter what the HTML
contains. I've included the extra files that make it possible:

```
SilkCue.html            → rename to index.html when you deploy
manifest.webmanifest
sw.js
icons/icon-192.png
icons/icon-512.png
icons/icon-180.png      (spare, iOS already gets its icon inline)
icons/icon-32.png
icons/icon-16.png
```

1. Put all of the above in one folder, **renaming `SilkCue.html` to
   `index.html`**.
2. Host that folder on any static https host — GitHub Pages, Netlify,
   Vercel, Cloudflare Pages, or your own server all work, and all have
   free tiers. No build step needed, it's already plain static files.
3. Visit the hosted URL in Chrome on Android → you'll get a proper
   "Install app" / "Add to Home screen" prompt that installs it as a
   standalone app with its own icon, and `sw.js` caches the app shell so it
   keeps working offline after that first visit.

The HTML automatically detects which situation it's in: if it can fetch
`manifest.webmanifest` next to itself (i.e. you hosted it properly), it uses
that plus `sw.js`. If not — because you just opened the file directly — it
builds an equivalent manifest and service worker from data already embedded
in the HTML, so double-click-and-run still works exactly as before.

## A note on the Whisper model
The on-device engine pulls `Xenova/whisper-tiny.en` from Hugging Face's CDN
the first time it's used (via transformers.js, loaded from jsDelivr). That
first download needs internet; after that, the browser caches it and it
works fully offline. If a user never touches the on-device option, nothing
is downloaded at all — the browser engine is used silently as before.
