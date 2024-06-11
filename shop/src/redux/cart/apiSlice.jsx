import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CART_API } from "../../heppler/setting/apiConstant";

export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery({ baseUrl: CART_API.GET }),
    tagTypes: ['Cart'],
    endpoints: (builder) => ({
        fetchCart: builder.query({
            query: (id) => `/${id}`,
        }),
        fetchCartByUser: builder.query({
            query: (id) => `/user?userId=${id}`,
            providesTags:['Cart']
        }),
        addCart: builder.mutation({
            query: (data) => ({
                url: '/add',
                method: 'POST',
                body: data,
            })
        }),
        addCartItem: builder.mutation({
            query: (data) => ({
                url: '/cart-item/add',
                method: 'POST',
                body: data,
            }),
            invalidatesTags:["Cart"]
        }),
        updateCartItemQuantity: builder.mutation({
            query: ({id,quantity}) => ({
                url: `/cart-item/${id}?quantity=${quantity}`,
                method: 'POST',
            }),
            invalidatesTags:["Cart"]
        }) 
    }),
})
export const {useFetchCartByUserQuery,useAddCartItemMutation, useAddCartMutation, useUpdateCartItemQuantityMutation} = cartApi