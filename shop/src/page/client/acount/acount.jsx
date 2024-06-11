import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import PrimarySearchAppBar from '../../../layout/TopBar/Bar';
import MuiDrawer from '@mui/material/Drawer';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';
import { Box, ListItem, Paper } from '@mui/material';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Profile from './profile';
import Purchase from './purchase';

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
    primaryText: "Tài khoản của tôi",
    secondaryText: "Hồ sơ, ...",
    data: [
        { label: 'Hồ sơ', path: '/acount/profile' },
    ]
}
const productManagerItem = {
    data: [
        { label: 'Đơn mua', path: '/acount/purchase' },
    ]

}

const ListItemLink = (props) => {
    return (
        <li>
            <ListItem button component={Link} {...props} />
        </li>
    );
}
function Acount() {



    return (
        <>
            <PrimarySearchAppBar />
            <Router>
                <div className='d-flex column-gap-4'>
                    <Drawer className='nav_bar' sx={{ borderRadius: "4px", overflow: "auto" }} variant="permanent" anchor='left' open={open}>
                        <Divider />
                        <List component="nav">
                            <Typography sx={{ textAlign: "start", fontSize: "18px", margin: "8px" }} variant='h6'>Tài khoản của tôi</Typography>
                            {orderManagerItem.data.map((item, index) => (
                                <ListItemLink key={index} to={item.path}>
                                    <ListItemText primary={item.label} />
                                </ListItemLink>
                            ))}
                            <Divider />
                            <Typography sx={{ textAlign: "start", fontSize: "18px", margin: "8px" }} variant='h6'>Đơn mua</Typography>

                            {productManagerItem.data.map((item, index) => (
                                <ListItemLink key={index} to={item.path}>
                                    <ListItemText primary={item.label} />
                                </ListItemLink>
                            ))}
                        </List>
                    </Drawer>
                <Paper
                 component="main"
                 sx={{flex:'1'}}
                 >
                    <Switch>
                        <Route path="/acount/profile" component={Profile} />
                        <Route path="/acount/purchase" component={Purchase} />
                    </Switch>
                </Paper>
                </div>
            </Router>
        </>
    )
}
export default Acount;