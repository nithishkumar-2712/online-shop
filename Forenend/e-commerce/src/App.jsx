import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import "./App.css";
import AddtoCart from "./Page/AddtoCart";
import Navbar from "./components/Navbar";
import About from "./Page/About";
import Contact from "./Page/Contact";
import Login from "./Page/Login";
import Register from "./Page/Register";
import Home from "./Page/Home";
import Product from "./Page/Product";
import Viewproduct from "./Page/Viewproduct";
import AddressDelivery from "./Page/AddressDelivery";
import DashboardHome from "./Page/DashboardHome";
import OrdersManagement from "./Page/OrdersManagement";
import ProductManagement from "./Page/ProductManagement";
import UsersManagement from "./Page/UsersManagement";
import WishList from "./Page/WishList";
import {ToastContainer}from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import OrderSuccess from "./Page/OrderConfirmation";
import Profile from "./Page/Profile";
import axios from "./Config/axios";
import { createContext, useEffect, useState } from "react";
import OrderDetails from "./Page/MyOrderDetails";
import Chat from "./Page/Chat";
import Singlechat from "./Page/Singlechat";
import NotFound from "./Page/NotFound";
import Inventory from "./Page/InventoryManagement";
import AdminReviews from "./Page/AdminReviews";
import TopSelling from "./Page/TopSelling";
import AdminNavbar from "./components/AdminNavbar";
import Adminprofil from "./Page/Adminprofil";
import Orderreturn from "./Page/Orderreturn";
import MasterManagement from "./Page/MasterManagement";
export const AppContext=createContext()
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [Admin, setAdmin] = useState();
  // console.log(Admin)
const tokencheck = async () => {
  try {
    const { data } = await axios.get("/tokencheck");

    if (data.success) {
      setIsLoggedIn(true);
      setAdmin(data.data.role);
    } else {
      setIsLoggedIn(false);
      setAdmin(null);
    }
  } catch (error) {
    setIsLoggedIn(false);
    setAdmin(null);
  } finally {
    setLoading(false);
  }
};
  useEffect(()=>{
    tokencheck();
  },[])
  return (
    <>
    <AppContext.Provider value={{isLoggedIn,setIsLoggedIn,tokencheck}}>
        <BrowserRouter>
          {Admin==="Admin"?(
          <>
          <AdminNavbar />
          </>):(
          <>
            <Navbar/>
          </>
          )
          }
          <Routes>
            <Route path="/" element={<Home />} />

            {/* AdminDashbord */}
            {Admin==="Admin"?(
            <>
            <Route path="/DashboardHome" element={<DashboardHome />} />
            <Route path="/ProductManagement" element={<ProductManagement/>} />
            <Route path="/OrdersManagement" element={<OrdersManagement/>} />
            <Route path="/UsersManagement" element={<UsersManagement/>} />
            <Route path="/InventoryManagement" element={<Inventory/>} />
            <Route path="/AdminReviews" element={<AdminReviews/>} />
            <Route path="/TopSelling" element={<TopSelling/>} />
            <Route path="/Adminprofil" element={<Adminprofil/>} />
            <Route path="/MasterManagement" element={<MasterManagement/>} />
            <Route path="/Orderreturn" element={<Orderreturn/>} />
            </>
          ):(
          <>
            <Route
                path="/"
                element={
                  loading ? null :
                  Admin === "Admin"
                    ? <Navigate to="/DashboardHome" />
                    : <Home />
                }
              />
            <Route path="/About" element={<About />} />
          
            <Route path="/Contact" element={<Contact />} />
            <Route path="/OrderDetails" element={<OrderDetails/>} />
            {!isLoggedIn ? (
              <>
                <Route path="/signup" element={<Register />} />
                <Route path="/signin" element={<Login />} />
              </>
            ) : (
              <>
                <Route path="/signup" element={<Navigate to="/" />} />
                <Route path="/signin" element={<Navigate to="/" />} />
              </>
            )}
            <Route
              path="/profile"
              element={isLoggedIn ? <Profile /> : <Navigate to="/signin" />}
            />
            <Route path="/product" element={<Product />} />
            <Route path="/Bag" element={<AddtoCart />} />
            <Route path="/Chat" element={<Chat/>} />
            <Route path="/Singlechat" element={<Singlechat/>} />
            <Route path="/View/:id" element={<Viewproduct />} />
            <Route path="/WishList" element={<WishList />} />
            <Route path="/OrderSuccess/:id" element={<OrderSuccess />} />
            <Route path="/AddressDelivery/:id" element={<AddressDelivery />} />
          </>)}
            <Route path="*" element={<NotFound/>} />
            <Route
              path="/profile"
              element={<Profile />}
            />
          </Routes>
        </BrowserRouter>
    </AppContext.Provider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
      />
    </>
  );
}

export default App;
