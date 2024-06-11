import {useLocation} from 'react-router';
export const LocationTest = () => {
    const location = useLocation();
    return (
        <div>
            <h1>Location : {location.pathname}</h1>
        </div>
    )
}