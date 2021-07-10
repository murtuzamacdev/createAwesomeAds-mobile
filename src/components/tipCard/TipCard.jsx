import tipBulb from '../../assets/images/tipBulb.svg';

const TipCard = ({tipText, handleClose}) => {
    return (<div className="card mb-3 flex-row justify-content-start align-items-center ">
        <img src={tipBulb} alt="Tip" width="22px" />
        <label className="ml-2 mb-0">{tipText} </label>
        <button onClick={handleClose} type="button" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>);
}

export default TipCard;