import React from "react";
import { VIEW_ROLE_MAP,RESOURCE_MAP,hasRolesOr } from "../components/constain/permissions";
import { getLoggedInUser } from "../heppler/authUtils";
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
const Authen = React.lazy(() => import("../page/auth/register/Authen"));
const MFAAuthen = React.lazy(() => import("../page/auth/email"));
const Home = React.lazy(()=> import("../page/client/home"));
const Acount = React.lazy(()=> import("../page/client/acount/acount"));
const Dashboard = React.lazy(()=> import("../page/dashboard/Dashboard"));
const ProductOverview = React.lazy(()=> import("../page/producer"))
const Shop = React.lazy(() => import("../page/shop"))
const Cart = React.lazy(()=> import("../page/shopingCart/shopingCart.jsx"))

const OrderManager = React.lazy(() => import('../page/dashboard/OrderManager.jsx'));
const ShippingOrders = React.lazy(() => import('../page/dashboard/ShippingOrders.jsx'));
const AllProducts = React.lazy(() => import('../page/dashboard/AllProducts.jsx'));
const AddProduct = React.lazy(() => import('../page/dashboard/AddProduct.jsx'));
const Payment = React.lazy(() => import('../page/payment'));



const rootRouter = {
    path: "/",
    exact: true,
    component: () => {
        if(getLoggedInUser()) {
            return  <Home />;
        }else {
             return <Redirect to={{
                pathname: '/authen',
                state: { isLogin: false }
              }} />
        }
    },
    route: Route
}
const productRouter = {
    path: "/product/:id",
    exact: true,
    component: ProductOverview,
    route: Route
}
const authenRouter = {
    path: "/authen",
    exact: true,
    component: Authen,
    route: Route
}
const MFAAuthenRouter = {
    path: "/authen/email",
    exact: true,
    component: MFAAuthen,
    route: Route
}
const acountRouter = {
    path: "/acount",
    exact: true,
    component: Acount,
    route: Route,
    children:[
        { path: "/acount/profile",exact: true, component: Acount,route: Route },
        { path: "/acount/purchase",exact: true, component: Acount,route: Route },
        { path: "/acount",exact: true, component: Acount,route: Route },
    ]
}
const homeRouter = {
    path: "/home",
    exact: true,
    component: Home,
    route: Route

}

const shopRouter = {
    path : "/shop/:id",
    exact: true,
    component: Shop,
    route: Route
}

const paymentRouter = {
    path:'/pay',
    exact: true,
    component: Payment,
    route: Route
}

const cartRouter = {
    path: "/cart/:id",
    exact: true,
    component: Cart,
    route: Route
}

const dashboardRouter = {
    path: "/dashboard",
    // exact: true,
    // component: Dashboard,
    // route: Route,
    children: [
        { path: "/dashboard/orders/manager",resource: RESOURCE_MAP.USER.ACTION.PRODUCT,rolesOr: [VIEW_ROLE_MAP.DASHBOATRD.View], exact: true, component: Dashboard, route:  Route},
        { path: "/dashboard/orders/shipping",resource: RESOURCE_MAP.USER.ACTION.PRODUCT,rolesOr: [VIEW_ROLE_MAP.DASHBOATRD.View], exact: true, component: Dashboard, route: Route },
        { path: "/dashboard/products/all",resource: RESOURCE_MAP.USER.ACTION.PRODUCT,rolesOr: [VIEW_ROLE_MAP.DASHBOATRD.View], exact: true, component: Dashboard,route: Route },
        { path: "/dashboard/products/add", resource: RESOURCE_MAP.USER.ACTION.PRODUCT,rolesOr: [VIEW_ROLE_MAP.DASHBOATRD.View],exact: true, component: Dashboard,route: Route },
        { path: "/dashboard/products/add", resource: RESOURCE_MAP.USER.ACTION.PRODUCT,rolesOr: [VIEW_ROLE_MAP.DASHBOATRD.View],exact: true, component: Dashboard,route: Route },
        { path: "/dashboard", resource: RESOURCE_MAP.USER.ACTION.PRODUCT,rolesOr: [VIEW_ROLE_MAP.DASHBOATRD.View],exact: true, component: Dashboard,route: Route },
    ]
}


const allRouters = [
    rootRouter,
    productRouter,
    authenRouter,
    homeRouter,
    dashboardRouter,
    shopRouter,
    cartRouter,
    paymentRouter,
    acountRouter,
    MFAAuthenRouter,
]

const flatAllRouters = (routers) => {
    let flatRouters = []
    routers = routers || []
    
    routers.forEach(router => {
        flatRouters.push(router);
        if(typeof router.children !== 'undefined' && router.children.length > 0) {
            flatRouters = [...flatRouters, ...flatAllRouters(router.children)]
        }
    })
    return flatRouters;
}
const allFlattenRoutes = flatAllRouters(allRouters);
export {allFlattenRoutes,rootRouter}
