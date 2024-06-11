import { LoadingComponent } from "../../components/Loadding.jsx";
import { useFetchMessageQuery } from "../../redux/user/apiSlice.jsx";
import { MessageLeft, MessageRight } from "./messageElement.jsx";
import { MessTextInput } from "./messTextInput.jsx";
import Paper from '@mui/material/Paper';
import Stomp from 'stompjs';
import sockjs from "sockjs-client/dist/sockjs"
import { useEffect, useState } from "react";
export default function MessContentBox({ userCurrentId, userActive }) {

  const [stompClient, setStompClient] = useState();
 
  const { data: messageData, isLoading } = useFetchMessageQuery({ senderId: userCurrentId, recipientId: userActive.userId });
  console.log(userActive);
  
  const [messages, setMessages] = useState([])

  // init socket
  useEffect(() => {

    const socket = new sockjs('http://localhost:8088/ws');
    const client = Stomp.over(socket);

    client.connect({}, () => {
      client.subscribe(`/user/${userCurrentId}/queue/messages`, (message) => {

        setMessages((preMessages) => {
          return [...preMessages, JSON.parse(message.body)]
        })
       
      });
    });
 
    setStompClient(client);

    return () => {
      client.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (messageData?.content) {
        setMessages(messageData?.content)
      }
    }

  }, [messageData])

  useEffect(() => {
    const objDiv = document.getElementById('messages_body');
    console.log(objDiv.scrollHeight);
    objDiv.scrollTop = objDiv.scrollHeight;
  }, [messages])

  // function for socket

  function onMessageReceived(payload) {

  }

  function sendMess(chatMess) {
    stompClient.send("/app/chat", {}, JSON.stringify(chatMess))
  }

  return <div className="paper position-relative" zdepth={2}>
    <Paper id="messages_body">
      {messages.length > 0 && <>
        {messages.map((elem, index) => {
          if (elem.senderId == userCurrentId) {
            return <MessageRight
              key={index}
              userImage={userActive.avatar}
              message={elem.content}
              avatarDisp={true}
            />
          } else {
            return <MessageLeft
            userImage={userActive.avatar}
              key={index}
              message={elem.content}
              avatarDisp={true} />
          }

        })}
      </>}

      { (messages?.length == 0  && Object.keys(userActive).length > 0) && <>{`Gửi lời chào đến ${userActive?.userName}`}</>}
      {Object.keys(userActive).length == 0 && <>
      Chưa có lượt tương tác
      </>}
    </Paper>
    {!isLoading && Object.keys(userActive).length > 0 && <MessTextInput setMessages={setMessages} chatId={messageData.chatId} userCurrentId={userCurrentId} recipientId={userActive.userId} sendMess={sendMess} />}
    {isLoading && <LoadingComponent isWindow={false}></LoadingComponent>}
  </div>
}