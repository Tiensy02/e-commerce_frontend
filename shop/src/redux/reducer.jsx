import { combineReducers } from "redux";
import { productApi } from "./product/apiSlice";
import { reviewApi } from "./review/apiSlice";
import { userApi } from "./user/apiSlice";
import { categoryApi } from "./category/apiSlice";
import { ShopApi } from "./shop/apiSlice";
import { cartApi } from "./cart/apiSlice";
import { orderApi } from "./order/apiSlice";
import localSlice from "./localVariable/apiSlice";

const appReducer = combineReducers({
    [productApi.reducerPath]: productApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [userApi.reducerPath]:userApi.reducer,
    [categoryApi.reducerPath]:categoryApi.reducer,
    [ShopApi.reducerPath]:ShopApi.reducer,
    [cartApi.reducerPath]:cartApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [localSlice.reducerPath] : localSlice.reducer
})
export default appReducer;