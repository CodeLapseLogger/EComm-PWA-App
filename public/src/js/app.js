if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then((serviceWorkerRegistration) => {
            console.log('Service worker has been registered !');
        });
}

let appInstallPrompt = null;
window.addEventListener('beforeinstallprompt', (event) => {

    event.preventDefault();
    console.log('Fired beforeinstallprompt event !');
    appInstallPrompt = event;

});