import React, { Component } from "react";
import * as actionTypes from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import StockTable from "./StockTable/StockTable";
import { TextField, Button } from "@material-ui/core";
import Modal from "../../components/UI/Modal/Modal";
import classes from "./Stocks.module.css";

class Stocks extends Component {
  state = {
    editRow: false,
    showAddModal: false,
    showUpdateModal: false,
    currentRow: {
      id: "",
      name: "",
    },
    addRawmaterial: "",
    numberofRow: 5,
    currentRowIndex: -1,
    deleteRowId: -1,
  };

  componentDidMount() {
    localStorage.setItem("path", window.location.pathname);
    this.props.onLoadStock(localStorage.getItem("token"));
  }

  onDeleteClearStockTable = () => {
    this.setState({ currentRowIndex: -1 });
  };

  onDeleteFlagChanged = (index, id) => {
    console.log(index);
    this.setState({ currentRowIndex: index, deleteRowId: id });
  };

  closeModal = () => {
    this.setState({ showUpdateModal: false });
  };

  closeAddModal = () => {
    this.setState({ showAddModal: false });
  };

  onEditRawMaterial = (info) => {
    this.setState({ showUpdateModal: true });
    console.log(info);
    const rowInfo = { ...this.state.currentRow };
    rowInfo.id = info.id;
    rowInfo.name = info.name;
    this.setState({ currentRow: rowInfo });
  };

  onIDChangeHandler = (e) => {
    const currentRow = { ...this.state.currentRow };
    currentRow.id = e.target.value;
    this.setState({ currentRow: currentRow });
  };
  onAddRawMaterial = () => {
    console.log("add");
    this.setState({ showAddModal: true });
  };

  onNameChangeHandler = (e) => {
    const currentRow = { ...this.state.currentRow };
    currentRow.name = e.target.value;
    this.setState({ currentRow: currentRow });
  };

  onNewNameChangeHandler = (e) => {
    this.setState({ addRawmaterial: e.target.value });
  };

  updateStock = () => {
    this.props.onUpdateStock(
      localStorage.getItem("token"),
      this.state.currentRow.id,
      this.state.currentRow.name
    );
    this.closeModal();
  };
  addStock = () => {
    this.props.onAddnewStock(
      localStorage.getItem("token"),
      this.state.addRawmaterial
    );
    this.closeAddModal();
  };

  deleteStock = () => {
    this.props.onDeleteStock(
      localStorage.getItem("token"),
      this.state.deleteRowId
    );
    this.onDeleteClearStockTable();
  };
  render() {
    let layout = <Spinner />;
    if (!this.props.loading) {
      layout = (
        <div className="col-sm-12">
          <h1 className="text-center">Stocks</h1>
          <div className="p-1 mt-2">
            <StockTable
              data={this.props.stock}
              rowIndex={this.state.index}
              onEditRow={this.onEditRow}
              onEditComplete={this.onEditComplete}
              onEditRawMaterial={this.onEditRawMaterial}
              onAddRawMaterial={this.onAddRawMaterial}
              numberofRow={this.state.numberofRow}
              deleteFlag={this.state.deleteFlag}
              onDeleteFlagChanged={this.onDeleteFlagChanged}
              currentRowIndex={this.state.currentRowIndex}
              onDeleteClearStockTable={this.onDeleteClearStockTable}
              deleteStock={this.deleteStock}
            />
          </div>
          <Modal
            modalClosed={this.closeModal}
            show={this.state.showUpdateModal}
          >
            {this.props.stockUpdateLoading ? (
              <div className="col-sm">
                <Spinner />
              </div>
            ) : (
              <div className="col-sm">
                <h3 className={classes.ModalHeading}>Update Information</h3>
                <div className="form-group">
                  <div className="form-group">
                    <TextField
                      disabled
                      fullWidth
                      variant="outlined"
                      label="ID"
                      onChange={(e) => this.onIDChangeHandler(e)}
                      value={this.state.currentRow.id}
                    />
                  </div>
                  <div className="form-group">
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Name"
                      onChange={(e) => this.onNameChangeHandler(e)}
                      value={this.state.currentRow.name}
                    />
                  </div>
                  <div className="form-group text-center">
                    <Button
                      onClick={this.closeModal}
                      style={{ margin: "10px" }}
                      color="secondary"
                      variant="outlined"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      style={{ margin: "10px" }}
                      color="primary"
                      onClick={this.updateStock}
                    >
                      Update
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Modal>
          <Modal
            modalClosed={this.closeAddModal}
            show={this.state.showAddModal}
          >
            {this.props.stockUpdateLoading ? (
              <div className="col-sm">
                <Spinner />
              </div>
            ) : (
              <div className="col-sm">
                <h3 className={classes.ModalHeading}>Add new rawmaterial</h3>
                <div className="form-group">
                  <div className="form-group">
                    <TextField
                      fullWidth
                      variant="outlined"
                      onChange={this.onNewNameChangeHandler}
                      value={this.state.addRawmaterial}
                      label="NAME"
                    />
                  </div>
                  <div className="form-group text-center">
                    <Button
                      onClick={this.closeAddModal}
                      style={{
                        margin: "10px",
                        backgroundColor: "##f44336 !important",
                      }}
                      variant="outlined"
                      color="secondary"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      style={{ margin: "10px" }}
                      color="primary"
                      onClick={this.addStock}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </Modal>
        </div>
      );
    }
    return <React.Fragment>{layout}</React.Fragment>;
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.rawMaterial.loading,
    stock: state.rawMaterial.rawmaterialArray,
    columns: state.rawMaterial.columns,
    stockUpdateLoading: state.rawMaterial.stockUpdateLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadStock: (token) => dispatch(actionTypes.syncStock(token)),
    onUpdateStock: (token, id, name) =>
      dispatch(actionTypes.stockUpdateInit(token, id, name)),
    onAddnewStock: (token, name) =>
      dispatch(actionTypes.addNewStockInit(token, name)),
    onDeleteStock: (token, id) =>
      dispatch(actionTypes.deleteStockInit(token, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Stocks);
