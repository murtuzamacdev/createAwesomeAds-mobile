import './SizeSelector.scss';
import { GlobalContext } from '../../context/global.context';
import { AVAILALBE_SIZES } from '../../configs/constants';
import { useContext } from 'react';

const SizeSelector = () => {
    const globalContext = useContext(GlobalContext);

    return (<div className="size-select-ctrn">
        <p className="title mb-0 pl-2">Select Ad Size:</p>
        <div className="btns-ctrn d-flex p-1">
            {Object.keys(AVAILALBE_SIZES).map((key, i) => (
                <button
                    className="size-tile p-1"
                    key={AVAILALBE_SIZES[key].id}
                    style={{
                        backgroundColor: (globalContext.selectedSize === AVAILALBE_SIZES[key].id) ? 'white' : '#989898',
                        color: (globalContext.selectedSize === AVAILALBE_SIZES[key].id) ? 'black' : 'rgba(0, 0, 0, 0.45)'
                    }}
                    onClick={() => { globalContext.setselectedSize(AVAILALBE_SIZES[key].id) }} >
                    <img src={AVAILALBE_SIZES[key].icon} alt={AVAILALBE_SIZES[key].name} />
                    <p className="mb-0">{AVAILALBE_SIZES[key].name}</p></button>
            ))}
        </div></div>
    );
}

export default SizeSelector;