// Function to create product card element/component,
// with its title and price
function createProductCardTitleAndPriceElement(inputProduct) {
    // Div element cluster to create MDL Card Component
    let cardElementForTitleAndPrice = document.createElement('div');
    cardElementForTitleAndPrice.className = 'mdl-card__title product-card-title';
    cardElementForTitleAndPrice.style.background = `url(${inputProduct.imageUrl}) center/cover`;

    let cardElementProductTitle = document.createElement('h2');
    cardElementProductTitle.className = 'mdl-card__title-text product-title-text product-title-name';

    let cardElementProductPrice = document.createElement('h2');
    cardElementProductPrice.className = 'mdl-card__title-text product-title-text product-title-price';

    // Product name and price in text nodes
    let cardElementProductTitleText = document.createTextNode(
        // Display appropriate text based on its length,
        // for a consistent product data presentation
        // across the list of product cards.
        inputProduct.name.length > 15 ?
        inputProduct.name.substring(0, 15) + '...' :
        inputProduct.name
    );
    cardElementProductTitle.appendChild(cardElementProductTitleText);

    let cardElementProductPriceText = document.createTextNode(inputProduct.price);
    cardElementProductPrice.appendChild(cardElementProductPriceText);


    // componentHandler.upgradeElement(cardElementProductTitle);
    // componentHandler.upgradeElement(cardElementProductPrice);
    cardElementForTitleAndPrice.appendChild(cardElementProductTitle);
    cardElementForTitleAndPrice.appendChild(cardElementProductPrice);
    cardElementForTitleAndPrice.onclick = (event) => {
        launchLoadingSpinner(elementListToHideUnhide);
        window.location.href = `/product_detail?id=${inputProduct.id}`;
    };

    return cardElementForTitleAndPrice;
}

// Function to create product description element
function createProductDescriptionElement(inputProduct) {
    // Div element to hold description/supporting text
    let productDescriptionElement = document.createElement('div');
    productDescriptionElement.className = 'mdl-card__supporting-text';
    let productDescriptionElementText = document.createTextNode(inputProduct.description);
    productDescriptionElement.appendChild(productDescriptionElementText);
    productDescriptionElement.onclick = (event) => {
        launchLoadingSpinner(elementListToHideUnhide);
        window.location.href = `/product_detail?id=${inputProduct.id}`;
    };

    return productDescriptionElement;
}

// Function to create save button icon element
function createSaveBtnIconElement() {
    let saveBtnIconElement = document.createElement('i');
    saveBtnIconElement.className = 'material-icons';
    saveBtnIconElement.textContent = 'save';
    saveBtnIconElement.style.backgroundColor = 'orange';
    saveBtnIconElement.style.color = 'white';
    saveBtnIconElement.style.padding = '0 0 0 0.5rem';
    saveBtnIconElement.style.fontSize = '1.3rem';

    return saveBtnIconElement;
}

// Function to create save button element for product card
function createSaveUnsaveBtnElement(inputProduct) {
    let cardElementActionItems = document.createElement('div');
    cardElementActionItems.className = 'mdl-card__actions mdl-card--border';

    // Save/Unsave action button
    let cardElementSaveAction = document.createElement('a');
    cardElementSaveAction.title = 'Save for offline access';
    cardElementSaveAction.className = 'mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect';
    cardElementSaveAction.textContent = isItemInLocalStorageCollection(COLLECTION_NAMES.SAVED_FOR_LATER, inputProduct.id) ?
        'UNSAVE' :
        'SAVE';
    cardElementSaveAction.fontWeight = 'bold';
    cardElementSaveAction.style.backgroundColor = 'orange';
    cardElementSaveAction.style.color = 'white';

    let saveBtnIcon = createSaveBtnIconElement(); // method call to create save icon element
    cardElementSaveAction.appendChild(saveBtnIcon); // append save icon to save/unsave action button

    setupClickEventListenerForSaveUnsaveButton(cardElementSaveAction, inputProduct, saveBtnIcon);
    cardElementActionItems.appendChild(cardElementSaveAction);

    return cardElementActionItems;
}

// Setup click event listener for save/unsave action button
function setupClickEventListenerForSaveUnsaveButton(inputSaveUnsaveBtnElement, inputProductData, inputSaveBtnIcon) {

    inputSaveUnsaveBtnElement.onclick = (clickEvent) => {

        let isSaved = isItemInLocalStorageCollection(COLLECTION_NAMES.SAVED_FOR_LATER, inputProductData.id);

        if (isSaved) {
            removeItemFromCollectionInLocalStorage(COLLECTION_NAMES.SAVED_FOR_LATER, inputProductData.id);
            inputSaveUnsaveBtnElement.textContent = 'SAVE';
        } else {
            addNewItemToCollectionInLocalStorage(COLLECTION_NAMES.SAVED_FOR_LATER, inputProductData.id, inputProductData);
            inputSaveUnsaveBtnElement.textContent = 'UNSAVE';
        }

        inputSaveUnsaveBtnElement.appendChild(inputSaveBtnIcon);

        // On-Demand Caching
        if ('caches' in window) {
            caches.open('saved-for-later')
                .then((cache) => {
                    if (isSaved) { // Already saved, so remove entry from 
                        // cache and localStorage, for this button click
                        let cacheRelatedData = {
                            cacheRef: cache,
                            resource: inputProductData.imageUrl
                        };

                        let snackbarRelatedData = {
                            message: `Removed "${inputProductData.name}" from saved collection`,
                            timeout: 3000,
                            actionHandlerData: {
                                undoActionMethodRef: addNewItemToCollectionInLocalStorage,
                                localStorageCollectionName: COLLECTION_NAMES.SAVED_FOR_LATER,
                                productId: inputProductData.id,
                                productData: inputProductData,
                                undoSuccessMsg: `Added "${inputProductData.name}" back to saved collection`,
                                undoFailureMsg: `Error adding "${inputProductData.name}" from saved collection`
                            },
                            actionLabel: 'UNDO'
                        };
                        cacheAddRemoveAndUndoWithSnackbar(false /* isAdd */ , cacheRelatedData, snackbarRelatedData);
                    } else { // Not saved, so add to localStorage and cache
                        let cacheRelatedData = {
                            cacheRef: cache,
                            resource: inputProductData.imageUrl
                        };

                        let snackbarRelatedData = {
                            message: `Saved "${inputProductData.name}" for later`,
                            timeout: 3000,
                            actionHandlerData: {
                                undoActionMethodRef: removeItemFromCollectionInLocalStorage,
                                localStorageCollectionName: COLLECTION_NAMES.SAVED_FOR_LATER,
                                productId: inputProductData.id,
                                productData: {},
                                undoSuccessMsg: `Removed "${inputProductData.name}" from saved collection`,
                                undoFailureMsg: `Error removing "${inputProductData.name}" from saved collection`
                            },
                            actionLabel: 'UNDO'
                        };
                        cacheAddRemoveAndUndoWithSnackbar(true /* isAdd */ , cacheRelatedData, snackbarRelatedData);
                    }
                });
        }

    };

}

// Function to setup click event handler for add to shopping cart button
function setupClickEventHandlerForShoppingCardAddButton(inputShoppingCartAddElement, inputProduct) {
    inputShoppingCartAddElement.onclick = (event) => {
        let productDataCopy = {};
        // console.log(`productDataCopy keys of ${product.name}: ${Object.keys(productDataCopy)}`);
        // console.log(`productDataCopy values of ${product.name}: ${Object.values(productDataCopy)}`);
        if (isItemInLocalStorageCollection(COLLECTION_NAMES.SHOPPING_CART, inputProduct.id)) {
            productDataCopy = getItemFromCollectionInLocalStorage(COLLECTION_NAMES.SHOPPING_CART, inputProduct.id);

            let updatedOrderedQuantityAsInt = productDataCopy.orderedQuantity + 1;
            productDataCopy.orderedQuantity = updatedOrderedQuantityAsInt;
            console.log(`Updated ordered quantity for ${productDataCopy.name}: ${productDataCopy.orderedQuantity}`);

        } else {
            productDataCopy = {...inputProduct, orderedQuantity: 1 };
        }

        // shoppingCartProducts.delete(product.id);
        addNewItemToCollectionInLocalStorage(COLLECTION_NAMES.SHOPPING_CART, inputProduct.id, productDataCopy);
        shoppingCartWithBadge.setAttribute('data-badge', `${getSizeOfCollectionInLocalStorage(COLLECTION_NAMES.SHOPPING_CART)}`);

        console.log('Shopping cart after product push: ');
        let updatedShoppingCartCollectionData = getCollectionFromLocalStorage(COLLECTION_NAMES.SHOPPING_CART);
        Object.values(updatedShoppingCartCollectionData)
            .forEach((prodData) => console.log(`${prodData['name']} `));

        // Fetch updated data from the shopping cart Map data stucture
        let updatedProductData = getItemFromCollectionInLocalStorage(COLLECTION_NAMES.SHOPPING_CART, inputProduct.id);

        runSnackbarCreateDisplayLogicForShoppingCartAddOperation(updatedProductData);

        // Show the app install banner here
        showAppInstallPrompt();
    };
}


// Function to create add to shopping cart button for product card menu
function createAddToShoppingCartButtonForProdCardMenu(inputProduct) {
    // Creating button for shopping cart add action
    let addToShoppingCartButton = document.createElement('button');
    addToShoppingCartButton.className = `mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect shopping-cart-icon-styling`;
    addToShoppingCartButton.title = 'Add to your cart';
    let shoppingCartIconElement = document.createElement('i');
    shoppingCartIconElement.className = 'material-icons';
    let shoppingCartIconElementText = document.createTextNode('add_shopping_cart');
    shoppingCartIconElement.appendChild(shoppingCartIconElementText);
    // componentHandler.upgradeElement(shoppingCartIconElement);
    addToShoppingCartButton.appendChild(shoppingCartIconElement);
    // componentHandler.upgradeElement(addToShoppingCartButton);
    setupClickEventHandlerForShoppingCardAddButton(addToShoppingCartButton, inputProduct);

    return addToShoppingCartButton;
}


// Function to setup click event handler for favorite button
function setupClickEventHandlerForFavoriteButton(inputFavoriteButtonElement, inputProductData) {
    inputFavoriteButtonElement.onclick = (event) => {

        // Toggle the current marked state of product's favorite button
        let currentProductStatusAsfavorite = isItemInLocalStorageCollection(COLLECTION_NAMES.FAVORITES, inputProductData.id);
        currentProductStatusAsfavorite ?
            removeItemFromCollectionInLocalStorage(COLLECTION_NAMES.FAVORITES, inputProductData.id) :
            addNewItemToCollectionInLocalStorage(COLLECTION_NAMES.FAVORITES, inputProductData.id, inputProductData);

        inputFavoriteButtonElement.querySelector('.material-icons').textContent = currentProductStatusAsfavorite ?
            'favorite_border' :
            'favorite';

        console.log('Favorites after product push: ');
        let currentFavoritesCollectionData = getCollectionFromLocalStorage(COLLECTION_NAMES.FAVORITES);
        Object.values(currentFavoritesCollectionData)
            .forEach((prodData) => console.log(`${prodData['name']}`));

        // Show snackbar
        runSnackbarCreateDisplayLogicForFavoriteMarkUnmarkOperation(inputProductData)
    };
}


// Function to create favorite button for product card menu,
// enabling a product to be marked/unmarked as a favorite for
// by the user.
function createFavoriteButtonForProductCardMenu(inputProductData) {
    // Creating button for marking product as a favorite
    let favoriteButton = document.createElement('button');
    favoriteButton.className = `mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect favorite-icon-styling`;
    favoriteButton.title = 'Mark as a favorite';

    let favoriteIconElement = document.createElement('i');
    favoriteIconElement.className = 'material-icons';

    let prodMarkedAsFavorite = isItemInLocalStorageCollection(COLLECTION_NAMES.FAVORITES, inputProductData.id);
    let iconText = prodMarkedAsFavorite ? 'favorite' : 'favorite_border';
    let favoriteIconElementText = document.createTextNode(iconText);
    favoriteIconElement.appendChild(favoriteIconElementText);
    favoriteButton.appendChild(favoriteIconElement);

    setupClickEventHandlerForFavoriteButton(favoriteButton, inputProductData);

    return favoriteButton;
}

// Function to create card menu with buttons to add products to shopping cart and,
// mark them as favorites
function createCardMenuWithShoppingCartFavoriteButtons(inputProduct) {
    let cardMenuElement = document.createElement('div');
    cardMenuElement.className = 'mdl-card__menu';

    // Creating button for shopping cart add action
    let shoppingCartButton = createAddToShoppingCartButtonForProdCardMenu(inputProduct);

    // Creating button for marking product as a favorite
    let favoriteButton = createFavoriteButtonForProductCardMenu(inputProduct);

    cardMenuElement.appendChild(shoppingCartButton);
    cardMenuElement.appendChild(favoriteButton);

    return cardMenuElement;
}