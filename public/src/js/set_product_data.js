// let topImageElement = document.getElementById('top-image');
// let productShowcase = document.getElementById('product-showcase');
// let addProductFABElement = document.querySelector('.mdl-button--fab');
let productDataFormElement = document.querySelector('form');

let headerTitleElement = document.querySelector('.mdl-layout__header .mdl-layout-title');
let headerNavElement = document.querySelector('.mdl-layout__header .mdl-navigation');
let drawerElement = document.querySelector('.mdl-layout__drawer');

let formSubmitBtnElement = document.querySelector('.form-submit-btn');
let formCloseBtnElement = document.querySelector('.form-close-btn');

// Text to be displayed
let loadingSpinnerText = {
    ON_ADD_SUBMIT: 'Adding new product...',
    ON_EDIT_SUBMIT: 'Updating product...',
    ON_CLOSE: 'Loading...'
}

// let drawerButtonElement = document.querySelector('.mdl-layout__header .mdl-layout__drawer-button');

// Object with entries of dom elements to hide or unhide during page load
let elementListToHideUnhide = {
    formElement: productDataFormElement,
    formSubmitElement: formSubmitBtnElement,
    formCloseElement: formCloseBtnElement
}

// Globals to be accessed in multiple functions
let currentUrl;
let isAddProductAction;
let existingProductId;

window.onload = (event) => {

    // Code to preload form with existing product data,
    // if the action is to edit product and not to create 
    // new product. 
    currentUrl = new URL(window.location.href);
    isAddProductAction = currentUrl.searchParams.get('isNewProduct'); // 'isNewProduct' origin url: product_listing.js, product_detail.js 

    if (isAddProductAction === 'false') { // check for edit action
        // Set the title
        headerTitleElement.textContent = 'Edit product';
        // Set Button Text
        formSubmitBtnElement.textContent = 'Update Product';
        existingProductId = currentUrl.searchParams.get('id');
        let existingProductData = getItemFromCollectionInLocalStorage(COLLECTION_NAMES.PRODUCTS, existingProductId);
        preloadFormData(existingProductData);
    } else { // is an add action
        // Set the title
        headerTitleElement.textContent = 'Add new product';
    }

    formCloseBtnElement.style.position = 'relative';
    formCloseBtnElement.style.display = 'block';
    formCloseBtnElement.style.left = '0';

    formSubmitBtnElement.onclick = formSubmitCallback;
    formCloseBtnElement.onclick = formCloseCallback;

}

// Function to preload form with existing product data
function preloadFormData(productDataToPreload) {
    let formInputElements = document.querySelectorAll('input');

    for (let formInputElement of formInputElements) {
        if (formInputElement.name.includes('name')) {
            formInputElement.value = productDataToPreload.name;
        } else if (formInputElement.name.includes('image')) {
            formInputElement.value = productDataToPreload.imageUrl;
        } else if (formInputElement.name.includes('price')) {
            formInputElement.value = productDataToPreload.price.substring(1); // Extract numeric text after '$', the first character. 
        } else if (formInputElement.name.includes('description')) {
            formInputElement.value = productDataToPreload.description;
        }
    }
}

// Callback for the click event of form submit button
function formSubmitCallback(event) {
    event.preventDefault();

    let formElements = document.querySelectorAll('input');

    let newProductEntry = {
        id: '',
        name: '',
        price: '',
        description: '',
        imageUrl: ''
    }


    if (isAddProductAction === 'true') {
        newProductEntry.id = getNewProdId().toString();
        console.log(`New product entry id: ${newProductEntry.id}`);
    } else { // edit product
        newProductEntry.id = existingProductId;
        console.log(`Existing product entry id: ${newProductEntry.id}`);
    }

    let formFieldValueData = {};
    for (let formElement of formElements) {
        console.log(`New product attribute value (form element value): ${formElement.value}`);
        formFieldValueData[formElement.name] = formElement.value;
    }

    for (let fieldName in formFieldValueData) {
        let indexOfHyphen = fieldName.indexOf('-');
        let productAttrSubstr = fieldName.substring(indexOfHyphen + 1);

        indexOfHyphen = productAttrSubstr.indexOf('-');

        // Code to convert the product attribute name to camelCase
        if (indexOfHyphen != -1) {
            // Replace hyphen (in image-url)
            productAttrSubstr = productAttrSubstr.replace('-', '');
            // then, capitalize the character currently in the place of replaced hyphen (done in line above)
            let capitalizedCharAfterReplacedHyphen = productAttrSubstr[indexOfHyphen].toUpperCase();
            // finally, update the lower case character of original string (productAttrSubstr),
            // currently in the replaced hyphen's index position with the capitalized character (previous line)
            // to make it camel-cased string.
            productAttrSubstr = productAttrSubstr.replace(productAttrSubstr[indexOfHyphen], capitalizedCharAfterReplacedHyphen[0]);
        }

        console.log(`New product form field name: ${productAttrSubstr}`);
        // Set the form field value in the new product entry object
        if (productAttrSubstr === 'price') {
            let priceWithCurrencySymbol = '$';
            let productPriceAsFixedDecimalNumber = Number(formFieldValueData[fieldName]).toFixed(2);
            priceWithCurrencySymbol = priceWithCurrencySymbol + productPriceAsFixedDecimalNumber.toString();

            newProductEntry[productAttrSubstr] = priceWithCurrencySymbol;
        } else if ((productAttrSubstr === 'name') /*&& (formFieldValueData[fieldName].length > 15)*/ ) {
            newProductEntry[productAttrSubstr] = formFieldValueData[fieldName];
            // newProductEntry[productAttrSubstr] = formFieldValueData[fieldName].substring(0, 15) + '...';
        } else {
            newProductEntry[productAttrSubstr] = formFieldValueData[fieldName];
        }

    }

    // At this point the form data has been extracted and stored
    // on to the newProductEntry object. Time to add it to localStorage
    // products collection.
    addNewItemToCollectionInLocalStorage(COLLECTION_NAMES.PRODUCTS, newProductEntry.id, newProductEntry);

    // Hide the input form for product data
    productDataFormElement.style.display = 'none';
    formCloseBtnElement.style.display = 'inline-block';
    formCloseBtnElement.style.position = 'absolute';
    formCloseBtnElement.style.left = '-100vw';

    // Display loading spinner and the text
    if (isAddProductAction === 'true') {
        spinnerTextElement.textContent = loadingSpinnerText.ON_ADD_SUBMIT;
    } else { // edit action
        spinnerTextElement.textContent = loadingSpinnerText.ON_EDIT_SUBMIT;
    }

    spinnerTextElement.style.display = 'block';
    spinnerElement.classList.add('is-active');

    // Navigate to the product page
    window.location.href = '/';
}

// Callback for the click event of form close button
function formCloseCallback(event) {

    event.preventDefault();

    // Hide the input form for product data
    productDataFormElement.style.display = 'none';
    formCloseBtnElement.style.display = 'inline-block';
    formCloseBtnElement.style.position = 'absolute';
    formCloseBtnElement.style.left = '-100vw';

    // Display loading spinner and the text
    spinnerTextElement.textContent = loadingSpinnerText.ON_CLOSE;
    spinnerTextElement.style.display = 'block';
    spinnerElement.classList.add('is-active');

    window.location.href = '/';
}