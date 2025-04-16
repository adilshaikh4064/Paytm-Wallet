import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const UsersCard=({firstname,lastname,userEmail})=>{
    const navigate=useNavigate();
    
    return (
    <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center justify-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full text-xl font-semibold flex justify-center items-center">U</div>
            <p className="font-semibold">{`${firstname} ${lastname}`}</p>
        </div>

        <div className="h-10 w-40 bg-black text-white rounded-md">
            <button 
                onClick={()=>{navigate(`/send?email=${userEmail}&name=${firstname}`)}}
                className="w-full h-full flex justify-center items-center cursor-pointer font-semibold"
                >
                    Send Money
                </button>
        </div>
    </div>
    )
}

UsersCard.propTypes={
    firstname:PropTypes.string,
    lastname:PropTypes.string,
    userEmail:PropTypes.string
}

export default UsersCard;
