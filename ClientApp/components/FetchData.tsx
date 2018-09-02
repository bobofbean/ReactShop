// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

interface  Product {
	productId: number;
	name: string;
	price: number;
	quantity: number;
}

interface ProductsChosen {
	products: Product[];
}

interface ProductsPaginated {
	products: Product[];
}

interface ChosenProducts {
	chosenProducts: Product[];
	orderPrice: number;
}

interface CustomerState {
	productsPaginated: ProductsPaginated;
	chosenProducts: ChosenProducts;
}

export class FetchData extends React.Component<RouteComponentProps<{}>, CustomerState> {

	constructor() {
		super();
		this.state = {
			productsPaginated: { products: [] },
			chosenProducts: { chosenProducts: [], orderPrice: 0}
		};
		fetch('/api/data/GetStartProductsFromJson')
			.then(response => response.json() as Promise<ProductsPaginated>)
			.then(data => {
				this.setState({ productsPaginated: data });
			});
	}

	render() {
		let cs = this.state.productsPaginated.products;
		let cc = this.state.chosenProducts.chosenProducts;
		return (
			<table className='table'>
				<thead>
					<tr>
						<th>Product ID</th>
						<th>Name</th>
						<th>Price</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{cs.map((c) =>
						<tr>
							<td>{c.productId}</td>
							<td>{c.name}</td>
							<td>{c.price}</td>
							<td> <p>Current count: <strong>{c.quantity}</strong></p>
								<button onClick={() => { this.decrementCounter(c) }}>-</button>
								<button onClick={() => { this.incrementCounter(c) }}>+</button>
								<button onClick={() => { this.addToCart(c) }}>Add</button>
							</td>
						</tr>
					)}
				</tbody>
				<thead>
					<tr>
						<th>Product ID</th>
						<th>Name</th>
						<th>Price</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{cc.map((c) =>
						<tr>
							<td>{c.productId}</td>
							<td>{c.name}</td>
							<td>{c.price}</td>
							<td> <p>Current count: <strong>{c.quantity}</strong></p>
								<button onClick={() => { this.cdecrementCounter(c) }}>-</button>
								<button onClick={() => { this.cincrementCounter(c) }}>+</button>
								<button onClick={() => { this.deleteFromCart(c) }}>Remove</button>
							</td>
						</tr>
					)}
					<tr>
						<td></td>
						<td></td>
						<td>Order Price: {this.state.chosenProducts.orderPrice}</td>
						<td>
							<button onClick={() => { this.sendOrder() }}>Send Order</button>
						</td>
					</tr>
				</tbody>
			</table>
		);
	}

	deleteFromCart(prod: Product) {
		var updatedCart = this.state.chosenProducts.chosenProducts;
		var ind = updatedCart.indexOf(prod);
		updatedCart.splice(ind, 1);
		this.state.chosenProducts.orderPrice -= prod.price * prod.quantity;
		this.state.chosenProducts.chosenProducts = updatedCart;
		this.setState(this.state);
	}

	sendOrder() {
		var xhr = new XMLHttpRequest();
		xhr.open("POST", '/saveData');
		xhr.send(this.state.chosenProducts);
	}

	componentDidMount() {
		var xhttp = new XMLHttpRequest();
		var self = this;
		xhttp.open("get", "/saveData", true);
		xhttp.send();
		xhttp.onreadystatechange = function (e) {
			console.log(this);
			if (xhttp.readyState === 4 && xhttp.status === 200) {
				console.log("ok, response :", this.response);
				self.setState({
					chosenProducts: JSON.parse(this.response)
				});
			}
		}
	}

	addToCart(item: Product) {
		var found = false;
		var quantt = 0;
		var updatedCart = this.state.chosenProducts.chosenProducts.map((cartItem) => {
			if (cartItem.productId == item.productId) {
				found = true;
				quantt = cartItem.quantity;
				cartItem.quantity = item.quantity;
				return cartItem;
			} else {
				return cartItem;
			}
		});

		if (!found) {
			updatedCart.push({ productId: item.productId, name: item.name, price: item.price, quantity: item.quantity });
		}

		this.state.chosenProducts.orderPrice += item.price * (quantt - item.quantity)*-1;
		this.state.chosenProducts.chosenProducts = updatedCart;
		this.setState(this.state);
	}

	incrementCounter(prod: Product) {
		prod.quantity += 1;
		this.setState(this.state);
	}

	decrementCounter(prod: Product) {
		if (prod.quantity > 0) {
			prod.quantity -= 1;
			this.setState(this.state);
		}
	}

	cincrementCounter(prod: Product) {
		prod.quantity += 1;
		this.state.chosenProducts.orderPrice += prod.price;
		this.setState(this.state);
	}

	cdecrementCounter(prod: Product) {
		if (prod.quantity > 0) {
			prod.quantity -= 1;
			this.state.chosenProducts.orderPrice -= prod.price;
			this.setState(this.state);
		}
	}
}
