import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../context/global.context';
import './Intro.scss'

// Components
import Welcome from './welcome/Welcome';
import IntroStep1 from './step1/IntroStep1';
import IntroStep2 from './step2/IntroStep2';
import IntroStep3 from './step3/IntroStep3';

const Intro = () => {
    const globalContext = useContext(GlobalContext);
    const [currentStep, setcurrentStep] = useState(0);

    const handleNext = (_currentStep) => {
        if (_currentStep === 3) {
            localStorage.setItem('hideIntro', true);
            globalContext.sethideIntro(true);
        } else {
            setcurrentStep(currentStep + 1);
        }

    }
    return (<div className="d-flex flex-column h-100 justify-content-center intro-ctrn align-items-center">
        {currentStep === 0 && <Welcome />}
        {currentStep === 1 && <IntroStep1 />}
        {currentStep === 2 && <IntroStep2 />}
        {currentStep === 3 && <IntroStep3 />}

        <button className="next-btn mt-4" onClick={() => { handleNext(currentStep) }} >{currentStep === 3 ? "Let's Go!" : 'Next'}</button>
    </div>);
}

export default Intro;