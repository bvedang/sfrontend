import * as actionTypes from "../actions/actionTypes";
const initialState = {
  rawmaterialArray: null,
  error: false,
  loading: false,
  stockUpdateLoading: false,
  columns: [
    { title: "ID", field: "id" },
    { title: "Name of RW", field: "name" },
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SYNC_STOCK_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.SYNC_STOCK_SUCCESS:
      return {
        ...state,
        loading: false,
        rawmaterialArray: action.rmw,
      };
    case actionTypes.SYNC_PRODUCT_FAILED:
      return {
        ...state,
        error: true,
        loading: true,
      };
    case actionTypes.STOCK_UPDATE_START:
      return {
        ...state,
        stockUpdateLoading: true,
      };
    case actionTypes.STOCK_UPDATE_SUCCESS:
      return {
        ...state,
        stockUpdateLoading: false,
      };
    case actionTypes.STOCK_UPDATE_FAILED:
      return {
        ...state,
        stockUpdateLoading: true,
      };
    case actionTypes.ADD_NEW_STOCK_START:
      return {
        ...state,
        stockUpdateLoading: true,
      };
    case actionTypes.ADD_NEW_STOCK_SUCCESS:
      return {
        ...state,
        stockUpdateLoading: false,
      };
    case actionTypes.ADD_NEW_STOCK_FAILED:
      return {
        ...state,
        stockUpdateLoading: true,
      };
    case actionTypes.DELETE_STOCK_START:
      return {
        ...state,
        stockUpdateLoading: true,
      };
      case actionTypes.DELETE_STOCK_SUCCESS:
        return{
          ...state,
          stockUpdateLoading:false
        }
        case actionTypes.DELETE_STOCK_FAILED:
        return{
          ...state,
          stockUpdateLoading:true
        }
    default:
      return state;
  }
};

export default reducer;
