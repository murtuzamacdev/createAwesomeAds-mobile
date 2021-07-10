import React, { useContext } from "react";
import './Template1.scss';
import currencies from '../../configs/currencies.json';
import { GlobalContext } from '../../context/global.context';
import { hexToRgbA, } from '../../utility';

// Assets
import whatsappLogo from '../../assets/images/logos_whatsapp.svg';

const Template1 = () => {
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

    return (<div style={{ backgroundImage: "url(" + globalContext.productData.productImage + ")" }} className="temp1-ctnr">
        {globalContext.productData.productPrice !== '' && <div className="mt-3 d-flex justify-content-center single-line"><div className="product-price pt-2 pb-2 pl-4 pr-4"><small>{currencies.find((item) => item.code === globalContext.productData.currencyCode).symbol}</small> {globalContext.productData.productPrice}</div></div>}
        <div className="mb-3 bottom-ctrn">
            <p className={"product-name pt-2 pb-2 pl-1 pr-1 " + (hideThisPart(globalContext.productData) ? 'only-product-name' : 'with-absolute')}>{globalContext.productData.productName}</p>

            {!hideThisPart(globalContext.productData) && <div className="purple-ctnr pt-3 pb-3 pl-3 pr-3" style={{ backgroundColor: hexToRgbA(globalContext.selectedThemeColor, 0.75) }}>
                {globalContext.productData.productDescription !== '' && <div className="product-desc mb-1 pl-2" >{globalContext.productData.productDescription}</div>}
                <div className={'d-flex align-items-center mt-3 ' + (globalContext.productData.pitchText === '' ? 'justify-content-end' : 'justify-content-between')}>
                    {globalContext.productData.pitchText !== '' && <div className="order-now pl-2 pr-2">{globalContext.productData.pitchText}</div>}
                    {(globalContext.productData.sellerName !== '' || globalContext.productData.whatsappNumber !== '') && <>
                        <div className="seller-info-ctrn">
                            {globalContext.productData.sellerName !== '' && <div className='seller-name single-line'>{globalContext.productData.sellerName}</div>}
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

export default Template1;