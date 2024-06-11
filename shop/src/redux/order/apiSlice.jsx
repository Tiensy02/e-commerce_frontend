import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ORDER_API, ORDER_ITEM_API } from "../../heppler/setting/apiConstant";
import { mergeOrders } from "../../heppler/render";

export const orderApi = createApi({
    reducerPath:'orderApi',
    baseQuery: fetchBaseQuery({baseUrl: ORDER_ITEM_API.GET}),
    tagTypes:['Orders'],
    endpoints: (builder) => ({
        postOrderItem: builder.mutation({
            query: (data) => ({
                url: '/add',
                method: 'POST',
                body: data
            })
        }),
        fetchOrderItemByOrderId: builder.query({
            query: (id) => `/order/${id}`,
            providesTags:['Orders']
        }),
        fetchOrderItemByOwnProduct: builder.query({
            query: (id) => `/shop?userId=${id}`,
            transformResponse:(response, meta, arg) => {
                const data = mergeOrders(response)
                return {orderItemOrigin:response, orderItems:data}
            },
            providesTags:['orderShop']
        }),
        updateOrderItemStatus: builder.mutation({
            query:(data) => {
                return {
                    url: `/update`,
                    method: 'POST',
                    body: data
                }
            },
            invalidatesTags:['orderShop']
        })
    })
})
export const {usePostOrderItemMutation, useFetchOrderItemByOrderIdQuery, useFetchOrderItemByOwnProductQuery, useUpdateOrderItemStatusMutation} = orderApi