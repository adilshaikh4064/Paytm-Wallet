import { useRef, useState } from "react";
import axios from 'axios';
import BottomWarning from "../Utility/BottomWarning";
import Button from "../Utility/Button";
import Heading from "../Utility/Heading";
import InputBox from "../Utility/InputBox";
import SubHeading from "../Utility/SubHeading";
import { useNavigate } from "react-router-dom";

const Signin=()=>{
    const [error,setError]=useState('');
    const emailRef=useRef(null);
    const passwordRef=useRef(null);

    const navigate=useNavigate();

    const EnteronEmail=(event)=>{
        if(event.key==='Enter'){
            passwordRef.current.focus();
        }
    }
    const EnteronPassword=(event)=>{
        if(event.key==='Enter'){
            handleOnClick();
        }
    }

    const handleOnClick=async ()=>{

        try{   
            const response= await axios.post('http://localhost:3000/api/v1/user/signin',
                {
                    email:`${emailRef.current.value}`,
                    password:`${passwordRef.current.value}`
                },
                {
                    timeout:5000
                }
            )
            if(response.statusText==="OK"){
                const token=response.data.jwt_token;
                localStorage.setItem('authToken',token);
                navigate('/dashboard');
            }
        }
        catch(error){
            setError(`Signin failed: [Error: ${error.response.data.message}]`);
        }
    }

    return (
    <>
        <div className="h-[100vh] w-[100vw] bg-gray-200 opacity-70 -z-10 absolute"></div>
        <div className="h-[100vh] w-[100vw] flex justify-center items-center">
            <div className="w-100 flex flex-col px-3 pt-5 pb-3 border-1 border-gray-300 rounded-md shadow-2xl bg-white">
                <div className="flex flex-col gap-3 mb-10">
                    <Heading title={"Sign in"} />
                    <SubHeading title={"Enter your credentials to access your account"} />
                </div>
                {error.length>0 && (
                    <div className="flex items-center">
                        <p className="text-red-600 text-small font-semibold ">{`${error}*`}</p>
                    </div>
                )}
                <div className="flex flex-col gap-2">
                    <InputBox 
                        refVar={emailRef} 
                        type={'email'} label={'Email'} placeholder={'jasonroy@gmail.com'} 
                        enterKeyDown={EnteronEmail}
                    />
                    <InputBox 
                        refVar={passwordRef} 
                        type={'password'} label={'Password'} placeholder={''} 
                        enterKeyDown={EnteronPassword}
                    />
                </div>
                <div className="my-6">
                    <Button 
                        buttonName={'Sign in'}
                        clickHandler={handleOnClick}
                    />
                </div>
                <BottomWarning message={"Don't have an account? "} linkName={'Sign up'} linkUrl={'/signup'} />
            </div>
        </div>
    </>
    )
}

export default Signin;