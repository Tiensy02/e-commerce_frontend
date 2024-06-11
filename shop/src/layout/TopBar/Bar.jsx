import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Fab from '@mui/material/Fab';
import MessageBox from "../../page/message/";
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ListItemText from '@mui/material/ListItemText';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';
import './topbar.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { logout } from '../../heppler/authUtils';
import { useFetchUserQuery } from '../../redux/user/apiSlice';
import { Avatar } from '@mui/material';
import { useAddCartMutation, useFetchCartByUserQuery } from '../../redux/cart/apiSlice';
import { getLoggedInUser, setLoggedInUser } from '../../heppler/authUtils';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from './CartItem';
import { setOpenMessBox } from '../../redux/localVariable/apiSlice';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const PrimarySearchAppBar = React.forwardRef((props, ref) => {
    const dispatch = useDispatch();
    const openMessBox = useSelector((state) => state.local.openMessBox);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [cartAnchorEl, setCartAnchorEl] = React.useState(null)
    const user = getLoggedInUser()

    const { data: userCurrent, isLoading, isSuccess } = useFetchUserQuery(user?.userId, { skip: !user })
    const { data: cart, isLoading: isLoadingCart, isSuccess: isSuccessCart } = useFetchCartByUserQuery(user?.userId, { skip: !user })
    const [postCart, { isSuccess: isAddCartSuccess }] = useAddCartMutation()
    const [productIds, setProductIds] = React.useState([])

    const handleOpenChatBox = () => {
        dispatch(setOpenMessBox(true));
    }

    React.useEffect(() => {
        let user = getLoggedInUser()

        if (cart) {
            user = { ...user, cart }
            setLoggedInUser(user)
            const productIds = []
            cart.cartItems.forEach(element => {
                productIds.push(element.productId)
            });
            setProductIds(productIds)
        } else {
            if (isSuccessCart) {
                const data = {
                    userId: user.userId,
                }
                postCart(data).then((value) => {
                    console.log("them gio hang thanh cong");
                })
            }
        }
    }, [cart])

    const isMenuOpen = Boolean(anchorEl);
    const isCartOpen = Boolean(cartAnchorEl)

    const handleProfileMenuOpen = (event) => {
        console.log(event.currentTarget);
        setAnchorEl(event.currentTarget);
    };


    const handleMenuClose = () => {
        setAnchorEl(null);
    };



    const handleLogout = () => {
        logout()
        handleMenuClose()
        location.href = "/home"
    }

    const handleCartMenuOpen = (event) => {
        console.log(event.currentTarget);


        setCartAnchorEl(event.currentTarget);
    }

    const handleCartMenuClose = () => {
        setCartAnchorEl(null);
    }


    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
            sx={{
                zIndex: "100000"
            }}
        >
            {isSuccess && [
                <MenuItem className='item-menu' onClick={handleMenuClose} key="account">
                    <ListItemText>
                        <Link className="link-black" to={{ pathname: "/acount/profile" }}>Tài khoản của tôi</Link>
                    </ListItemText>
                    <ListItemIcon>
                        <AccountCircle sx={{ marginLeft: 2 }} fontSize="small" />
                    </ListItemIcon>
                </MenuItem>,
                <MenuItem className='item-menu' onClick={handleLogout} key="logout">
                    <ListItemText>Đăng xuất</ListItemText>
                    <ListItemIcon>
                        <LogoutIcon sx={{ marginLeft: 2 }} fontSize="small" />
                    </ListItemIcon>
                </MenuItem>
            ]}
        </Menu>
    );

    const cartMenuId = 'primary-search-cart-menu'
    const renderCartMenu = (
        <Menu
            anchorEl={cartAnchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            id={cartMenuId}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isCartOpen}
            onClose={handleCartMenuClose}
            getContentAnchorEl={null}
            PaperProps={{
                style: {
                    transform: 'translateX(0px) translateY(-10px)',
                },
            }}


        >
            {
                <CartItem cart={cart} productIds={productIds}></CartItem>
            }
        </Menu>
    )

    return (
        <>

            <Box sx={{ flexGrow: 1, paddingLeft: "24px", paddingRight: "24px", marginBottom: 12 }}>
                <div ref={ref} className='bar py-2'>
                    <div className='d-flex justify-content-between bar-item'>
                        <div className='d-flex column-gap-4 align-items-center'>
                            <Link className="link d-flex column-gap-1 align-items-center" to={{ pathname: "/home" }}> <HomeIcon></HomeIcon> <span>Trang chủ</span></Link>
                            <Link className="link" to={{ pathname: "/dashboard" }}>Kênh người bán</Link>
                            <div style={{ color: 'white', fontSize: 14 }} className='d-flex align-items-center'>
                                Kết nối
                                <IconButton
                                    size="small"
                                    sx={{ color: 'white' }}
                                >
                                    <FacebookTwoToneIcon />
                                </IconButton>
                            </div>
                        </div>
                        <div className='d-flex column-gap-2 align-items-center'>
                            <div style={{ color: 'white', fontSize: 14 }} className='d-flex column-gap-2 align-items-center'>
                                <IconButton
                                    size="small"
                                    sx={{ color: 'white' }}
                                >
                                    <Badge badgeContent={0} color="error">
                                        <NotificationsOutlinedIcon />
                                    </Badge>
                                </IconButton>
                                Thông báo
                            </div>
                            <div style={{ color: 'white', fontSize: 14, marginRight: "48px" }} className='d-flex align-items-center'>
                                <IconButton
                                    size="small"
                                    sx={{ color: 'white' }}
                                >
                                    <HelpOutlineIcon />
                                </IconButton>
                                Hỗ trợ
                            </div>
                            <div style={{ color: 'white', fontSize: 14 }} className='d-flex column-gap-2 align-items-center'>
                                {isSuccess && <div
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    style={{ cursor: "pointer" }}
                                >
                                    {getLoggedInUser && <div className='d-flex column-gap-2 align-items-center'>
                                        <Avatar sx={{ width: "24px", height: "24px" }} src={userCurrent.avatar}></Avatar>
                                        <p style={{ margin: 0, padding: 0, fontSize: "14px" }}>{getLoggedInUser().useName}</p>
                                    </div>}
                                </div>}
                                {!getLoggedInUser() && <div className='d-flex ms-4 column-gap-2'>
                                    <Link className="link" to={{ pathname: "/authen", state: { isLogin: false } }}>Đăng ký</Link>
                                    <Link className="link" to={{ pathname: "/authen", state: { isLogin: true } }}>Đăng nhập</Link>
                                </div>}
                            </div>
                        </div>
                    </div>
                    <div className='d-flex mt-2 justify-content-between align-items-center bar-item px-5'>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' }, color: 'white' }}
                        >
                            SShop
                        </Typography>
                        <OutlinedInput
                            sx={{ width: { xs: '200px', sm: "400px", md: "400px", lg: "800px" }, backgroundColor: 'white', height: 40 }}
                            placeholder='Tìm kiếm'


                            id="outlined-adornment-password"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        edge="end"
                                    >
                                        <SearchIcon></SearchIcon>
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <Box>
                            <IconButton onClick={handleCartMenuOpen} size='large'>
                                <Badge badgeContent={cart?.cartItems.length} color="error">
                                    <ShoppingCartRoundedIcon sx={{ color: 'white' }} />
                                </Badge>
                            </IconButton>

                        </Box>

                    </div>
                </div>
                {getLoggedInUser() && renderMenu}
                {renderCartMenu}

            </Box>
            {openMessBox && <MessageBox></MessageBox>}
            {!openMessBox && <Fab onClick={handleOpenChatBox} variant="extended" color="primary" sx={{ position: 'fixed', bottom: 16, right: 16 }}>
                <QuestionAnswerRoundedIcon sx={{ mr: 1 }} />
                Chat
            </Fab>}
        </>
    );
})
export default PrimarySearchAppBar