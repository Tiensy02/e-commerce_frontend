import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REVIEW_API } from "../../heppler/setting/apiConstant";
import { converFromPageable } from "../../heppler/render";
export const reviewApi = createApi({
    reducerPath: 'reviewApi',
    baseQuery: fetchBaseQuery({ baseUrl: REVIEW_API.GET }),
    tagTypes: ['Reviews'],
    endpoints: (builder) => ({
        fetchReviews: builder.query({
            query: ({id, pageNumber = 0, pageSize = 10 }) => `/${id}?pageSize=${pageSize}&pageNumber=${pageNumber}`,
            transformResponse:(response,meta,arg) => {
                return converFromPageable(response)
            }
        })
    })
})
export const { useFetchReviewsQuery } = reviewApi;