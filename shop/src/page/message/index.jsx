import React, { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import './index.css'
import ChatToolBar from "./chatToolBar.jsx";
import { useDispatch } from "react-redux";
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getLoggedInUser } from "../../heppler/authUtils.jsx";
import MessContentBox from "./messContentBox.jsx";
import { useFetchUserConnectQuery } from "../../redux/user/apiSlice.jsx";
import { LoadingComponent } from "../../components/Loadding.jsx";
import { setOpenMessBox } from "../../redux/localVariable/apiSlice.jsx";
const MessageBox = () => {
  const loggedInUser = getLoggedInUser();
  const dispatch = useDispatch();
  
  const [userCurrentId, setUserCurrentId] = useState(loggedInUser ? loggedInUser.userId : null);
  const [userActive, setUserActive] = useState({});
  const [userConnects, setUserConnects] = useState();

  const { data: userConnectsPageable, isLoading } = useFetchUserConnectQuery({ id: userCurrentId }, { skip: !userCurrentId });

  useEffect(() => {
    if (userConnectsPageable) {
      setUserConnects(userConnectsPageable);
      setUserActive(userConnectsPageable[0]);
    }
  }, [userConnectsPageable]);

  return (
    <div className="chat-box_wrap">
      <Paper elevation={12}>
        <Paper elevation={3} className="d-flex align-items-center justify-content-between px-4">
          <p style={{ fontSize: "24px", margin: 0 }}>Chat</p>
          <IconButton onClick={() => dispatch(setOpenMessBox(false))} aria-label="close" size="large">
            <ExpandMoreIcon />
          </IconButton>
        </Paper>
        {!isLoading && loggedInUser && (
          <div className="chat_wrap">
            <ChatToolBar userActive={userActive} userConnects={userConnects} setUserActive={setUserActive} />
            <MessContentBox userCurrentId={userCurrentId} userActive={userActive} />
          </div>
        )}
        {isLoading && loggedInUser && <LoadingComponent isWindow={false} />}
        {!loggedInUser && <div className="paper d-flex justify-content-center align-items-center">
          <div>
            <img className="rounded" src="https://sshop-product-image2.s3.ap-southeast-1.amazonaws.com/mess-error.png" alt="" />
            <p className="mt-4">Bạn chưa đăng nhập</p>
          </div>
          </div>}
      </Paper>
    </div>
  );
}

export default MessageBox;
