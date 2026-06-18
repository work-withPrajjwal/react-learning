import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import { useEffect } from "react";

export default function ProtectedRoute() {
    
const navigate = useNavigate();
    const {isAuthenticated} = useAuth();



    useEffect(function(){

        if(!isAuthenticated) navigate("/")
    },[isAuthenticated, navigate])
  return (
    <div>ProtectedRoute</div>
  )
}