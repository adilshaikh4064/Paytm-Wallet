import PropTypes from 'prop-types';

const Heading=({title})=>{
    return(
    <div>
        <h1 className='text-5xl font-extrabold text-center' > {title} </h1>
    </div>
    )
}

Heading.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Heading;
