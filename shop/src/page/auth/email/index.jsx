import { Button, Paper, Typography } from "@mui/material";
import MFAInput from "./MFAInput";
import "./index.css"
import { useState } from "react";
import { fetchJSONNoToken } from "../../../heppler/api";
import { toast } from "react-toastify";

export default function MfaAuthen(props) {
    const email = props.location.state.email;
    const userId = props.location.state.userId;

    const [mfaCode, setMfaCode] = useState("")
    console.log(mfaCode);

    function handleSubmit() {
        if (mfaCode.length == 6) {
            const authenCodeUrl = `http://localhost:8088/api/v1/verify/${userId}`;
            const option = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: mfaCode
            }
            fetchJSONNoToken(authenCodeUrl, option).then((value) => {
                console.log(value);
                if (value == true) {
                    toast.success("Đăng ký thành công")
                    props.history.push({
                        pathname: "/authen",
                        state:{
                            isLogin:true
                        }
                        
                    })
                }else {
                    toast.error("Mã xác minh không đúng")
                    setMfaCode("")
                    return;
                }
            })
        }
    }
    

    return (<>
        <div className="mfa_header">
            <Typography variant="h6">Mã xác minh</Typography>
        </div>
        <div className="container_body">
            <div className="mfa_body">
                <Typography sx={{ marginTop: "24px" }} variant="h6">
                    Nhập mã xác minh
                </Typography>
                <div className="d-flex flex-column row-gap-5 mt-4 justify-content-center align-items-center">
                    <p style={{ margin: 0, }}>{`Mã xác minh đã được gửi đến ${email}`} </p>
                    <div className="mfa_bottom">
                        <MFAInput length={6} onChange={setMfaCode}></MFAInput>
                        <Button onClick={handleSubmit} disabled={mfaCode.length != 6} sx={{ width: "160px", marginTop: "48px" }} variant="contained">Tiếp theo</Button>
                    </div>
                </div>

            </div>
        </div>
    </>)
}