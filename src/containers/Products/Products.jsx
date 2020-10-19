import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./Product.module.css";
import CreateProduct from "./CreateProduct/CreateProduct";
import ProductsList from "./ProductsList/ProductsList";
import * as actionTypes from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
class Products extends Component {
  state = {
    productName: "",
    numberOfitemsShown: 3,
    addNew: false,
    showModal: false,
  };
  componentDidMount() {
    
    localStorage.setItem("path", window.location.pathname);
    this.props.onLoadProduct(this.props.token);
  }

  onAddProductHandler = () => {
    this.setState({ addNew: true, showModal: true });
  };

  setProductName = (event) => {
    const product = { ...this.state };
    product.productName = event.target.value;
    this.setState({ productName: product.productName });
  };

  addNewProduct = () => {
    if (this.state.productName) {
      this.props.onProductAdd(this.props.token, this.state.productName);
      this.setState({ showModal: false });
      const product = { ...this.state };
      product.productName = "";
      this.setState({ productName: product.productName });
    }
  };

  showMore = () => {
    console.log("here");
    if (this.state.numberOfitemsShown + 3 <= this.props.products.length) {
      this.setState({ numberOfitemsShown: this.state.numberOfitemsShown + 3 });
    } else {
      this.setState({ numberOfitemsShown: this.props.products.length });
    }
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };
  render() {
    let layout = <Spinner />;
    if (!this.props.loading) {
      layout = (
        <div className={["col-sm-12", classes.ProductContainer].join(" ")}>
          <div className="col-sm">
            <h3 className={["text-center", classes.ProductsHeading].join(" ")}>
              Manufactured Products
            </h3>
            <CreateProduct
              Create={this.onAddProductHandler}
              closeModal={this.closeModal}
              showModal={this.state.showModal}
              token={this.props.token}
              productName={this.state.productName}
              setProductName={this.setProductName}
              addNewProduct={this.addNewProduct}
            />
          </div>

          <ProductsList
            itemsToShow={this.state.numberOfitemsShown}
            showMore={this.showMore}
            products={this.props.products}
            url={this.props.match.url}
            history={this.props.history.push}
            subProduct={this.props.subProduct}
          />
        </div>
      );
    }
    return <React.Fragment>{layout}</React.Fragment>;
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    products: state.products.products,
    loading: state.products.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onLoadProduct: (token) => dispatch(actionTypes.syncproduct(token)),
    onProductAdd: (token, productName) =>
      dispatch(actionTypes.addProduct(token, productName)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
