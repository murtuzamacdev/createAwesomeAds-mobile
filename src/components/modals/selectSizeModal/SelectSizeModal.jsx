import './SelectSizeModal.scss';
import { GlobalContext } from '../../../context/global.context';
import { AVAILALBE_SIZES } from '../../../configs/constants';
import { useContext } from 'react';

const SelectSizeModal = ({handleSizeChange}) => {
    const globalContext = useContext(GlobalContext);

    return (<div className="modal fade select-size-modal-ctrn" id="selectSizeModal" tabIndex="-1" role="dialog" aria-labelledby="SelectSizeModal" aria-hidden="true">
        <div style={{ height: '100%' }} className="d-flex flex-column justify-content-end m-0">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header pb-1 pt-2">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="size-select-ctrn">
                            <p className="title mb-0 pl-2">Select Ad Size:</p>
                            <div className="btns-ctrn d-flex p-1">
                                {Object.keys(AVAILALBE_SIZES).map((key, i) => (
                                    <button
                                        className="size-tile p-2"
                                        key={AVAILALBE_SIZES[key].id}
                                        style={{
                                            backgroundColor: (globalContext.selectedSize === AVAILALBE_SIZES[key].id) ? 'white' : '#bfbfbf',
                                            color: (globalContext.selectedSize === AVAILALBE_SIZES[key].id) ? 'rgba(0, 0, 0, 0.70)' : 'rgba(0, 0, 0, 0.45)',
                                            border: (globalContext.selectedSize === AVAILALBE_SIZES[key].id) ? '2px solid #bfbfbf' : undefined,
                                        }}
                                        onClick={() => { handleSizeChange(AVAILALBE_SIZES[key].id) }} >
                                        <img src={AVAILALBE_SIZES[key].icon} alt={AVAILALBE_SIZES[key].name} />
                                        <p className="mb-0 mt-2">{AVAILALBE_SIZES[key].name}</p></button>
                                ))}
                            </div></div>
                    </div>
                </div>
            </div>
        </div>
    </div >);
}

export default SelectSizeModal;