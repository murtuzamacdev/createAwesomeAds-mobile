import './IntroStep1.scss';

// Assets
import step1_tuto_image from '../../../assets/images/templates/welcome/step1_tuto_image.svg';

const IntroStep1 = () => {
    return (<div className="d-flex flex-column justify-content-center align-items-center introStep1-ctrn">
        <p className="title mt-3">Step 1 - Create Quickly</p>
        <p className="text-center sub pl-4 pr-4">Simply fill in the basic details about your product or service and see the magic happen</p>
        <img width="70%" src={step1_tuto_image} alt="step1 header" />
    </div>);
}

export default IntroStep1;