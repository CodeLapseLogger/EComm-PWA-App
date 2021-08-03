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