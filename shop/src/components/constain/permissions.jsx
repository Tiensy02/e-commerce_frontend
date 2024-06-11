import {getLoggedInUser} from '../../heppler/authUtils'
import { isAliviableArray } from '../../heppler/arrayUtils'
export const VIEW_ROLE_MAP = {
    PRODUCT: {
        View: "view",
        ViewAll: "viewAll",
    },
    DASHBOATRD: {
        View: "view",
    }
}

export const RESOURCE_MAP ={
    USER:{
        ACTION:{
            PRODUCT:"user:update",
            ACOUNT:"user:acount",

        }
    },
    DASHBOATRD:{
        VIEW:"user:dashboard"
    }

}

export const hasRolesOr = (resource,roles) => {
    return roles == "user:update"
}

export const hasRole = (resource,role) => {
    if (resource == null || role == null) {
        return false
    }
    const permissions = getLoggedInUser()?.permissionRoles;
    if(!isAliviableArray(permissions)) return false

    const roles = permissions.map(item => item?.id);

    if(resource === "*") {
        roles.forEach(element => {
            if(element.endsWith(role)) {
                return true
            }
        });
        return false
    }
    const resourceRoles = roles.filter(item => item.endsWith(resource));

    if(!isAliviableArray(resourceRoles)) return false

    for (var resourceRole of resourceRoles) {
        if (resourceRole.endsWith(role)) {
            return true
        }
    }

}