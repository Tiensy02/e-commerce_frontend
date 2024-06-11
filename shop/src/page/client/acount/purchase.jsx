import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Paper } from '@mui/material';
import CartItem from '../../shopingCart/cartItems';
import { getLoggedInUser } from '../../../heppler/authUtils';
import { ORDER_API } from '../../../heppler/setting/apiConstant';
import { fetchJSON } from '../../../heppler/api';
import { useFetchOrderItemByOrderIdQuery } from '../../../redux/order/apiSlice';
import { useFetchProductsByIdsQuery } from '../../../redux/product/apiSlice';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function PurchaseElement({ products }) {
    console.log(products);
    
    return (
        <>
            {products.length > 0 && <div>
                {products.map((product, index) => {
                    return (
                        <CartItem
                        key={index}
                        src={product.imagePrimary}
                        alt={product.name}
                        name={product.name}
                        size={"XL"}
                        price={product.price}
                        stock={999}
                        discount={product.discount}
                        shopName={"nguyentiensy"}
                        isBought={true}
                        quantity={product.quantity}
                        cartItemId={product.cartItemId}
                        status={product.status}
                    />
                    )
                })}
            </div>}
            {products.length == 0 && <div>
                Chưa có đơn hàng
            </div>}
        </>
    )
}

export default function Purchase() {
    const [value, setValue] = React.useState(0);
    const [orderId, setOrderId] = React.useState();
    const [productIds, setProductIds] = React.useState([]);
    const [products, setProducts] = React.useState([]);
    const user = getLoggedInUser();

    const { data: orders, isSuccess: isSuccessOrder, isLoading: isLoadingOrder } = useFetchOrderItemByOrderIdQuery(orderId, { skip: !orderId })
    const { data: rawProducts, isSuccess: isSuccessProduct, isLoading: isLoadingProduct } = useFetchProductsByIdsQuery(productIds, { skip: productIds.length == 0 })

    React.useEffect(() => {
        if (!orderId) {
            const orderUrl = ORDER_API.GET_BY_USER + `/${user.userId}` 
            fetchJSON(orderUrl).then((value) => {
                setOrderId(value.id)
            }).catch((err) => {
                console.log(err);
            })
        }
    }, [])

    React.useEffect(() => {
        if (isSuccessOrder) {
            setProductIds(orders.map((order) => {
                return order.productId
            }))
        }
    }, [orders])

    const combineOrderItem = (products, orderItems) => {

        return products.map(product => {
            const orderItem = orderItems.find(item => item.productId === product.id);
            if (orderItem) {
                return { ...product, quantity: orderItem.quantity, status: orderItem.status };
            }
            return product;
        });
    };

    React.useEffect(() => {
        if (rawProducts) {
            const products = combineOrderItem(rawProducts, orders)
            setProducts(products)
        }
    }, [rawProducts])



    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const filterProductStatus =(status)=> {
        return products.filter(product => product.status === status)
    }

    return (
        <Box >
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Tất cả" {...a11yProps(0)} />
                    <Tab label="Chờ xác nhận" {...a11yProps(1)} />
                    <Tab label="Đang đóng gói" {...a11yProps(2)} />
                    <Tab label="Đang giao hàng" {...a11yProps(3)} />
                    <Tab label="Hoàn thành" {...a11yProps(3)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <PurchaseElement products={products} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <PurchaseElement products={filterProductStatus("CONFIRM")}/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <PurchaseElement products={filterProductStatus("PACKING")}/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                <PurchaseElement products={filterProductStatus("SHIPPING")}/>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={4}>
            <PurchaseElement products={filterProductStatus("DONE")}/>
            </CustomTabPanel>
        </Box>
    );
}
