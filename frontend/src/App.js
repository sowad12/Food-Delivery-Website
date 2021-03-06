import React,{useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { dispatchLogin,fetchUser,dispatchGetUser } from "./components/redux/actions/authAction";
import Home from "./components/Home";
import Register from "../src/components/auth/Register";
import ActivationEmail from "../src/components/auth/ActivationEmail"
import Login from "../src/components/auth/Login";
import ForgotPassword from "./components/auth/ForgotPassword";
import Navbar from "./components/Navbar/Navbar";
import FoodMenu from "./components/RestaurantItem/FoodMenu";
import SingleFood from "./components/singleFoodpage/SingleFood";
import Cart from "./components/Cart/Cart";
import NotFound from "./components/utils/NotFound/NotFound";
import Success from './components/utils/Success/Success'
import { Routes, Route } from "react-router-dom";
import AuthOutlet from "./privateRoute/AuthOutlet";
import ProfileDropDown from './components/Navbar/ProfileDropDown';
import Dashboard from "./components/Dashboard/Dashboard";
import axios from "axios";

function App() {
const dispatch=useDispatch()
const auth=useSelector(state=>state.auth)

const token = useSelector(state => state.token)
useEffect(()=>{
const userinfo=localStorage.getItem('userinfo')

if(userinfo){
  const getToken=async()=>{
   
    const res = await axios.post('/refreshToken')
    // console.log(res)
    dispatch({type: 'GET_TOKEN', payload: res.data.access_token})
  }
  getToken()
}
},[auth.isLogged,dispatch])

useEffect(() => {
  if(token){
    const getUser = () => {
    
      dispatch(dispatchLogin())

      return fetchUser(token).then(res => {
        dispatch(dispatchGetUser(res))
      })
    }
    getUser()
  }
},[token,dispatch])



const preventRefresh = (e) => {
  e.preventDefault();

};

  return (
  

    <>

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/RestaurantList" element={<Home />} />
      
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      <Route path="activate/:activation_token" element={<ActivationEmail />} />
        <Route path="forgotpassword" element={<ForgotPassword/>} />
        <Route path="/sample" element={<Dashboard/>}/>
        <Route path="/RestaurantMenu/:Restaurant" element={<FoodMenu/>} onClick={preventRefresh}/>
        {/* <Route path="/RestaurantMenu/:Restaurant/:foodName" element={<FoodMenu/>} onClick={preventRefresh}/> */}

        <Route  element={<AuthOutlet/>}>

          <Route path="/SingleFood/:foodRestId/:foodName/:id" element={<SingleFood/>} />
        </Route>
       
        <Route path="/cart" element={<Cart/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </>
  );
}

export default App;
