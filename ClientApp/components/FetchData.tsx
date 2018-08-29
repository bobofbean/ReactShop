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
	currentCount: number;
}

interface ProductsPaginated {
	products: Product[];
}

interface ChosenProducts {
	chosenProducts: Product[];
}

interface CustomerState {
	productsPaginated: ProductsPaginated;
	chosenProducts: ChosenProducts;
}

export class FetchData extends React.Component<any, CustomerState> {

	constructor(props: any) {
		super(props);
		this.state = {
			productsPaginated: { products: [] },
			chosenProducts: { chosenProducts: [] }
		};

		fetch('/api/data/GetProductsFromJson')
			.then(response => response.json() as Promise<ProductsPaginated>)
			.then(data => {
				this.setState({ productsPaginated: data });
			});
		console.log(this.state.productsPaginated.products.length);
	}

	render() {
		let cs = this.state.productsPaginated.products;
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
							<td> <p>Current count: <strong>{c.currentCount}</strong></p>
								<button onClick={() => { this.decrementCounter(c.productId) }}>-</button>
								<button onClick={() => { this.incrementCounter(c.productId) }}>+</button>
								<button onClick={() => { this.addProductToCart(c) }}>Add</button>
							</td>
						</tr>
					)}
				</tbody>
			</table>
		);
	}

	addProductToCart(prod: Product) {
		var num = this.state.chosenProducts.chosenProducts.length;
		this.state.chosenProducts.chosenProducts[num] = prod;
		this.setState(this.state);
		console.log(this.state.chosenProducts.chosenProducts.length);
	}

	incrementCounter(prodNum: number) {
		this.state.productsPaginated.products[prodNum].currentCount += 1;
		this.setState(this.state);
	}

	decrementCounter(prodNum: number) {
		if (this.state.productsPaginated.products[prodNum].currentCount > 0) {
			this.state.productsPaginated.products[prodNum].currentCount -= 1;
			this.setState(this.state);
		}
	}
}
