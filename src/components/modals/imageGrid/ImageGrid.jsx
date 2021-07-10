import './ImageGrid.scss';

const ImageGrid = ({ images, onImageSelect }) => {
    return (<div className="image-grid-ctnr">
        {images.map((photo) => (<img key={photo.id} onClick={() => { onImageSelect(photo, 'FROM_INTERNET') }} src={photo.urls.small} alt="product"></img>))}
    </div>);
}

export default ImageGrid;