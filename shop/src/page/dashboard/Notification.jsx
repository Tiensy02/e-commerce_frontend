import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import "./index.css"
function preventDefault(event) {
  event.preventDefault();
}
export default function Notification() {
    return (
        <React.Fragment>
            <Title>Thông báo</Title>
            <p className='notification_title' >
                Nhà bán hàng chiến lược
            </p>
            <p className='notification_content'>
                Cơ hội dành cho shop đây rồi! Tham gia ngay chương trình để trở thành Nhà bán hàng chiến lược Shopee để được tư vấn 1:1 với chuyên gia tư vấn từ Shopee giúp shop tăng đơn hàng và doanh số hiệu quả trên Shopee! 👉 Đăng ký ngay tại đây
            </p>
            <div>
                <Link color="primary" href="#" onClick={preventDefault}>
                    Xem thêm 
                </Link>
            </div>
        </React.Fragment>
    );
}
