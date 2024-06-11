import { useFetchUserQuery } from "../../redux/user/apiSlice"
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
export default function ShopInfo({ userId }) {
    const { data: user, isLoading, isSuccess } = useFetchUserQuery(userId);
    return <div style={{ paddingLeft:"24px", marginTop:'24px', marginBottom:'24px', borderRadius:'4px', textAlign:'start', backgroundColor:'white', paddingTop:'12px', paddingBottom:"12px"}} >
        <h6>Thông tin shop</h6>
        {isSuccess && <div style={{textAlign:"start"}} className='mt-2 d-flex column-gap-3 align-items-center'>
            <Link to={{ pathname: `/shop/${user.id}`, state:{user:user} }}>
                <img style={{height:'32px', width:'32px', borderRadius:'50%' }} alt="" src={user?.avatar ? user.avatar : "https://sshop-user.s3.ap-southeast-1.amazonaws.com/avatar/anonymus_avatar.jpeg"} />
            </Link>
            <p style={{margin:0, padding:0, }} >{user.userNameAlias}</p>
        </div>}
    </div>
}