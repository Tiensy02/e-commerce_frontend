import { useForm } from "react-hook-form";
import InfoBasicProduct from "./infoBasicProduct";
import { convertToArray } from "../../heppler/arrayUtils";
import { useMemo, useState } from "react";
import { InfoProduct } from "./infoProduct";
import InfoPricingProduct from "./infoPricingProduct";
import InfoDelivery from "./infoDelivery";
import Button from '@mui/material/Button';
import { useFetchCategoriesQuery } from "../../redux/category/apiSlice";
import { usePostProductMutation, useUpdateProductMutation } from "../../redux/product/apiSlice";
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import "./index.css"
import {getLoggedInUser} from "../../heppler/authUtils"
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
/**
 * 
 * @param {Object} product 
 * @returns 
 */
export default function CreateProduct({ product  }) {
  const { register, reset, handleSubmit, control, formState: { errors }, clearErrors, setError, setValue } = useForm({
    defaultValues: {
      name: product? product.name: "",
      description: product? product.description: "",
      price: product? product.price: "",
      quantity: product? product.quantity: "",
      weight: product? product.weight: "",
      length: product? product.length: "",
      width: product? product.width: "",
      height: product? product.height: "",
      industryId: product? product.industryId: "",
      subTitle: product? product.subTitle: "",
      discount: product ? product.discount:"",
      stock: product ? product.stock :""
    }
  });
  const [isCompelete, setIsCompelete] = useState(false)
  const { data: industries, isLoading } = useFetchCategoriesQuery({ pageNumber: 0, pageSize: 0 })
  const [imageSelected, setImageSelected] = useState([])
  const [images,setImages] = useState([])
  const [defaultImages,setDefaultImage] = useState(product ? product.images: [])
  const [isLoadUploadImage, setIsLoadUploadImage] = useState(false)
  const [postProduct, { isLoading: isLoadingPost, isSuccess: isPostSuccess, isError: isPostError }] = usePostProductMutation()
  const [updateProduct, {isLoading:isLoadingUpdate}] = useUpdateProductMutation();
  const [industryValue, setIndustryValue] = useState("");

  const history = useHistory();

  async function create(data) {
    
    console.log(images);
    const url = "http://localhost:8088/api/v1/product/upload-image";
    const formData = new FormData();

    // Thêm các file vào formData
    Array.from(imageSelected).forEach(file => {
      formData.append('files', file);
    });
    // print
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    let result =[]
    const hasEntries = Array.from(formData.entries()).length > 0;

    try {
      const user = getLoggedInUser()

      if(hasEntries) {

        setIsLoadUploadImage(true)
        const response = await fetch(url, {
          method: 'POST',
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok' + response.statusText);
        }else {
          setIsLoadUploadImage(false)
        }
        result = await response.json();
      }
      result = defaultImages.concat(result)
      const imagePrimary = result[0]
      data = { ...data, images: result , userId:user.userId,imagePrimary }
      console.log(data);

      if(product) {
        updateProduct({id:product.id, product:data}).then((value)=> {
          console.log(value);
          
          if(value.originalStatus == 400 ) {
            toast.error("Cập nhật sản phẩm thất bại")
            return
          }else {

            toast.success("Cập nhật sản phẩm thành công")
            setImageSelected([])
            setImages([])
            setIndustryValue("")
            history.push("/dashboard/products/add");
            reset()
          }
          
        })
      }else {
        postProduct(data).then(()=> {
          toast.success("Thêm sản phẩm thành công")
          setImageSelected([])
          setImages([])
          setIndustryValue("")
          reset()
        })
        
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }


  const arraySelect = useMemo(() => convertToArray(industries), [industries])

  return (<form onSubmit={handleSubmit(create)}>
    <InfoBasicProduct defaultImages={defaultImages} images={images} setImages={setImages} industryValue={industryValue} setIndustryValue={setIndustryValue} setImageSelected={setImageSelected} setValue={setValue} setError={setError} clearErrors={clearErrors} obj={industries} attributeName="categoryName" init={arraySelect} name={"basicInfoProduct"} register={register} errors={errors} />
    <InfoPricingProduct register={register} errors={errors} />
    <InfoDelivery register={register} errors={errors} />
    <div className="form_basic_wrapper create_product-submit">
      <LoadingButton
        loading={ (isLoadingPost || isLoadUploadImage || isLoadingUpdate)}
        loadingPosition="start"
        startIcon={<SaveIcon />}
        type="submit" sx={{ minWidth: "100px", maxWidth: '300px' }} variant="contained" disabled={isCompelete}>{product ? "Lưu thay đổi" : "Thêm mới sản phẩm"}</LoadingButton>
    </div>
  </form>)
}