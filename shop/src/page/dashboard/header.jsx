import { Typography } from "@mui/material"
import { getLoggedInUser } from "../../heppler/authUtils"
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import AccountCircle from '@mui/icons-material/AccountCircle';
import "./index.css"
import IconButton from '@mui/material/IconButton';

export default function DashboardHeader() {
    const user = getLoggedInUser()
    return (
        <div className='dashboard_header'>
            <div className="dashboard_header-left">
                <Typography variant="h6" > <Link className="link_dashboard" to={{ pathname: "/dashboard" }}>Kênh người bán</Link></Typography>
                
                
            </div>
            <div className="dashboard_header-right">
                <div style={{ fontSize: 14 }} className='d-flex flex-row column-gap-2 align-items-center'>
                     <IconButton
                        sx={{ color: 'white' }}
                        size="small"
                        edge="end"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <AccountCircle color="primary" />
                        
                    </IconButton>
                    <Typography variant="h6">{getLoggedInUser().useName}</Typography>
                </div>
            </div>
        </div>
    )
}