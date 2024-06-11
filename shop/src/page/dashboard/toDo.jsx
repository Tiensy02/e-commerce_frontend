import { Typography } from "@mui/material";
import Title from "./Title";
import "./index.css"

export default function ToDo({}) {
    const listTask = [
        {
            "title":"Chờ xác nhận",
            "info": 12
        },
        {
            "title":"Chờ lấy hàng",
            "info": 2
        },
        {
            "title":"Đã xử lý",
            "info": 12
        },
        {
            "title":"Đơn huỷ",
            "info": 1
        },
        {
            "title":"Sản phẩm hết hàng",
            "info": 0 
        },
        {
            "title":"Trả hàng",
            "info": 0
        }
    ]
    return (
        <div className="d-flex flex-column">
            <Typography variant="h6">Danh sách việc cần làm</Typography>
            <div className="to_do_list mt-4">
                {listTask.map((elem,index) => (
                    <div key={index} className="to_do_item">
                        <Typography variant="body2">{elem.title}</Typography>
                        <Title >{elem.info}</Title>
                    </div>

                ))}
            </div>
        </div>
    )
}
