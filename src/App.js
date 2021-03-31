import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import HomePageComponent from "./component/homePage/HomePageComponent";

import LoginCustomerComponent from "./component/customer/LoginCustomerComponent";
import AddCustomerComponent from "./component/customer/AddCustomerComponent";
import AddCustomerAddressComponent from "./component/customer/AddCustomerAddressComponent";
import EditCustomerComponent from "./component/customer/EditCustomerComponent";
import OrderHistoryComponent from "./component/customer/OrderHistoryComponent";
import CustAccountComponent from "./component/customer/CustAccountComponent";

import LoginVendorComponent from "./component/vendor/LoginVendorComponent";
import AddVendorComponent from "./component/vendor/AddVendorComponent";
import AddVendorAddressComponent from "./component/vendor/AddVendorAddressComponent";
import AddVendorBusinessComponent from "./component/vendor/AddVendorBusinessComponent";
import EditVendorComponent from "./component/vendor/EditVendorComponent";

import AddBookComponent from "./component/catalogue/AddBookComponent";
import AddBookImageComponent from "./component/catalogue/AddBookImageComponent";
import showCatalogueComponent from "./component/catalogue/showCatalogueComponent";
import showVendorCatalogueComponent from "./component/catalogue/showVendorCatalogueComponent";
import EditVendorCatalogueComponent from "./component/catalogue/EditVendorCatalogueComponent";
import SearchBookComponent from "./component/catalogue/SearchBookComponent";
import showBookComponent from "./component/catalogue/showBookComponent";
import RateBookComponent from "./component/catalogue/RateBookComponent";
import ShowRatingComponent from "./component/catalogue/ShowRatingComponent";

import ShowCartComponent from "./component/cart/ShowCartComponent";


function App() {
  return (
    <div>
    <Router>
        <div>
        <div className="topnav">
            <Link to="/">Home</Link>
            <Link to="/showCatalogue">Catalogue</Link>
            <Link to="/loginVendor">Login as vendor</Link>
            <Link to="/loginCustomer">Login as customer</Link>

            <div className="topnav-right">
            <div>
                <form>
                <input className="search-bar" type="search" id="searchBooks" placeholder="Type here..." name="searchBooks"/>
                <Link to="/searchBook">Search</Link>
                </form>
            </div>
            </div>
        </div>
        
            <Switch>

                <Route path="/loginCustomer" component={LoginCustomerComponent}/>
                <Route path="/newCustomer"component={AddCustomerComponent}/>
                <Route path="/customerAddress"component={AddCustomerAddressComponent}/>
                <Route path="/editCustomer"component={EditCustomerComponent}/>
                <Route path="/custOrderHistory"component={OrderHistoryComponent}/>
                <Route path="/custAccountDetails"component={CustAccountComponent}/>

                <Route path="/loginVendor" component={LoginVendorComponent}/>
                <Route path="/newVendor"component={AddVendorComponent}/>
                <Route path="/vendorAddress"component={AddVendorAddressComponent}/>
                <Route path="/vendorBusiness"component={AddVendorBusinessComponent}/>
                <Route path="/editVendor"component={EditVendorComponent}/>
                

                <Route path="/addNewBook"component={AddBookComponent}/>
                <Route path="/addBookImage"component={AddBookImageComponent}/>
                <Route path="/searchBook"component={SearchBookComponent}/>
                <Route path="/showBook"component={showBookComponent}/>
                <Route path="/showCatalogue"component={showCatalogueComponent}/>
                <Route path="/showVendorCatalogue"component={showVendorCatalogueComponent}/>
                <Route path="/editVendorCatalogue"component={EditVendorCatalogueComponent}/>
                

               
                <Route path="/showCart"component={ShowCartComponent}/>

                <Route path="/rateBook"component={RateBookComponent}/>
                <Route path="/showRateBook"component={ShowRatingComponent}/>

                <Route path="/" component={HomePageComponent}/>
               
            </Switch>
        </div>
    </Router>
    </div>
  );
}
// 
export default App;