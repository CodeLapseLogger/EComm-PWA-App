// Method with logic to prepare data for snackbar display
function createSnackbarData(snackbarRelatedData, resourceData) {
    let data = {
        message: snackbarRelatedData.message,
        timeout: snackbarRelatedData.timeout,
        actionHandler: (actionBtnClickEvnt) => {

            let snackbarData = {};

            // let isSavedProdDeleted = prodsSavedForLater.delete(product.id);
            try {
                if (snackbarRelatedData.actionHandlerData.undoActionMethodRef === removeProductItemFromLocalStorageCollection) {
                    resourceData.cacheRef.delete(resourceData.resource);
                    snackbarRelatedData.actionHandlerData.undoActionMethodRef(snackbarRelatedData.actionHandlerData.localStorageCollectionName, snackbarRelatedData.actionHandlerData.productId);
                } else {
                    fetch(resourceData.resource)
                        .then((response) => {
                            resourceData.cacheRef.put(resourceData.resource, response)
                                .catch((err) => {
                                    console.log(err);
                                });
                        });
                    snackbarRelatedData.actionHandlerData.undoActionMethodRef(snackbarRelatedData.actionHandlerData.localStorageCollectionName, snackbarRelatedData.actionHandlerData.productId, snackbarRelatedData.actionHandlerData.productData);
                }

                snackbarData = {
                    message: snackbarRelatedData.actionHandlerData.undoSuccessMsg,
                    timeout: snackbarRelatedData.timeout
                };
            } catch (err) {
                snackbarData = {
                    message: snackbarRelatedData.actionHandlerData.undoFailureMsg,
                    timeout: snackbarRelatedData.timeout
                }
            } finally {
                snackbarContainer.MaterialSnackbar.showSnackbar(snackbarData);
            }
        },
        actionText: snackbarRelatedData.actionLabel
    };
    return data;
}

// Method with logic to add/remove a product related entries from cache and localStorage
// and accordingly display the success/failure message in a snackbar.
function cacheAddRemoveAndUndoWithSnackbar(isAdd, resourceDataPackage, snackbarDataPackage) {

    if (isAdd) {
        fetch(resourceDataPackage.resource)
            .then((response) => {
                resourceDataPackage.cacheRef.add(resourceDataPackage.resource)
                    .then(() => {
                        let snackbarContainer = document.querySelector('.mdl-snackbar');
                        let dataForSnackbar = createSnackbarData(snackbarDataPackage, resourceDataPackage);

                        snackbarContainer.MaterialSnackbar.showSnackbar(dataForSnackbar);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            });
    } else {
        resourceDataPackage.cacheRef.delete(resourceDataPackage.resource)
            .then(() => {
                let snackbarContainer = document.querySelector('.mdl-snackbar');
                let dataForSnackbar = createSnackbarData(snackbarDataPackage, resourceDataPackage);

                snackbarContainer.MaterialSnackbar.showSnackbar(dataForSnackbar);
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

// Function to run snackbar create and display logic for,
// shopping card add operation. The input product data is
// already updated with the appropriate action of add new 
// product to the cart of updating the quantity of existing
// cart item.
function runSnackbarCreateDisplayLogicForShoppingCartAddOperation(inputUpdatedProductData) {
    let snackbarContainer = document.querySelector('.mdl-snackbar');
    let data = {
        message: `'${inputUpdatedProductData.name}' added to the cart - Quantity : ${inputUpdatedProductData.orderedQuantity}`,
        timeout: 3000,
        actionHandler: (actionButtonClickEvent) => {
            let isProductPopped = removeItemFromCollectionInLocalStorage(COLLECTION_NAMES.SHOPPING_CART, inputUpdatedProductData.id);
            let poppedProductSnackbarData = {};

            if (isProductPopped) {
                shoppingCartWithBadge.setAttribute('data-badge', `${getSizeOfCollectionInLocalStorage(COLLECTION_NAMES.SHOPPING_CART)}`);

                poppedProductSnackbarData = {
                    message: `Removed item '${inputUpdatedProductData.name}' from the shopping cart !`,
                    timeout: 3000
                };
                console.log(`Popped item from the shopping cart: ${inputUpdatedProductData.name}`); // undo the add operation
            } else {
                poppedProductSnackbarData = {
                    message: `Error removing item '${inputUpdatedProductData.name}' from the shopping cart !`,
                    timeout: 3000
                };
            }

            snackbarContainer.MaterialSnackbar.showSnackbar(poppedProductSnackbarData);
        },
        actionText: 'Undo'
    };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
}

// Function to create and display snackbar with appropriate message
// upon clicking the favorite button on a product card.
function runSnackbarCreateDisplayLogicForFavoriteMarkUnmarkOperation(inputProductData) {
    let snackbarContainer = document.querySelector('.mdl-snackbar');
    let data = {
        message: `'${inputProductData.name}' has been added to favorites !`,
        timeout: 3000, // in milliseconds
        actionHandler: (actionButtonClickEvent) => {
            // Restore the toggled state
            currentProductStatusAsfavorite ?
                addNewItemToCollectionInLocalStorage(COLLECTION_NAMES.FAVORITES, inputProductData.id, inputProductData) :
                removeItemFromCollectionInLocalStorage(COLLECTION_NAMES.FAVORITES, inputProductData.id);

            favoriteButton.querySelector('.material-icons').textContent = currentProductStatusAsfavorite ?
                'favorite' :
                'favorite_border';

            let undoActionData = {};

            if (currentProductStatusAsfavorite) {
                console.log(`Added '${inputProductData.name}' to favorites !`);
                undoActionData = {
                    message: `Added '${inputProductData.name}' to favorites !`,
                    timeout: 3000
                }
            } else {
                console.log(`Removed '${inputProductData.name}' from favorites !`);
                undoActionData = {
                    message: `Removed '${inputProductData.name}' from favorites !`,
                    timeout: 3000
                }
            }

            snackbarContainer.MaterialSnackbar.showSnackbar(undoActionData);
        },
        actionText: 'Undo'
    };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
}