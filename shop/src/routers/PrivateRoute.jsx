import {Route} from 'react-router-dom';
import {isUserAuthenticated} from '../heppler/authUtils';
import { isAliviableArray } from '../heppler/arrayUtils';
import { hasRolesOr } from '../components/constain/permissions';
import { getLoggedInUser } from '../heppler/authUtils';
const PrivateRoute = ({component: Component, resource, role, rolesOr,...rest}) => {
    <Route 
    {...rest}
    render = {
        props => {
            if(!isUserAuthenticated()) {
                return <Redirect to={{ pathname: '/signUp', state: { from: props.location } }} />;
            }
            if( isAliviableArray(rolesOr)) {
                const user = getLoggedInUser();
                const permiss = user.permissions
                let check = false;
                permiss.forEach(element => {
                    if(element=="user:update") {
                        check = true;
                    }
                });
                if(check) {
                    return <Component {...props} />
                }
                else {
                    return <Error403 {...props} />
                }
            }
        } 

    }
    ></Route>
}
export default PrivateRoute;