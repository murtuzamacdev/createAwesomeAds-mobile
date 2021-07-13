import { Carousel } from 'react-responsive-carousel';
import './Welcome.scss';

//Assets
import welcome_text from '../../../assets/images/templates/welcome/welcome_text.svg';

// Template images
import w_temp1 from '../../../assets/images/templates/welcome/w_temp1.svg';
import w_temp2 from '../../../assets/images/templates/welcome/w_temp2.svg';
import w_temp3 from '../../../assets/images/templates/welcome/w_temp3.svg';
import w_temp5 from '../../../assets/images/templates/welcome/w_temp5.svg';
import w_temp6 from '../../../assets/images/templates/welcome/w_temp6.svg';
import w_temp7 from '../../../assets/images/templates/welcome/w_temp7.svg';
import w_temp8 from '../../../assets/images/templates/welcome/w_temp8.svg';

const Welcome = () => {
    return (<div className="welcome-ctnr d-flex flex-column align-items-center">
        <div className="p-3"><img src={welcome_text} alt="template" /></div>
        <p className="sub-text p-3 mb-0">Create beautiful and eye cathching Ads for your business in seconds.</p>
        <Carousel  centerSlidePercentage={55} interval={2000} showThumbs={false} autoFocus={true} showArrows={false} centerMode={true} showStatus={false} infiniteLoop={true} autoPlay={true} showIndicators={false}>
            <div className="p-3 demo"><img src={w_temp1} alt="template" /></div>
            <div className="p-3 demo"><img src={w_temp2} alt="template" /></div>
            <div className="p-3 demo"><img src={w_temp3} alt="template" /></div>
            <div className="p-3 demo"><img src={w_temp5} alt="template" /></div>
            <div className="p-3 demo"><img src={w_temp6} alt="template" /></div>
            <div className="p-3 demo"><img src={w_temp7} alt="template" /></div>
            <div className="p-3 demo"><img src={w_temp8} alt="template" /></div>
        </Carousel>
    </div>);
}

export default Welcome; <h1>Welcome</h1>