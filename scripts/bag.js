const CONVENIENCE_FEES = 99;
let bagItemObjects;
onLoad();

function onLoad() {
    loadBagItemsObjects();
    displayBagItems();
    displayBagSummary();
}

function displayBagSummary(){
    let bagSummaryElement = document.querySelector('.bag-summary');
    let totalItems = bagItemObjects.length;
    let totalMRP = 0;
    let totalDiscount = 0;

    bagItemObjects.forEach(bagItem => {
        totalMRP += bagItem.original_price;
        totalDiscount += bagItem.original_price - bagItem.current_price;
    });

    let finalPayment = totalMRP - totalDiscount + CONVENIENCE_FEES ;

    bagSummaryElement.innerHTML = `<div class="bag-details-container">
                    <div class="price-header">PRICE DETAILS (${totalItems} Items) </div>
                    <div class="price-item">
                      <span class="price-item-tag">Total MRP</span>
                      <span class="price-item-value">₹${totalMRP}</span>
                    </div>
                    <div class="price-item">
                      <span class="price-item-tag">Discount on MRP</span>
                      <span class="price-item-value priceDetail-base-discount">-₹${totalDiscount}</span>
                    </div>
                    <div class="price-item">
                      <span class="price-item-tag">Convenience Fee</span>
                      <span class="price-item-value">₹99</span>
                    </div>
                    <hr>
                    <div class="price-footer">
                      <span class="price-item-tag">Total Amount</span>
                      <span class="price-item-value">₹${finalPayment}</span>
                    </div>
                </div>
                <button class="btn-place-order">
                    <div class="css-xjhrni">PLACE ORDER</div>
                </button>`;
}

function loadBagItemsObjects(){
    bagItemObjects = bagItems.map(itemid => {
        for (let i = 0; i < items.length; i++) {
            if (itemid == items[i].id){
                return items[i];
            }
            
        }
    });
    console.log(bagItemObjects);
}

function displayBagItems(){
    let containerElement = document.querySelector('.bag-items-container');
    let innerHtml = '';
    bagItemObjects.forEach(bagItems => {
        innerHtml += generateItemHtml(bagItems);
    });
    containerElement.innerHTML = innerHtml;
}

function removeFromBag(itemId){
    bagItems = bagItems.filter(bagItemId => bagItemId != itemId);
    localStorage.setItem('bagItems', JSON.stringify(bagItems));
    loadBagItemsObjects();
    displayBagIcon();
    displayBagItems();
    displayBagSummary();
}

function generateItemHtml(item){
    return  `<div class="bag-item-container">
                <div class="item-left-part">
                    <img class="bag-item-img" src="${item.image}">
                </div>
                <div class="item-right-part">
                    <div class="company-name">${item.company}</div>
                    <div class="item-name">${item.item_name}</div>
                    <div class="seller-name">Sold by: ${item.seller}</div>
                    <div class="price-container">
                        <span class="current-price">₹${item.current_price}</span>
                        <span class="original-price">₹${item.original_price}</span>
                        <span class="discount">(${item.discount_percentage}% OFF)</span>
                    </div>
                    <div class="return-period">
                        <svg class="symbol" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.63639 6.99013C6.84386 7.1976 6.84386 7.53397 6.63639 7.74143L5.7725 8.60533H8.27232C9.21251 8.60533 9.97949 7.84333 9.97949 6.89824C9.97949 5.95914 9.21859 5.19824 8.27949 5.19824H6.89116C6.59776 5.19824 6.35991 4.96039 6.35991 4.66699C6.35991 4.37359 6.59776 4.13574 6.89116 4.13574H8.27949C9.80539 4.13574 11.042 5.37234 11.042 6.89824C11.042 8.43232 9.79722 9.66783 8.27241 9.66783H5.77242L6.63639 10.5318C6.84386 10.7393 6.84386 11.0756 6.63639 11.2831C6.42893 11.4906 6.09256 11.4906 5.88509 11.2831L4.11426 9.51227C4.0417 9.43971 3.99452 9.35138 3.97271 9.25831C3.96352 9.21922 3.95866 9.17846 3.95866 9.13658C3.95866 9.05996 3.97488 8.98713 4.00407 8.92134C4.02519 8.87367 4.05366 8.82847 4.08949 8.78745C4.09828 8.77738 4.10745 8.76764 4.11697 8.75826L5.88509 6.99013C6.09256 6.78267 6.42893 6.78267 6.63639 6.99013Z" fill="#282C3F"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M0.416992 7.50033C0.416992 3.58831 3.58831 0.416992 7.50033 0.416992C11.4123 0.416992 14.5837 3.58831 14.5837 7.50033C14.5837 11.4123 11.4123 14.5837 7.50033 14.5837C3.58831 14.5837 0.416992 11.4123 0.416992 7.50033ZM7.50033 1.47949C4.17511 1.47949 1.47949 4.17511 1.47949 7.50033C1.47949 10.8255 4.17511 13.5212 7.50033 13.5212C10.8255 13.5212 13.5212 10.8255 13.5212 7.50033C13.5212 4.17511 10.8255 1.47949 7.50033 1.47949Z" fill="#282C3F"></path></svg>
                        <span class="return-period-days">${item.return_period} days</span> return available
                    </div>
                    <div class="delivery-details">
                        Delivery by
                        <span class="delivery-details-days">${item.delivery_date}</span>
                    </div>
                </div>
                <svg class="remove-from-cart" onclick="removeFromBag(${item.id})" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" class="itemContainer-base-closeIcon"><path fill="#000" fill-rule="evenodd" d="M9.031 8l6.756-6.756a.731.731 0 0 0 0-1.031.732.732 0 0 0-1.031 0L8 6.969 1.244.213a.732.732 0 0 0-1.031 0 .731.731 0 0 0 0 1.03L6.969 8 .213 14.756a.731.731 0 0 0 0 1.031.732.732 0 0 0 1.031 0L8 9.031l6.756 6.756a.732.732 0 0 0 1.031 0 .731.731 0 0 0 0-1.03L9.031 8z"></path></svg>
            </div>`
}