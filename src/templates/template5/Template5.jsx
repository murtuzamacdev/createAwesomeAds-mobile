import React, { useContext } from "react";
import './Template5.scss';
import currencies from '../../configs/currencies.json';
import { GlobalContext } from '../../context/global.context';
import {hexToRgbA} from '../../utility';

// Assets
import backdrop from '../../assets/images/backdrop.svg';
import whatsappLogo from '../../assets/images/logos_whatsapp.svg';

const Template5 = () => {
    const globalContext = useContext(GlobalContext);

    const hideThisPart = (formData) => {
        if (
            formData.productDescription === '' &&
            formData.sellerName === '' &&
            formData.whatsappNumber === '' &&
            formData.pitchText === ''
        ) {
            return true;
        } else {
            return false;
        }
    }

    return (<div className="template5-cntr" style={{ background: 'linear-gradient( 0.74deg , ' + globalContext.selectedThemeColor  + ' 0.59%, ' + hexToRgbA(globalContext.selectedThemeColor, 0.8)  + ' 99.01%)' }}>
        <div className="card p-0 main-card">
        {globalContext.productData.productPrice !== '' && <p className="product-price pt-1 pb-2 pl-4 pr-4 mb-0 mt-2 mr-2" style={{ backgroundColor: hexToRgbA(globalContext.selectedThemeColor, 0.9) }}><small>At {currencies.find((item) => item.code === globalContext.productData.currencyCode).symbol}</small> {globalContext.productData.productPrice}</p>}
            {/* Main Image */}
            <div style={{  flexGrow: 1 }} className="d-flex product-image-card justify-content-center p-0">
                <img className="product-image" src={globalContext.productData.productImage} alt="productImage" />
                <img className="product-image-backdrop" src={backdrop} alt="productBackdrop" />
                <div className="d-flex name-price-ctnr product-name-card justify-content-between align-items-center flex-column">
                    <p style={{ flexGrow: 0.7 }} className="product-name mb-2">{globalContext.productData.productName}</p>                    
                </div>

            </div>

            {!hideThisPart(globalContext.productData) && <div  className="pt-4 pb-4 pl-4 pr-4">
                {/* Product descrption */}
                {globalContext.productData.productDescription !== '' && <div style={{ flex: 1 }} className=" product-desc-card justify-content-center mb-1">
                    <p className="m-0 product-desc">{globalContext.productData.productDescription}</p>
                </div>}

                {/* Business name */}
                <div className={'d-flex align-items-center mt-3 ' + (globalContext.productData.pitchText === '' ? 'justify-content-end' : 'justify-content-between')}>
                    {globalContext.productData.pitchText !== '' && <div className="order-now">{globalContext.productData.pitchText}</div>}
                    {(globalContext.productData.sellerName !== '' || globalContext.productData.whatsappNumber !== '') && <>
                        <div className="seller-info-ctrn">
                            {globalContext.productData.sellerName !== '' && <div className='store-name single-line'>{globalContext.productData.sellerName}</div>}
                            {globalContext.productData.whatsappNumber !== '' && <div className="d-flex mt-1 align-items-center">
                                <img src={whatsappLogo} height="24px" width="24px" alt="whatsappLogo"></img>
                                <p className="whatsapp-number m-0 ml-2">{globalContext.productData.whatsappNumber}</p>
                            </div>}
                        </div>
                    </>}
                </div>

            </div>}
        </div>
    </div>);
}

export default Template5;