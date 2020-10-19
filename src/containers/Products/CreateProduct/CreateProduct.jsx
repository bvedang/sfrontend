import React from "react";
import classes from "./CreateProduct.module.css";
import Modal from "../../../components/UI/Modal/Modal";
import { Fab } from "@material-ui/core";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
const createProduct = (props) => {
  return (
    <React.Fragment>
      <div className={["col-sm", classes.ProductCard].join(" ")}>
        <Fab color="primary" aria-label="add" onClick={props.Create}>
          <AddRoundedIcon />
        </Fab>
      </div>

      <Modal show={props.showModal} modalClosed={props.closeModal}>
        <div className={["col-sm", classes.ModalContent].join(" ")}>
          <p className={["text-center", classes.ModalHeading].join(" ")}>
            Add New Product
          </p>
          <div className="form-group">
            <input
              className={["form-control m-2", classes.InputField].join(" ")}
              placeholder="Enter Product Name"
              type="text"
              onChange={props.setProductName}
              value={props.productName}
            />
            <button className="btn m-2 btn-block btn-outline-primary" onClick={props.addNewProduct}>
              Add
            </button>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default createProduct;
