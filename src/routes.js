import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import ContactUs from './pages/ContactUs/ContactUs'
import Checkout from './pages/Checkout/Checkout'
import Dashboard from './pages/Dashboard/DashboardMenu'
import Login from './pages/Login/Login'
import Product from './pages/Product/Product'
import Register from './pages/Register/Register'
import Success from './pages/Success/Success'
import Products from "./pages/Products/Products"
import OrderDetails from "./pages/OrderDetails/OrderDetails"
import NotFound from "./pages/NotFound/NotFound"
import Thanks from "./pages/ContactUs/Thanks"
import RecoveryEmailSent from "./pages/PasswordRecovery/RecoveryEmailSent"
import ResetPassword from "./pages/PasswordRecovery/ResetPassword"
import DashboardUserData from "./pages/Dashboard/DashboardUserData/DashboardUserData"
import DashboardAddresses from "./pages/Dashboard/DashboardAddresses/DashboardAddresses"
import DashboardOrders from "./pages/Dashboard/DashboardOrders/DashboardOrders"
import PrivateRoute from './services/PrivateRoute'
import PasswordRecovery from "./pages/PasswordRecovery/PasswordRecovery"
import Search from "./pages/Search/Search"
import ScrollToTop from "./services/ScrollToTop";
import Boleto from "./components/macro/PaymentMothods/Boleto"
import Pix from "./components/macro/PaymentMothods/Pix"
import Invoice from "./components/macro/Invoice/Invoice"

export const Routes = () => {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/home" component={Home} />
                <Route path="/cart" component={Cart} />
                <Route path="/contactus" component={ContactUs} />
                <Route path="/thanks" component={Thanks} />
                <Route path="/login" component={Login} />
                <Route path="/product/:id" component={Product} />
                <Route path="/register" component={Register} />
                <Route path="/recoveryEmail" component={RecoveryEmailSent} />
                <Route path="/reset/:token" component={ResetPassword} />
                <Route path="/products/:filter/:id" component={Products} exact />
                <Route path="/products/search" component={Search} exact />
                <Route path="/passwordRecovery" component={PasswordRecovery} />
                <PrivateRoute path="/checkout" component={Checkout} />
                <PrivateRoute path="/success" component={Success} exact/>
                <PrivateRoute path={`/success/boleto/:id`} component={Boleto} />
                <PrivateRoute path={`/success/pix/:id`} component={Pix} />
                <PrivateRoute path={`/myProfile/account/:userid`} component={DashboardUserData} exact />
                <PrivateRoute path={`/myProfile/account/:userid/addresses`} component={DashboardAddresses} exact />
                <PrivateRoute path={`/myProfile/account/:userid/orders`} component={DashboardOrders} exact />
                <PrivateRoute path={`/myProfile/account/:userid/orders/:id`} component={OrderDetails} exact />
                <PrivateRoute path={`/myProfile/account/:userid/orders/:id/boleto/:bid`} component={Boleto} />
                <PrivateRoute path={`/myProfile/account/:userid/orders/:id/pix/:pid`} component={Pix} />
                <PrivateRoute path={`/myProfile/account/:userid/orders/:id/invoice/:id`} component={Invoice} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}