// let productListContainer = document.querySelector("#product-showcase");
// let productList = document.querySelector(".mdl-list");
// console.log(`productList element: $productList`);

let topImageElement = document.getElementById('top-image');
let productListings = document.getElementById('product-showcase');
let addProductFABElement = document.querySelector('.mdl-button--fab');

let elementListToHideUnhide = [topImageElement, productListings, addProductFABElement];

window.onload = (event) => {

    // Launch loading spinner upon page load
    // and hide/stop it after 1 second. 
    launchLoadingSpinner(elementListToHideUnhide);
    let stopLoadSpinnerWrapper = () => { // For setTimeout argument
        stopLoadingSpinner(elementListToHideUnhide);
    }
    setTimeout(stopLoadSpinnerWrapper, 1000);

    addProductFABElement.onclick = (event) => {
        launchLoadingSpinner(elementListToHideUnhide);
        window.location.href = '/set_product_data?isNewProduct=true';
    };

    // For shopping cart button icon at the top right,
    // on the page/screen header.
    setupShoppingCartStateAndClickEventListener();

    // For populating product data and displaying them
    // as a list of cards.
    setupProductListAndPopulateProductData(COLLECTION_NAMES.PRODUCTS /*inputCollectionName*/ , true /*isNotSavedProductList*/ );

    // Check for empty product list and accordingly
    // displaying custom content. 
    checkForEmptyProductListAndDisplayCustomContent();
};