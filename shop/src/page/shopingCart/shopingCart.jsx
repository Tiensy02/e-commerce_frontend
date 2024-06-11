import { useEffect, useState } from "react";
import * as React from 'react';
import PrimarySearchAppBar from "../../layout/TopBar/Bar";
import ShopProduct from "./ShopProduct";
import OrderSummary from "./orderSumary";
import './index.css';
import { converToMoney } from "../../heppler/stringUtils";
import { useFetchUserByIdsMutation } from "../../redux/user/apiSlice";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import { getLoggedInUser } from "../../heppler/authUtils";
import { useFetchCartByUserQuery } from "../../redux/cart/apiSlice";
import { useFetchProductsByIdsQuery } from "../../redux/product/apiSlice";

export default function ShoppingCart(props) {
    const user = getLoggedInUser();
    const [productIds, setProductIds] = useState([])

    const { data: cart, isLoading: isLoadingCart, isSuccess: isSuccessCart } = useFetchCartByUserQuery(user?.userId, { skip: !user })
    const { data: products, isLoading: isLoadingProduct, isSuccess: isSuccessProduct, refetch:refetchProduct } = useFetchProductsByIdsQuery(productIds, { skip: productIds.length == 0 })


    const [shopProducts, setShopProducts] = useState({});
    const [amount, setAmount] = useState(0);
    const [selectedProducts, setSelectedProducts] = useState([]);

    const [getUser, { isSuccess }] = useFetchUserByIdsMutation();
    const [isFirstLoadDone, setIsFirstLoadDone] = useState(false);
    

    useEffect(() => {
        if (isFirstLoadDone) {
            let total = 0;
            selectedProducts.forEach(item => {
                if (item?.quantity) {
                    total += (item.price - Math.round((item.price * item.discount) / 100)) * item.quantity;
                } else {
                    total += (item.price - Math.round((item.price * item.discount) / 100)) * 0;
                }
            });
            setAmount(total);
        }
    }, [selectedProducts]);

    const groupByUserId = (arr) => {
        return arr.reduce((acc, item) => {
            if (!acc[item.userId]) {
                acc[item.userId] = [];
            }
            acc[item.userId].push(item);
            return acc;
        }, {});
    };

    const addQuantity = (products, cartItems) => {

        return products.map(product => {
            const cartItem = cartItems.find(item => item.productId === product.id);
            if (cartItem) {
                return { ...product, quantity: cartItem.customField.quantity, cartItemId: cartItem.id };
            }
            return product;
        });
    };

    useEffect(() => {
        if (isSuccessCart) {
            const productIds = []
            cart.cartItems.forEach(element => {
                productIds.push(element.productId)
            });
            setProductIds(productIds)
            if (products) {
                refetchProduct();
                console.log(productIds);
                
            }
            
        }
    }, [cart,refetchProduct])

    useEffect(() => {

        if (isSuccessProduct) {
            const newProducts = addQuantity(products, cart.cartItems);
            const groupProducts = groupByUserId(newProducts);
            const userIds = Object.keys(groupProducts);

            getUser(userIds).then((value) => {
                const userIdToNameMap = value.data.reduce((acc, user) => {
                    acc[user.id] = user.name;
                    return acc;
                }, {});

                const productsByUserName = Object.keys(groupProducts).reduce((acc, userId) => {
                    const userName = userIdToNameMap[userId] || userId;
                    acc[userName] = groupProducts[userId];
                    return acc;
                }, {});
                setShopProducts(productsByUserName);
                setIsFirstLoadDone(true);
            });
        }
    }, [isFirstLoadDone, isSuccessProduct,cart,products]);


    return (
        <div className="shop_cart-container flex-column">
            <PrimarySearchAppBar />
            <h3 className="mb-2 ms-2 cart_header">Giỏ hàng của bạn</h3>
            <div className="shop_cart-body">
                <div className="cart_container col-12 col-lg-7">
                    {Object.keys(shopProducts).map((userName, i) => (
                        <div key={i}>
                            <ShopProduct
                                shopName={userName}
                                products={shopProducts[userName]}
                                selectedProducts={selectedProducts}
                                setSelectedProducts={setSelectedProducts}
                            />
                            {i !== Object.keys(shopProducts).length - 1 && (
                                <hr className="horizontal dark" style={{ marginTop: "4px" }} />
                            )}
                        </div>
                    ))}
                </div>
                <div style={{ marginRight: "24px" }} className="checkout_box">
                    <div className="card shadow-xs border bg-gray-100">
                        <div className="card-body p-lg-5">
                            <h5 className="mb-4">Đơn mua</h5>
                            <OrderSummary
                                subtotal={converToMoney(amount)}
                            />
                            <button onClick={() => {
                                if (selectedProducts.length == 0) {
                                    toast.error("Vui lòng chọn sản phẩm thanh toán")
                                }
                            }
                            } className="btn btn-dark btn-lg w-100">
                                {selectedProducts.length > 0 && <Link className='link-text-none' to={{ pathname: "/pay", state: { selectedProducts, totalPrice: amount } }}>Thanh toán</Link>}
                                {selectedProducts.length == 0 && <>Thanh toán</>}

                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
