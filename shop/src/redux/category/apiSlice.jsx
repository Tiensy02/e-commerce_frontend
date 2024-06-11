import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CATEGORY_API } from "../../heppler/setting/apiConstant";
export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    tagTypes: ['Categories'],
    baseQuery: fetchBaseQuery({ baseUrl: CATEGORY_API.GET }),
    endpoints: (builder) => ({
        fetchCategories: builder.query({
            query: ({ pageNumber = 0, pageSize = 0 }) => `?pageSize=${pageSize}&pageNumber=${pageNumber}`,
            transformResponse:(response,meta,arg) => {
                const resultAray = response.filter ((elem)=> {
                   return typeof elem === 'object'
                })                
                let result = {};
                resultAray.forEach((elem) => {
                    result[elem.id] = elem;
                })
                return result
            },
        }),
    }),
})
export const {useFetchCategoriesQuery} = categoryApi
