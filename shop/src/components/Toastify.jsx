import { SSHOP_CONFIG } from "../heppler/setting/setting";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Toastify() {
    return (
        <ToastContainer 
        limit={SSHOP_CONFIG.toastify.limit} 
        autoClose={SSHOP_CONFIG.toastify.show_time}
        position={SSHOP_CONFIG.toastify.position}
        ></ToastContainer>    
    )
   
}
export default Toastify