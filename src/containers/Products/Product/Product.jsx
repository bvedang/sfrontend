import React, { Component } from "react";
import classes from "./Product.module.css";
import { IconButton, Paper, Typography, Button } from "@material-ui/core";
import { DeleteOutline, ArrowForward, AddCircle } from "@material-ui/icons";
import { connect } from "react-redux";
import Spinner from "../../../components/UI/Spinner/Spinner";
import * as actionTypes from "../../../store/actions/index";
import ProductModal from "./ProductModal/ProductModal";
import ProductTable from "./ProductTable/ProductTable";
import ProductAddBatch from "./ProductAddBatch/ProductAddBatch";
import axios from "axios";

class Product extends Component {
	state = {
		productId: this.props.id,
		productName: this.props.productName,
		showModal: false,
		rawmaterials: this.props.rawmaterials,
		selectedIndex: -1,
		setRawmaterial: [],
		productRawmaterilNames: [],
		addbatch: false,
	};

	submitAddBatch = (productId, setStock) => {
		const editedData = [...this.props.stocks];
		if (this.props.stocks) {
			for (let i of editedData) {
				console.log(i);
				for (let j in setStock) {
					if (i.name.toLowerCase() === j) {
						i.quantity = setStock[j];
						i.batchId = setStock.batchId;
					}
				}
			}
			console.log(editedData);
		}
		if (productId && setStock) {
			axios({
				method: "POST",
				url: "http://127.0.0.1:5000/api/batchRecords/" + productId,
				headers: {
					Accept: "application/json",
					Authorization: localStorage.getItem("token"),
					"Content-Type": "application/json",
				},
				data: editedData,
			})
				.then((res) => {
					console.log(res.data);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	addProductAddBatch = () => {
		this.setState({ addbatch: true });
	};

	cancelProductAddBatch = () => {
		this.setState({ addbatch: false });
	};

	onAddRawmaterial = (rawmaterial, index) => {
		//console.log(rawmaterial);
		const newRawmaterial = [...this.state.setRawmaterial];
		if (newRawmaterial.length > 0) {
			if (!newRawmaterial.some((a) => a.id === rawmaterial.id)) {
				newRawmaterial.push(rawmaterial);
			}
			this.setState({
				setRawmaterial: newRawmaterial,
				selectedIndex: index,
			});
		} else {
			newRawmaterial.push(rawmaterial);
			this.setState({
				setRawmaterial: newRawmaterial,
				selectedIndex: index,
			});
		}
	};
	onRemoveRawmaterial = (id) => {
		const newRawmaterials = [...this.state.setRawmaterial];
		if (newRawmaterials.length > 0) {
			const updatesRawmterial = newRawmaterials.filter(
				(rawmaterial) => rawmaterial.id !== id
			);
			console.log(updatesRawmterial);
			this.setState({ setRawmaterial: updatesRawmterial, selectedIndex: -1 });
		}
	};

	componentDidMount() {
		//this.props.syncStock(localStorage.getItem("token"));
		this.props.getProductBatchRecords(
			localStorage.getItem("token"),
			this.props.id
		);
		localStorage.setItem("path", window.location.pathname);
		this.props.onLoadProduct(localStorage.getItem("token"), this.props.id);
	}

	loadProductBatch = () => {
		console.log(this.props.productBatches);
	};

	onSetRawmaterialDoneHanlder = () => {
		console.log(this.state.setRawmaterial);
		if (this.state.setRawmaterial.length > 0) {
			this.props.setProductRawmaterial(
				localStorage.getItem("token"),
				this.state.productId,
				this.state.setRawmaterial
			);
		}
		this.setState({ showModal: false, selectedIndex: -1, setRawmaterial: [] });
	};

	closeDialogue = () => {
		this.setState({ showModal: false, selectedIndex: -1, setRawmaterial: [] });
	};

	onSetRawmaterialHandler = () => {
		this.props.syncStock(localStorage.getItem("token"));
		this.setState({ showModal: true });
		this.loadProductBatch();
	};

	ondeleteSetRawmaterial = (rawmaterialId) => {
		this.props.deleteProductSetRawmaterial(
			localStorage.getItem("token"),
			this.state.productId,
			rawmaterialId
		);
	};

	render() {
		let layout = <Spinner />;
		if (!this.props.itemsLoading) {
			let rawmaterials = this.props.stocks.map((rawmaterial, i) => (
				<Paper key={i} elevation={2}>
					<li className="list-group-item text-left">
						Name : {rawmaterial.name}
						<IconButton
							color="secondary"
							onClick={() => this.ondeleteSetRawmaterial(rawmaterial.id)}
						>
							<DeleteOutline />
						</IconButton>
					</li>
				</Paper>
			));
			layout = (
				<div className={["col-sm", classes.Container].join(" ")}>
					<div className="row">
						<div className="col-sm-6 text-left">
							<h5 className={classes.ListHeading}>Product Description</h5>
							<Typography
								align="left"
								variant="h6"
								display="block"
								color="textPrimary"
							>
								Name : {this.props.productName}
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
								Raw Material used :
								{this.props.stocks ? this.props.stocks.length : 0}
							</Typography>
							<div style={{ marginTop: "20px" }}>
								<Button
									color="primary"
									variant="contained"
									size="small"
									style={{ outline: "none" }}
									onClick={this.onSetRawmaterialHandler}
								>
									Set Product Rawmaterial <ArrowForward />
								</Button>
							</div>
							<ProductModal
								showModal={this.state.showModal}
								closeModal={this.closeDialogue}
								rawmaterials={this.props.rawmaterials}
								stocks={this.props.stocks}
								onAddRawmaterial={this.onAddRawmaterial}
								onRemoveRawmaterial={this.onRemoveRawmaterial}
								selectedIndex={this.state.selectedIndex}
								setRawmaterial={this.state.setRawmaterial}
								onSetRawmaterialDoneHanlder={this.onSetRawmaterialDoneHanlder}
							/>
						</div>
						<div className="col-sm-6">
							<h5 className={classes.ListHeading}>Raw Material Used</h5>
							<ul
								className={["m-1 p-1 list-group", classes.ListGroup].join(" ")}
								style={{ listStyle: "none" }}
							>
								{rawmaterials}
							</ul>
						</div>
					</div>
					<div className="col-sm-12 mt-4">
						{this.props.productBatches.length > 0 ? (
							<React.Fragment>
								<Typography
									align="center"
									variant="h5"
									display="block"
									color="textPrimary"
								>
									Batch Recored of {this.props.productName}
								</Typography>
								<ProductTable
									addbatch={this.state.addbatch}
									cancelProductAddBatch={this.cancelProductAddBatch}
									addProductAddBatch={this.addProductAddBatch}
									productBatches={this.props.productBatches}
									stocks={this.props.stocks}
									submitAddBatch={this.submitAddBatch}
									productId={this.state.productId}
								/>
							</React.Fragment>
						) : (
							<div className="col-sm">
								<Typography
									align="center"
									variant="h5"
									display="block"
									color="textPrimary"
								>
									Batch Recored of {this.props.productName} is None
								</Typography>
								<ProductAddBatch
									addbatch={this.state.addbatch}
									submitAddBatch={this.submitAddBatch}
									cancelProductAddBatch={this.cancelProductAddBatch}
									stocks={this.props.stocks}
									productId={this.state.productId}
								/>
								<IconButton
									color="primary"
									style={{ outline: "none", color: "black" }}
									onClick={this.addProductAddBatch}
								>
									<AddCircle fontSize="large" />
								</IconButton>
							</div>
						)}
					</div>
				</div>
			);
		}
		return <React.Fragment>{layout}</React.Fragment>;
	}
}

const mapStateToProps = (state) => {
	return {
		itemsLoading: state.products.itemsLoading,
		stocks: state.products.stocks,
		rawmaterials: state.rawMaterial.rawmaterialArray,
		productBatches: state.products.productBatches,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onLoadProduct: (token, id) =>
			dispatch(actionTypes.productRmwInit(token, id)),
		syncStock: (token) => dispatch(actionTypes.syncStock(token)),
		setProductRawmaterial: (token, id, setRawmateriallist) =>
			dispatch(
				actionTypes.setProductRawmaterial(token, id, setRawmateriallist)
			),
		deleteProductSetRawmaterial: (token, productId, rawmaterialId) =>
			dispatch(
				actionTypes.deleteProductSetRawmaterial(token, productId, rawmaterialId)
			),
		getProductBatchRecords: (token, productId) =>
			dispatch(actionTypes.getProductBatchRecords(token, productId)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
