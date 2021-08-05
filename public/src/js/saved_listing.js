// let productListContainer = document.querySelector("#product-showcase");
// let productList = document.querySelector(".mdl-list");
// console.log(`productList element: $productList`);

// function isFavorite(productEntry) {
//     return isItemInLocalStorageCollection(COLLECTION_NAMES.FAVORITES, productEntry.id);
// }

let topImageElement = document.getElementById('top-image');
let productListings = document.getElementById('product-showcase');

let elementListToHideUnhide = [productListContainer, topImageElement, productListings];

window.onload = (event) => {

    // Launch loading spinner upon page load
    // and hide/stop it after 1 second. 
    launchLoadingSpinner(elementListToHideUnhide);
    let stopLoadSpinnerWrapper = () => { // For setTimeout argument
        stopLoadingSpinner(elementListToHideUnhide);
    }
    setTimeout(stopLoadSpinnerWrapper, 1000);

    setupProductListAndPopulateProductData(COLLECTION_NAMES.SAVED_FOR_LATER /*inputCollectionName*/ , false /*isNotSavedProductList*/ );

    checkForEmptySavedForLaterListAndDisplayCustomContent();
};