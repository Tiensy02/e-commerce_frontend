import { useEffect, useState } from "react";
import Layout from "../../../layout/index.jsx";
import CreateProduct from "../../createProduct/createProduct.jsx";
import Dashboard from "../../dashboard/Dashboard.jsx";
import MessageBox from "../../message/index.jsx";
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import Fab from '@mui/material/Fab';

import ProductView from "../../producer/";
import ShoppingCart from "../../shopingCart/shopingCart.jsx";
import { generateKey, getPublicKey, postSecretKey, encryptDataRSA } from "../../../heppler/crypto/keyUtils.jsx";
import Shop from "../../shop/index.jsx";
import { LoadingComponent } from "../../../components/Loadding.jsx";
import "./index.css"
import { useFetchProductsQuery } from "../../../redux/product/apiSlice.jsx";
import { handleLoginSuccess } from "../../../heppler/firebase/fcmUtils.jsx";

function Home() {

  const [isOpenMessBox, setIsOpenMessBox] = useState(false)

  useEffect(()=> {
    handleLoginSuccess()
  },[])

  // useEffect(() => {
  //   if (sessionStorage.getItem("publicKey") == null) {
  //     getPublicKey().then(res => {
  //       console.log(res);

  //       sessionStorage.setItem("publicKey", res.publicKey)

  //       if (sessionStorage.getItem("secretKey") == null) {
  //         const secretKey = generateKey();
  //         const secretKeyString = JSON.stringify(secretKey)
  //         encryptDataRSA(secretKeyString, res.publicKey).then(encryptData => {
  //           postSecretKey(encryptData).then(res => {
  //             sessionStorage.setItem("secretKey", secretKeyString)
  //           })

  //         })
  //       }

  //     }).catch(err => {
  //       console.log(err);

  //       alert("Đang truy cập không an toàn ! Reload lại trang")
  //     })
  //   }
  // }, [])


  const handleOpenChatBox = ()=> {
    setIsOpenMessBox(true)
  }
  
  return (
    <div>
      <Layout></Layout>
    </div>
    
  )
}
export default Home;