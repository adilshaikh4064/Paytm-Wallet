import PropTypes from 'prop-types';

const BalanceBox=({balance})=>(
    <div className="flex gap-3 py-6">
        <span className="font-bold text-xl">Your Balance: </span>
        <span className="font-semibold text-xl text-secondary-text-color">{`${balance}`}</span>
    </div>
)

BalanceBox.propTypes={
    balance:PropTypes.number
}

export default BalanceBox;
