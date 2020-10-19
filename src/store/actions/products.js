import * as actionTypes from "./actionTypes";
import axios from "axios";

export const syncproductStart = () => {
	return {
		type: actionTypes.SYNC_PRODUCT_START,
	};
};

export const syncproductSuccess = (products) => {
	return {
		type: actionTypes.SYNC_PRODUCT_SUCCESS,
		products: products,
	};
};

export const syncproductFailed = () => {
	return {
		type: actionTypes.SYNC_PRODUCT_FAILED,
	};
};

export const syncproduct = (token) => {
	return (dispatch) => {
		dispatch(syncproductStart());
		axios({
			method: "GET",
			url: "http://127.0.0.1:5000/api/allproducts",
			headers: {
				Authorization: token,
			},
		})
			.then((response) => {
				console.log(response.data);
				dispatch(syncproductSuccess(response.data));
			})
			.catch((error) => {
				console.log(error);
				dispatch(syncproductFailed());
			});
	};
};

export const addProduct = (token, productName) => {
	return (dispatch) => {
		axios({
			method: "POST",
			url: "http://127.0.0.1:5000/api/product",
			headers: {
				Authorization: token,
				"Content-Type": "application/json",
			},
			data: {
				productName: productName,
			},
		})
			.then((response) => {
				console.log(response.data);
				dispatch(syncproduct(token));
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const productRmwStart = () => {
	return {
		type: actionTypes.PRODUCT_RAWMATERIAL_START,
	};
};

export const productRmwFailed = () => {
	return {
		type: actionTypes.PRODUCT_RAWMATERIAL_FAILED,
	};
};

export const productRmwSuccess = (stock) => {
	return {
		type: actionTypes.PRODUCT_RAWMATERIAL_SUCCESS,
		stock: stock,
	};
};

export const productRmwInit = (token, id) => {
	return (dispatch) => {
		dispatch(productRmwStart());
		axios({
			method: "GET",
			url: "http://127.0.0.1:5000/api/rmw/" + id,
			headers: {
				Authorization: token,
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				console.log(response.data);
				dispatch(productRmwSuccess(response.data));
			})
			.catch((error) => {
				console.log(error);
				dispatch(productRmwFailed());
			});
	};
};

export const setProductRawmaterial = (token, id, setRawmateriallist) => {
	return (dispatch) => {
		dispatch(productRmwStart());
		axios({
			method: "POST",
			url: "http://127.0.0.1:5000/api/rmw/" + id,
			headers: {
				Accept: "application/json",
				Authorization: token,
				"Content-Type": "application/json",
			},
			data: {
				productId: id,
				rawmaterilList: JSON.stringify([...setRawmateriallist]),
			},
		})
			.then((res) => {
				console.log(res.data);
				dispatch(productRmwInit(token, id));
			})
			.catch((error) => {
				console.log(error);
				dispatch(productRmwFailed());
			});
	};
};

export const deleteProductSetRawmaterial = (
	token,
	productId,
	rawmaterialId
) => {
	return (dispatch) => {
		dispatch(productRmwStart());
		axios({
			method: "DELETE",
			url: "http://127.0.0.1:5000/api/rmw/" + productId,
			headers: {
				Accept: "application/json",
				Authorization: token,
				"Content-Type": "application/json",
			},
			data: {
				productId: productId,
				rawmaterilId: rawmaterialId,
			},
		})
			.then((res) => {
				console.log(res.data);
				dispatch(productRmwInit(token, productId));
			})
			.catch((error) => {
				console.log(error);
				dispatch(productRmwFailed());
			});
	};
};

export const getProductBatchRecordSuccess = (productBatchRecord) => {
	return {
		type: actionTypes.PRODUCT_BATCH_RECORD_SUCCESS,
		productBatchRecord: productBatchRecord,
	};
};

export const getProductBatchRecordFailed = () => {
	return {
		type: actionTypes.PRODUCT_BATCH_RECORD_FAILED,
	};
};

export const getProductBatchRecords = (token, productId) => {
	return (dispatch) => {
		axios({
			method: "GET",
			url: "http://127.0.0.1:5000/api/batchRecords/" + productId,
			headers: {
				Accept: "application/json",
				Authorization: token,
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				console.log(res.data);
				dispatch(getProductBatchRecordSuccess(res.data));
			})
			.catch((error) => {
				console.log(error);
				dispatch(getProductBatchRecordFailed());
			});
	};
};
