import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SHOP_API } from "../../heppler/setting/apiConstant";

export const ShopApi = createApi({
    reducerPath: 'ShopApi',
    tagTypes: ['Shop'],
    baseQuery: fetchBaseQuery({ baseUrl: SHOP_API.GET }),
    endpoints: (builder) => ({
        fetchShopByUser: builder.query({
            query: (id) => `/user/${id}`,
        }),
        
    }),
})
export const {useFetchShopByUserQuery} = ShopApi