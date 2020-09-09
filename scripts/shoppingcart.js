// get the buttons cliked to add to cart
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
	console.log("my item cart :", cartItems); 

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



// hold cart number
onloadcartNumber();