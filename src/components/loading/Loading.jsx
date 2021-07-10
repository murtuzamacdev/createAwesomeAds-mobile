import './Loading.scss'

const Loading = ({ fullScreen }) => {
    return (<div className={fullScreen ? "loading-screen-wrapper" : undefined}>
        <div className="loading-screen-icon">
            <div className="spinner">
                <div className="double-bounce1"></div>
                <div className="double-bounce2"></div>
            </div>
        </div>
    </div>);
}

export default Loading;