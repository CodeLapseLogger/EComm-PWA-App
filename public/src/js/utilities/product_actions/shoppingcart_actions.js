let shoppingCartWithBadge = document.querySelector('.shopping-cart-with-badge > .mdl-badge');
let shoppingCartList = document.querySelector('.mdl-menu');
let currentShoppingCartData; // To be populated with current cart item data upon click event

// Function to generate content for empty shopping cart 
function createContentForEmptyShoppingCart() {
    shoppingCartList.innerHTML = "";

    if (shoppingCartList.classList.contains('resize-non-empty-shopping-cart')) {
        shoppingCartList.classList.remove('resize-non-empty-shopping-cart');
    }

    shoppingCartList.classList.add('resize-empty-shopping-cart');

    let emptyCartMsgElement = document.createElement('li');
    emptyCartMsgElement.className = 'mdl-menu__item';
    emptyCartMsgElement.innerHTML = 'Your cart is empty ! <br> Care to chuck in some products 😃 👇';
    emptyCartMsgElement.style.backgroundColor = '#cbc0b8';
    // emptyCartMsgElement.style.opacity = '0.8';
    emptyCartMsgElement.style.color = 'rgb(168, 137, 91)';
    emptyCartMsgElement.style.fontSize = '1rem';
    emptyCartMsgElement.style.fontWeight = 'bold';
    emptyCartMsgElement.style.textAlign = 'center';
    emptyCartMsgElement.style.padding = '0.5rem 0.8rem ';
    emptyCartMsgElement.style.cursor = 'default';
    emptyCartMsgElement.style.flex = '1 0';
    emptyCartMsgElement.style.alignSelf = 'stretch';
    emptyCartMsgElement.style.lineHeight = '1.5rem';
    // emptyCartMsgElement.style.display = 'inline-block';
    // emptyCartMsgElement.style.display = 'inline-block';

    let emptyCartElement = document.createElement('li');
    emptyCartElement.className = 'mdl-menu__item';
    emptyCartElement.style.backgroundImage = 'url("/src/images/empty-cart.jpg")';
    emptyCartElement.style.backgroundColor = 'rgb(143, 116, 81)';
    emptyCartElement.style.backgroundPosition = 'center';
    emptyCartElement.style.backgroundRepeat = 'no-repeat';
    emptyCartElement.style.backgroundSize = 'cover';

    // emptyCartElement.style.width = '24.5rem'; // '95vw';
    // emptyCartElement.style.height = '30rem';
    emptyCartElement.style.cursor = 'default';
    emptyCartElement.style.flex = '7 0';
    emptyCartElement.style.alignSelf = 'flex-start';
    // emptyCartElement.style.display = 'inline-block';
    // emptyCartElement.style.display = 'inline-block';

    componentHandler.upgradeElement(emptyCartMsgElement);
    shoppingCartList.appendChild(emptyCartMsgElement);
    // let shpCartUnorderedList = document.querySelector('#shopping-cart-item-list > .mdl-list').cloneNode(true);
    // shoppingCartList.removeChild(shpCartUnorderedList);
    componentHandler.upgradeElement(emptyCartElement);
    shoppingCartList.appendChild(emptyCartElement);
    shoppingCartList.style.padding = '0';
    shoppingCartList.style.display = 'flex';
    shoppingCartList.style.overflow = 'initial';
    // shoppingCartList.style.overflow = 'initial';
}

// Function to style the non-empty shopping cart
function styleTheNonEmptyShoppingCart() {
    shoppingCartList.innerHTML = "";
    if (shoppingCartList.classList.contains('resize-empty-shopping-cart')) {
        shoppingCartList.classList.remove('resize-empty-shopping-cart');
    }

    shoppingCartList.classList.add('resize-non-empty-shopping-cart');
    shoppingCartList.style.padding = '0';
    shoppingCartList.style.display = 'flex';
    shoppingCartList.style.overflowX = 'scroll';
    shoppingCartList.style.overflowY = 'scroll';
}

// Function to populate shopping cart with data of items added by user
function populateShoppingCartWithItemData() {
    currentShoppingCartData = getCollectionFromLocalStorage(COLLECTION_NAMES.SHOPPING_CART);
    for (let shoppingCartItem of Object.values(currentShoppingCartData)) {
        let cartItemElement = document.createElement('li');
        cartItemElement.className = 'mdl-menu__item';
        cartItemElement.style.display = 'flex';
        cartItemElement.style.flexFlow = 'row wrap';

        // Div for ordered product title and price
        let cartItemTitleAndPriceElement = document.createElement('div');
        cartItemTitleAndPriceElement.className = 'title-and-price';
        cartItemTitleAndPriceElement.style.display = 'flex';
        cartItemTitleAndPriceElement.style.flexFlow = 'column wrap';
        cartItemTitleAndPriceElement.style.alignItems = 'stretch';
        cartItemTitleAndPriceElement.style.flex = '2 4 auto';
        cartItemTitleAndPriceElement.style.lineHeight = '1rem';

        let cartItemTitleSubElement = document.createElement('p');
        cartItemTitleSubElement.textContent = shoppingCartItem.name;

        let cartItemPriceSubElement = document.createElement('p');
        cartItemPriceSubElement.textContent = shoppingCartItem.price;

        componentHandler.upgradeElement(cartItemTitleSubElement);
        cartItemTitleAndPriceElement.appendChild(cartItemTitleSubElement);
        componentHandler.upgradeElement(cartItemPriceSubElement);
        cartItemTitleAndPriceElement.appendChild(cartItemPriceSubElement);

        componentHandler.upgradeElement(cartItemTitleAndPriceElement);
        cartItemElement.appendChild(cartItemTitleAndPriceElement);

        // Add the ordered item quantity
        let cartItemOrderedQuantity = document.createElement('div');
        let itemPriceAsString = shoppingCartItem.price.substring(1);
        console.log(`itemPriceAsString: ${itemPriceAsString}`);
        let itemPriceAsFloat = Number.parseFloat(itemPriceAsString);
        console.log(`itemPriceAsFloat: ${itemPriceAsFloat}`);
        cartItemOrderedQuantity.textContent = ` x ${shoppingCartItem.orderedQuantity} = $${shoppingCartItem.orderedQuantity * itemPriceAsFloat}`;
        cartItemOrderedQuantity.style.flex = '4 1 1.5rem';

        componentHandler.upgradeElement(cartItemOrderedQuantity);
        cartItemElement.appendChild(cartItemOrderedQuantity);

        // Add the delete icon button
        let deleteItemIconButton = document.createElement('button');
        deleteItemIconButton.className = 'mdl-button mdl-js-button mdl-button--icon';
        deleteItemIconButton.style.flex = '1 1 auto';

        let deleteIconElement = document.createElement('i');
        deleteIconElement.className = 'material-icons';
        deleteIconElement.textContent = 'delete';

        // Implement the click event handler for delete button.*************
        deleteItemIconButton.onclick = (event) => {

            // event.preventDefault();

            // Div for delete spinner text and spinner elements
            // let cartItemDeleteTextAndSpinnerElement = document.createElement('div');
            // cartItemDeleteTextAndSpinnerElement.className = 'spinner-and-text';
            // cartItemDeleteTextAndSpinnerElement.style.flexFlow = 'column wrap';
            // cartItemDeleteTextAndSpinnerElement.style.display = 'flex';
            // cartItemDeleteTextAndSpinnerElement.style.alignItems = 'stretch';
            // cartItemDeleteTextAndSpinnerElement.style.flex = '2 4 auto';
            // cartItemDeleteTextAndSpinnerElement.style.lineHeight = '1rem';

            // deleteItemIconButton.classList.add('hide-element');
            // let deleteItemText = document.createElement('p');
            // deleteItemText.textContent = 'Deleting...';
            // let deleteSpinnerElement = document.createElement('div');
            // deleteSpinnerElement.className = 'mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active';

            // cartItemDeleteTextAndSpinnerElement.appendChild(deleteItemText);
            // cartItemDeleteTextAndSpinnerElement.appendChild(deleteSpinnerElement);

            // cartItemElement.appendChild(cartItemDeleteTextAndSpinnerElement);

            removeItemFromCollectionInLocalStorage(COLLECTION_NAMES.SHOPPING_CART, shoppingCartItem.id);
            currentShoppingCartData = getCollectionFromLocalStorage(COLLECTION_NAMES.SHOPPING_CART);
            shoppingCartWithBadge.setAttribute('data-badge', `${getSizeOfCollectionInLocalStorage(COLLECTION_NAMES.SHOPPING_CART)}`);
            runSnackbarCreateDisplayLogicForShoppingCartAddRemoveOperations(shoppingCartItem, false /* isAdd */ );
            // cartItemElement.classList.add('hide-element'); // Hide element, representing the delete in the
            // UI.


            // Code to re-calculate total cost and display appropriate loading elements.
            // let totalCostElement = document.querySelector('.total-cart-item-cost');
            // let tokenizedTotalCostContentArr = totalCostElement.textContent.split(' ');
            // let totalCostString = tokenizedTotalCostContentArr[1]; // includes the '$' symbol in the string
            // let currentTotalCostAsString = totalCostString.substring(1);
            // let currentTotalCostAsNumber = Number.parseFloat(currentTotalCostAsString);

            // totalCostElement.textContent = 'Total: ';

            // Div for total cost re-calculation spinner text and spinner elements
            // let totalCostRecalculationTextAndSpinnerElement = document.createElement('div');
            // totalCostRecalculationTextAndSpinnerElement.className = 'spinner-and-text';
            // totalCostRecalculationTextAndSpinnerElement.style.flexFlow = 'column wrap';
            // totalCostRecalculationTextAndSpinnerElement.style.display = 'flex';
            // totalCostRecalculationTextAndSpinnerElement.style.alignItems = 'stretch';
            // totalCostRecalculationTextAndSpinnerElement.style.flex = '2 4 auto';
            // totalCostRecalculationTextAndSpinnerElement.style.lineHeight = '1rem';

            // let costRecalculateItemText = document.createElement('p');
            // costRecalculateItemText.textContent = 'Re-calculating...';
            // let costRecalculateSpinnerElement = document.createElement('div');
            // costRecalculateSpinnerElement.className = 'mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active';

            // totalCostRecalculationTextAndSpinnerElement.appendChild(deleteItemText);
            // totalCostRecalculationTextAndSpinnerElement.appendChild(deleteSpinnerElement);

            // totalCostElement.appendChild(totalCostRecalculationTextAndSpinnerElement);

            // Code to re-compute the total cart cost and refresh the UI content
            // let recalculatedTotalCost = recalculateTotalCartPrice(
            //     currentTotalCostAsNumber,
            /* isCartItemRemove */
            // true,
            // shoppingCartItem);

            // let recalculatedTotalCostAsString = recalculatedTotalCost.toFixed(2);
            // let updatedTotalCostString = 'Total: $' + recalculatedTotalCostAsString;

            // totalCostElement.textContent = updatedTotalCostString;


        }

        componentHandler.upgradeElement(deleteIconElement);
        deleteItemIconButton.appendChild(deleteIconElement);
        componentHandler.upgradeElement(deleteItemIconButton);
        cartItemElement.appendChild(deleteItemIconButton);

        componentHandler.upgradeElement(cartItemElement);
        shoppingCartList.appendChild(cartItemElement);
    }
}

// Function to re-calculate total cart price
function recalculateTotalCartPrice(inputTotalCartPrice /* Number */ , isCartItemRemove /* Boolean */ , inputCartItemData /* Object */ ) {

    let priceComponentOfInputCartItem = computeProductPriceComponent(inputCartItemData);
    let recalculatedCartPrice;

    if (isCartItemRemove) {
        recalculatedCartPrice = inputTotalCartPrice - priceComponentOfInputCartItem;
    } else { // is a cart add operation (not implemented yet from the cart menu)
        recalculatedCartPrice = inputTotalCartPrice + priceComponentOfInputCartItem;
    }

    return recalculatedCartPrice;
}

// Function to compute price component from input product data
function computeProductPriceComponent(inputProductData) {

    let extractedProductPrice = inputProductData.price.substring(1);
    let productPriceAsFloat = Number.parseFloat(extractedProductPrice);
    return (productPriceAsFloat * inputProductData.orderedQuantity);

}

// Function to compute the total cost of current items in cart,
// and add it to the shopping cart as another component.
function computeAndAppendTotalCartCostComponentToShoppingCart() {
    let totalCartItemCostElement = document.createElement('li');
    totalCartItemCostElement.className = 'mdl-menu__item';
    let totalCostTextContentElement = document.createElement('p');
    totalCostTextContentElement.className = 'total-cart-item-cost';
    let totalCost = 0.00;

    Object.values(currentShoppingCartData).forEach((prodData) => {
        totalCost += computeProductPriceComponent(prodData);
    });

    totalCostTextContentElement.textContent = `Total : $${totalCost}`;

    componentHandler.upgradeElement(totalCostTextContentElement);
    totalCartItemCostElement.appendChild(totalCostTextContentElement);
    componentHandler.upgradeElement(totalCartItemCostElement);
    shoppingCartList.appendChild(totalCartItemCostElement);
}

// Function to generate the shopping cart checkout button component,
// and add it to the shopping cart component list.
function generateAndAppendCheckoutBtnToShoppingCart() {
    let checkoutBtn = document.createElement('button');
    checkoutBtn.className = 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent';
    checkoutBtn.textContent = 'Checkout';
    let rightArrowIconElement = document.createElement('i');
    rightArrowIconElement.className = 'material-icons';
    rightArrowIconElement.textContent = 'navigate_next';

    componentHandler.upgradeElement(rightArrowIconElement);
    checkoutBtn.appendChild(rightArrowIconElement);

    componentHandler.upgradeElement(checkoutBtn);
    shoppingCartList.appendChild(checkoutBtn);
}

// Function to setup current shopping cart state and click event listener,
// which can prepare its content for display.
function setupShoppingCartStateAndClickEventListener() {
    let currentShoppingCartSize = getSizeOfCollectionInLocalStorage(COLLECTION_NAMES.SHOPPING_CART);

    shoppingCartWithBadge.setAttribute('data-badge', `${currentShoppingCartSize}`);
    shoppingCartWithBadge.onclick = (event) => {
        console.log(`Shopping cart event: cart length - ${currentShoppingCartSize}`);
        if (currentShoppingCartSize === 0) {
            createContentForEmptyShoppingCart();
        } else {
            styleTheNonEmptyShoppingCart();
            populateShoppingCartWithItemData();
            computeAndAppendTotalCartCostComponentToShoppingCart();
            generateAndAppendCheckoutBtnToShoppingCart();
        }
    };
}