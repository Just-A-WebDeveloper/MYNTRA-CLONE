let bagItems;
onLoad();

function onLoad(){
    let bagItemsStr = localStorage.getItem('bagItems');
    bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
    displayItemsOnHomePage();
    displayBagIcon();
}

function addToBag(itemId){
    bagItems.push(itemId);
    localStorage.setItem('bagItems', JSON.stringify(bagItems));
    displayBagIcon();
}

function displayBagIcon(){
    let bagItemCountElement = document.querySelector('.bag-item-count');
    if (bagItems.length > 0) {
        bagItemCountElement.style.visibility = 'visible';
        bagItemCountElement.innerText = bagItems.length;
    } else{
        bagItemCountElement.style.visibility = 'hidden';
    }
}

function displayItemsOnHomePage(){
    let itemsContainerElement = document.querySelector('.items-container');
if (!itemsContainerElement) {
    return;
}
let innerHtml = '';
items.forEach(item =>{

    innerHtml += `
<div class="item-container">
    <img class="item-img" src="${item.image}" alt="">
    <div class="rating">${item.rating.stars} ⭐ | ${item.rating.count}</div>
    <div class="about-item">
        <div class="company-name">${item.company}</div>
        <div class="item-name">${item.item_name}</div>
        <div class="price">
            <span class="current-price">₹${item.current_price}</span>
            <span class="original-price">MRP ₹${item.original_price}</span>
            <span class="discount">(${item.discount_percentage}% OFF)</span>
        </div>
    </div>
    <button class="btn-add-bag" onclick="addToBag(${item.id})">Add to Bag</button>
</div>`
})

itemsContainerElement.innerHTML = innerHtml;
}

let displayCategoryElement = document.querySelector('.show-on-hover');
function displayCategoryElements(){
displayCategoryElement.innerHTML = `
<div class="display-category-conatiner">
    <div class="first-section-items">
        <div class="heading">Topwear</div>
        <div class="links">T-Shirts</div>
        <div class="links">Casual Shirts</div>
        <div class="links">Formal Shirts</div>
        <div class="links">Sweatshirts</div>
        <div class="links">Sweaters</div>
        <div class="links">Jackets</div>
        <div class="links">Blazers & Coats</div>
        <div class="links">Suits</div>
        <div class="links">Rain Jackets</div>
        <hr>
        <div class="heading">Indian & Festive Wear</div>
        <div class="links">Kurtas & Kurta Sets</div>
        <div class="links">Sherwanis</div>
        <div class="links">Nehru Jackets</div>
        <div class="links">Dhotis</div>
    </div>
    <div class="second-section-items">
        <div class="heading">Bottomwear</div>
        <div class="links">Jeans</div>
        <div class="links">Casual Trousers</div>
        <div class="links">Formal Trousers</div>
        <div class="links">Shorts</div>
        <div class="links">Track Pants & Joggers</div>
        <hr>
        <div class="heading">Innerwear & Sleepwear</div>
        <div class="links">Briefs & Trunks</div>
        <div class="links">Boxers</div>
        <div class="links">Vests</div>
        <div class="links">Sleepwear & Loungewear</div>
        <div class="links">Thermals</div>
        <hr>
        <div class="heading">Plus Size</div>
    </div>
    <div class="first-section-items">
        <div class="heading">Topwear</div>
        <div class="links">T-Shirts</div>
        <div class="links">Casual Shirts</div>
        <div class="links">Formal Shirts</div>
        <div class="links">Sweatshirts</div>
        <div class="links">Sweaters</div>
        <div class="links">Jackets</div>
        <div class="links">Blazers & Coats</div>
        <div class="links">Suits</div>
        <div class="links">Rain Jackets</div>
        <hr>
        <div class="heading">Indian & Festive Wear</div>
        <div class="links">Kurtas & Kurta Sets</div>
        <div class="links">Sherwanis</div>
        <div class="links">Nehru Jackets</div>
        <div class="links">Dhotis</div>
    </div>
    <div class="second-section-items">
        <div class="heading">Bottomwear</div>
        <div class="links">Jeans</div>
        <div class="links">Casual Trousers</div>
        <div class="links">Formal Trousers</div>
        <div class="links">Shorts</div>
        <div class="links">Track Pants & Joggers</div>
        <hr>
        <div class="heading">Innerwear & Sleepwear</div>
        <div class="links">Briefs & Trunks</div>
        <div class="links">Boxers</div>
        <div class="links">Vests</div>
        <div class="links">Sleepwear & Loungewear</div>
        <div class="links">Thermals</div>
        <hr>
        <div class="heading">Plus Size</div>
    </div>
</div>`;
}

function unshowCategoryElement() {
    displayCategoryElement.addEventListener('mouseleave', ()=> displayCategoryElement.innerHTML = ``);
    
}

let slideImages = document.querySelectorAll('.banner-img');
let dots = document.querySelectorAll('.dot');

var counter = 0;

//autosliding code 

function slideNext(){
    slideImages[counter].style.animation = 'next1 0.5s ease-in forwards';
    if (counter >= slideImages.length-1){
        counter = 0;
    } else {
        counter ++;
    }
    slideImages[counter].style.animation = 'next2 0.5s ease-in forwards';
    indicators();
}
function autoSliding(){
    deleteInterval = setInterval(timer, 5000);
    function timer(){
        slideNext();
        indicators();
    }
}
autoSliding();

//stop sliding when hovering

const container = document.querySelector('.banner-container');
container.addEventListener('mouseover', ()=>{
    clearInterval(deleteInterval);
});

//resume sliding when not hovering

container.addEventListener('mouseout', autoSliding);

//add and remove active class from the indicator
function indicators(){
    for(let i = 0; i < dots.length; i++){
        dots[i].className = dots[i].className.replace(' active', '');
    }
    dots[counter].className += ' active';
}

//adding clicking event to the indicator
function switchImage(currentImage){
    currentImage.classList.add('active');
    var imageId = currentImage.getAttribute('attr');
    if (imageId > counter) {
        slideImages[counter].style.animation = 'next1 0.5s ease-in forwards';
        counter = imageId;
        slideImages[counter].style.animation = 'next2 0.5s ease-in forwards';  
    }
    else if (imageId == counter) {
        return;
    }
    else{
        slideImages[counter].style.animation = 'prev1 0.5s ease-in forwards';
        counter = imageId;
        slideImages[counter].style.animation = 'prev2 0.5s ease-in forwards';
    }
    indicators();
}
