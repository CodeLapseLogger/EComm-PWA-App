let productListContainer = document.querySelector("#product-showcase");
let productList = document.querySelector(".mdl-list");
console.log(`productList element: $productList`);

function isFavorite(productEntry) {
    return isItemInLocalStorageCollection(COLLECTION_NAMES.FAVORITES, productEntry.id);
}

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
        window.location.href = '/new_product';
    };

    // For shopping cart button icon at the top right,
    // on the page/screen header.
    setupShoppingCartStateAndClickEventListener();

    if (productList.display === 'none') {
        productList.display = 'block';
    }

    let currentProductCollectionData = getCollectionFromLocalStorage(COLLECTION_NAMES.PRODUCTS);
    for (let product of Object.values(currentProductCollectionData)) {
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

        // Div element to hold action buttons
        let cardElementActions = document.createElement('div');
        cardElementActions.className = 'mdl-card__actions mdl-card--border';
        let cardElementSaveAction = document.createElement('a');
        cardElementSaveAction.title = 'Save for offline access';
        cardElementSaveAction.className = 'mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect';
        cardElementSaveAction.textContent = isItemInLocalStorageCollection(COLLECTION_NAMES.SAVED_FOR_LATER, product.id) ?
            'UNSAVE' :
            'SAVE';
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

        /* CLICK EVENT HANDLER FOR THE SAVE BUTTON */
        cardElementSaveAction.onclick = (clickEvent) => {

            let isSaved = isItemInLocalStorageCollection(COLLECTION_NAMES.SAVED_FOR_LATER, product.id);

            if (isSaved) {
                removeItemFromCollectionInLocalStorage(COLLECTION_NAMES.SAVED_FOR_LATER, product.id);
                cardElementSaveAction.textContent = 'SAVE';
            } else {
                addNewItemToCollectionInLocalStorage(COLLECTION_NAMES.SAVED_FOR_LATER, product.id, product);
                cardElementSaveAction.textContent = 'UNSAVE';
            }

            cardElementSaveAction.appendChild(saveBtnIcon);

            // On-Demand Caching
            if ('caches' in window) {
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
                    });
            }

        };

        // componentHandler.upgradeElement(cardElementSaveAction);
        cardElementActions.appendChild(cardElementSaveAction);


        // componentHandler.upgradeElement(cardElementActions);
        cardElement.appendChild(cardElementActions);

        // Div element for card menu, for the shopping cart and favorite icons
        let cardMenuElement = document.createElement('div');
        cardMenuElement.className = 'mdl-card__menu';
        // Creating button for shopping cart add action
        let shoppingCartButton = document.createElement('button');
        shoppingCartButton.className = `mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect shopping-cart-icon-styling`;
        shoppingCartButton.title = 'Add to your cart';
        let shoppingCartIconElement = document.createElement('i');
        shoppingCartIconElement.className = 'material-icons';
        let shoppingCartIconElementText = document.createTextNode('add_shopping_cart');
        shoppingCartIconElement.appendChild(shoppingCartIconElementText);
        // componentHandler.upgradeElement(shoppingCartIconElement);
        shoppingCartButton.appendChild(shoppingCartIconElement);
        // componentHandler.upgradeElement(shoppingCartButton);
        shoppingCartButton.onclick = (event) => {
            let productDataCopy = {};
            // console.log(`productDataCopy keys of ${product.name}: ${Object.keys(productDataCopy)}`);
            // console.log(`productDataCopy values of ${product.name}: ${Object.values(productDataCopy)}`);
            if (isItemInLocalStorageCollection(COLLECTION_NAMES.SHOPPING_CART, product.id)) {
                productDataCopy = getItemFromCollectionInLocalStorage(COLLECTION_NAMES.SHOPPING_CART, product.id);

                let updatedOrderedQuantityAsInt = productDataCopy.orderedQuantity + 1;
                productDataCopy.orderedQuantity = updatedOrderedQuantityAsInt;
                console.log(`Updated ordered quantity for ${productDataCopy.name}: ${productDataCopy.orderedQuantity}`);

            } else {
                productDataCopy = {...product, orderedQuantity: 1 };
            }

            // shoppingCartProducts.delete(product.id);
            addNewItemToCollectionInLocalStorage(COLLECTION_NAMES.SHOPPING_CART, product.id, productDataCopy);
            shoppingCartWithBadge.setAttribute('data-badge', `${getSizeOfCollectionInLocalStorage(COLLECTION_NAMES.SHOPPING_CART)}`);

            console.log('Shopping cart after product push: ');
            let updatedShoppingCartCollectionData = getCollectionFromLocalStorage(COLLECTION_NAMES.SHOPPING_CART);
            Object.values(updatedShoppingCartCollectionData)
                .forEach((prodData) => console.log(`${prodData['name']} `));

            // Fetch updated data from the shopping cart Map data stucture
            let updatedProductData = getItemFromCollectionInLocalStorage(COLLECTION_NAMES.SHOPPING_CART, product.id);

            let snackbarContainer = document.querySelector('.mdl-snackbar');
            let data = {
                message: `'${updatedProductData.name}' added to the cart - Quantity : ${updatedProductData.orderedQuantity}`,
                timeout: 3000,
                actionHandler: (actionButtonClickEvent) => {
                    let isProductPopped = removeItemFromCollectionInLocalStorage(COLLECTION_NAMES.SHOPPING_CART, updatedProductData.id);
                    let poppedProductSnackbarData = {};

                    if (isProductPopped) {
                        shoppingCartWithBadge.setAttribute('data-badge', `${getSizeOfCollectionInLocalStorage(COLLECTION_NAMES.SHOPPING_CART)}`);

                        poppedProductSnackbarData = {
                            message: `Removed item '${updatedProductData.name}' from the shopping cart !`,
                            timeout: 3000
                        };
                        console.log(`Popped item from the shopping cart: ${updatedProductData.name}`); // undo the add operation
                    } else {
                        poppedProductSnackbarData = {
                            message: `Error removing item '${updatedProductData.name}' from the shopping cart !`,
                            timeout: 3000
                        };
                    }

                    snackbarContainer.MaterialSnackbar.showSnackbar(poppedProductSnackbarData);
                },
                actionText: 'Undo'
            };
            snackbarContainer.MaterialSnackbar.showSnackbar(data);

            // Show the app install banner here
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
        };

        // Creating button for marking product as a favorite
        let favoriteButton = document.createElement('button');
        favoriteButton.className = `mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect favorite-icon-styling`;
        favoriteButton.title = 'Mark as a favorite';

        let favoriteIconElement = document.createElement('i');
        favoriteIconElement.className = 'material-icons';

        let prodMarkedAsFavorite = isFavorite(product);
        let iconText = prodMarkedAsFavorite ? 'favorite' : 'favorite_border';
        let favoriteIconElementText = document.createTextNode(iconText);
        favoriteIconElement.appendChild(favoriteIconElementText);
        favoriteButton.appendChild(favoriteIconElement);

        favoriteButton.onclick = (event) => {

            // Toggle the current marked state of product's favorite button
            let currentProductStatusAsfavorite = isFavorite(product);
            currentProductStatusAsfavorite ?
                removeItemFromCollectionInLocalStorage(COLLECTION_NAMES.FAVORITES, product.id) :
                addNewItemToCollectionInLocalStorage(COLLECTION_NAMES.FAVORITES, product.id, product);

            favoriteButton.querySelector('.material-icons').textContent = currentProductStatusAsfavorite ?
                'favorite_border' :
                'favorite';

            console.log('Favorites after product push: ');
            let currentFavoritesCollectionData = getCollectionFromLocalStorage(COLLECTION_NAMES.FAVORITES);
            Object.values(currentFavoritesCollectionData)
                .forEach((prodData) => console.log(`${prodData['name']}`));

            // Show snackbar
            let snackbarContainer = document.querySelector('.mdl-snackbar');
            let data = {
                message: `'${product.name}' has been added to favorites !`,
                timeout: 3000, // in milliseconds
                actionHandler: (actionButtonClickEvent) => {
                    // Restore the toggled state
                    currentProductStatusAsfavorite ?
                        addNewItemToCollectionInLocalStorage(COLLECTION_NAMES.FAVORITES, product.id, product) :
                        removeItemFromCollectionInLocalStorage(COLLECTION_NAMES.FAVORITES, product.id);

                    favoriteButton.querySelector('.material-icons').textContent = currentProductStatusAsfavorite ?
                        'favorite' :
                        'favorite_border';

                    let undoActionData = {};

                    if (currentProductStatusAsfavorite) {
                        console.log(`Added '${product.name}' to favorites !`);
                        undoActionData = {
                            message: `Added '${poppedProduct.name}' to favorites !`,
                            timeout: 3000
                        }
                    } else {
                        console.log(`Removed '${product.name}' from favorites !`);
                        undoActionData = {
                            message: `Removed '${poppedProduct.name}' from favorites !`,
                            timeout: 3000
                        }
                    }

                    snackbarContainer.MaterialSnackbar.showSnackbar(undoActionData);
                },
                actionText: 'Undo'
            };
            snackbarContainer.MaterialSnackbar.showSnackbar(data);
        };

        cardMenuElement.appendChild(shoppingCartButton);
        cardMenuElement.appendChild(favoriteButton);

        // componentHandler.upgradeElement(cardMenuElement);
        cardElement.appendChild(cardMenuElement);

        // componentHandler.upgradeElement(cardElement);
        cardSpanElement.appendChild(cardElement);
        // componentHandler.upgradeElement(cardSpanElement);
        productListItem.appendChild(cardSpanElement);

        // return productListItem;
        console.log(productListItem);
        componentHandler.upgradeElement(productListItem);
        productList.appendChild(productListItem);
    }

    if (getSizeOfCollectionInLocalStorage(COLLECTION_NAMES.PRODUCTS) === 0) {
        productList.display = 'none';

        let emptyProductCatalogMsgElement = document.createElement('p');
        emptyProductCatalogMsgElement.innerHTML = 'No products !</br> \
                                                   Use <i class="material-icons circle-border-with-background">add</i> button to add.';
        emptyProductCatalogMsgElement.classList.add('empty-msg-style', 'empty-store-msg-position');
        emptyProductCatalogMsgElement.style.background = 'grey';
        emptyProductCatalogMsgElement.style.opacity = '90%';
        emptyProductCatalogMsgElement.style.position = 'relative';
        emptyProductCatalogMsgElement.style.top = '7rem';
        emptyProductCatalogMsgElement.style.maxWidth = '40rem';
        emptyProductCatalogMsgElement.style.margin = '0 auto';
        emptyProductCatalogMsgElement.style.borderColor = 'grey';

        productListContainer.style.minHeight = '25rem';
        productListContainer.style.height = '30rem';
        productListContainer.style.maxHeight = '60rem';
        productListContainer.appendChild(emptyProductCatalogMsgElement);
        productListContainer.style.backgroundImage = 'url("/src/images/empty-store.jpg")';
        productListContainer.style.backgroundPosition = 'center';
        productListContainer.style.backgroundRepeat = 'no-repeat';
        productListContainer.style.backgroundSize = 'cover';

    }
};