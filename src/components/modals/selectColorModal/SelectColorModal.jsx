import React, { useContext } from "react";
import './SelectColorModal.scss';
import { SwatchesPicker } from 'react-color';
import { GlobalContext } from '../../../context/global.context';

const SelectColorModal = ({ handleColorChange }) => {
    const globalContext = useContext(GlobalContext);

    return (<div className="modal fade select-color-modal-ctrn" id="selectColorModal" tabIndex="-1" role="dialog" aria-labelledby="SelectImageModal" aria-hidden="true">
        <div style={{ height: '100%' }} className="d-flex flex-column justify-content-end m-0">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header pb-1 pt-2">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <SwatchesPicker
                            color={globalContext.selectedThemeColor}
                            onChangeComplete={(color) => { handleColorChange(color) }} />
                    </div>
                </div>
            </div>
        </div>
    </div >);
}

export default SelectColorModal;