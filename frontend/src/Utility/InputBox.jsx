import PropTypes from 'prop-types';

const InputBox=({refVar,type,label,placeholder,enterKeyDown,onChange})=>(
    <div className='flex flex-col gap-1'>
        <p className='font-bold'> {label} </p>
        <div className='h-10 border-1 border-gray-400 rounded-sm text-secondary-text-color font-semibold'>
            <input 
                ref={refVar}
                className='w-full h-full outline-none px-2'
                type={type}
                placeholder={placeholder}
                autoComplete='off'
                spellCheck="false"
                onKeyDown={enterKeyDown}
                onChange={onChange}
            />   
        </div>
    </div>
)

InputBox.propTypes={
    refVar:PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({current:PropTypes.any})
    ]),
    type:PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    enterKeyDown:PropTypes.func,
    onChange:PropTypes.func
}

export default InputBox;
