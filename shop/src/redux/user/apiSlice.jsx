import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_USER_URL } from "../../heppler/setting/apiConstant";
export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_USER_URL }),
    tagTypes: ['UserConnects'],
    endpoints: (builder) => ({
        fetchUserConnect: builder.query({
            query: ({ id }) => `/user/user-connected/${id}`,
            providesTags:["UserConnects"]
        }),
        fetchMessage: builder.query({
            query: ({ senderId, recipientId }) => `/message/${senderId}/${recipientId}`,
            transformResponse: (response, meta, arg) => {
                return response
            }
        }),
        postUserFollow:builder.mutation({
            query: (data) => ({
                url: `/user/add/userConnected`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["UserConnects"]
        }),
        fetchUser: builder.query({
            query: (id) => `/user/${id}`,
            providesTags: ["user"]
        }),
        fetchUserByIds: builder.mutation({
            query: (ids) => ({
                url: `/user/ids`,
                method: "POST",
                body: ids
            }),
            transformResponse: (response) => {
                return response.map((elem) => {
                    return {
                        id: elem.id,
                        avatar:elem.avatar,
                        name: elem.userNameAlias,
                        email:elem.email
                    }
                })

            },
            invalidatesTags: ["user"]
        }),
        updateUser: builder.mutation({
            query: ({ id, user }) => ({
                url: `/user/update/${id}`,
                method: 'POST',
                body: user
            }),
            invalidatesTags: ["user"]   
        })
    }),
})

export const { useFetchUserConnectQuery, useFetchMessageQuery, useFetchUserQuery, useFetchUserByIdsMutation,useUpdateUserMutation, usePostUserFollowMutation } = userApi;