import Avatar from '@mui/material/Avatar';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import './index.css'
import { Typography } from '@mui/material';
import { getLoggedInUser } from '../../heppler/authUtils';
import { useDispatch } from "react-redux";
import { setOpenMessBox } from '../../redux/localVariable/apiSlice';
import { usePostUserFollowMutation } from '../../redux/user/apiSlice';

export default function ShopInfoBanner({imageBackground, user }) {

    const [addConnect, {isSuccess, isLoading}] = usePostUserFollowMutation();
    const dispatch = useDispatch()
    const userCurrent = getLoggedInUser()

    function handleFollow() {

    }

    function handleChat() {
        console.log(userCurrent);
        
        const data = {
            userConnectingId: userCurrent.userId,
            userConnectedId: user.id,
        }
        addConnect(data).then((value) => {
            console.log(value);
            if(value.error) {
            }else {
                dispatch(setOpenMessBox(true))
            }
        })
    }
    
    return <div className="shop-info-banner_wrap" style={{backgroundImage:`url(${imageBackground})`}}>
        <div className="d-flex align-items-center column-gap-3 mb-3">
            <Avatar
                alt={user.userNameAlias}
                src={user.image}
                sx={{ width: 64, height: 64 }}
            />
            <Typography variant='h6' sx={{zIndex:1}}>{user.userNameAlias}</Typography>
        </div>
        <div className='d-flex justify-content-around column-gap-3'>
            <Fab onClick={handleFollow} variant="extended" color="secondary" size='medium'>
                <AddIcon sx={{ mr: 1 }} />
                Theo dõi
            </Fab>

            <Fab onClick={handleChat} variant="extended" color="secondary" size='medium'>
                <QuestionAnswerIcon sx={{ mr: 1 }} />
                Chat
            </Fab>

        </div>
    </div>
}