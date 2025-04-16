import { useEffect, useRef, useState } from "react";
import UsersCard from "./UsersCard"
import axios from "axios";
import InputBox from "./InputBox";

const Users=()=>{
    const [users,setUsers]=useState([]);
    const [filter,setFilter]=useState("");

    const filterRef=useRef(null);

    useEffect(()=>{
        const jwt_token=localStorage.getItem('authToken');
        async function getUsers(token){
            try{
                const response=await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`,{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
                if(response.statusText==='OK'){
                    setUsers(response.data.user)
                }
            }
            catch(error){
                console.log(error);
            }
        }
        if(jwt_token)   getUsers(jwt_token);
    },[filter])

    return(
    <>
        <InputBox 
            type="text" label={'User'} placeholder={'Search users...'} 
            onChange={()=>{setFilter(filterRef.current.value)}} 
            refVar={filterRef}
        />
        <div className="pb-5"></div>
        <div className="flex flex-col gap-4">
            {users.map((user,idx)=>(
                <UsersCard key={idx} firstname={user.firstname} lastname={user.lastname} userEmail={user.email} />
            ))}
        </div>
    </>
    )
}

export default Users;
