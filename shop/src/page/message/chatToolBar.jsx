import "./index.css"
import MessUser from './messUser';
export default function ChatToolBar({ userConnects, setUserActive, userActive }) {
  return <>
    <div className='chat-bar_wrap'>
      <div className="chat-toolbar" zdepth={2}>
        {userConnects?.map((user, index) =>
          <MessUser userActive={userActive}  setUserActive={setUserActive} user={user} userId={user.userId} key={index} userName={user.userName} userImage={user?.avatar} lastMess={user?.lastMess}></MessUser>
        )}
      </div>
    </div>

  </>
}