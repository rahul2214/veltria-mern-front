import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/Authcontext";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext()
    const signup = async ({ username, password, confirmPassword}) => {
        const success = handleInputErrors({ username, password, confirmPassword})
        if (!success) return;
        setLoading(true);
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password, confirmPassword})
            })
            const data = await res.json();
            if(data.error) {
                throw new Error(data.error);
            }
            // console.log(data);
            localStorage.setItem("user", JSON.stringify(data));
            setAuthUser(data);
        } catch (error) {
            toast.error(error.message);
        }
        finally {
            setLoading(false);
        }
    }
    return {loading,signup}
}
export default useSignup;
function handleInputErrors({  username, password, confirmPassword }) {

    if ( !username || !password || !confirmPassword ) {
        toast.error("Please fill in all fields.")
        return false
    }
    if (password !== confirmPassword) {
        toast.error("Passsword do not match")
        return false
    }
    if (password.length < 6) {
        toast.error("Passsword must be at least 6 characters");
        return false;
    }
    return true
}