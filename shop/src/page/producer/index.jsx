import { useEffect, useMemo, useState } from 'react'
import SelectComponent from '../../components/mutilSelectedForm/mutilSelectedForm'
import UploadImage from '../../components/uploadImage/uploadImage'
import { convertToArray, flatObjectToArray, flatAllArray, convertToArrayWithTargetName } from '../../heppler/arrayUtils'
import ReviewOverview from './evulate/reviewOverview'
import ReviewProcess from './evulate/reviewProcess'
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import './product.css'
import ProductGallery from './ProductGallery'
import ProductSize from './ProductSize'
import Ratting from './Ratting'
import { useFetchProductQuery } from '../../redux/product/apiSlice'
import { LoadingComponent } from '../../components/Loadding'
import { converToMoney } from '../../heppler/stringUtils'
import { useParams } from 'react-router-dom/cjs/react-router-dom'
import { useFetchUserQuery } from '../../redux/user/apiSlice'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { Avatar, Button } from '@mui/material'
import ShopInfo from './shopInfo'
import NotificationAddOutlinedIcon from '@mui/icons-material/NotificationAddOutlined';
import PrimarySearchAppBar from '../../layout/TopBar/Bar'
import Tooltip from '@mui/material/Tooltip';
import { BASE_NOTIFICATION_URL, CHANNEL_API } from '../../heppler/setting/apiConstant'
import { getLoggedInUser } from '../../heppler/authUtils'
import { toast } from 'react-toastify'
import { useAddCartItemMutation, useFetchCartByUserQuery } from '../../redux/cart/apiSlice'
import SContainer from '../../layout/container/SContainer'
export default function ProductView() {
  const { id } = useParams();

  const { data: product, isLoading, isSuccess: isSuccessProduct } = useFetchProductQuery(id)
  const [addCart, { isSuccess: isAddCartSuccess, isLoading: isLoadingAddCart }] = useAddCartItemMutation();
  const userCurrent = getLoggedInUser();
  const { data: cart, isLoading: isLoadingCart, isSuccess: isSuccessCart } = useFetchCartByUserQuery(userCurrent.userId, { skip: !userCurrent })
  const [isFlow, setIsFlow] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault();
    const customField = {
      quantity: 1
    }
    const data = {
      cartId: cart.cartId,
      productId: product.id,
      customField: customField
    }
    addCart(data).then((value) => {
      console.log(value);
      console.log(value.originalStatus);


      if (value.error) {
        toast.error("Thêm vào giỏ hàng thất bại")
        return
      } else {
        toast.success("Thêm vào giỏ hàng thành công")
      }
    })
  }
  function handleClickNotification() {
    const channels = product.chanelIds;
    const channelId = channels.user_discount;

    const url = CHANNEL_API.ADD_USER
    const user = getLoggedInUser();
    const data = {
      userId: user.userId,
      channelId: channelId
    }
    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    fetch(url, option).then((value) => {
      if (value.status == 200) {
        setIsFlow(true)
        toast.success("bạn sẽ nhận thông báo về sản phẩm")
      } else {
        console.log(value);

        toast.error("Có lỗi xảy ra, vui lòng thử lại")
      }
    })

  }
  useEffect(()=> {
    // const objDiv = document.getElementById('product_page');
    // objDiv.scrollTop = objDiv.scrollHeight;
    
  },[])



  return <div id='product_page'>
    <PrimarySearchAppBar></PrimarySearchAppBar>
    {!isLoading && <div style={{ border: 'none', backgroundColor: 'white' }} className="card card-product card-plain">
      <div className="row">
        {(product.images.length != 0) &&
          <ProductGallery images={product.images} />
        }
        <div className="col-12 col-lg-6 ps-lg-5">
          <div className='header_product position-relative'>
            {(product.name.length != 0) &&
              <div className='d-flex justify-content-between column-gap-4 align-items-center mt-4'>
                <h2 >{product.name}</h2>
                <Tooltip title="Theo dõi sản phẩm">
                  <div onClick={() => {
                    handleClickNotification()
                  }} className='bell d-flex column-gap-2' style={{ cursor: 'pointer' }}>
                    {!isFlow && <NotificationAddOutlinedIcon color='primary' />}
                    {isFlow && <NotificationAddIcon color='primary' />}
                  </div>
                </Tooltip>
              </div>

            }
            {(product.subTitle.length != 0) &&
              <p className="mb-5">{product.subTitle}</p>
            }
          </div>

          <form action="" method="post" className='size_wrapper'>
            {(product.price.length != 0) &&
              <div className="d-flex">
                <div className='price-product'>
                  <p className='text-secondary m-0'><del>{converToMoney(product.price) }</del></p>
                  <p className='price-info m-0'>{converToMoney(product.price - Math.round((product.price * product.discount) / 100)) }</p>
                  <div className='discount-product'>{product.discount + "%"}</div>
                </div>
              </div>
            }

            {
              product?.ratting != 0 && <div className="d-flex align-items-center">
                <Ratting rattingCore={product.ratting} size={20} />
                <span className="ms-3 text-secondary">{product?.reviews} reviews</span>
              </div>
            }
            {product?.ratting == 0 && <p className='text-secondary'>Chưa có đánh giá</p>}

            {(product.customField?.size != null) &&
              <ProductSize sizes={product.customField?.size} />
            }
            <div className='d-flex column-gap-3 justify-content-start'>

              <button color='secondary' className='button-cart' style={{ backgroundColor: '#015ae9', color: "white", borderRadius: '4px', padding: "4px", border: "none" }} onClick={handleSubmit}>Thêm vào giỏ hàng</button>
              <Button color='primary' onClick={handleSubmit}>Mua ngay</Button>

            </div>
          </form>
        </div>
      </div>

      <div className="row mt-5">
        <div className="position-relative">
          <h4>Mô tả sản phẩm</h4>
          <p style={{ whiteSpace: 'pre-line' }} >{product.description}</p>
          {(product.customField?.highlight != null) &&
            <>
              <h6>Lợi ích</h6>
              <ul className="text-sm">
                {product.customField.highlight.map((highlight, i) =>
                  <li key={i} className="mb-2">{highlight}</li>
                )}
              </ul>
            </>
          }
        </div>
      </div>
    </div>}
    {isSuccessProduct && <ShopInfo userId={product.userId}></ShopInfo>}
    <div >
      <ReviewOverview id={id} />
    </div>
    {product && <div onClick={()=> {
      location.reload()
    }
    } className='more_product'>
      <h5 className='header_elem'>Sản phẩm khác của shop</h5>
      <SContainer isShop={true} userId={product.userId}  ></SContainer>
    </div>}
    {isLoading && <LoadingComponent></LoadingComponent>}

  </div>

}