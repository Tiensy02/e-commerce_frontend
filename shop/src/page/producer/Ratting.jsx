import React, { useState } from 'react';
import './product.css'

export default function Ratting({ rattingCore, size = 20 }) {
    // chuỗi bất kì, để đảm bảo rằng khi render nhiều component Ratting trong 1 div thì sẽ không bị ghi đè giá trị rattingCore
    let randomString = Math.random().toString(36).substring(2, 15);

    const [selectedRating, setSelectedRating] = useState(null);
    

    const handleRatingChange = (event) => {
        if (!rattingCore) {
            console.log(rattingCore);
            setSelectedRating(event.target.value);
            event.target.checked = true
        }else {
            event.target.checked = false
        }
    };

    if (rattingCore) {
        rattingCore = Math.floor(rattingCore)
    }

    return (
        <>
            <div className={`rating ${rattingCore? '':'active'}`}>
                <input type="radio" name={randomString} value="5" id="5" checked={rattingCore && rattingCore==5} onChange={handleRatingChange}/><label style={{ fontSize: size }} htmlFor="5">☆</label>
                <input type="radio" name={randomString} value="4" id="4" checked={rattingCore && rattingCore==4} onChange={handleRatingChange}/><label style={{ fontSize: size }} htmlFor="4">☆</label>
                <input type="radio" name={randomString} value="3" id="3" checked={rattingCore && rattingCore==3} onChange={handleRatingChange}/><label style={{ fontSize: size }} htmlFor="3">☆</label>
                <input type="radio" name={randomString} value="2" id="2" checked={rattingCore && rattingCore==2} onChange={handleRatingChange}/><label style={{ fontSize: size }} htmlFor="2">☆</label>
                <input type="radio" name={randomString} value="1" id="1" checked={rattingCore && rattingCore==1} onChange={handleRatingChange}/><label style={{ fontSize: size }} htmlFor="1">☆</label>
            </div>
            {!rattingCore && <p>Selected Rating: {selectedRating}</p>}
        </>
    )
}   