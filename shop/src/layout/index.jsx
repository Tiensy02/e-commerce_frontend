import { useRef } from "react";
import PrimarySearchAppBar from "./TopBar/Bar";
import SContainer from "./container/SContainer";
import './index.css';
import SDrawer from "./sideBar/SDrawer";
import SidebarAcordion from "./sideBar/SSidebarAcordion";
import Banner from "../components/banner";
export default function Layout() {
    const tests = [
        {
            image:{
                url: "https://sshop-product-image2.s3.ap-southeast-1.amazonaws.com/laptop+(1).png",
                alt:"test"
            },
            url: "testurl1"
        },
        {
            image:{
                url: "https://sshop-product-image2.s3.ap-southeast-1.amazonaws.com/laptop+(2).png",
                alt:"test"
            },
            url: "testurl2"
        },
        {
            image:{
                url: "https://sshop-product-image2.s3.ap-southeast-1.amazonaws.com/laptop+(3).png",
                alt:"test"
            },
            url: "testurl3"
        },
        {
            image:{
                url: "https://sshop-product-image2.s3.ap-southeast-1.amazonaws.com/laptop+(4).png",
                alt:"test"
            },
            url: "testurl4"
        },
        {
            image:{
                url: "https://sshop-product-image2.s3.ap-southeast-1.amazonaws.com/laptop+(5).png",
                alt:"test"
            },
            url: "testurl5"
        }
    ]
    
    return (
        <div className="layout_wrapper">
            <div className="bar_wrapper">
                <PrimarySearchAppBar></PrimarySearchAppBar>
                <Banner banners={tests}></Banner>
            </div>
            <div className="containner_wrapper">
                <SContainer></SContainer>
            </div>
        </div>
    )
}