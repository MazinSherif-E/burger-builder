import React, { useEffect, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as indexActions from "./store/actions/index";
import classes from "./convertion/App.css";
import Spinner from "./components/UI/Spinner/Spinner";

const Logout = React.lazy(() => import("./containers/Auth.js/logout/logout"));
const Auth = React.lazy(() => import("./containers/Auth.js/Auth"));
const Orders = React.lazy(() => import("./containers/orders/orders"));
const ContactData = React.lazy(() =>
  import("./containers/Checkout/contactData/contactData")
);
const BurgerBuilder = React.lazy(() =>
  import("./containers/BurgerBuilder/BurgerBuilder")
);

const app = (props) => {
  useEffect(() => {
    props.onAuthCheckState();
  }, []);

  return (
    <div className={classes.main}>
      <Switch>
        <Route
          path="/orders"
          render={(props) => (
            <Suspense fallback={<Spinner />}>
              {" "}
              <Orders {...props} />{" "}
            </Suspense>
          )}
        />
        <Route
          path="/contactdata"
          render={(props) => (
            <Suspense fallback={<Spinner />}>
              {" "}
              <ContactData {...props} />{" "}
            </Suspense>
          )}
        />
        <Route
          path="/"
          exact
          render={(props) => (
            <Suspense fallback={<Spinner />}>
              {" "}
              <BurgerBuilder {...props} />{" "}
            </Suspense>
          )}
        />
        <Route
          path="/auth"
          exact
          render={(props) => (
            <Suspense fallback={<Spinner />}>
              {" "}
              <Auth {...props} />{" "}
            </Suspense>
          )}
        />
        <Route
          path="/logout"
          exact
          render={(props) => (
            <Suspense fallback={<Spinner />}>
              {" "}
              <Logout {...props} />{" "}
            </Suspense>
          )}
        />
      </Switch>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthCheckState: (ings) => dispatch(indexActions.authCheckState(ings)),
  };
};

export default connect(null, mapDispatchToProps)(app);
