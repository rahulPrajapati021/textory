import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router";

export default function LogoutUser() {
    const {logout} = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        logout();
        navigate("/");
    },[])
    return (
    <div className="min-h-screen bg-dark flex justify-center items-center text-2xl">Logging You Out...</div>
  )
}
