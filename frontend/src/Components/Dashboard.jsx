import { useEffect, useState } from "react";
import BalanceBox from "../Utility/BalanceBox";
import UserNav from "../Utility/UserNav";
import axios from "axios";
import Users from "../Utility/Users";

const Dashboard=()=>{
    const [balance,setBalance]=useState(0);

    useEffect(()=>{
        const jwt_token=localStorage.getItem('authToken');
        async function fetchData(token){
            try{
                const response=await axios.get('http://localhost:3000/api/v1/account/balance',
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
                if(response.statusText==='OK'){
                    setBalance(response.data.balance);
                }
            }
            catch(error){
                console.log(error);
            }
        }
        if(jwt_token)    fetchData(jwt_token);

    },[])

    return (
    <div className="w-[100vw] h-[100vh] px-4 bg-gray-100">
        <UserNav />
        <BalanceBox balance={balance} />
        <Users/>
    </div>
    )
}

export default Dashboard;