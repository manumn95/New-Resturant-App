import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./page/Home";
import Menu from "./page/Menu";
import About from "./page/About";
import Contact from "./page/Contact";
import Login from "./page/Login";
import NewProduct from "./page/NewProduct";
import SignUp from "./page/SignUp";
import { store } from "./redux/index";
import { Provider } from "react-redux";
import Cart from "./page/Cart";
import Success from "./page/Success";
import Cancel from "./page/Cancel";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App></App>}>
      <Route index element={<Home></Home>}></Route>
      <Route path="menu/:filterby" element={<Menu></Menu>}></Route>
      <Route path="about" element={<About></About>}></Route>
      <Route path="contact" element={<Contact></Contact>}></Route>
      <Route path="login" element={<Login></Login>}></Route>
      <Route path="newProduct" element={<NewProduct></NewProduct>}></Route>
      <Route path="signUp" element={<SignUp></SignUp>}></Route>
      <Route path='cart' element={<Cart></Cart>}></Route>
      <Route path='success'element={<Success></Success>}></Route>
      <Route path='cancel' element={<Cancel></Cancel>}></Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
);


reportWebVitals();
