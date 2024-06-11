import { useEffect, useRef, useState } from "react";
import PrimarySearchAppBar from "../../layout/TopBar/Bar";
import './index.css'
import { Button, Paper } from "@mui/material";
import { converToMoney } from "../../heppler/stringUtils";
import { ORDER_API } from "../../heppler/setting/apiConstant";
import { getLoggedInUser } from "../../heppler/authUtils";
import { fetchJSON } from "../../heppler/api";
import { toast } from "react-toastify";
import { usePostOrderItemMutation } from "../../redux/order/apiSlice";
import LoadingButton from '@mui/lab/LoadingButton';


export default function Payment(props) {
    const selectedProducts = props.location.state.selectedProducts
    const totalPrice = props.location.state.totalPrice
    const [postOrderItem, {isLoading,isSuccess}] = usePostOrderItemMutation();
 

    function handleOrder() {
        const orderOption = {
            method: "GET"
        }
        const orderUrl = ORDER_API.GET_BY_USER +`/${getLoggedInUser().userId}`

        fetchJSON(orderUrl,orderOption).then((value)=> {
            console.log(value);
            const allPost = []

            selectedProducts.forEach((elem)=> {

                const data = {
                    orderId: value.id,
                    productId: elem.id,
                    quantity: elem.quantity,
                    price:elem.price - Math.round((elem.price * elem.discount) / 100),
                    ownProductId:elem.userId
                }
                
                allPost.push(postOrderItem(data))
            })

            Promise.all(allPost).then((value)=> {
                console.log(value);
                let postSuccess = true
                value.forEach((elem)=> {
                    if(elem.error) {
                        postSuccess = false
                    }
                })
                if (postSuccess) {
                    location.href = "/home"
                }
            }).catch((err) => {
                console.log(err);
                toast.error("Có lỗi xảy ra")
            })
            
        }).catch((e)=>{
            console.log(e);
            toast.error("Có lỗi xảy ra")
        })
    }
    return (
        <>
            <PrimarySearchAppBar />
            <div className="title_pay">
                <h4 style={{ textAlign: 'start', marginLeft: "150px" }}>Thanh toán</h4>
            </div>
            <Paper sx={{ marginTop: "148px", padding: "24px" }} >
                <p style={{ textAlign: "start", fontSize: "32px" }}>Sản phẩm</p>
                <div className="product_wrapper">
                    {selectedProducts.map((elem,index) => {
                        return (
                            <div key={index} className="d-flex justify-content-between" >
                                <div className='d-flex column-gap-2 align-items-center p-2' >
                                    <img src={elem.imagePrimary} style={{ height: "80px", width: "80px", borderRadius: "4px" }} alt={elem.name} />
                                    <div className='ms-2' style={{ display: 'flex', flexDirection: "column", rowGap: "8px" }}>
                                        <p style={{ padding: 0, margin: 0 }}>{elem.name}</p>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className='price-product'>
                                        <p className='text-secondary m-0'><del>{converToMoney(elem.price) }</del></p>
                                        <p className='price-info m-0'>{converToMoney(elem.price - Math.round((elem.price * elem.discount) / 100)) }</p>
                                        <div className='discount-product'>{elem.discount + "%"}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Paper>

            <Paper sx={{ marginTop: "12px", padding: "24px" }}>
                <div className="d-flex align-items-center justify-content-between">
                    <p style={{ textAlign: "start", fontSize: "24px" }}>Phương thức thanh toán</p>
                    <p style={{ textAlign: "start", fontSize: "16px" }}>Thanh toán khi nhận hàng</p>
                </div>
                <hr className="horizontal dark" style={{ marginTop: "4px" }} />
                <div className="pay-info">
                    <div style={{width:"350px"}} className="d-flex justify-content-between align-items-center">
                    <p style={{margin:0}}>Tổng số tiền thanh toán: </p>
                    <span className="price-info">{converToMoney(totalPrice)}</span>
                    </div>
                    <LoadingButton onClick={handleOrder} variant="contained" loading={isLoading}>Đặt hàng </LoadingButton>
                </div>
            </Paper>
        </>
    )
}