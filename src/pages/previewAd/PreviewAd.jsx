import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import './PreviewAd.scss';
import domtoimage from 'dom-to-image';
import { GlobalContext } from '../../context/global.context';
import { UNSPLASH_APP_NAME, UNSPLASH_API_KEY, AVAILALBE_SIZES } from '../../configs/constants';
import { createApi } from 'unsplash-js';
import firebase from "firebase/app";
import "firebase/analytics";
import GAEvents from '../../configs/GA_events.json';
import { changeColorTone, hexToRgbA, lightOrDark, getOS } from '../../utility';
import { useSwipeable } from 'react-swipeable';
import { Filesystem, FilesystemDirectory } from '@capacitor/filesystem';


//assets
import downloadBtn from '../../assets/images/downloadBtn.svg';
import editBtn from '../../assets/images/editBtn.svg';
// import changeTemplateBtn from '../../assets/images/changeTempBtn.svg';
import changeColor from '../../assets/images/changeColor.svg';
import prevNextBtn from '../../assets/images/prevNextBtn.svg';

// Templates
import { TEMPLATES } from '../../templates/TemplateController';

// Components
import Loading from '../../components/loading/Loading';
import TemplateSelectionModal from '../../components/modals/templateSelection/TemplateSelectionModal';
import SelectColorModal from '../../components/modals/selectColorModal/SelectColorModal';
import SizeSelector from '../../components/sizeSelector/SizeSelector';

const PreviewAd = () => {
    const globalContext = useContext(GlobalContext);
    const [loading, setLoading] = useState(false);
    const [showWatermark, setShowWatermark] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const [canvasHeight, setcanvasHeight] = useState(AVAILALBE_SIZES[globalContext.selectedSize].calculateCanvasHieghtFunc());

    let history = useHistory();
    const unsplash = createApi({
        accessKey: UNSPLASH_API_KEY
    });

    const containerHieght = window.innerHeight;

    const swipeConfig = {
        delta: 10,                            // min distance(px) before a swipe starts
        preventDefaultTouchmoveEvent: false,  // call e.preventDefault *See Details*
        trackTouch: true,                     // track touch input
        trackMouse: false,                    // track mouse input
        rotationAngle: 0,                     // set a rotation angle
    }



    useEffect(() => {

        // if no context, send to create page
        if (!globalContext.productData) {
            history.push('/');
        }

        setTimeout(() => {
            setShowControls(false);
        }, 4000);

        setTimeout(() => {
            setShowControls(true);
        }, 500);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setcanvasHeight(AVAILALBE_SIZES[globalContext.selectedSize].calculateCanvasHieghtFunc());
        document.getElementById('preview-ad-ctrn-id').style.fontSize = AVAILALBE_SIZES[globalContext.selectedSize].remFontSize;
    }, [globalContext.selectedSize]);

    useEffect(() => {
        if (globalContext.productData) {
            const selectedTemplateObj = TEMPLATES[globalContext.selectedTemplate];
            let selectedThemeColor = localStorage.getItem('selectedThemeColor');
            let rgbColorStr = hexToRgbA(selectedThemeColor, 1);
            let finalColor;

            if (selectedTemplateObj.colorPreference === 0) {
                finalColor = selectedThemeColor;
            } else if (lightOrDark(rgbColorStr) !== selectedTemplateObj.colorPreference) {
                finalColor = changeColorTone(selectedThemeColor, selectedTemplateObj.colorPreference * selectedTemplateObj.colorTone)
            } else {
                finalColor = selectedThemeColor;
            }
            // lightOrDark(rgbColorStr);
            globalContext.setselectedThemeColor(finalColor);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [globalContext.selectedTemplate]);

    const downloadScreenshot = (params) => {
        setShowWatermark(true);
        setLoading(true);

        // Send data to google analytics
        firebase.analytics().logEvent(GAEvents.template_downloaded.title, {
            [GAEvents.template_downloaded.params.template_id]: globalContext.selectedTemplate,
            [GAEvents.template_downloaded.params.template_color]: globalContext.selectedThemeColor
        });

        // To track unsplash image download as per their guidelines
        globalContext.selectedUnsplashPhoto && unsplash.photos.trackDownload({
            downloadLocation: globalContext.selectedUnsplashPhoto.links.download_location,
        });

        const scale = 3
        const node = document.getElementById("html-content-holder")

        const style = {
            transform: 'scale(' + scale + ')',
            transformOrigin: 'top left',
            width: node.offsetWidth + "px",
            height: node.offsetHeight + "px"
        }

        const param = {
            height: node.offsetHeight * scale,
            width: node.offsetWidth * scale,
            quality: 1,
            style
        }

        domtoimage.toPng(node, param)
            .then(function (dataUrl) {


                if (getOS() === 'iOS') {
                    // Need to call domtoimage again due to Safari issue
                    setTimeout(() => {
                        domtoimage.toPng(node, param)
                            .then(function (dataUrlInner) {
                                downloadFile(dataUrlInner, (downloadResult) => {
                                    handleDownloadResult(downloadResult);
                                });
                            });
                    }, 2000);
                } else {
                    downloadFile(dataUrl, (downloadResult) => {
                        handleDownloadResult(downloadResult);
                    });
                }
            });
    }

    const handleDownloadResult = (downloadResult) => {
        setLoading(false);
        setShowWatermark(false);
        if (downloadResult.status === 'ERROR') {
            alert(downloadResult.data);
            if (getOS() === 'Android') {
                var permissions = window.cordova.plugins.permissions;
                window.cordova.plugins.permissions.requestPermission(permissions.WRITE_EXTERNAL_STORAGE, () => { }, () => { });
            }
        } else {
            shareFile(downloadResult.data);
        }
    }

    const downloadFile = async (dataUrl, callback) => {
        try {
            let fileName = new Date().getTime() + '.png';
            let savedFile = await Filesystem.writeFile({
                path: fileName,
                data: dataUrl,
                directory: FilesystemDirectory.Documents
            });
            return callback({ status: 'SUCCESS', data: savedFile.uri });
        } catch (e) {
            let result = { status: 'ERROR', data: e };
            if (e.toString().includes('user denied permission request') !== -1) {
                result.data = 'We need Storage permission in order to download the selected template. Please Allow the storage persmission and try downloading again.'
            }
            callback(result);
        }
        // if (downloadedFileName !== null) {
        //     let downloadedFile = await Filesystem.getUri({
        //         directory: FilesystemDirectory.Documents,
        //         path: downloadedFileName
        //     })
        //     callback(downloadedFile.uri);
        // } else {

        // }
    }

    const shareFile = (uri) => {
        var options = {
            message: '', // not supported on some apps (Facebook, Instagram)
            subject: '', // fi. for email
            files: [uri], // an array of filenames either locally or remotely
            url: '',
            chooserTitle: 'Pick an app', // Android only, you can override the default share sheet title
            // appPackageName: 'com.apple.social.facebook', // Android only, you can provide id of the App you want to share with
            iPadCoordinates: '0,0,0,0' //IOS only iPadCoordinates for where the popover should be point.  Format with x,y,width,height
        };

        var onSuccess = function (result) {
            console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
            console.log("Shared to app: " + result.app); // On Android result.app since plugin version 5.4.0 this is no longer empty. On iOS it's empty when sharing is cancelled (result.completed=false)
        };

        var onError = function (msg) {
            alert("Sharing failed with message: " + msg);
        };

        window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
    }

    const goToCreateAd = () => {
        history.push('/')
    }

    const getSelectedTemplateComponent = () => {
        let SelectedTemplate = TEMPLATES[globalContext.selectedTemplate].component;
        return <SelectedTemplate />
    }

    const toggleControls = (e) => {
        setShowControls(!showControls);
    }

    const handleColorChange = (newColor) => {
        window.$('#selectColorModal').modal('hide');
        setShowControls(false);
        globalContext.setselectedThemeColor(newColor.hex);
        localStorage.setItem('selectedThemeColor', newColor.hex);
    }

    const handleTemplateChange = (templateId) => {
        setTimeout(() => {
            setShowControls(false);
        }, 100);
        globalContext.setSelectedTemplate(templateId);
    }

    const handleChangeTemplate = (type) => {
        let templatesArr = [];
        Object.keys(TEMPLATES).forEach(function (key) {
            if (TEMPLATES[key].status === 'ACTIVE') {
                templatesArr.push(TEMPLATES[key]);
            }
        });

        const selectedTemplateIndex = templatesArr.findIndex((item) => item.id === globalContext.selectedTemplate);

        if (type === 'NEXT') {
            if (selectedTemplateIndex === (templatesArr.length - 1)) {
                globalContext.setSelectedTemplate(templatesArr[0].id);
            } else {
                let newIndex = selectedTemplateIndex + 1;
                globalContext.setSelectedTemplate(templatesArr[newIndex].id);
            }
        } else {
            if (selectedTemplateIndex === 0) {
                globalContext.setSelectedTemplate(templatesArr[templatesArr.length - 1].id);
            } else {
                let newIndex = selectedTemplateIndex - 1;
                globalContext.setSelectedTemplate(templatesArr[newIndex].id);
            }
        }
    }

    const swipeHandlers = useSwipeable({
        onSwipedLeft: (eventData) => handleChangeTemplate('NEXT'),
        onSwipedRight: (eventData) => handleChangeTemplate('PREV'),
        ...swipeConfig,
    });

    return (
        <div id="preview-ad-ctrn-id" {...swipeHandlers} onClick={toggleControls} className="preview-ad-ctnr d-flex align-items-center" style={{ height: containerHieght }}>
            {loading && <Loading fullScreen={true}></Loading>}
            {globalContext.productData && <>
                <div style={{ height: canvasHeight }} className="d-flex flex-column previewAd" id="html-content-holder">
                    <small className={'logo-badge ' + (showWatermark ? 'd-block' : 'd-none')}>made with createAwesomeAds.com</small>
                    {getSelectedTemplateComponent()}
                </div>

                <input type="image" className={"edit-btn " + (showControls ? 'fadeIn' : 'fadeOut')} alt="Edit Button"
                    src={editBtn} onClick={goToCreateAd}></input>
                <input type="image" className={"download-btn " + (showControls ? 'fadeIn' : 'fadeOut')} alt="Download Button"
                    src={downloadBtn} onClick={downloadScreenshot}></input>
                {/* <input type="image" className={"change-temp-btn " + (showControls ? 'fadeIn' : 'fadeOut')} alt="Change Template Button"
                    src={changeTemplateBtn} data-toggle="modal" data-target="#templateSelectionModal"></input> */}
                <input type="image" className={"change-color-btn " + (showControls ? 'fadeIn' : 'fadeOut')} alt="Change Color Button"
                    src={changeColor} data-toggle="modal" data-target="#selectColorModal" data-backdrop="false"></input>

                {/* Previous Next btn */}
                <input type="image" className={"prev-btn " + (showControls ? 'fadeIn' : 'fadeOut')} alt="Previous"
                    src={prevNextBtn} onClick={() => { handleChangeTemplate('PREV') }}></input>
                <input type="image" className={"next-btn " + (showControls ? 'fadeIn' : 'fadeOut')} alt="Next"
                    src={prevNextBtn} onClick={() => { handleChangeTemplate('NEXT') }}></input>


                {globalContext.selectedUnsplashPhoto && <div className={"unsplash-attr-ctrn " + (showControls ? 'fadeIn' : 'unsplash-attr-ctrn-fadeOut')} >
                    <div>Photo by <a rel="noreferrer" target="_blank" href={`https://unsplash.com/@${globalContext.selectedUnsplashPhoto.user.username}?utm_source=${UNSPLASH_APP_NAME}&utm_medium=referral`}>{globalContext.selectedUnsplashPhoto.user.name}</a> on <a target="_blank" rel="noreferrer" href={`https://unsplash.com/?utm_source=${UNSPLASH_APP_NAME}&utm_medium=referral`}>Unsplash</a></div>
                </div>}

                <div className={"size-select-wrapper " + (showControls ? 'fadeIn' : 'fadeOut')}><SizeSelector /></div>
                <TemplateSelectionModal handleTemplateChange={handleTemplateChange} />
                <SelectColorModal handleColorChange={handleColorChange} />
            </>}
        </div>);
}

export default PreviewAd;