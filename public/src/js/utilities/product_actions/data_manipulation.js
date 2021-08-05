let productListContainer = document.querySelector("#product-showcase");
let productList = document.querySelector(".mdl-list");
console.log(`productList element: $productList`);

// Function to display content for empty product list
function checkForEmptyProductListAndDisplayCustomContent() {
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
}

// Function to display content for empty favorite list
function checkForEmptyFavoriteListAndDisplayCustomContent() {
    if (getSizeOfCollectionInLocalStorage(COLLECTION_NAMES.FAVORITES) === 0) {
        productList.display = 'none';
        let emptyProductCatalogMsgElement_1 = document.createElement('p');
        emptyProductCatalogMsgElement_1.innerHTML = 'No favorites !';
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

        let heartsClusterElement = document.createElement('div');
        heartsClusterElement.style.display = 'inline-block';
        heartsClusterElement.style.position = 'relative';
        heartsClusterElement.style.top = '1rem';

        let favoriteIconElement = document.createElement('i');
        favoriteIconElement.className = 'material-icons';
        favoriteIconElement.textContent = 'favorite';
        favoriteIconElement.style.fontSize = '5rem';
        favoriteIconElement.style.color = '#b48868';
        favoriteIconElement.style.position = 'relative';
        favoriteIconElement.style.left = '30%';


        let favoriteIconElement2 = document.createElement('i');
        favoriteIconElement2.className = 'material-icons';
        favoriteIconElement2.textContent = 'favorite';
        favoriteIconElement2.style.fontSize = '5rem';
        favoriteIconElement2.style.color = '#956745';
        favoriteIconElement2.style.position = 'relative';


        let favoriteIconElement3 = document.createElement('i');
        favoriteIconElement3.className = 'material-icons';
        favoriteIconElement3.textContent = 'favorite';
        favoriteIconElement3.style.fontSize = '5rem';
        favoriteIconElement3.style.color = '#75543d';
        favoriteIconElement3.style.position = 'relative';
        favoriteIconElement3.style.right = '30%';


        componentHandler.upgradeElement(favoriteIconElement);
        componentHandler.upgradeElement(favoriteIconElement2);
        componentHandler.upgradeElement(favoriteIconElement3);

        heartsClusterElement.appendChild(favoriteIconElement);
        heartsClusterElement.appendChild(favoriteIconElement2);
        heartsClusterElement.appendChild(favoriteIconElement3);

        productListContainer.appendChild(emptyProductCatalogMsgElement_1);
        productListContainer.appendChild(heartsClusterElement);
        productListContainer.appendChild(emptyProductCatalogMsgElement_2);

        // productListContainer.style.backgroundImage = 'url("/src/images/empty-store.jpg")';

    }
}

// Function to check for empty saved for later list and display custom
// content
function checkForEmptySavedForLaterListAndDisplayCustomContent() {
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
}

// Function to setup product list and generate cards with product data.
// The input argument is to have a check and exclude shopping cart and
// favorite buttons on the product card menu, if the list is for products
// saved by user for later reference, as a copy of data kept out of sync
// with active product listings.
function setupProductListAndPopulateProductData(inputCollectionName, isNotSavedProductList) {
    // Setup display attribute for product list
    if (productList.display === 'none') {
        productList.display = 'block';
    }

    // Fetch product data and populate the list with the same
    let currentProductCollectionData = getCollectionFromLocalStorage(inputCollectionName);
    for (let product of Object.values(currentProductCollectionData)) {
        // List item element inside unrodered list element (<ul>)
        let productListItem = document.createElement('li');
        // let productIdAsClass = 'p-' + product.id;
        productListItem.className = 'mdl-list__item';

        // Span element to hold the product card
        let cardSpanElement = document.createElement('span');
        cardSpanElement.className = 'mdl-list__item-primary-content';

        // Div element to be styled as an MDL (Material Design Lite) Card Component
        let cardElement = document.createElement('div');
        cardElement.className = 'mdl-card mdl-shadow--2dp product-card';

        // Div element cluster to create MDL Card Component
        let cardElementTitleAndPrice = createProductCardTitleAndPriceElement(product);

        // Append card title element to card component/element
        // componentHandler.upgradeElement(cardElementTitle);
        cardElement.appendChild(cardElementTitleAndPrice);

        // Div element to hold description/supporting text
        let cardElementDescription = createProductDescriptionElement(product);

        // componentHandler.upgradeElement(cardElementDescription);
        cardElement.appendChild(cardElementDescription);

        // Div element to hold action buttons
        let cardElementSaveUnsaveActions = createSaveUnsaveBtnElement(product);

        // componentHandler.upgradeElement(cardElementActions);
        cardElement.appendChild(cardElementSaveUnsaveActions);

        if (isNotSavedProductList) {
            // Div element for card menu, for the shopping cart and favorite icons
            let cardMenuElement = createCardMenuWithShoppingCartFavoriteButtons(product);

            // componentHandler.upgradeElement(cardMenuElement);
            cardElement.appendChild(cardMenuElement);
        }

        // componentHandler.upgradeElement(cardElement);
        cardSpanElement.appendChild(cardElement);
        // componentHandler.upgradeElement(cardSpanElement);
        productListItem.appendChild(cardSpanElement);

        // return productListItem;
        console.log(productListItem);
        componentHandler.upgradeElement(productListItem);
        productList.appendChild(productListItem);
    }

}