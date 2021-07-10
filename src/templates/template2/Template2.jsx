import React, { useContext } from "react";
import './Template2.scss';
import currencies from '../../configs/currencies.json';
import { GlobalContext } from '../../context/global.context';

// Assets
import whatsappLogo from '../../assets/images/logos_whatsapp.svg';

const Template2 = () => {
    const globalContext = useContext(GlobalContext);

    const hideThisPart = (formData) => {
        if (
            formData.sellerName === '' &&
            formData.whatsappNumber === '' &&
            formData.pitchText === ''
        ) {
            return true;
        } else {
            return false;
        }
    }

    return (<div className="d-flex flex-column template2-ctrn pt-4 pb-2 pl-3 pr-3 text-center">

        <div className="top-part d-flex flex-column justify-content-between">
            <div className="product-name mt-4 pl-3 pr-3">{globalContext.productData.productName}</div>
            {globalContext.productData.productDescription !== '' && <div className="product-description p-3">{globalContext.productData.productDescription}</div>}
            <div className="img-box-ctrn mt-4">
                <div className="product-image" style={{ backgroundImage: "url(" + globalContext.productData.productImage + ")" }}> </div>
                {globalContext.productData.productPrice !== '' && <div className="product-price p-2 pl-3 pr-3"><small>{currencies.find((item) => item.code === globalContext.productData.currencyCode).symbol}</small> {globalContext.productData.productPrice}</div>}
            </div>
        </div>

        {!hideThisPart(globalContext.productData) && <div className="bottom-part p-4 pb-0 ">
            {globalContext.productData.pitchText !== '' && <div className="order-now mb-2">{globalContext.productData.pitchText}</div>}
            {(globalContext.productData.sellerName !== '' || globalContext.productData.whatsappNumber !== '') && <>

                <div className="seller-info-ctrn p-3">
                    {globalContext.productData.sellerName !== '' && <div className='seller-name single-line'>{globalContext.productData.sellerName}</div>}
                    {globalContext.productData.whatsappNumber !== '' && <div className="d-flex mt-1 justify-content-center">
                        <img src={whatsappLogo} height="24px" width="24px" alt="whatsappLogo"></img>
                        <p className="whatsapp-number m-0 ml-2">{globalContext.productData.whatsappNumber}</p>
                    </div>}
                </div></>}
        </div>}

    </div>);
}

export default Template2;