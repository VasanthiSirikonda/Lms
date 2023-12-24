import "./App.css";
// import Customers from "./components/customers";
// import Landingpage from "./components/landingpage";
// import Login from "./components/login";
// import Merchants from "./components/merchants";
// import Promocodes from "./components/promocodes";
// import Registration from "./components/registration";
// import ResetPassword from "./components/resetPassword";
// import DataTable from "./components/usermanagement";
import { useEffect, useState } from "react";
import AuthProvider from "./helpers/authProvider";
import Routes from "./functions/routes";
import AppBar2 from "./commonComponents/appBar2";
import { commonService, snackBarMessage } from "./services/common-service";
import { CustomeSnackbar } from "./commonComponents/customeSnackbar";
import ResponsiveAppBar from "./commonComponents/promoAppBar1";
import { Router } from "react-router-dom";


function App() {
  let [token, setToken] = useState(false);
  let [currentComponent] = useState(commonService.getCurrentComponent());
  let [message, setSnackBarMessage] = useState("");

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    snackBarMessage.subscribe((value) => {
      console.log("======>", value);
      setSnackBarMessage(value);
    });
  }, []);

  const getToken = () => {
    setToken(sessionStorage.getItem("token") ? true : false);
  };

  return (
    <div className="App">
      <CustomeSnackbar message={message} />
      {/* <Router>
        <Route exact path="/" component={Login}></Route>
        <Route exact path="/signUp" component={Registration}></Route>
        <Route exact path="/home" component={Landingpage}></Route>
        <Route exact path="/resetPassword" component={ResetPassword}></Route>
        <Route exact path="/usermanagement" component={DataTable}></Route>
        <Route exact path="/merchants" component={Merchants}></Route>
        <Route exact path="/customers" component={Customers}></Route>
        <Route exact path="/promocodes" component={Promocodes}></Route>
      </Router> */}

      {token ? <AppBar2 /> : ""}
      <AuthProvider>
          {/* {token ? <ResponsiveAppBar text={currentComponent} /> : ""} */}
          <Routes />
      </AuthProvider>
    </div>
  );
}

export default App;
