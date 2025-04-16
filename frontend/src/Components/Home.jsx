import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home=()=>{
    const navigate=useNavigate();
    useEffect(()=>{
        navigate('/signin');
    });
    return (
    <>
    Home page.
    </>
    )
}

export default Home;
