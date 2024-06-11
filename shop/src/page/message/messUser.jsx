import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import "./index.css"
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material';
import { useFetchMessageQuery } from '../../redux/user/apiSlice';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

export default function MessUser({ setUserActive,user,userName, userImage, lastMess, userActive }) {
    return <>
        <div className={`mess-user_wrap ${userActive?.userId == user.userId? "active":""}`} onClick={() => {
            setUserActive(user)
        }} >
            <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Avatar alt={userName} src={userImage ? userImage:'https://sshop-user.s3.ap-southeast-1.amazonaws.com/avatar/anonymus_avatar.jpeg'} />
            </StyledBadge>
            <div className='mess_wrap' >
                <Typography variant="h6">
                    {userName}
                </Typography>
                <Typography variant="body2" gutterBottom noWrap sx={{ textOverflow: "ellipsis", width: "100%", opacity: 0.8, textAlign:"start" }}>
                    {lastMess}
                </Typography>
            </div>
        </div>
    </>
}