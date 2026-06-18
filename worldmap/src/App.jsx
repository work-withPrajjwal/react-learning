import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/FakeAuthContext";
import { CitiesProvider } from "./contexts/CitiesContext";
import { lazy } from "react";

// import HomePage from "./pages/HomePage";
// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./pages/AppLayout";
// import Login from "./pages/Login";


import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import ProtectedRoute from "./pages/ProtectedRoute";


// dist/index.html                   0.45 kB │ gzip:   0.29 kB
// dist/assets/index-12e65ecb.css   31.28 kB │ gzip:   5.20 kB
// dist/assets/index-10c9171d.js   521.24 kB │ gzip: 151.85 kB


const HomePage = lazy(()=> import("./pages/HomePage"))
const Product = lazy(()=> import("./pages/Product"))
const Pricing = lazy(()=> import("./pages/Pricing"))
const PageNotFound = lazy(()=> import("./pages/PageNotFound"))
const AppLayout = lazy(()=> import("./pages/AppLayout"))
const Login = lazy(()=> import("./pages/Login"))

export default function App() {
  return (
    <AuthProvider>

    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />

          <Route path="app" element={ <ProtectedRoute>
            <AppLayout />
            </ProtectedRoute>
            }>
            <Route index element={<Navigate replace to="cities" />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="cities" element={<CityList />} />
            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
    </AuthProvider>
  );
}
