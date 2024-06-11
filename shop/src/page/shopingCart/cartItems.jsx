import QuantityInput from "../../components/quantityInput/quantityInput";
import { Button } from "@mui/material";
import './index.css'
import { converToMoney } from "../../heppler/stringUtils";
import { useUpdateCartItemQuantityMutation } from "../../redux/cart/apiSlice";
export default function CartItem({
  src,
  atl,
  name,
  color,
  size,
  price,
  stock,
  shopName,
  isBought,
  quantity,
  discount = 0,
  heightImage = "100px",
  widthImage = "100px",
  cartItemId,
  status
}) {

  const [updateCartItem,{isSuccess}] = useUpdateCartItemQuantityMutation()
  const convertStatus = (status)=> {
    switch (status) {
      case "CONFIRM":
        return "Chờ xác nhận"
      case "SHIPPING":
        return "Đang vận chuyển"
      case "PACKING":
        return "Đang đóng gói"
      case 3:
        return "Đang giao hàng"
      case 4:
        return "Đã giao hàng"
      case 5:
        return "Đã nhận hàng"
      default:
        return "Chờ xác nhận"
    }
  }

  function updateQuantity(quantity) {
    return updateCartItem({
      id: cartItemId,
      quantity: quantity
    })
  }

  return (
    <div className="cart_wrapper">
      <div className="d-block ms-4 d-md-flex align-items-center">
        <img className="w-md-30 rounded-3" src={src} alt={atl} style={{ height: heightImage, width: widthImage }} />
        <div className="d-flex mt-3 info_cart" >
          <div className="w-100 w-md-50 ps-md-4 d-flex flex-column align-items-start justify-content-center row-gap-2">
            <h6 className="text-lg mb-1 ellipsis">{name}</h6>
            <div className="d-flex">
              {quantity && <p style={{ marginRight: "4px" }} className="mb-0 ms-2 text-sm">x{quantity}</p>}
              <p className="border-start ps-3 mb-0 text-secondary">{size}</p>
            </div>
            {!isBought && <div className="d-flex  align-items-center mt-6 ">
              {(stock) ?
                <>
                  <p className="mb-0 ms-2 text-sm">Còn hàng</p>
                </>
                :
                <>
                  <p className="mb-0 ms-2 text-sm">Hết hàng</p>
                </>
              }
            </div>}
          </div>
          <div>
            <div className="w-20 w-md-10 ms-2 input_number_cart">
              {status && <div style={{color:"red", fontSize:"16px", alignSelf:"end", marginBottom:'8px'}}>{convertStatus(status)}</div>}
              <div className='price-product' style={{marginBottom:"12px"}}>
                <p className='text-secondary m-0'><del>{converToMoney(price)}</del></p>
                <p className='price-info m-0'>{converToMoney(price - Math.round((price * discount) / 100))}</p>
                <div className='discount-product'>{discount + "%"}</div>
              </div>
              {!isBought && <QuantityInput updateQuantity={updateQuantity} initValue={quantity}/>}
              {isBought && status=="DONE" && <div className="d-flex justify-content-around">
                <Button variant="contained" color="primary" sx={{ width: '150px', height: "40px" }} className="ms-4">Đánh giá</Button>

              </div>}
            </div>

          </div>
          <div className="w-10 text-end">
            <a href="#">
              <i className="fas fa-times ms-3"></i>
            </a>
          </div>

        </div>
      </div>
    </div>
  )
}