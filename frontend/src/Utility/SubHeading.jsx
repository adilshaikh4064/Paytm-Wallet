import PropTypes from 'prop-types';

const SubHeading=({title})=>{

    return(
    <div>
        <p className='text-xl text-secondary-text-color text-center px-3 font-semibold'> {title} </p>
    </div>
    )
}

SubHeading.propTypes={
    title:PropTypes.string
}

export default SubHeading;
