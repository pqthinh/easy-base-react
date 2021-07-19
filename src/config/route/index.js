import PropTypes from "prop-types";
import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Routers from "../../utils/Routers";
import Loading from "../../component/Loading/index";

const LoginPage = lazy(() => import("../../pages/Login"));
const RegisterPage = lazy(() => import("../../pages/Register"));
const ForgotPasswordPage = lazy(() => import("../../pages/ForgotPassword"));
const DashboardPage = lazy(() => import("../../pages/Dashboard"));

const Routes = ({ ...rest }) => {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route
          {...rest}
          exact
          path={Routers.SIGN_IN}
          render={(props) => {
            return <LoginPage {...rest} {...props} />;
          }}
        />
        <Route
          {...rest}
          exact
          path={Routers.REGISTER}
          render={(props) => {
            return <RegisterPage {...rest} {...props} />;
          }}
        />
        <Route
          {...rest}
          exact
          path={Routers.FORGOT_PASSWORD}
          render={(props) => {
            return <ForgotPasswordPage {...rest} {...props} />;
          }}
        />
        <Route
          {...rest}
          path={Routers.DASHBOARD}
          render={(props) => {
            return <DashboardPage {...rest} {...props} />;
          }}
        />
      </Switch>
    </Suspense>
  );
};

Routes.propTypes = {
  isLoggedIn: PropTypes.bool,
};

export default Routes;
