import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login"
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<Product />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/app" element={<AppLayout />} >
        <Route path="cities" element={<CityList/>}/>
        <Route path="countries" element={<CountryList/>}/>
        <Route path="form" element={<p>Form to add new Country</p>}/>
        </Route>
        <Route path ="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}
