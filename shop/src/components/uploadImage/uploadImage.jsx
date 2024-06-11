import { useState, useEffect, useRef } from "react"
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import './index.css'
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import get from 'lodash/get';

export default function UploadImage({defaultImages, images,setImages,setError,setImageSelected, clearErrors, register, errors, name, setImagesForm = () => { } }) {

    const [selectedImages, setSelectedImages] = useState([])

    const handleImageChange = (event) => {

        const selectedFiles = event.target.files;
        for (let i = 0; i < selectedFiles.length; i++) {
            const selectedFile = selectedFiles[i];
            if (selectedFile) {
                const reader = new FileReader();
                reader.onload = () => {
                    setImages((prevImages) => [...prevImages, reader.result]);
                    setSelectedImages((prevSelectImages) => [...prevSelectImages, selectedFile])
                    setImageSelected((prevSelectImages) => [...prevSelectImages, selectedFile])
                };
                reader.readAsDataURL(selectedFile);
            }

        }
        event.target.value = null;

    };


    useEffect(() => {
        validateImage()
    }, [selectedImages])

    useEffect(()=> {
        if(defaultImages.length > 0) {
            setImages(defaultImages)
        }
    },[])

    const handleRemoveImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);

        const newSelectedImages = [...selectedImages];
        newSelectedImages.splice(index, 1);
        setSelectedImages(newSelectedImages);

        setImageSelected((pre)=> {
            const newValue = [...pre];
            return newValue.splice(index, 1);
        })



    };
    const validateImage = () => {
        if(defaultImages.length > 0 ) {
            clearErrors(name)
            return true;
        }
        if(images.length > 0 ) {
            clearErrors(name)
            return true;
        }
        if (selectedImages.length > 0) {
            clearErrors(name)
            return true;
        } else {
            setError(`${name}`, {
                type: "manual",
                message: 'Cần ít nhất một hình ảnh',
            })
            console.log(get(errors, name)?.message);
            return false;
        }
    };

    return (
        <>
            <input  type="file" multiple id="image-upload" style={{ display: 'none' }} onChange={handleImageChange} />
            <div className="d-flex align-items-center">
                <div className="d-flex flex-wrap lign-items-center image_wrapper">
                    {images.map((image, index) => {
                        return (
                            <div key={index} className="position-relative">
                                <img src={image} alt="" className="img-fluid" style={{ objectFit: "cover", borderRadius: "4px", width: '100px', height: '100px' }} />
                                <div className="close_image position-absolute" onClick={() => { handleRemoveImage(index) }}>
                                    <CloseSharpIcon fontSize="small" sx={{ color: 'white' }} />
                                </div>
                            </div>
                        )
                    })}

                    <label htmlFor="image-upload" className='ms-4 btn-upload-image'>
                        <AddPhotoAlternateIcon sx={{ fontSize: '80px', cursor: "pointer" }} color="primary" />
                    </label>
                </div>
            </div>
            {get(errors, name) && <p className="mt-2" style={{ color: "red" , textAlign:"start"}}>{get(errors, name)?.message}</p>}
        </>
    )
}