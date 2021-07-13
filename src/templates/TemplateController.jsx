// Components
import Template1 from '../templates/template1/Template1';
import Template2 from '../templates/template2/Template2';
import Template3 from '../templates/template3/Template3';
import Template4 from '../templates/template4/Template4';
import Template5 from '../templates/template5/Template5';
import Template6 from '../templates/template6/Template6';
import Template7 from '../templates/template7/Template7';

// Assets
import template1Img from '../assets/images/templates/demo/1.svg';
import template2Img from '../assets/images/templates/demo/2.svg';
import template3Img from '../assets/images/templates/demo/3.svg';
import template4Img from '../assets/images/templates/demo/4.svg';
import template5Img from '../assets/images/templates/demo/5.svg';
import template6Img from '../assets/images/templates/demo/6.svg';
import template7Img from '../assets/images/templates/demo/7.svg';
import comingSoon from '../assets/images/templates/demo/comingSoon.svg';

export const TEMPLATES = {
    template4: {
        id: 'template4',
        component: Template4,
        demoImage: template4Img,
        status: 'ACTIVE',
        colorPreference: 0,
        
    },
    template2: {
        id: 'template2',
        component: Template2,
        demoImage: template2Img,
        status: 'ACTIVE',
        colorPreference: 0
    },
    template3: {
        id: 'template3',
        component: Template3,
        demoImage: template3Img,
        status: 'ACTIVE',
        colorPreference: -1,
        colorTone: 50,
        defaultColor: '#16E1B0'
    },
    template1: {
        id: 'template1',
        component: Template1,
        demoImage: template1Img,
        status: 'ACTIVE',
        colorPreference: -1,
        colorTone: 50,
        defaultColor: '#3F5CA9'
    },
    template5: {
        id: 'template5',
        component: Template5,
        demoImage: template5Img,
        status: 'ACTIVE',
        colorPreference: 0,
        defaultColor: '#0288d1'
    },
    template6: {
        id: 'template6',
        component: Template6,
        demoImage: template6Img,
        status: 'ACTIVE',
        colorPreference: 1,
        colorTone: 50,
        defaultColor: '#FF7A00'
    },
    template7: {
        id: 'template7',
        component: Template7,
        demoImage: template7Img,
        status: 'COMING_SOON'
    },
    comingSoon: {
        id: 'comingSoon',
        component: null,
        demoImage: comingSoon,
        status: 'COMING_SOON'
    },
}