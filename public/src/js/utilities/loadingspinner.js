let spinnerTextElement = document.querySelector('.loading-spinner-text');
let spinnerElement = document.querySelector('.mdl-spinner');

// Method to launch the loading spinner
function launchLoadingSpinner(elementListToHide) {
    // productListContainer.classList.add('hide-element');
    // topImageElement.classList.add('hide-element');
    // productListings.classList.add('hide-element');
    // addProductFABElement.classList.add('hide-element');

    for (const elementToHide of elementListToHide) {
        elementToHide.classList.add('hide-element');
    }

    spinnerTextElement.style.display = 'block';
    spinnerElement.classList.add('is-active');
}

// Method to stop loading spinner
function stopLoadingSpinner(elementListToUnhide) {
    spinnerTextElement.style.display = 'none';
    spinnerElement.classList.remove('is-active');

    for (const elementToUnhide of elementListToUnhide) {
        elementToUnhide.classList.remove('hide-element');
    }

    // productListContainer.classList.remove('hide-element');
    // topImageElement.classList.remove('hide-element');
    // productListings.classList.remove('hide-element');
    // addProductFABElement.classList.remove('hide-element');
}