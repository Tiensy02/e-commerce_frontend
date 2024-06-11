export const BASE_USER_URL = "http://localhost:8088/api/v1";
export const BASE_NOTIFICATION_URL = "http://localhost:8081/api/v1"
export const AUTHEN_API = {
    REGISTER: BASE_USER_URL+ "/client/register",
    LOGIN: BASE_USER_URL+ "/client/authenticate",
    LOGOUT: BASE_USER_URL+ "/auth/logout",
}
export const CRYPTO_API = {
    GET_PUBLIC_KEY: BASE_USER_URL+ "/crypto/public-key",
    POST_SECECT_KEY: BASE_USER_URL+ "/crypto/secret-key"
}
export const PRODUCT_API = {
    GET: BASE_USER_URL+ "/product",
}
export const REVIEW_API = {
    GET: BASE_USER_URL+ "/product/review",
}
export const SOCKET_API = {
    CONNECT :"http://localhost:8082/ws",
    USER: "http://localhost:8088/ws/user"
}
export const USER_API = {
    GET: BASE_USER_URL + "/user",
    USER_CONNECT : BASE_USER_URL + "/user/user-connected",
    UPDATE_NOTIFICATION_SETTING:BASE_USER_URL+  "/user/notificationSetting/update/"
}
export const CATEGORY_API = {
    GET: BASE_USER_URL+ "/category",
}
export const SHOP_API = {
    GET: BASE_USER_URL+ "/shop",
    GET_PRODUCT: BASE_USER_URL + "/shop/products"
}

export const CART_API = {
    GET: BASE_USER_URL+ "/cart",
    ADD: BASE_USER_URL+ "/add",
    UPDATE: BASE_USER_URL+ "/update",
    DELETE: BASE_USER_URL+ "/delete"
}
export const ORDER_API = {
    GET: BASE_USER_URL+ "/order",
    GET_BY_USER: BASE_USER_URL+ "/order/user",
    GET_BY_SHOP: BASE_USER_URL+ "/order/shop",
    GET_BY_STATUS: BASE_USER_URL+ "/order/status",
    GET_BY_ID: BASE_USER_URL+ "/order/id"
}

export const ORDER_ITEM_API = {
    GET: BASE_USER_URL+ "/order-item",
    ADD: BASE_USER_URL+ "/order-item/add",
    UPDATE: BASE_USER_URL+ "/order-item/update",
    DELETE: BASE_USER_URL+ "/order-item/delete"
}

export const CHANNEL_API = {
    ADD_USER:BASE_NOTIFICATION_URL + "/notification/channel/add/user"
}