import PropTypes from 'prop-types';
const Button=({buttonName,clickHandler})=>{

    return(
    <div className='h-12 bg-black rounded-xl'>
        <button 
            onClick={clickHandler}
            className='h-full w-full text-white font-semibold cursor-pointer' 
        >
            {buttonName}
        </button>
    </div>
    )
}

Button.propTypes={
    buttonName: PropTypes.string.isRequired,
    clickHandler: PropTypes.func
}

export default Button;
