import instagramIcon from '../assets/images/instagramIcon.svg';
import whatsappIcon from '../assets/images/logos_whatsapp.svg';

export const UNSPLASH_API_KEY = process.env.REACT_APP_UNSPLASH_API_KEY;
export const UNSPLASH_APP_NAME = 'Create Awesome Ads'

export const PITCH_DEFAULT = ['ORDER NOW!', 'HURRY UP!', 'SALE!!!', '50% OFF', '1 + 1 FREE', 'CALL NOW!'];

export const AVAILALBE_SIZES = {
    WHATSAPP_STATUS: {
        id: 'WHATSAPP_STATUS',
        name:'Whatsapp Status',
        icon: whatsappIcon,
        remFontSize: '14px',
        calculateCanvasHieghtFunc: () => {
            let deviceHeight = window.innerHeight;
            let deviceWidth = window.innerWidth < 475 ? window.innerWidth : 475;
            let calculatedHeight = deviceWidth * (6 / 4);
            if (calculatedHeight > deviceHeight) {
                return deviceHeight;
            } else {
                return calculatedHeight;
            }
        }
    },
    INSTA_STORY: {
        id: 'INSTA_STORY',
        name:'Instagram Story',
        remFontSize: '14px',
        icon: instagramIcon,
        calculateCanvasHieghtFunc: () => {
            let deviceHeight = window.innerHeight;
            let deviceWidth = window.innerWidth < 475 ? window.innerWidth : 475;
            let calculatedHeight = deviceWidth * (16 / 9);
            if (calculatedHeight > deviceHeight) {
                return deviceHeight;
            } else {
                return calculatedHeight;
            }
        }
    },
    INSTA_VERTICLE: {
        id: 'INSTA_VERTICLE',
        name:'Instagram Rectangle',
        icon: instagramIcon,
        remFontSize: '12px',
        calculateCanvasHieghtFunc: () => {
            let deviceHeight = window.innerHeight;
            let deviceWidth = window.innerWidth < 475 ? window.innerWidth : 475;
            let calculatedHeight = deviceWidth * (5 / 4);
            if (calculatedHeight > deviceHeight) {
                return deviceHeight;
            } else {
                return calculatedHeight;
            }
        }
    },
    INSTA_SQUARE: {
        id: 'INSTA_SQUARE',
        name:'Instagram Square',
        icon: instagramIcon,
        remFontSize: '12px',
        calculateCanvasHieghtFunc: () => {
            let deviceHeight = window.innerHeight;
            let deviceWidth = window.innerWidth < 475 ? window.innerWidth : 475;
            let calculatedHeight = deviceWidth;
            if (calculatedHeight > deviceHeight) {
                return deviceHeight;
            } else {
                return calculatedHeight;
            }
        }
    }
}