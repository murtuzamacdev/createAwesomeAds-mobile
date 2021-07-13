import './IntroStep3.scss';

// Assets
// import step3_tuto from '../../../assets/images/templates/welcome/step3_tuto.gif';
import step3_tuto from '../../../assets/images/templates/welcome/step3_tuto.mov';

const IntroStep3 = () => {
    return (<div className="d-flex flex-column justify-content-center align-items-center introStep3-ctrn w-100">
        <p className="title mt-3">Step 3 - Share and Sell</p>
        <p className="text-center sub pl-4 pr-4">Download the template, share it across all your social media and boost your sales!</p>
        <video width="100%" height="400" autoPlay loop muted>
            <source src={step3_tuto} type="video/mp4" />
        </video>
    </div>);
}

export default IntroStep3;