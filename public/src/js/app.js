// In-memory data-structures to hold the data
// on products and favorites, to be accessed
// across web-pages in this app.
// Will soon be replaced by backend storage on a 
// remote server.
let products = {
    '1': {
        id: "1",
        name: "Shoes",
        imageUrl: "/src/images/products/shoes.jpg",
        price: "$79.99",
        description: "Sporty shoes for your casual wear !"
    },

    '2': {
        id: "2",
        name: "Sunglasses",
        imageUrl: "/src/images/products/sunglasses.jpg",
        price: "$135.00",
        description: "Cool shades for a sunny day !"
    },

    '3': {
        id: "3",
        name: "Retro Camera",
        imageUrl: "/src/images/products/retro_camera.jpg",
        price: "$220.00",
        description: "Capture memories - Retro Styleee..."
    }
};


// let shoppingCartProducts = new Map();
let favoriteProducts = {
    '1': {
        id: "1",
        name: "Shoes",
        imageUrl: "/src/images/products/shoes.jpg",
        price: "$79.99",
        description: "Sporty shoes for your casual wear !"
    }
};

/* Local Storage API */

let COLLECTION_NAMES = {
    PRODUCTS: 'products',
    FAVORITES: 'favorites',
    SHOPPING_CART: 'shopping-cart',
    SAVED_FOR_LATER: 'saved-for-later'
};

// Method to get new id for new product
function getNewProdId() {
    // When getting a new id for new product, checks if an entry exists
    // in the local storage. If valid, then it is set to that value, and
    // if it is null (no entry), initialized to 4 (as there are 3 pre-existing
    // product entries).
    let newProdId = JSON.parse(localStorage.getItem('current_prod_id')) ?
        JSON.parse(localStorage.getItem('current_prod_id')) :
        4;
    localStorage.setItem('current_prod_id', JSON.stringify(newProdId + 1)); // Increment for next new product

    return newProdId;
}

// Add Collection to local storage
function addCollectionToLocalStorage(collectionName, collectionData) {
    localStorage.setItem(collectionName, JSON.stringify(collectionData));
}

// Add new entry to a given collection
function addNewItemToCollectionInLocalStorage(collectionName, productId, productData) {
    let currentDataInCollection = JSON.parse(localStorage.getItem(collectionName));

    currentDataInCollection[productId] = productData;
    localStorage.setItem(collectionName, JSON.stringify(currentDataInCollection));
}

// Get collection data
function getCollectionFromLocalStorage(collectionName) {
    let currentDataInCollection = JSON.parse(localStorage.getItem(collectionName));
    return currentDataInCollection;
}

// Get an item from a collection
function getItemFromCollectionInLocalStorage(collectionName, productId) {
    let currentDataInCollection = JSON.parse(localStorage.getItem(collectionName));

    return currentDataInCollection[productId];
}

// Get size of given collection
function getSizeOfCollectionInLocalStorage(collectionName) {
    let currentDataInCollection = JSON.parse(localStorage.getItem(collectionName));
    console.log(`getSizeOfCollectionInLocalStorage: currentDataInCollection - ${currentDataInCollection}`);
    return Object.values(currentDataInCollection).length;
}

// Check if an item is part of the given collection
function isItemInLocalStorageCollection(collectionName, productId) {
    let currentDataInCollection = JSON.parse(localStorage.getItem(collectionName));

    return (Object.values(currentDataInCollection)
        .find((productEntry) => {
            return productEntry.id === productId;
        }) !== undefined);
}


// Remove item from a given collection
function removeItemFromCollectionInLocalStorage(collectionName, productId) {
    let currentDataInCollection = JSON.parse(localStorage.getItem(collectionName));

    let filteredProductCollection = {};

    Object.entries(currentDataInCollection).forEach(([productKey, productValue]) => {
        if (productKey !== productId) {
            filteredProductCollection[productKey] = productValue;
        }
    });

    localStorage.removeItem(collectionName);
    localStorage.setItem(collectionName, JSON.stringify(filteredProductCollection));

}

// Get current collection data from localStorage
let currentProductCollectionData = getCollectionFromLocalStorage(COLLECTION_NAMES.PRODUCTS);
let currentFavoritesCollectionData = getCollectionFromLocalStorage(COLLECTION_NAMES.FAVORITES);
let currentShoppingCartCollectionData = getCollectionFromLocalStorage(COLLECTION_NAMES.SHOPPING_CART);
let currentSavedForLaterCollectionData = getCollectionFromLocalStorage(COLLECTION_NAMES.SAVED_FOR_LATER);

// Initialize localStorage with appropriate collection data, upon page load
addCollectionToLocalStorage(
    COLLECTION_NAMES.PRODUCTS,
    (currentProductCollectionData) ?
    currentProductCollectionData :
    products
);

addCollectionToLocalStorage(
    COLLECTION_NAMES.FAVORITES,
    (currentFavoritesCollectionData) ?
    currentFavoritesCollectionData :
    favoriteProducts
);

addCollectionToLocalStorage(
    COLLECTION_NAMES.SHOPPING_CART,
    (currentShoppingCartCollectionData) ?
    currentShoppingCartCollectionData : {}
);

addCollectionToLocalStorage(
    COLLECTION_NAMES.SAVED_FOR_LATER,
    (currentSavedForLaterCollectionData) ?
    currentSavedForLaterCollectionData : {}
);




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
});

// Function to show app install prompt to the user.
// Enables display of prompt at a desired point in
// the app flow.
function showAppInstallPrompt() {
    if (appInstallPrompt) {
        appInstallPrompt.prompt();

        appInstallPrompt.userChoice.then((endResult) => {
            console.log(`User's app install choice: ${endResult.outcome}`);
            if (endResult.outcome === 'dismissed') {
                console.log(`User doesn't want to install the app !`);
            } else {
                console.log(`User installed the app !`);
            }
        });

        appInstallPrompt = null;
    }
}