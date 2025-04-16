import { useNavigate, useSearchParams } from "react-router-dom";
import Heading from "../Utility/Heading";
import InputBox from "../Utility/InputBox";
import { useRef, useState } from "react";
import axios from "axios";

const SendMoney = () => {
    const navigate=useNavigate();

    const [queryParams]=useSearchParams();
    const name=queryParams.get("name");
    const userEmail=queryParams.get("email");

    const [error,setError]=useState('');
    const amountRef=useRef(null);

    const handleOnClick=async ()=>{
        if(!amountRef.current.value){
            setError('Please enter an amount')
            return;
        }
        const token=localStorage.getItem("authToken");

        try{
            const response=await axios.post('http://localhost:3000/api/v1/account/transfer',
                {
                    userEmail:userEmail,
                    transferAmount:amountRef.current.value
                },
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            )

            if(response.statusText==="OK"){
                navigate('/dashboard');
                alert(`successfully transferred ${amountRef.current.value}`)
            }
        }
        catch(error){
            navigate('/dashboard');
            alert('error while transfer')
        }
    }

    return (
    <>
        <div className="h-[100vh] w-[100vw] bg-gray-200 opacity-70 -z-10 absolute"></div>
        <div className="h-[100vh] w-[100vw] flex justify-center items-center">
            <div className="w-120 p-10 border-1 border-gray-300 rounded-md shadow-2xl bg-white">
                <div className="pt-2 pb-12">
                    <Heading title="Send Money" />
                </div>
                <div className="flex items-center gap-4 py-5">
                    <div className="w-10 h-10 rounded-full bg-green-500 text-3xl font-semibold flex justify-center items-center ">
                        {name[0].toUpperCase()}
                    </div>
                    <p className="text-2xl font-semibold">{`${name}`}</p>
                </div>
                {error.length>0 && (
                    <div className="flex items-center">
                        <p className="text-red-600 text-small font-semibold ">{`${error}*`}</p>
                    </div>
                )}
                <InputBox
                    type="number"
                    label={`Amount (in Rs.)`}
                    placeholder={"Enter amount"}
                    refVar={amountRef}
                />
                <div className="pt-5">
                    <div className="h-12 bg-green-500 rounded-xl">
                        <button 
                            onClick={handleOnClick}
                            className="h-full w-full text-black font-semibold cursor-pointer"
                        >
                            Initiate transfer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
};

export default SendMoney;
