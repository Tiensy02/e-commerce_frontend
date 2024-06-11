import { useState } from "react";
import Ratting from "../Ratting";
import './index.css'
/**
 * 
 * @param {Object} review: {
 *    rating: Number,
 *   avatar: String,
 *  name: String,
 * date: String,
 * comment: String} 
 * @returns 
 */
export default function ReviewComment({ rating, comment,avatar,name,date }) {
   
    return (<>
        <div className="d-flex flex-column align-items-start">
        <div className="d-flex column-gap-2 align-items-center">
                <a href="#" className="avatar avatar-lg rounded-circle min-width-50 min-height-50">
                    <img alt="Image placeholder" src={avatar} />
                </a>
                <div className="ms-2">
                    <h6 className="mb-0">{name}</h6>
                    <p className="text-sm m-0">{date}</p>
                </div>
            <Ratting rattingCore={rating} />

            </div>
            <p className="ms-0 mt-2 text-secondary commment-text">{comment}</p>
            

        </div>
        <hr className="dark horizontal" />
    </>)

}