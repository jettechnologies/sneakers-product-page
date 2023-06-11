// import Glide from '@glidejs/glide';

// const { active } = require("browser-sync");

// var glide = new Glide('#options-gap', {
//     gap: 0
// })

// new Glide('.glide').mount();

var glide = new Glide(".glide", {
    perView: 1
  });

  glide.mount();

// code for the lightbox gallery display
const [...slides] = document.querySelectorAll(".glide__slide");
const leftArrow = document.querySelector(".slider-arrow--left");
const rightArrow = document.querySelector(".slider-arrow--right");
const slideImg = document.querySelector(".slide-img");


slides.forEach((slide) =>{
  slide.addEventListener("click", showLightBox);
});


function showLightBox(){
  const galleryModal = document.getElementById("dialog"),
        wrapper = document.getElementById("wrapper");
  const slideImg = this.firstElementChild;
  let imgSrc = slideImg.src;

  if(wrapper.clientWidth > 1023){
    galleryModal.showModal();
    galleryModal.style.display = "flex";
    document.body.style.overflow = "hidden";
  }

  // calling update modal function
  updateModalImg(imgSrc);
}

// function to update modal images
function updateModalImg(src){
  let imgSrc = src, currentImgSrc;
   const [...slideImgs] = document.querySelectorAll(".slide-img");

   slideImgs.forEach(slideImg =>{
      slideImg.parentElement.classList.add("disactive");
   });

   const currentSlideImg = slideImgs.filter(slideImg =>{

      if(slideImg.src === imgSrc){
          return slideImg;
      }
  });

  currentSlideImg[0].parentElement.classList.remove("disactive");
  currentImgSrc = currentSlideImg[0].src;

  // function for slide movement
  toggleSlide(currentImgSrc);
}
// function for toggleSlide
function toggleSlide(src){
  let imgSrc = src, imgName, imgNum;
  const leftArrow = document.querySelector(".slider-arrow--left"),
        rightArrow = document.querySelector(".slider-arrow--right"),
        slideBullets = document.querySelectorAll(".slide-bullets .thumbnail-span");
  imgName = imgSrc.split("-").at(-1);
  imgNum = imgName.split(".").at(0);
  imgNum = parseInt(imgNum);

  showImg(imgNum);

  // adding eventlistener to the arrow buttons
  // left arrow event listener
  leftArrow.addEventListener("click", function(){
    sideSlide(-1);
  });
  // Right arrow event listener
  rightArrow.addEventListener("click", function(){
    sideSlide(1);
  });
  // slideBullets event listener
  slideBullets.forEach((slideBullet, index) =>{
    let indexNum = index + 1;
      slideBullet.addEventListener("click", function(){        
          btnSlide(indexNum);
      });
  });

  // list of functions for moving the slide using the arrows and bullets
  function sideSlide(e){showImg(imgNum += e);}
  function btnSlide(e){showImg(imgNum = e);}
}

// showImg function
function showImg(e){
  let i;

  const slides = document.querySelectorAll(".slider-div");
  if(e > slides.length){e = 1}
  if(e < 1){e = slides.length}
  
  for(i = 0; i < slides.length; i++){
        slides[i].classList.add("disactive");
  }

  slides[e - 1].classList.remove("disactive");
}

// function for closing the modal
function closeModal(){
  const galleryModal = document.getElementById("dialog");
  galleryModal.close();
  galleryModal.style.display = "none";
  document.body.style.overflow = "auto";
}

// Navbar script
const navBar = document.querySelector(".navbar"),
      navMenu = document.querySelector(".menu-icon"),
      navCloseMenu = document.querySelector(".close-nav-icon");
    
navMenu.addEventListener("click", () =>{
    const visibility = navBar.getAttribute("data-visible");

    if(visibility === "false"){
        navBar.setAttribute("data-visible", "true");
    }
});

// the close button event
navCloseMenu.addEventListener("click", () =>{
  const visibility = navBar.getAttribute("data-visible");

  if(visibility === "true"){
      navBar.setAttribute("data-visible", "false");
  }
});

// cart scripting
const cartIcon = document.querySelector(".cart-icon"),
      cart = document.querySelector(".cart"),
      minusIcon = document.querySelector(".minus-icon"),
      plusIcon = document.querySelector(".plus-icon"),
      count = document.querySelector(".count"),
      cartBody = document.querySelector(".cart-body");
      shopBtn = document.querySelector(".add-cart-btn"),
      itemNum = document.querySelector(".item-num");


cartIcon.addEventListener("click", showCart);
window.addEventListener("keydown", closeCart);
minusIcon.addEventListener("click", minusProdNum);
plusIcon.addEventListener("click", addProdNum);
shopBtn.addEventListener("click", addToCart);
cartBody.addEventListener("click", clearCart);


// displaying the cart
function showCart(){
  const visibility = cart.getAttribute("data-visible");

  if(visibility === "false"){
      cart.setAttribute("data-visible", true);
  }
  else if(visibility === "true"){
      cart.setAttribute("data-visible", false)
  }
}
// function to close cart with an escape key
function closeCart(e){
  const visibility = cart.getAttribute("data-visible");

  if(e.key === "Escape" || e.key == 27 ){
    if(visibility === "true"){
      cart.setAttribute("data-visible", false)
    }
  }
}

// Functions for increasing and decreasing the product count
function minusProdNum(){
  let productNum = count.textContent;
  productNum = parseInt(productNum);

  if(productNum > 0){
      productNum -= 1;
      count.textContent = productNum;
  }
}

// addProdNum function
function addProdNum(){
  let productNum = count.textContent;
  productNum = parseInt(productNum);
  productNum += 1;
  count.textContent = productNum;
}

// function to add to cart 
function addToCart(){
  let productNum = count.textContent;
  const visibility = itemNum.getAttribute("data-visible");
  productNum = parseInt(productNum);

   if(productNum > 0){
      let itemCost = 125 * productNum;

      // adding a little UX to the add to cart btn
      this.innerHTML = `
          <img src="images/spinner.svg" alt="cart icon" class="cart-icon">
            Processing
        `;
        this.classList.add("disabled");
      setTimeout(()=>{
        this.innerHTML = `
          <img src="images/icon-cart-2.svg" alt="cart icon" class="cart-icon">
          Add to cart
        `;
        this.classList.remove("disabled");

        cartBody.innerHTML = `
          <div class="cart-details">
            <img src="images/image-product-1-thumbnail.jpg" alt="product image" class="product-img">
            <div class="details">
              <p class="paragraph text-capitalize">autumn limited edition...</p>
              <p class="price paragraph">$125.00 x ${productNum}<span class="bold"> ${itemCost}</span></p>
            </div>
            <img src="images/icon-delete.svg" alt="delete" class="delete">
          </div>
          <button class="cta-btn checkout">Checkout</button>
        `;

        // to show the span tag for displaying item munber
        if(visibility === "false"){
            itemNum.textContent = productNum;
            itemNum.setAttribute("data-visible", true);
        }
      }, 2000);
   }

}

// Function to clear cart
function clearCart(e){
  let target = e.target;
  const visibility = itemNum.getAttribute("data-visible");

  if(target.classList.contains("delete") || target.classList.contains("checkout")){
      cartBody.innerHTML = `
        <p class="paragraph empty">Your cart is empty</p>
      `;

      // to remove the span tag for displaying item munber
      if(visibility === "true"){
        itemNum.setAttribute("data-visible", false);
    }
  }
}