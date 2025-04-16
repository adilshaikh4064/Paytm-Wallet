import { useRef, useState } from "react";
import BottomWarning from "../Utility/BottomWarning";
import Button from "../Utility/Button";
import Heading from "../Utility/Heading";
import InputBox from "../Utility/InputBox";
import SubHeading from "../Utility/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup=()=>{
    const [error,setError]=useState("");
    const navigate=useNavigate();

    const firstnameRef=useRef();
    const lastnameRef=useRef();
    const emailRef=useRef();
    const passwordRef=useRef();
    const cnfpasswordRef=useRef();

    const onChangeHandle=()=>{
        if(passwordRef.current.value!==cnfpasswordRef.current.value){
            cnfpasswordRef.current.style.color="red"
        }
        else{
            cnfpasswordRef.current.style.color="#737474"
        }
    }

    const handleOnClick=async ()=>{
        if(passwordRef.current.value!==cnfpasswordRef.current.value){
            setError("Check Your Passwords again.")
            return;
        }
        try{
            const response=await axios.post('http://localhost:3000/api/v1/user/signup',
                {
                    email:emailRef.current.value,
                    firstname:firstnameRef.current.value,
                    lastname:lastnameRef.current.value,
                    password:passwordRef.current.value
                }
            )
            if(response.statusText==="OK"){
                const token=response.data.jwt_token;
                localStorage.setItem('authToken',token);
                navigate('/dashboard');
            }
        }
        catch(error){
            setError(`Signup failed: [Error: ${error.response.data.message}]`);
        }
    }

    return (
    <>
        <div className="h-[100vh] w-[100vw] bg-gray-200 opacity-70 -z-10 absolute"></div>
        <div className="h-[100vh] w-[100vw] flex justify-center items-center">
            <div className="w-100 flex flex-col px-3 pt-5 pb-3 border-1 border-gray-300 rounded-md shadow-2xl bg-white">
                <div className="flex flex-col gap-3 mb-10">
                    <Heading title={"Sign up"} />
                    <SubHeading title={"Enter your information to create an account"} />
                </div>
                {error.length>0 && (
                    <div className="flex items-center">
                        <p className="text-red-600 text-small font-semibold ">{`${error}*`}</p>
                    </div>
                )}
                <div className="flex flex-col gap-2">
                    <InputBox refVar={firstnameRef} type="text" label={'First Name'} placeholder={'Jason'} />
                    <InputBox refVar={lastnameRef} type="text" label={'Last Name'} placeholder={'Roy'} />
                    <InputBox refVar={emailRef} type="email" label={'Email'} placeholder={'jasonroy@gmail.com'} />
                    <InputBox refVar={passwordRef} type="password" label={'Password'} placeholder={''} />
                    <InputBox refVar={cnfpasswordRef} type="password" label={'Confirm Password'} placeholder={''} onChange={onChangeHandle} />
                </div>
                <div className="my-6">
                    <Button 
                        clickHandler={handleOnClick}
                        buttonName={'Sign up'} 
                    />
                </div>
                <BottomWarning message={"Already have an account? "} linkName={'Sign in'} linkUrl={'/signin'} />
            </div>
        </div>
    </>
    )
}

export default Signup;