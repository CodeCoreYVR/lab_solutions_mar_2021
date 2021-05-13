const DOMAIN = 'localhost:3000';
const API_PREFIX = '/api/v1';
const BASE_URL = `http://${DOMAIN}${API_PREFIX}`;
// I used postman to send a request to the tokens controller of the API with a valid email and passsword
const JWT =
	'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZmlyc3RfbmFtZSI6IkpvbiIsImxhc3RfbmFtZSI6IlNub3ciLCJmdWxsX25hbWUiOiJKb24gU25vdyIsImV4cCI6MTUyNDI0MjU2M30.COvnWFwszM7YiLflSu17eP7RwL3eJzey179cTHBPbx0';

// AJAX helpers related to Products
const Product = {
	all() {
		return fetch(`${BASE_URL}/products`)
			.then(res => res.json())
			.catch(console.error);
	},
	one(id) {
		return fetch(`${BASE_URL}/products/${id}`)
			.then(res => res.json())
			.catch(console.error);
	},
	create(productFormData) {
		return fetch(`${BASE_URL}/products/`, {
			headers: {
				Authorization: JWT
			},
			method: 'POST',
			body: productFormData
		})
			.then(res => res.json())
			.catch(console.error);
	}
};

// UTILITY FUNCTIONS

function qS(selector, node = document) {
	return node.querySelector(selector);
}

function qSA(selector, node = document) {
	return node.querySelectorAll(selector);
}

function byId(id) {
	return document.getElementById(id);
}

// Create DOM Element helpers

function createElement(tagName, attributes = {}) {
	const element = document.createElement(tagName);
	for (let attribute in attributes) {
		element.setAttribute(attribute, attributes[attribute]);
	}
	return element;
}

function renderProducts(products = []) {
	// find out product-index div
	const productIndexDiv = byId('product-index');
	// clear the product index div
	productIndexDiv.innerHTML = '';
	// for each product in our products data that came from the API
	products.forEach(product => {
		// create a div and a link inside of the div
		const productDiv = createElement('div', { class: 'product-listing' });
		const titleLink = createElement('a', {
			['data-id']: product.id,
			href: '',
			title: product.description
		});
		titleLink.innerText = product.title;
		productDiv.append(titleLink);
		productIndexDiv.append(productDiv);
	});
}

<div class='product-index'>
	<div class='product-listing'>
		<a data-id='1' href='' title='cute USB stick'>USB Stick</a>
	</div>
</div>

function refreshProducts() {
	Product.all().then(products => {
		renderProducts(products);
		// The code below is vulnerable to code/script injection!
		// byId('product-index').innerHTML = `${products
		// 	.map(
		// 		product => `<div class="product-listing">
		//         <a href title=${product.description} data-id=${product.id}>${
		// 			product.title
		// 		}</a>
		//     </div>`
		// 	)
		// 	.join('')}`;
	});
}

// ----- Stretch -----
function renderReviews(reviews = []) {
	const reviewsDiv = createElement('div');
	const reviewsH3 = createElement('h3');
	reviewsH3.innerText = 'Reviews';
	reviewsDiv.append(reviewsH3);
	reviews.forEach(review => {
		const reviewDiv = createElement('div');
		const h4 = createElement('h4');
		h4.innerText = review.rating;
		reviewDiv.append(h4);
		const reviewP = createElement('p');
		reviewP.innerText = review.body;
		reviewDiv.append(reviewP);
		reviewsDiv.append(reviewDiv);
	});
	return reviewsDiv;
}
// ----- Stretch -----

function renderProduct(product = {}) {
	const productShow = byId('product-show');
	const productDiv = createElement('div');
	const h1 = createElement('h1');
	h1.innerText = product.title;
	productDiv.append(h1);
	const p1 = createElement('p');
	p1.innerText = product.description;
	productDiv.append(p1);
	const p2 = createElement('p');
	p2.innerText = `Price: $${product.price}`;
	productDiv.append(p2);
	// ----- Stretch -----
	productDiv.append(renderReviews(product.reviews));
	// ----- Stretch -----
	productShow.innerHTML = '';
	productShow.append(productDiv);
}

function navigateTo(id) {
	qSA('.page').forEach(page => {
		page.classList.remove('visible');
		if (page.id === id) {
			page.classList.add('visible');
		}
	});
}

document.addEventListener('DOMContentLoaded', function() {
	refreshProducts();

	byId('product-index').addEventListener('click', event => {
		event.preventDefault();
		const { target } = event;
		if (target.matches('a')) {
			Product.one(target.dataset.id).then(product => {
				renderProduct(product);
				navigateTo('product-show');
			});
		}
	});

	qSA('nav a').forEach(link => {
		link.addEventListener('click', event => {
			event.preventDefault();
			navigateTo(event.target.dataset.id);
		});
	});

	const newProductForm = qS('form', byId('product-new'));
	newProductForm.addEventListener('submit', event => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		Product.create(formData).then(id => {
			refreshProducts();
			Product.one(id).then(product => {
				renderProduct(product);
				navigateTo('product-show');
			});
		});
	});
});
