import React, { useContext } from "react";
import './TemplateSelectionModal.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { GlobalContext } from '../../../context/global.context';
import { TEMPLATES } from '../../../templates/TemplateController';


const TemplateSelectionModal = ({handleTemplateChange}) => {
    const globalContext = useContext(GlobalContext);
    let templatesArr = [];
    Object.keys(TEMPLATES).forEach(function (key) {
        templatesArr.push(TEMPLATES[key]);
    });
    const selectedTemplateIndex = templatesArr.findIndex((item) => item.id === globalContext.selectedTemplate)

    return (<div className="modal fade template-selection-modal-ctrn" id="templateSelectionModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div style={{ height: '100%' }} className="d-flex flex-column justify-content-end m-0">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5>Choose a Template</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <Carousel centerSlidePercentage={60} selectedItem={selectedTemplateIndex} showThumbs={false} autoFocus={false} showArrows={false} centerMode={true} showStatus={false} infiniteLoop={true} autoPlay={false} showIndicators={false}>
                            {templatesArr.map((item) => (
                                <div key={item.id} className="d-flex flex-column justify-content-between align-items-center" >
                                    {/* {<item.component productData={productData}/>} */}
                                    <img src={item.demoImage} alt="Demo img" />
                                    {item.status === 'ACTIVE' && <button onClick={() => { handleTemplateChange(item.id) }} className="small-select-btn mt-3 mb-3" data-dismiss="modal">Select</button>}
                                    {item.status === 'COMING_SOON' && <button className="coming-soon-btn mt-3 mb-3" ><span>Coming soon</span></button>}

                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
    </div >);
}

export default TemplateSelectionModal;