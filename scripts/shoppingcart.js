  let carts = document.querySelectorAll('.add-cart');

// get item details
let products =[
{
	name: 'product1',
	tag: 'nicelovely1',
	price: 10,
	inCart: 0
},
{
	name: 'product2',
	tag: 'nicelovely2',
	price: 20,
	inCart: 0
},
{
	name: 'product3',
	tag: 'nicelovely3',
	price: 30,
	inCart: 0
},
{
	name: 'product4',
	tag: 'nicelovely4',
	price: 40,
	inCart: 0
},
{
	name: 'product5',
	tag: 'nicelovely5',
	price: 50,
	inCart: 0
},
{
	name: 'product6',
	tag: 'nicelovely6',
	price: 60,
	inCart: 0
}
];


for(let i = 0;i < carts.length; i++)
{
	carts[i].addEventListener('click', ()=>{
		//console.log("add to cart");
		cartNumber(products[i]);
		totalCost(products[i]);
		hiddenCart.style.display = "block";
	})
}

function onloadcartNumber() {
	// body...
	let productNumbers = localStorage.getItem("cartNumber");
	if (productNumbers) {
	  document.querySelector('.mycart').textContent = productNumbers ;

	}
}

function cartNumber(product){
	//console.log("inside cartNumber");

		let productNumbers = localStorage.getItem("cartNumber");
		productNumbers = parseInt(productNumbers);
		// check what is local storage
		//console.log(productNumbers);
		//console.log(typeof productNumbers);
	//add to local storage
	if(productNumbers){
		localStorage.setItem('cartNumber', productNumbers + 1);
		document.querySelector('.mycart').textContent = productNumbers + 1;
		
	}else{

		localStorage.setItem('cartNumber', 1);
		document.querySelector('.mycart').textContent = 1;
		
	}

	setItems(product);
	

}

function setItems(product) {
	// body...
	//console.log('in setitems');\
	// products that are in cart
let cartItems = localStorage.getItem('productInCart');
	cartItems = JSON.parse(cartItems);
	//console.log("my item cart :", cartItems); 

	if(cartItems != null){
		if(cartItems[product.tag] == undefined){
			cartItems = {
				...cartItems,
			[product.tag]: product
			}
			
		}
		cartItems[product.tag].inCart += 1;
	}else {
		product.inCart = 1;
	    cartItems = {
		    [product.tag]: product
	    }
	}
	
	localStorage.setItem("productInCart", JSON.stringify(cartItems));

}

function totalCost(product) {
	// body...
	

	let cartCost = localStorage.getItem('totalCost');
	
	console.log('product price is', cartCost);
	console.log(typeof cartCost);

	if(cartCost != null){
		cartCost = parseInt(cartCost);
		localStorage.setItem("totalCost", cartCost + product.price);
	}else{

	localStorage.setItem("totalCost", product.price);
}
}

function displaycart() {
	// body...
	let cartItems = localStorage.getItem("productInCart");
	cartItems = JSON.parse(cartItems);
	//console.log(cartItems);

	let productContainer = document.querySelector('.products');
	let cartCost = localStorage.getItem('totalCost');

	if(cartItems && productContainer){
		//console.log("available");
		
		Object.values(cartItems).map(item =>{
			productContainer.innerHTML += `
            <div class="product">
		 	<img src="./assets/products/${item.tag}.png" width="100px">
		 	<span>${item.name}</span>
		 	</div>
		 	<div class="price">
		 	<span>Ksh.${item.price}</span>
		 	</div>
		 	<div class="quantity">
		 	<span>${item.inCart}</span>
		 	</div>
		 	<div class="total">
		 	<span>Ksh.${item.inCart * item.price}</span>
		 	</div>
		 	
			`;
		});

		productContainer.innerHTML += `
			<div class="basketTotalContainer">
				<h4 class"basketTotalTitle">
					Total Amount :
				<h4>
				<h4 class"basketTotal">
					Ksh.${cartCost}
				<h4>
			</div>
		`;


		productContainer.innerHTML += `
			<div class="basketButtonPurchase">
				<button class="basketButton">Purchase</button>
			</div>
		`;
	}
}

// clear localstorage on purchase
function cartItemDelete(product) {
	// body...

let btndelete = document.querySelector('.basketButton');
  
  btndelete.addEventListener('click', ()=>{

  	alert("Thanks for Purchase");
  	localStorage.clear();
  	location.reload();

  });

}

// hold cart number
onloadcartNumber();
displaycart();
cartItemDelete();