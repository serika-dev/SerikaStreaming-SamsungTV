/**
 * Serika Streaming - Samsung Tizen TV App
 *
 * Wrapper app that loads the Serika Streaming website with
 * platform identification so the website can hide Chromecast UI
 * and send a custom X-Serika-Platform header on API requests.
 */
(function () {
    'use strict';

    var WEBSITE_URL = 'https://streaming.serika.dev';

    // Register TV remote control keys for media playback
    function registerKeys() {
        if (!window.tizen || !window.tizen.tvinputdevice) return;
        var keys = [
            'MediaPlayPause',
            'MediaPlay',
            'MediaPause',
            'MediaStop',
            'MediaFastForward',
            'MediaRewind',
            'MediaTrackPrevious',
            'MediaTrackNext',
            'ColorF0Red',
            'ColorF1Green',
            'ColorF2Yellow',
            'ColorF3Blue'
        ];
        keys.forEach(function (key) {
            try {
                tizen.tvinputdevice.registerKey(key);
            } catch (e) {
                console.warn('[SerikaTV] Could not register key:', key, e);
            }
        });
    }

    // Handle the hardware Back key
    document.addEventListener('keydown', function (e) {
        if (e.keyCode === 10009) {
            // tizen.application.getCurrentApplication().exit() on back from main page
            // But since we navigate to the website, the browser back stack handles it
            try {
                if (window.history.length > 1) {
                    window.history.back();
                } else {
                    tizen.application.getCurrentApplication().exit();
                }
            } catch (err) {
                console.warn('[SerikaTV] Exit error:', err);
            }
        }
    });

    // Keep the screen on while the app is active
    function keepScreenOn() {
        if (!window.webapis || !window.webapis.appcommon) return;
        try {
            webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_OFF);
        } catch (e) {
            console.warn('[SerikaTV] Could not disable screen saver:', e);
        }
    }

    // Navigate to the website
    // The middleware in the main app handles auth:
    //   /login with session  → redirects to /browse
    //   /login without session → shows login page
    // We append ?platform=tizen so the website knows we're on Samsung TV
    function navigateToWebsite() {
        keepScreenOn();
        window.location.href = WEBSITE_URL + '/login?platform=tizen';
    }

    // Initialize
    registerKeys();

    // Small delay to show the loading screen, then navigate
    setTimeout(navigateToWebsite, 800);
})();
