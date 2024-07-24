import "./App.css";
import Header from "./component/Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setDataProduct } from "./redux/productSlice";

function App() {
  const dispatch = useDispatch();


  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_DOMAIN}/products`
      );
      dispatch(setDataProduct(response.data));
    })();
  }, []);
 
  return (
    <>
      <Toaster />
      <div>
        <Header></Header>
        <main className="pt-16 bg-slate-100 min-h-[calc(100vh)]">
          <Outlet></Outlet>
        </main>
      </div>
    </>
  );
}

export default App;
