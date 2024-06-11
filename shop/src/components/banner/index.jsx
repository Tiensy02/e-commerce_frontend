import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import './index.css'
import { useState } from "react";
/**
 * @Param {Array<Object>} banners : [{
 * image: {url, alt}
 * url: // url dẫn tới shop đăng banners
 * }] 
 */
const iconItems = [
    {
        lable: "Thời trang nam",
        iamge: "https://sshop-product-image2.s3.ap-southeast-1.amazonaws.com/th%E1%BB%9Di+trang+nam.webp"
    },
    {
        lable: "Thời trang nữ",
        iamge: "https://sshop-product-image2.s3.ap-southeast-1.amazonaws.com/th%E1%BB%9Di+trang+n%E1%BB%AF.jpeg"
    },
    {
        lable: "Đồ công nghệ",
        iamge: "https://sshop-product-image2.s3.ap-southeast-1.amazonaws.com/%C4%91%E1%BB%93+c%C3%B4ng+ngh%E1%BB%87.jpeg"
    },
    {
        lable: "Đồ ăn",
        iamge: "https://sshop-product-image2.s3.ap-southeast-1.amazonaws.com/%C4%91%E1%BB%93+%C4%83n.png"
    },
    {
        lable: "Đồ thể thao",
        iamge: "https://sshop-product-image2.s3.ap-southeast-1.amazonaws.com/%C4%91%E1%BB%93+th%E1%BB%83+thao.webp"
    },
    {
        lable: "Thú cưng",
        iamge: "https://sshop-product-image2.s3.ap-southeast-1.amazonaws.com/th%C3%BA+c%C6%B0ng.png"
    },
    {
        lable: "Đồ trang trí",
        iamge: "https://sshop-product-image2.s3.ap-southeast-1.amazonaws.com/%C4%91%E1%BB%93+trang+tr%C3%AD.jpg"
    },
    {
        lable: "Nhà cửa",
        iamge: "https://sshop-product-image2.s3.ap-southeast-1.amazonaws.com/nh%C3%A0+c%E1%BB%ADa.jpg"
    },
    {
        lable: "Văn phòng phẩm",
        iamge: "https://sshop-product-image2.s3.ap-southeast-1.amazonaws.com/v%C4%83n+ph%C3%B2ng+ph%E1%BA%A9m.jpg"
    },
    {
        lable: "Sách",
        iamge: "https://sshop-product-image2.s3.ap-southeast-1.amazonaws.com/s%C3%A1ch.jpg"
    }
]
export default function Banner({ banners }) {


    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return <div className="arrow-wrap next-arrow" onClick={onClick} >
            <ChevronRightIcon fontSize="large" ></ChevronRightIcon>
        </div>

    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div className="arrow-wrap pre-arrow" onClick={onClick}>
                <ChevronLeftIcon fontSize="large" ></ChevronLeftIcon>
            </div>
        );
    }

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    }

    const handlerClickBanner = (url) => {
        console.log(url)
    }

    return (<div className="banner">
        <div className="d-flex column-gap-4 justify-content-between banner_content">
            <div className="banner_item_wrap">
                {iconItems.map((elem, index) => <p title={elem.lable} className="banner_item" key={index} onClick={() => {
                    handlerClickBanner(elem.iamge)
                }}>
                    <img style={{ borderRadius: "50%", width: "60px", height: "60px", objectFit: 'cover', marginBottom:"4px" }} src={elem.iamge} alt={elem.lable} />
                    <p className="banner_item_title">{elem.lable}</p>
                </p>)}
            </div>
            <div className="mt-2 banner_image" >
                <Slider {...settings}>
                    {banners.map((elem, index) => <div key={index} onClick={() => {
                        handlerClickBanner(elem.url)
                    }}>
                        <img style={{ borderRadius: "4px", width: "100%", height: "300px", objectFit: 'cover' }} src={elem.image.url} alt={elem.image.alt} />
                    </div>)}
                </Slider>
            </div>
        </div>
    </div>)


}