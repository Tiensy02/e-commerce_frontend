export default function OrderSummary({ subtotal}) {
    return (
        <>
            <ul className="list-unstyled">
                <li className="mt-2">
                    <div className="d-flex justify-content-between">
                        <p className={`opacity-8`}>Số tiền thanh toán</p>
                        <p className={`fw-bold opacity-8`}>{subtotal}</p>
                    </div>
                </li>
            </ul>
        </>
    )

}