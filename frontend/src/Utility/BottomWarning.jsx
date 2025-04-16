import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BottomWarning=({message,linkName,linkUrl})=>{
    
    return(
    <div className='flex gap-1 justify-center items-center font-semibold'>
        <span className='text-center'>
            {message}
        </span>
        <Link 
            className='underline underline-offset-1 text-center'
            to={linkUrl}
        >
            {linkName}
        </Link>
    </div>
    )
}

BottomWarning.propTypes={
    message:PropTypes.string.isRequired,
    linkName:PropTypes.string,
    linkUrl:PropTypes.string
}

export default BottomWarning;
