let headerTitle = document.querySelector('.mdl-layout__header .mdl-layout-title');

let productImageElement = document.querySelector('.product-image');
let productTitleElement = document.querySelector('.product-title');
let productPriceElement = document.querySelector('.product-price');
let productDescriptionElement = document.querySelector('.product-description');
let productActionBtnCollection = document.querySelector('.action-btn-collection');

let shoppingCartButtonElement = document.querySelector('#shopping-cart-btn');
let favoriteButtonElement = document.querySelector('#favorite-btn');
let favoriteIconElement = document.querySelector('#favorite-btn > i');
let editButtonElement = document.querySelector('#edit-btn');
let deleteButtonElement = document.querySelector('#delete-btn');

let elementListToHideUnhide = [
    productImageElement,
    productTitleElement,
    productPriceElement,
    productDescriptionElement,
    productActionBtnCollection
];

window.onload = (event) => {

    // Launch loading spinner upon page load
    // and hide/stop it after 1 second. 
    launchLoadingSpinner(elementListToHideUnhide);
    let stopLoadSpinnerWrapper = () => { // For setTimeout argument
        stopLoadingSpinner(elementListToHideUnhide);
    }
    setTimeout(stopLoadSpinnerWrapper, 1000);

    console.log(`current url: ${window.location.href}`)
    let currentUrl = new URL(window.location.href);

    // Get rid of the '/' before the query string in the url
    let splitSubStrArr = currentUrl.pathname.split('/');
    console.log(`pathname: ${currentUrl.pathname}`);
    console.log(`splitSubStrArr: ${splitSubStrArr}`);
    if (splitSubStrArr[splitSubStrArr.length - 1] === '') {
        currentUrl.href.replace(splitSubStrArr[splitSubStrArr.length - 2] + '/', splitSubStrArr[splitSubStrArr.length - 2]);
    }

    // For shopping cart button icon at the top right,
    // on the page/screen header.
    setupShoppingCartStateAndClickEventListener();

    // Get the product id from the current page URL search params
    let productId = currentUrl.searchParams.get('id');
    console.log(`productId: ${productId}`);

    let productData = getItemFromCollectionInLocalStorage(COLLECTION_NAMES.PRODUCTS, productId);

    productImageElement.setAttribute('src', productData.imageUrl);
    productTitleElement.textContent = productData.name;
    headerTitle.textContent = productData.name.length > 15 ?
        productData.name.substring(0, 15) + '...' :
        productData.name;
    productPriceElement.textContent = productData.price;
    productDescriptionElement.textContent = productData.description;

    favoriteIconElement.textContent = isItemInLocalStorageCollection(COLLECTION_NAMES.FAVORITES, productId) ?
        'favorite' :
        'favorite_border';

    shoppingCartButtonElement.onclick = (event) => {
        console.log('[ Product Detail Page ] Clicked on Shopping Cart Button !');
    };

    favoriteButtonElement.onclick = (event) => {
        console.log('[ Product Detail Page ] Clicked on Favorite Button !');
    };

    editButtonElement.onclick = (event) => {
        console.log('[ Product Detail Page ] Clicked on Edit Button !');
    };

    deleteButtonElement.onclick = (event) => {
        console.log('[ Product Detail Page ] Clicked on Delete Button !');
    };


}