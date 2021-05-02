let topImageElement = document.getElementById('top-image');
let productShowcase = document.getElementById('product-showcase');
let addProductFABElement = document.querySelector('.mdl-button--fab');
let productDataFormElement = document.querySelector('form');

let headerTitleElement = document.querySelector('.mdl-layout__header .mdl-layout-title');
let headerNavElement = document.querySelector('.mdl-layout__header .mdl-navigation');
let drawerElement = document.querySelector('.mdl-layout__drawer');

let formSubmitBtnElement = document.querySelector('.form-submit-btn');
let formCloseBtnElement = document.querySelector('.form-close-btn');

let originalHeaderTitle = headerTitleElement.textContent;

console.log(
    `
    drawer: ${drawerElement.style.display},
    headerNav: ${headerNavElement.style.display},
    topImage: ${topImageElement.style.display},
    productShowcase: ${productShowcase.style.display},
    addProductFAB: ${addProductFABElement.style.display}
    `
);

// Store original element state, to be restored for the
// form close/cancel event
let originalElementDisplayAttrVals = {
    drawer: 'flex',
    headerNav: 'flex',
    topImage: 'block',
    productCollection: 'block',
    addProductFAB: 'inline-block',
}

// let drawerButtonElement = document.querySelector('.mdl-layout__header .mdl-layout__drawer-button');

// Callback for the click event of form submit button
function formSubmitCallback(event) {
    event.preventDefault();
}

// Callback for the click event of form close button
function formCloseCallback(event) {

    event.preventDefault();

    // Change the title back to home page title
    headerTitleElement.textContent = originalHeaderTitle;

    // Unhide home page elements, by resetting their display attribute values
    drawerElement.style.display = originalElementDisplayAttrVals.drawer;
    headerNavElement.style.display = originalElementDisplayAttrVals.headerNav;
    topImageElement.style.display = originalElementDisplayAttrVals.topImage;
    productShowcase.style.display = originalElementDisplayAttrVals.productCollection;
    addProductFABElement.style.display = originalElementDisplayAttrVals.addProductFAB;

    // Hide the input form for product data
    productDataFormElement.style.display = 'none';
    formCloseBtnElement.style.display = 'inline-block';
    formCloseBtnElement.style.position = 'absolute';
    formCloseBtnElement.style.left = '-100vw';

}

// Add click event handler to the FAB
addProductFABElement.onclick = (event) => {
    // Change the title
    headerTitleElement.textContent = 'Add new product';

    // Hide unwanted elements on the page
    // drawerButtonElement.style.display = 'none';
    drawerElement.style.display = 'none';
    headerNavElement.style.display = 'none';
    topImageElement.style.display = 'none';
    productShowcase.style.display = 'none';
    addProductFABElement.style.display = 'none';

    // Display the input form for product data
    productDataFormElement.style.display = 'block';

    formCloseBtnElement.style.position = 'relative';
    formCloseBtnElement.style.display = 'block';
    formCloseBtnElement.style.left = '0';

    formSubmitBtnElement.onclick = formSubmitCallback;
    formCloseBtnElement.onclick = formCloseCallback;
};