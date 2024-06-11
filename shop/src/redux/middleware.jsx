import { productApi } from "./product/apiSlice";
import { reviewApi } from "./review/apiSlice";
import { userApi } from "./user/apiSlice";
import { categoryApi } from "./category/apiSlice";
import { ShopApi } from "./shop/apiSlice";
import { cartApi } from "./cart/apiSlice";
import { orderApi } from "./order/apiSlice";
const  appMiddleware = [
    productApi.middleware,
    reviewApi.middleware,
    userApi.middleware,
    categoryApi.middleware,
    ShopApi.middleware,
    cartApi.middleware,
    orderApi.middleware,
]
export default appMiddleware;