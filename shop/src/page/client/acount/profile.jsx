import { Avatar } from "@mui/material";
import { getLoggedInUser } from "../../../heppler/authUtils";
import { useFetchUserQuery, useUpdateUserMutation } from "../../../redux/user/apiSlice";
import "./index.css"
import { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';

export default function Profile() {
    const user = getLoggedInUser()
    const { data: userCurrent, isLoading, isSuccess } = useFetchUserQuery(user?.userId, { skip: !user })
    const [preAvatar, setPreAvatar] = useState("")
    const [isChangeAvatar, setIsChangeAvatar] = useState(false)
    const [isUpLoading, setIsUpLoading] = useState(false)
    const [updateUser, { isSuccess: isSuccessUpdate }] = useUpdateUserMutation()
    const [file, setFile] = useState(null)

    useEffect(() => {
        if (isSuccess) {
            setPreAvatar(userCurrent.avatar)
        }
    }, [isSuccess])

    async function handleUpdate() {
        if (isChangeAvatar) {
            setIsUpLoading(true)
            const formData = new FormData();
            formData.append('files', file);

            const url = "http://localhost:8088/api/v1/product/upload-image";

            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok' + response.statusText);
            } else {
            }
            const result = await response.json();
            const data = {
                avatar: result[0],
            }

            updateUser({ id: userCurrent.id, user: data }).then((value) => {
                if(value.originalStatus == 400 ) {
                    toast.error("Có lỗi xảy ra")
                    return
                  }else {
                    setIsUpLoading(false)
                    setIsChangeAvatar(false)
                    setPreAvatar(result[0])
                  }
                
            })
        }
    }


    function handleChangeAvatar(e) {
        const selectedFiles = e.target.files;
        const reader = new FileReader();
        reader.onload = () => {
            setPreAvatar(reader.result);
            setIsChangeAvatar(true)
        };
        reader.readAsDataURL(selectedFiles[0]);
        setFile(selectedFiles[0])

    }

    return (
        <>
            {!isLoading && isSuccess &&
                <div className="profile" style={{ padding: "16px", height: "100%" }}>
                    <h5 style={{ textAlign: 'start' }}>Hồ sơ của tôi</h5>
                    <div className="profile_content">
                        <div className="profile_info">
                            <div className="profile_info_elem">
                                <p className="profile_info_title">Tên người dùng: </p>
                                <p className="profile_info_descrip">{userCurrent.userNameAlias}</p>
                            </div>
                            <div className="profile_info_elem">
                                <p className="profile_info_title">Email: </p>
                                <p className="profile_info_descrip">{userCurrent.email}</p>
                            </div>
                        </div>
                        <div className="profile_avatar">
                            <Avatar
                                alt={user.userNameAlias}
                                src={preAvatar}
                                sx={{ width: 208, height: 208, marginBottom: "12px" }}
                            />
                            {!isChangeAvatar && <div>
                                <input type="file" id="avatar-user-image-upload" style={{ display: 'none' }} onChange={handleChangeAvatar} />
                                <label className="text-action" htmlFor="avatar-user-image-upload">Thay đổi</label>
                            </div>}
                            {
                                isChangeAvatar && !isUpLoading && <p onClick={handleUpdate} className="text-action">Lưu</p>
                            }
                            {
                                isUpLoading && <p className="text-action"><CircularProgress size={20} color="inherit" sx={{color:"#ccc"}} /></p>
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    )
}