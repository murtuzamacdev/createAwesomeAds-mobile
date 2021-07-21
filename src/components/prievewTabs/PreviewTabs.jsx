import './PreviewTabs.scss';

// Assets
import bgIco from '../../assets/images/tabs/bgIco.svg';
import colorIco from '../../assets/images/tabs/colorIco.svg';
import downloadIco from '../../assets/images/tabs/downloadIco.svg';
import sizeIco from '../../assets/images/tabs/sizeIco.svg';
import tIco from '../../assets/images/tabs/tIco.svg';

const PreviewTabs = ({ handleBgTap, handleTextTap, handleColorTap, handleDownloadtap, handleSizeTap }) => {
    return (
        <div className="tabs-ctrn">
            <div className="btns-ctrn d-flex">
                <button
                    className="size-tile pl-0 pr-0 pb-2"
                    onClick={() => { handleBgTap() }} >
                    <img src={bgIco} alt={'background'} />
                    <p className="mb-0 mt-2">Background</p>
                </button>
                <button
                    className="size-tile pl-0 pr-0 pb-2"
                    onClick={() => { handleTextTap() }} >
                    <img src={tIco} alt={'background'} />
                    <p className="mb-0 mt-2">Text</p>
                </button>
                <button
                    className="size-tile pl-0 pr-0 pb-2"
                    onClick={() => { handleColorTap() }} >
                    <img src={colorIco} alt={'background'} />
                    <p className="mb-0 mt-2">Color</p>
                </button>
                <button
                    className="size-tile pl-0 pr-0 pb-2"
                    onClick={() => { handleSizeTap() }} >
                    <img src={sizeIco} alt={'background'} />
                    <p className="mb-0 mt-2">Size</p>
                </button>
                <button
                    className="size-tile pl-0 pr-0 pb-2"
                    onClick={() => { handleDownloadtap() }} >
                    <img src={downloadIco} alt={'background'} />
                    <p className="mb-0 mt-2">Download</p>
                </button>
            </div>
        </div>);
}

export default PreviewTabs;