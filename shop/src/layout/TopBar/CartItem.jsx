import { LoadingComponent } from "../../components/Loadding"
import { useFetchProductsByIdsQuery } from "../../redux/product/apiSlice"
import { converToMoney } from '../../heppler/stringUtils';
import { Button } from "@mui/material";

import "./topbar.css"
import { Link, StaticRouter } from "react-router-dom/cjs/react-router-dom.min";
import { getLoggedInUser } from "../../heppler/authUtils";

export default function CartItem({ cart, productIds }) {
    const user = getLoggedInUser()
    const { data: products, isLoading, isSuccess } = useFetchProductsByIdsQuery(productIds)
    return (
        <div className="cart_box">
            <div>

                {isSuccess && products.length > 0 && products?.map((product, index) => (
                    <div key={index}>

                        <div style={{ marginRight: "8px" }} className="ms-2 cart_item d-flex column-gap-2 justify-content-between align-items-center">
                            <div className="d-flex column-gap-2">
                                <img style={{ height: "60px", width: "60px", borderRadius: "2px" }} src={product.imagePrimary} alt={product.name} />
                                <div className="cart_item_info_left d-flex flex-column row-gap-2">
                                    <p style={{ margin: 0, padding: 0 }}>{product.name}</p>
                                    <p className="sub-title">{product.subTitle}</p>
                                </div>
                            </div>
                            <div className="cart_item_info_right" >
                                <div className='price-product' style={{ marginBottom: "12px" }}>
                                    <p style={{ fontSize: "16px" }} className='price-info m-0'>{converToMoney(product.price - Math.round((product.price * product.discount) / 100))}</p>
                                    <div className='discount-product'>{product.discount + "%"}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                ))}
                {
                    isLoading && (
                        <LoadingComponent isWindow={false} ></LoadingComponent>
                    )
                }
                {isSuccess && products.length == 0 && <div className="cart_nothing">
                    Giỏ hàng trống
                </div>}
            </div>
            {isSuccess && products.length > 0 &&<div >
                <hr className="horizontal dark" />

                <Link className="link-text-none" to={{ pathname: `/cart/${user.userId}`, state: { products, cart } }}>
                    <div style={{ marginRight: "12px" }} className="d-flex justify-content-end">
                        <Button variant="contained" color="primary">Xem giỏ hàng</Button>
                    </div>
                </Link>
            </div>}
        </div>
    )
}