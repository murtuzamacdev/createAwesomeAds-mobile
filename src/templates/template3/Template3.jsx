import React, { useContext } from "react";
import './Template3.scss';
import currencies from '../../configs/currencies.json';
import { GlobalContext } from '../../context/global.context';

// Assets
import whatsappLogo from '../../assets/images/logos_whatsapp.svg';
import topRightLines from '../../assets/images/templates/template3/topRightLines.svg'

const Template3 = () => {
    const globalContext = useContext(GlobalContext);

    return (<div className="template3-ctrn d-flex flex-column pt-4 pb-4">

        <div className="product-image-ctrn">
            <img src={topRightLines} alt="lines" className="top-right-lines" />
            <img src={topRightLines} alt="lines" className="bottom-left-lines" />
            <div
                className={"child1 " + (globalContext.productData.productPrice === '' && 'justify-content-end' : 'justify-content-between')}
                style={{ backgroundImage: "url(" + globalContext.productData.productImage + ")" }}
            >
                {globalContext.productData.productPrice !== '' && <div className="mt-2 d-flex justify-content-end single-line mr-2"><div className="product-price pt-1 pb-1 pl-3 pr-3" style={{ backgroundColor: globalContext.selectedThemeColor }}><small>{currencies.find((item) => item.code === globalContext.productData.currencyCode).symbol}</small> {globalContext.productData.productPrice}</div></div>}
                <div className="product-name d-flex pl-2 pr-2 mb-2"><div className="child1-1 pl-2 pr-2">{globalContext.productData.productName}</div></div>
            </div>

        </div>

        <div className="bottom-ctrn d-flex">
            <div className="purple-ctnr">
                {globalContext.productData.productDescription !== '' && <div className="product-desc pl-2 mt-2 mb-1">{globalContext.productData.productDescription}</div>}
                <div className={'d-flex align-items-center ' + (globalContext.productData.pitchText === '' ? 'justify-content-end' : 'justify-content-between')}>
                    {globalContext.productData.pitchText !== '' && <div className="order-now pl-2 pr-2">{globalContext.productData.pitchText}</div>}
                    {(globalContext.productData.sellerName !== '' || globalContext.productData.whatsappNumber !== '') && <>
                        <div className="seller-info-ctrn">
                            {globalContext.productData.sellerName !== '' && <div className='seller-name single-line'>{globalContext.productData.sellerName}</div>}
                            {globalContext.productData.whatsappNumber !== '' && <div className="d-flex mt-1 align-items-center">
                                <img src={whatsappLogo} height="24px" width="24px" alt="whatsappLogo"></img>
                                <p className="whatsapp-number m-0 ml-2">{globalContext.productData.whatsappNumber}</p>
                            </div>}
                        </div></>}

                </div>
            </div>
        </div>

        <div id="tri-top-right" style={{ borderTopColor: globalContext.selectedThemeColor }}></div>
        <div className='child-ctnr'> <div id="tri-middle-black"></div> </div>
        <div id="tri-bottom-left" style={{ borderBottomColor: globalContext.selectedThemeColor }}></div>
        <div id="tri-bottom-right" style={{ borderBottomColor: globalContext.selectedThemeColor }}></div>
    </div>);
}

export default Template3;