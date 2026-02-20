# Serika Streaming – Samsung TV (Tizen)

Samsung Tizen web app wrapper for [Serika Streaming](https://streaming.serika.dev).

## Overview

This is a lightweight Tizen web application that loads the Serika Streaming website inside the Samsung TV browser engine. It:

- Navigates to the login page (or auto-redirects to browse if already logged in)
- Identifies itself via `?platform=tizen` so the website hides Chromecast UI and sends `X-Serika-Platform: samsung-tv` headers
- Registers Samsung TV remote control keys for media playback
- Keeps the screen awake during use

## Project Structure

```
├── config.xml      # Tizen app manifest (privileges, access, metadata)
├── index.html      # Entry point with loading screen
├── js/
│   └── main.js     # Remote key registration, navigation logic
├── css/
│   └── style.css   # Loading screen styles
└── icon.png        # App icon (114×114)
```

## Requirements

- [Tizen Studio](https://developer.tizen.org/development/tizen-studio/download) with TV extensions
- Samsung TV developer mode enabled (for sideloading)
- A Samsung developer certificate

## Building & Deploying

### Using Tizen Studio

1. Import this project into Tizen Studio (`File → Import → Tizen → Tizen Project`)
2. Right-click the project → `Build Signed Package`
3. This produces a `.wgt` file in the project root

### Sideloading to a Samsung TV

1. Enable **Developer Mode** on your Samsung TV (Apps → enter `12345` on remote)
2. Set the **Host PC IP** to your computer's IP address
3. In Tizen Studio, connect to the TV via Device Manager
4. Right-click the project → `Run As → Tizen Web Application`

### Using CLI

```bash
# Package
tizen package -t wgt -s <your-certificate-profile> -- .

# Install on connected TV
tizen install -n SerikaStreaming.wgt -t <device-serial>

# Run
tizen run -p SerikaStr.SerikaStreaming -t <device-serial>
```

## Configuration

Edit `js/main.js` to change the target URL:

```js
var WEBSITE_URL = 'https://streaming.serika.dev';
```

## License

See [LICENSE](LICENSE).
