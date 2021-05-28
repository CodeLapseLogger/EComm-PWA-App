// In-memory data-structures to hold the data
// on products and favorites, to be accessed
// across web-pages in this app.
// Will soon be replaced by backend storage on a 
// remote server.
let products = new Map();
// products.set('1', {
//     id: "1",
//     name: "Shoes",
//     imageUrl: "/src/images/products/shoes.jpg",
//     price: "$79.99",
//     description: "Sporty shoes for your casual wear !"
// });

// products.set('2', {
//     id: "2",
//     name: "Sunglasses",
//     imageUrl: "/src/images/products/sunglasses.jpg",
//     price: "$135.00",
//     description: "Cool shades for a sunny day !"
// });

// products.set('3', {
//     id: "3",
//     name: "Retro Camera",
//     imageUrl: "/src/images/products/retro_camera.jpg",
//     price: "$220.00",
//     description: "Capture memories - Retro Styleee..."
// });


let shoppingCartProducts = new Map();
let favoriteProducts = new Map();
// favoriteProducts.set('1', {
//     id: "1",
//     name: "Shoes",
//     imageUrl: "/src/images/products/shoes.jpg",
//     price: "$79.99",
//     description: "Sporty shoes for your casual wear !"
// });

// Register service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then((serviceWorkerRegistration) => {
        console.log('Service worker registered !');
    });
}

// Handle 'beforeinstallprompt' event right before the display
// of PWA install banner.
let appInstallPrompt = null;
window.addEventListener('beforeinstallprompt', (event) => {
    console.log('Got beforeinstallprompt event !');
    event.preventDefault();
    appInstallPrompt = event; // For later use
})