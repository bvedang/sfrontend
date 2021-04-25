import * as actionTypes from "../actions/actionTypes";
import axios from "axios";

export const syncStockStart = () => {
	return {
		type: actionTypes.SYNC_STOCK_START,
	};
};

export const syncStockSuccess = (rmw) => {
	return {
		type: actionTypes.SYNC_STOCK_SUCCESS,
		rmw: rmw,
	};
};
export const syncStockFailed = () => {
	return {
		type: actionTypes.SYNC_STOCK_FAILED,
	};
};

export const syncStock = (token) => {
	return (dispatch) => {
		dispatch(syncStockStart());
		axios({
			method: "GET",
			url: "http://127.0.0.1:5000/api/allrawmaterials",
			headers: {
				Authorization: token,
			},
		})
			.then((response) => {
				console.log(response.data);
				dispatch(syncStockSuccess(response.data));
			})
			.catch((error) => {
				console.log(error);
				dispatch(syncStockFailed());
			});
	};
};

export const stockUpdateStart = () => {
	return {
		type: actionTypes.STOCK_UPDATE_START,
	};
};

export const stockUpdateFailed = () => {
	return {
		type: actionTypes.STOCK_UPDATE_FAILED,
	};
};

export const stockUpdateSuccess = () => {
	return {
		type: actionTypes.STOCK_UPDATE_SUCCESS,
	};
};

export const stockUpdateInit = (token, id, name) => {
	return (dispatch) => {
		dispatch(stockUpdateStart());
		axios({
			method: "PUT",
			url: "http://127.0.0.1:5000/api/rawmaterial",
			headers: {
				Authorization: token,
				"Content-Type": "application/json",
			},
			data: {
				id: id,
				name: name,
			},
		})
			.then((response) => {
				console.log(response.data);
				dispatch(syncStock(token));
				dispatch(stockUpdateSuccess());
			})
			.catch((error) => {
				console.log(error);
				dispatch(stockUpdateFailed());
			});
	};
};

export const addNewStockStart = () => {
	return {
		type: actionTypes.ADD_NEW_STOCK_START,
	};
};
export const addNewStockSuccess = () => {
	return { type: actionTypes.ADD_NEW_STOCK_SUCCESS };
};

export const addNewStockFailed = () => {
	return { type: actionTypes.ADD_NEW_STOCK_FAILED };
};

export const addNewStockInit = (token, name) => {
	return (dispatch) => {
		dispatch(addNewStockStart());
		axios({
			method: "POST",
			url: "http://127.0.0.1:5000/api/rawmaterial",
			headers: {
				Authorization: token,
				"Content-Type": "application/json",
			},
			data: {
				name: name,
			},
		})
			.then((response) => {
				console.log(response.data);
				dispatch(syncStock(token));
				dispatch(addNewStockSuccess());
			})
			.catch((error) => {
				console.log(error);
				dispatch(addNewStockFailed());
			});
	};
};

export const deleteStockStart = () => {
	return {
		type: actionTypes.DELETE_STOCK_START,
	};
};
export const deleteStockSuccess = () => {
	return {
		type: actionTypes.DELETE_STOCK_SUCCESS,
	};
};
export const deleteStockFailed = () => {
	return {
		type: actionTypes.DELETE_STOCK_FAILED,
	};
};

export const deleteStockInit = (token, id) => {
	return (dispatch) => {
		dispatch(deleteStockStart());
		axios({
			method: "DELETE",
			url: "http://127.0.0.1:5000/api/rawmaterial",
			headers: {
				Authorization: token,
				"Content-Type": "application/json",
			},
			data: {
				id: id,
			},
		})
			.then((response) => {
				console.log(response.data);
				dispatch(syncStock(token));
				dispatch(deleteStockSuccess());
			})
			.catch((error) => {
				console.log(error);
				dispatch(deleteStockFailed());
			});
	};
};
