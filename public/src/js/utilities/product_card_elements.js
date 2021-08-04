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