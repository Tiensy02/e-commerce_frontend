import Slider from 'react-slick'
import './product.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useRef, useState } from 'react';
export default function ProductGallery({ images }) {

    let sliderRef = useRef(null);
    const [imageActive, setImageActive] = useState(images[0])

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return <div className="next-arrow-down" onClick={onClick} >
            <KeyboardArrowDownIcon color='primary' fontSize="large" ></KeyboardArrowDownIcon>
        </div>
    }
    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
           <div style={{display:'none'}} className="arrow-wrap pre-arrow" onClick={onClick}>
            </div>
        );
    }

    const settings = {
        infinite: true,
        slidesToShow: images.length > 4 ? 4: images.length,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        swipeToSlide: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow/>

    }

    const handlerClickImage = (image, index) => {
        setImageActive(image)
        sliderRef.slickGoTo(index)
    }

    return (
        <div className="col-12 col-lg-6 d-flex">
            <div className="d-block slider-container" style={{paddingRight:12}}>
                <Slider  {...settings} ref={slider => {
                    sliderRef = slider
                }}>
                    {images.map((image, index) => (
                        <img key={index}  className={`mb-4 rounded-2 image-product ${image == imageActive ? "active" : ""}`} 
                        src={image} 
                        onClick={() => {
                            handlerClickImage(image,index)
                        }}
                        />
                    ))}
                </Slider>
            </div>
            <img className="rounded-2 image-product-active" style={{objectFit:'cover !importaint'}} src={imageActive} />
        </div>
    )
} 