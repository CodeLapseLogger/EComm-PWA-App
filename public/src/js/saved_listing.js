let productListContainer = document.querySelector("#product-showcase");
let productList = document.querySelector(".mdl-list");
console.log(`productList element: $productList`);

function isFavorite(productEntry) {
    return isItemInLocalStorageCollection(COLLECTION_NAMES.FAVORITES, productEntry.id);
}

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

    if (productList.display === 'none') {
        productList.display = 'block';
    }

    let productsSavedForLaterData = getCollectionFromLocalStorage(COLLECTION_NAMES.SAVED_FOR_LATER);
    for (let product of Object.values(productsSavedForLaterData)) {
        // List item element inside unrodered list element (<ul>)
        let productListItem = document.createElement('li');
        // let productIdAsClass = 'p-' + product.id;
        productListItem.className = 'mdl-list__item';

        // Span element to hold the product card
        let cardSpanElement = document.createElement('span');
        cardSpanElement.className = 'mdl-list__item-primary-content';
        // cardSpanElement.onclick = (event) => {
        //     launchLoadingSpinner(elementListToHideUnhide);
        //     window.location.href = `/product_detail?id=${product.id}`;
        // };

        // Div element to be styled as an MDL (Material Design Lite) Card Component
        let cardElement = document.createElement('div');
        cardElement.id = product.id;
        cardElement.className = 'mdl-card mdl-shadow--2dp product-card';

        // Div element cluster to create MDL Card Component
        let cardElementTitle = createProductCardTitleAndPriceElement(product);

        // Append card title element to card component/element
        // componentHandler.upgradeElement(cardElementTitle);
        cardElement.appendChild(cardElementTitle);

        // Div element to hold description/supporting text
        let cardElementDescription = createProductDescriptionElement(product);

        // componentHandler.upgradeElement(cardElementDescription);
        cardElement.appendChild(cardElementDescription);

        let productSavedForLater = isItemInLocalStorageCollection(COLLECTION_NAMES.SAVED_FOR_LATER, product.id);

        // Div element to hold action buttons
        let cardElementActions = document.createElement('div');
        cardElementActions.className = 'mdl-card__actions mdl-card--border';
        let cardElementSaveAction = document.createElement('a');
        cardElementSaveAction.title = 'Save for offline access';
        cardElementSaveAction.className = 'mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect';
        cardElementSaveAction.textContent = productSavedForLater ? 'UNSAVE' : 'SAVE';
        cardElementSaveAction.fontWeight = 'bold';
        cardElementSaveAction.style.backgroundColor = 'orange';
        cardElementSaveAction.style.color = 'white';

        let saveBtnIcon = document.createElement('i');
        saveBtnIcon.className = 'material-icons';
        saveBtnIcon.textContent = 'save';
        saveBtnIcon.style.backgroundColor = 'orange';
        saveBtnIcon.style.color = 'white';
        saveBtnIcon.style.padding = '0 0 0 0.5rem';
        saveBtnIcon.style.fontSize = '1.3rem';
        cardElementSaveAction.appendChild(saveBtnIcon);

        cardElementSaveAction.onclick = (clickEvent) => {
            let isSaved = isItemInLocalStorageCollection(COLLECTION_NAMES.SAVED_FOR_LATER, product.id);
            if (isSaved) { // Unsave or Remove
                removeItemFromCollectionInLocalStorage(COLLECTION_NAMES.SAVED_FOR_LATER, product.id);
                cardElementSaveAction.textContent = 'SAVE';
            } else { // Save
                addNewItemToCollectionInLocalStorage(COLLECTION_NAMES.SAVED_FOR_LATER, product.id, product);
                cardElementSaveAction.textContent = 'UNSAVE';
            }

            cardElementSaveAction.appendChild(saveBtnIcon);

            let savedForLaterCollectionAfterAdd = getCollectionFromLocalStorage(COLLECTION_NAMES.SAVED_FOR_LATER);
            // prodsSavedForLater.set(product.id, product);
            console.log(`Size of prodsSavedForLater list after add/remove: ${Object.values(savedForLaterCollectionAfterAdd).length}`);

            caches.open('saved-for-later')
                .then((cache) => {
                    if (isSaved) { // Already saved, so remove entry from 
                        // cache and localStorage, for this button click
                        let cacheRelatedData = {
                            cacheRef: cache,
                            resource: product.imageUrl
                        };

                        let snackbarRelatedData = {
                            message: `Removed "${product.name}" from saved collection`,
                            timeout: 3000,
                            actionHandlerData: {
                                undoActionMethodRef: addNewItemToCollectionInLocalStorage,
                                localStorageCollectionName: COLLECTION_NAMES.SAVED_FOR_LATER,
                                productId: product.id,
                                productData: product,
                                undoSuccessMsg: `Added "${product.name}" back to saved collection`,
                                undoFailureMsg: `Error adding "${product.name}" from saved collection`
                            },
                            actionLabel: 'UNDO'
                        };
                        cacheAddRemoveAndUndoWithSnackbar(false /* isAdd */ , cacheRelatedData, snackbarRelatedData);
                    } else { // Not saved, so add to localStorage and cache
                        let cacheRelatedData = {
                            cacheRef: cache,
                            resource: product.imageUrl
                        };

                        let snackbarRelatedData = {
                            message: `Saved "${product.name}" for later`,
                            timeout: 3000,
                            actionHandlerData: {
                                undoActionMethodRef: removeItemFromCollectionInLocalStorage,
                                localStorageCollectionName: COLLECTION_NAMES.SAVED_FOR_LATER,
                                productId: product.id,
                                productData: {},
                                undoSuccessMsg: `Removed "${product.name}" from saved collection`,
                                undoFailureMsg: `Error removing "${product.name}" from saved collection`
                            },
                            actionLabel: 'UNDO'
                        };
                        cacheAddRemoveAndUndoWithSnackbar(true /* isAdd */ , cacheRelatedData, snackbarRelatedData);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        // componentHandler.upgradeElement(cardElementSaveAction);
        cardElementActions.appendChild(cardElementSaveAction);


        // componentHandler.upgradeElement(cardElementActions);
        cardElement.appendChild(cardElementActions);

        // componentHandler.upgradeElement(cardElement);
        cardSpanElement.appendChild(cardElement);
        // componentHandler.upgradeElement(cardSpanElement);
        productListItem.appendChild(cardSpanElement);

        // return productListItem;
        console.log(productListItem);
        componentHandler.upgradeElement(productListItem);
        productList.appendChild(productListItem);
    }

    if (getSizeOfCollectionInLocalStorage(COLLECTION_NAMES.SAVED_FOR_LATER) === 0) {
        productList.display = 'none';
        let emptyProductCatalogMsgElement_1 = document.createElement('p');
        emptyProductCatalogMsgElement_1.innerHTML = 'No Saved Products !';
        emptyProductCatalogMsgElement_1.classList.add('empty-msg-style');
        emptyProductCatalogMsgElement_1.style.color = '#75543d';
        emptyProductCatalogMsgElement_1.style.position = 'relative';
        emptyProductCatalogMsgElement_1.style.top = '1rem';

        let emptyProductCatalogMsgElement_2 = document.createElement('p');
        emptyProductCatalogMsgElement_2.innerHTML = 'Add from the home page';
        emptyProductCatalogMsgElement_2.classList.add('empty-msg-style');
        emptyProductCatalogMsgElement_2.style.color = '#75543d';
        emptyProductCatalogMsgElement_2.style.position = 'relative';
        emptyProductCatalogMsgElement_2.style.top = '1rem';

        productListContainer.style.textAlign = 'center';
        productListContainer.style.display = 'flex';
        productListContainer.style.flexDirection = 'column';
        productListContainer.style.alignItems = 'center';
        // productListContainer.style.position = 'relative';
        // productListContainer.style.top = '2rem!important';

        let floopyDiskClusterElement = document.createElement('div');
        floopyDiskClusterElement.style.display = 'inline-block';
        floopyDiskClusterElement.style.position = 'relative';
        floopyDiskClusterElement.style.top = '1rem';

        let floopyDiskIconElement = document.createElement('i');
        floopyDiskIconElement.className = 'material-icons';
        floopyDiskIconElement.textContent = 'save';
        floopyDiskIconElement.style.fontSize = '5rem';
        floopyDiskIconElement.style.color = '#b48868';
        floopyDiskIconElement.style.position = 'relative';
        floopyDiskIconElement.style.left = '30%';


        let floopyDiskIconElement2 = document.createElement('i');
        floopyDiskIconElement2.className = 'material-icons';
        floopyDiskIconElement2.textContent = 'save';
        floopyDiskIconElement2.style.fontSize = '5rem';
        floopyDiskIconElement2.style.color = '#956745';
        floopyDiskIconElement2.style.position = 'relative';


        let floopyDiskIconElement3 = document.createElement('i');
        floopyDiskIconElement3.className = 'material-icons';
        floopyDiskIconElement3.textContent = 'save';
        floopyDiskIconElement3.style.fontSize = '5rem';
        floopyDiskIconElement3.style.color = '#75543d';
        floopyDiskIconElement3.style.position = 'relative';
        floopyDiskIconElement3.style.right = '30%';

        componentHandler.upgradeElement(floopyDiskIconElement);
        componentHandler.upgradeElement(floopyDiskIconElement2);
        componentHandler.upgradeElement(floopyDiskIconElement3);

        floopyDiskClusterElement.appendChild(floopyDiskIconElement);
        floopyDiskClusterElement.appendChild(floopyDiskIconElement2);
        floopyDiskClusterElement.appendChild(floopyDiskIconElement3);

        productListContainer.appendChild(emptyProductCatalogMsgElement_1);
        productListContainer.appendChild(floopyDiskClusterElement);
        productListContainer.appendChild(emptyProductCatalogMsgElement_2);

        // productListContainer.style.backgroundImage = 'url("/src/images/empty-store.jpg")';

    }
};