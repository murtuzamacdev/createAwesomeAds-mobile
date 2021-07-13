import './IntroStep2.scss';

// Assets
import step2_tuto from '../../../assets/images/templates/welcome/step2_tuto.mov';

const IntroStep2 = () => {
    return (<div className="d-flex flex-column justify-content-center align-items-center introStep2-ctrn w-100">
        <p className="title mt-3">Step 2 - Customize Your Way</p>
        <p className="text-center sub pl-4 pr-4">Choose from our beautifully designed customizable templates</p>
        <video width="100%" height="400" autoPlay loop muted>
            <source src={step2_tuto} type="video/mp4" />
        </video>
    </div>);
}

export default IntroStep2;