import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { BASE_USER_URL, PRODUCT_API } from '../../heppler/setting/apiConstant';
import { converFromPageable } from '../../heppler/render';
export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_USER_URL }),
    tagTypes: ['Products'],
    endpoints: (builder) => ({
        fetchProducts: builder.query({
            query: ({ pageNumber = 0, pageSize = 10 }) => `/product?pageSize=${pageSize}&pageNumber=${pageNumber}`,
            transformResponse:(response,meta,arg) => {
                return converFromPageable(response)
            },
            transformErrorResponse(response,meta,arg) {
                return []
            }
        }),
        fetchProduct: builder.query({
            query: (id) => {
                console.log(id);
                return `/product/${id}`
            },
            providesTags:["products"]
        }),
        updateProduct: builder.mutation({
            query: ({id,product}) => ({
                url: `/product/update/${id}`,
                method: 'POST',
                body: product
            }),
            invalidatesTags:["products"]
        }),
        postProduct:builder.mutation({
            query: (product) => ({
                url: '/product/add',
                method: 'POST',
                body: product
            }),
            invalidatesTags:["products"]
        }),
        fetchShopProducts: builder.query({
            query: ({ownId}) => `/shop/products?ownId=${ownId}`,
            providesTags:['products']
        }),
        fetchProductsByIds: builder.query({
            query: (ids) => ({
                url: '/product/ids',
                method: 'POST',
                body: ids
            }),
            providesTags: []
        })
    })
    })
export const { useFetchProductsQuery,useFetchShopProductsQuery,useFetchProductsByIdsQuery, useFetchProductQuery,usePostProductMutation, useUpdateProductMutation } = productApi;