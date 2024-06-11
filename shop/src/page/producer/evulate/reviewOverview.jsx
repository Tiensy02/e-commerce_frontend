import { useEffect, useMemo, useState } from "react";
import Ratting from "../Ratting";
import ReviewProcess from "./reviewProcess";
import ReviewComment from "./reviewComment";
import './index.css'
import { useFetchReviewsQuery } from "../../../redux/review/apiSlice";
export default function ReviewOverview({id}) {

  const [pageSize, setPageSize] = useState(10)
  const [pageNumber,setPageNumber] = useState(0)

  const {data: reviewsPageAble, isLoading} = useFetchReviewsQuery({id,pageNumber,pageSize})
  const [reviews,setReviews] = useState();
  useEffect(()=> {
    setReviews(reviewsPageAble?.data)
  },[reviewsPageAble])

    const [rating, setRating] = useState(0);

    return (
        <div style={{backgroundColor:'white'}}>
   
    <div className="row">
      <div className="col-12 col-lg-5">
        <div className="p-4 mb-4">
          <h4 className="mb-3">Đánh giá</h4>
          <div className="d-flex align-items-center">
            <p className="mb-0 ms-2">Tổng lượt đánh giá <b>{reviews?.length}</b></p> 
          </div>
          <div className="mt-4 mb-5">
            <ReviewProcess reviews={reviews}/>
          </div>
          <button className="btn btn-dark w-100 mb-0">Write a review</button>
        </div>
      </div>
      <div className="col-12 col-lg-7 max-height-500 overflow-y-scroll rounded-3 pt-4">
        <div className="card card-plain">
          <div className="card-body">
            {
              reviews?.length == 0 && <p className="text-center">Chưa có đánh giá nào</p>
            }
            {reviews?.map((review, i) => 
              <ReviewComment key={i} rating={review?.rating} 
              comment={review?.content} date={review?.createdDate} 
              avatar = {review?.userAvatar}
              name = {review?.username}
               />
            )}
          </div>
        </div>
      </div>
    </div>

    </div>
    )
}