import * as actionTypes from "../actions/actionTypes";

const initialState = {
	products: null,
	loading: false,
	itemsLoading: false,
	stocks: [],
	productBatches: [],
	batchFetchedFailed: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SYNC_PRODUCT_START:
			return {
				...state,
				loading: true,
			};
		case actionTypes.SYNC_PRODUCT_SUCCESS:
			return {
				...state,
				loading: false,
				products: action.products,
			};
		case actionTypes.SYNC_PRODUCT_FAILED:
			return {
				...state,
				loading: true,
			};
		case actionTypes.PRODUCT_RAWMATERIAL_START:
			return {
				...state,
				itemsLoading: true,
			};
		case actionTypes.PRODUCT_RAWMATERIAL_SUCCESS:
			return {
				...state,
				itemsLoading: false,
				stocks: action.stock,
			};
		case actionTypes.PRODUCT_RAWMATERIAL_FAILED:
			return {
				...state,
				itemsLoading: true,
			};
		case actionTypes.PRODUCT_BATCH_RECORD_SUCCESS:
			return {
				...state,
				productBatches: action.productBatchRecord,
				batchFetchedFailed: false,
			};
		case actionTypes.PRODUCT_BATCH_RECORD_FAILED:
			return {
				...state,
				batchFetchedFailed: true,
			};
		default:
			return state;
	}
};

export default reducer;
