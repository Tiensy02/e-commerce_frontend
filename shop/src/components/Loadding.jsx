import CircularProgress from '@mui/material/CircularProgress';
export const LoadingComponent = ({isWindow=true}) => {
    return (
        <div style={{ position: `${isWindow? "fixed":"absolute"}`, top: 0, left: 0, bottom: 0, right: 0, backgroundColor: "rgba(1, 9, 0,0.3)", display: 'flex', alignItems: 'center', justifyContent: 'center',zIndex:9999 }}> <CircularProgress color='primary' size={80} /> </div>
    )
}