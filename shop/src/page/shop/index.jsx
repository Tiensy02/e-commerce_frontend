import ShopInfoBanner from "./shopInfoBanner";
import Grid from '@mui/material/Grid';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import GroupIcon from '@mui/icons-material/Group';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { LoadingComponent } from "../../components/Loadding";
import './index.css'
import { useFetchShopByUserQuery } from "../../redux/shop/apiSlice";
import PrimarySearchAppBar from "../../layout/TopBar/Bar";
import { useState } from "react";
import { Box } from "@mui/material";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import SContainer from "../../layout/container/SContainer";
import moment from 'moment';
export default function Shop(prop) {
  const user = prop.location.state.user
  const { data: shop, isLoading, isSuccess } = useFetchShopByUserQuery(user.id)
  
  const image = "https://sshop-product-image2.s3.ap-southeast-1.amazonaws.com/shop_image_defaulr.png"
  const [value, setValue] = useState("1");
  const [products,setProducts] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <PrimarySearchAppBar />
      {isLoading && <LoadingComponent></LoadingComponent>}
      {!isLoading && isSuccess &&
        <div>
          <div className="d-flex column-gap-4 align-items-center justify-content-between">
            <ShopInfoBanner  imageBackground={image} user={user}></ShopInfoBanner>
            <div className="shop-info-basic">
              <Grid container spacing={2} sx={{ textAlign: 'left'}}>
                <Grid item xs={6}>
                  <StorefrontIcon color="info" />
                  <span className="info-text">{`Sản phẩm: ${products.length}`}</span>
                </Grid>
                <Grid item xs={6}>
                  <StarBorderIcon color="info" />
                  <span className="info-text"> {`Đánh giá: ${shop?.evaluate}`}</span>
                </Grid>
                <Grid item xs={6}>
                  <GroupIcon color="info" />
                  <span className="info-text"> {`Người theo dõi: ${shop?.seen}`}</span>

                </Grid>
                <Grid item xs={6}>
                  <PersonPinIcon color="info" />
                  <span className="info-text"> {`Tham gia: ${ moment(shop?.createdDate).format('DD/MM/YYYY')}`}</span>
                </Grid>
              </Grid>
            </div>
          </div>
          <Box sx={{ marginTop:"32px", width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange}>
                <Tab label="Tất cả sản phẩm" value="1" />
              </TabList>
            </Box>
            <TabPanel sx={{backgroundColor:"white", marginTop:"4px", borderRadius:"4px"}} value="1">
            <SContainer setProducts={setProducts} userId={user.id} isShop={true}></SContainer>
            </TabPanel>
          </TabContext>
        </Box>
        </div>
      }
    </>
  )
}