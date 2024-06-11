import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import ListItemText from '@mui/material/ListItemText';
import { ListItem } from '@mui/material';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import DashboardHeader from './header';
import ToDo from './toDo';
import OrderManager from './OrderManager';
import ShippingOrders from './ShippingOrders';
import AddProduct from './AddProduct';
import AllProducts from './AllProducts';
import Notification from './Notification';

const drawerWidth = 240;


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const orderManagerItem = {
  primaryText: "Quản lý đơn hàng",
  secondaryText: "Chờ xác nhận,Chờ lấy hàng, ...",
  data: [
    { label: 'Tất cả', path: '/dashboard/orders/manager' },
    { label: 'Cài đặt vận chuyển', path: '/dashboard/orders/shipping' },
  ]
}
const productManagerItem = {
  primaryText: "Quản lý sản phẩm",
  secondaryText: "Tất cả sản phẩm, Thêm sản phẩm, ...",
  data: [
    { label: 'Tất cả sản phẩm', path: '/dashboard/products/all' },
    { label: 'Thêm sản phẩm', path: '/dashboard/products/add' },
  ]
}

const ListItemLink = (props) => {
  return (
    <li>
      <ListItem button component={Link} {...props} />
    </li>
  );
}

export default function Dashboard() {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Router>
      <DashboardHeader />
      <Box sx={{ borderRadius:"4px",display: 'flex', position: 'fixed', left: 0, right: 0, top: "80px" }}>
        <CssBaseline />

        <Drawer sx={{  borderRadius:"4px", marginBottom:'20px',height:'100vh',overflow:"auto"}} variant="permanent" anchor='left' open={open}>
          <Divider />
          <List component="nav">
            <Typography  sx={{textAlign:"start", fontSize:"18px", margin:"8px"}} variant='h6'>Quản lý đơn hàng</Typography>
            {orderManagerItem.data.map((item, index) => (
              <ListItemLink key={index} to={item.path}>
                <ListItemText primary={item.label} />
              </ListItemLink>
            ))}
            <Divider />
            <Typography sx={{textAlign:"start", fontSize:"18px", margin:"8px"}} variant='h6'>Quản lý sản phẩm</Typography>

            {productManagerItem.data.map((item, index) => (
              <ListItemLink key={index} to={item.path}>
                <ListItemText primary={item.label} />
              </ListItemLink>
            ))}
          </List>
        </Drawer>
        
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            paddingBottom: 15
          }}
        >
          <Container maxWidth="lg">
            <Switch>
              <Route path="/dashboard/orders/manager" component={OrderManager} />
              <Route path="/dashboard/orders/shipping" component={ShippingOrders} />
              <Route path="/dashboard/products/all" component={AllProducts} />
              <Route path="/dashboard/products/add" component={AddProduct} />
              <Route path="/dashboard/products/add/:productId?" component={AddProduct} />
              <Route path="/dashboard/" exact component={DashboardHome} />
            </Switch>
          </Container>
        </Box>
      </Box>
    </Router>
  );
}

function DashboardHome() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8} lg={9}>
        <Paper elevation={5} sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <ToDo />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper elevation={5}
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <Notification />
        </Paper>
      </Grid>

      <Grid item xs={12} md={8} lg={9}>
        <Paper elevation={5}
          sx={{
            p: 1,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <Chart />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper elevation={5}
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <Deposits />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={5} sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Orders />
        </Paper>
      </Grid>
    </Grid>
  );
}
