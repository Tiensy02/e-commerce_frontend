import { useFetchProductQuery } from "../../redux/product/apiSlice";
import CreateProduct from "../createProduct/createProduct";
import { Paper } from "@mui/material";

export default function AddProduct(prop) {

  const productId = prop?.location?.state?.productId;

  const { data: product, isLoading, isSuccess } = useFetchProductQuery(
    productId,
    { skip: !productId }
  );

  return (
    <> 
      {isSuccess && <CreateProduct product={product} ></CreateProduct>}
      {!isSuccess && <CreateProduct></CreateProduct>}
    </>
  )
}