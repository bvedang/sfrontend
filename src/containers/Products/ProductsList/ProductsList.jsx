import React, { Component } from "react";
import classes from "./ProductsList.module.css";
import { connect } from "react-redux";
import Product from "../Product/Product";
import {
	Card,
	Button,
	CardActions,
	CardContent,
	Typography,
	IconButton,
	Divider,
} from "@material-ui/core";
import { Route } from "react-router-dom";
import { DeleteOutline, Edit, ExpandMore } from "@material-ui/icons";

class ProductList extends Component {
	state = { productName: "", id: -1 };
	productSelectedHandler = (name, id) => {
		this.setState({ productName: name, id: id });
		this.props.history({ pathname: "/products/" + name });
	};
	render() {
		let products = <p>None</p>;
		if (this.props.products) {
			products = this.props.products
				.slice(0, this.props.itemsToShow)
				.map((product, i) => (
					<div
						className={["col-sm-4 mb-3", classes.CustomCardCSS].join(" ")}
						key={i}
					>
						<Card key={product.id}>
							<CardContent>
								<Typography
									align="left"
									variant="h5"
									display="block"
									color="textPrimary"
								>
									Name : {product.name}
								</Typography>
								<Typography
									variant="h6"
									display="block"
									align="left"
									color="textSecondary"
								>
									Batch Count : 0
								</Typography>
								<Typography
									variant="h6"
									align="left"
									display="block"
									color="primary"
								>
									Raw Material used : 0
								</Typography>
							</CardContent>
							<CardActions>
								<Button
									fullWidth
									variant="contained"
									style={{
										backgroundColor: "#039be5",
										color: "white",
										outline: "none",
									}}
									onClick={() =>
										this.productSelectedHandler(
											product.name,
											product["product_id"]
										)
									}
								>
									Detail
								</Button>
								<IconButton style={{ outline: "none" }} color="primary">
									<Edit />
								</IconButton>
								<IconButton style={{ outline: "none" }} color="secondary">
									<DeleteOutline />
								</IconButton>
							</CardActions>
						</Card>
					</div>
				));
		}
		return (
			<div className={["col-sm text-center", classes.Productsdiv].join(" ")}>
				<div className="row m-1">{products}</div>
				<Button
					style={{ color: "#039be5", outline: "none" }}
					onClick={this.props.showMore}
				>
					show more <ExpandMore />
				</Button>
				<Divider />
				<Route
					path={this.props.url + "/:name"}
					exact
					component={() => (
						<Product productName={this.state.productName} id={this.state.id} />
					)}
				/>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		products: state.products.products,
	};
};

export default connect(mapStateToProps)(ProductList);
