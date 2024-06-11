import { Suspense } from "react"
import { allFlattenRoutes as routes } from "./index"
import { Route, Switch } from "react-router-dom"
import Error403 from "../page/other/Error403"
import { LoadingComponent } from "../components/Loadding"

const Routes = () => {
    return (
        <Suspense fallback={<LoadingComponent></LoadingComponent>}>
        <Switch>
            {routes.map((route, index) => {
                return (!route.children && (
                    <route.route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        resource={route.resource}
                        rolesOr={route.rolesOr}
                        component={
                            (props) => {
                                return <route.component {...props} />
                            }
                        }
                    >
                    </route.route>
                )
                )
            })}
            <Route component={() => {
                return <Error403 />

            }} />
        </Switch>
    </Suspense>
    )
    
}
export default Routes;