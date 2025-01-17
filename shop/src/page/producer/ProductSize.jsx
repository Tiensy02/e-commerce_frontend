import './product.css'
export default function ProductSize({ sizes }) {
    return (
        <>
            <div className="mt-4 d-flex justify-content-between align-items-center">
                <h6 className="mb-0">Size</h6>
                <a href="#" className="text-body mb-0">Size guide</a>
            </div>
            <div className="d-flex flex-wrap text-center my-4">
                {Object.entries(sizes).map(([size, amount], i) =>

                    <div className="mb-3 me-3" key={i}>
                        <div className="form-check">
                            {(amount != 0) ?
                                <input className="form-check-input rounded-2" type="radio" name="flexRadioDefault" id={`input`  + i} />
                                :
                                <input className="form-check-input rounded-2" disabled type="radio" name="flexRadioDefault" id={`input`  + i} />
                            }
                            <label className="cursor-pointer" htmlFor={`input`  + i}>{size}</label>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}