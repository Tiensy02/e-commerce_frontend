import { useEffect, useState, useMemo } from "react"
import Ratting from "../Ratting"
import { isNumber } from "../../../heppler/stringUtils";

/**
 * 
 * @param {Array} reviews : [{
 *     rating: Number,
 *     avatar: String,
 *     name: String,
 *     date: String,
 *     comment: String
 *     }]
 */
export default function ReviewProcess({ reviews }) {
    // mảng chứa số lượng đánh giá của từng sao
    var ratings = [0, 0, 0, 0, 0, 0];
    // mảng chứa phần trăm đánh giá của từng sao
    var ratingsPercentage = [0, 0, 0, 0, 0, 0];
    var rattingList = [];


    useMemo(() => {
        reviews?.forEach(reviews => {
            ratings[reviews.rating]++
        })

        for (let i = 1; i < 6; i++) {
            ratingsPercentage[i] = Math.trunc((ratings[i] * 100) / reviews?.length);
        }

    })



    return (
        <>
            {ratingsPercentage.reverse().slice(0, 5).map((rating, index) => {
                return (
                    <div className="progress-wrapper d-flex align-items-center" key={index}>
                    <div className="d-flex">
                        <Ratting rattingCore={5 - index} size={20} />
                    </div>
                    <div className="progress w-100 me-3" style={{height:'10px'}}>
                        <div className="progress-bar bg-warning" role="progressbar" style={{ width: rating + '%' }}></div>
                    </div>
                    <div className="progress-info">
                        <div className="progress-percentage">
                        <span className="text-sm font-weight-bold">{isNumber(rating) ? rating: 0}%</span>
                        </div>
                    </div>
                </div>
                )
            })}
        </>
    )

}