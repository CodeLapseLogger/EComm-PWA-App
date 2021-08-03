let headerTitle = document.querySelector('.mdl-layout__header .mdl-layout-title');
let shoppingCartBadge = document.querySelector('.mdl-badge');
let shoppingCartList = document.querySelector('.mdl-menu');

let productImageElement = document.querySelector('.product-image');
let productTitleElement = document.querySelector('.product-title');
let productPriceElement = document.querySelector('.product-price');
let productDescriptionElement = document.querySelector('.product-description');
let productActionBtnCollection = document.querySelector('.action-btn-collection');

let shoppingCartButtonElement = document.querySelector('#shopping-cart-btn');
let favoriteButtonElement = document.querySelector('#favorite-btn');
let favoriteIconElement = document.querySelector('#favorite-btn > i');
let editButtonElement = document.querySelector('#edit-btn');
let deleteButtonElement = document.querySelector('#delete-btn');

let elementListToHideUnhide = [
    productImageElement,
    productTitleElement,
    productPriceElement,
    productDescriptionElement,
    productActionBtnCollection
];

window.onload = (event) => {

    // Launch loading spinner upon page load
    // and hide/stop it after 1 second. 
    launchLoadingSpinner(elementListToHideUnhide);
    let stopLoadSpinnerWrapper = () => { // For setTimeout argument
        stopLoadingSpinner(elementListToHideUnhide);
    }
    setTimeout(stopLoadSpinnerWrapper, 1000);

    console.log(`current url: ${window.location.href}`)
    let currentUrl = new URL(window.location.href);

    // Get rid of the '/' before the query string in the url
    let splitSubStrArr = currentUrl.pathname.split('/');
    console.log(`pathname: ${currentUrl.pathname}`);
    console.log(`splitSubStrArr: ${splitSubStrArr}`);
    if (splitSubStrArr[splitSubStrArr.length - 1] === '') {
        currentUrl.href.replace(splitSubStrArr[splitSubStrArr.length - 2] + '/', splitSubStrArr[splitSubStrArr.length - 2]);
    }

    // Set the shopping cart state
    let currentShoppingCartSize = getSizeOfCollectionInLocalStorage(COLLECTION_NAMES.SHOPPING_CART);

    shoppingCartBadge.setAttribute('data-badge', `${currentShoppingCartSize}`);
    shoppingCartBadge.onclick = (event) => {
        console.log(`Shopping cart event: cart length - ${currentShoppingCartSize}`);
        if (currentShoppingCartSize === 0) {
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
        } else {
            shoppingCartList.innerHTML = "";
            if (shoppingCartList.classList.contains('resize-empty-shopping-cart')) {
                shoppingCartList.classList.remove('resize-empty-shopping-cart');
            }

            shoppingCartList.classList.add('resize-non-empty-shopping-cart');
            shoppingCartList.style.padding = '0';
            shoppingCartList.style.display = 'flex';
            shoppingCartList.style.overflowX = 'scroll';
            shoppingCartList.style.overflowY = 'scroll';

            let currentShoppingCartData = getCollectionFromLocalStorage(COLLECTION_NAMES.SHOPPING_CART);

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

                componentHandler.upgradeElement(deleteIconElement);
                deleteItemIconButton.appendChild(deleteIconElement);
                componentHandler.upgradeElement(deleteItemIconButton);
                cartItemElement.appendChild(deleteItemIconButton);

                componentHandler.upgradeElement(cartItemElement);
                shoppingCartList.appendChild(cartItemElement);
            }


            let totalCartItemCostElement = document.createElement('li');
            totalCartItemCostElement.className = 'mdl-menu__item';
            let totalCostTextContentElement = document.createElement('p');
            totalCostTextContentElement.className = 'total-cart-item-cost';
            let totalCost = 0.00;

            Object.values(currentShoppingCartData).forEach((prodData) => {
                let prodPriceAsString = prodData.price.substring(1);
                let prodPriceAsInt = Number.parseFloat(prodPriceAsString);

                let orderedProductQuantity = prodData.orderedQuantity;

                totalCost += (prodPriceAsInt * orderedProductQuantity);
            });

            totalCostTextContentElement.textContent = `Total : $${totalCost}`;

            componentHandler.upgradeElement(totalCostTextContentElement);
            totalCartItemCostElement.appendChild(totalCostTextContentElement);
            componentHandler.upgradeElement(totalCartItemCostElement);
            shoppingCartList.appendChild(totalCartItemCostElement);

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
    };


    // Get the product id from the current page URL search params
    let productId = currentUrl.searchParams.get('id');
    console.log(`productId: ${productId}`);

    let productData = getItemFromCollectionInLocalStorage(COLLECTION_NAMES.PRODUCTS, productId);

    productImageElement.setAttribute('src', productData.imageUrl);
    productTitleElement.textContent = productData.name;
    headerTitle.textContent = productData.name.length > 15 ?
        productData.name.substring(0, 15) + '...' :
        productData.name;
    productPriceElement.textContent = productData.price;
    productDescriptionElement.textContent = productData.description;

    favoriteIconElement.textContent = isItemInLocalStorageCollection(COLLECTION_NAMES.FAVORITES, productId) ?
        'favorite' :
        'favorite_border';

    shoppingCartButtonElement.onclick = (event) => {
        console.log('[ Product Detail Page ] Clicked on Shopping Cart Button !');
    };

    favoriteButtonElement.onclick = (event) => {
        console.log('[ Product Detail Page ] Clicked on Favorite Button !');
    };

    editButtonElement.onclick = (event) => {
        console.log('[ Product Detail Page ] Clicked on Edit Button !');
    };

    deleteButtonElement.onclick = (event) => {
        console.log('[ Product Detail Page ] Clicked on Delete Button !');
    };


}