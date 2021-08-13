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

    console.log(`current url: ${window.location.href}`)
    let currentUrl = new URL(window.location.href);
    let listName = currentUrl.searchParams.get('list');

    // Code to hide action buttons for favorites, saved for later pages,
    // based on the presence of respective collection names in the url.
    if (listName === 'favorites') {
        editButtonElement.classList.add('hide-element');
        deleteButtonElement.classList.add('hide-element');
    } else if (listName === 'saved-for-later') {
        shoppingCartButtonElement.classList.add('hide-element');
        favoriteButtonElement.classList.add('hide-element');
        editButtonElement.classList.add('hide-element');
        deleteButtonElement.classList.add('hide-element');
    }

    // Launch loading spinner upon page load
    // and hide/stop it after 1 second. 
    launchLoadingSpinner(elementListToHideUnhide);
    let stopLoadSpinnerWrapper = () => { // For setTimeout argument
        stopLoadingSpinner(elementListToHideUnhide);
    }
    setTimeout(stopLoadSpinnerWrapper, 1000);

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


    // Setting up click event handlers for different product action buttons

    // shoppingCartButtonElement.onclick = (event) => {
    //     console.log('[ Product Detail Page ] Running click event handler for shopping cart button !');

    // };
    setupClickEventHandlerForShoppingCardAddButton(shoppingCartButtonElement, productData);

    // favoriteButtonElement.onclick = (event) => {
    //     console.log('[ Product Detail Page ] Clicked on Favorite Button !');
    // };
    setupClickEventHandlerForFavoriteButton(favoriteButtonElement, productData);

    editButtonElement.onclick = (event) => {
        console.log('[ Product Detail Page ] Clicked on Edit Button !');
        launchLoadingSpinner(elementListToHideUnhide);
        window.location.href = `/set_product_data?isNewProduct=false&id=${productId}`;
    };

    deleteButtonElement.onclick = (event) => {
        console.log('[ Product Detail Page ] Clicked on Delete Button !');
        launchLoadingSpinner(elementListToHideUnhide, 'Deleting product...');
        removeItemFromCollectionInLocalStorage(COLLECTION_NAMES.PRODUCTS, productId);
        window.location.href = '/';
    };


}