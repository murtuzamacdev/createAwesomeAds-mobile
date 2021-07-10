import React, { useEffect, useState } from 'react';
import { AVAILALBE_SIZES } from '../configs/constants';

export const GlobalContext = React.createContext();

export const GlobalContextProvider = (props) => {
    const [productData, setProductData] = useState(null);
    const [selectedTemplate, setSelectedTemplate] = useState('template4');
    const [selectedUnsplashPhoto, setSelectedUnsplashPhoto] = useState(null);
    const [unsplashCachedSearchResult, setUnsplashCachedSearchResult] = useState([]);
    const [selectedSize, setselectedSize] = useState(AVAILALBE_SIZES.WHATSAPP_STATUS.id);
    const [selectedThemeColor, setselectedThemeColor] = useState(process.env.REACT_APP_ENV === "dev" ? "#0288d1" : "#e57373");

    useEffect(() => {
        let _selectedTemplate = localStorage.getItem('selectedTemplate');
        let _selectedSize = localStorage.getItem('selectedSize');

        _selectedTemplate && setSelectedTemplate(_selectedTemplate);
        _selectedSize && setselectedSize(_selectedSize);
    }, [])

    const _setProductData = (productData) => {
        setProductData(productData);
        let jsonWithoutImage = JSON.parse(JSON.stringify(productData)); // Because large images cannot be stored in local storage. So images will stay only in global context variable
        delete jsonWithoutImage.productImage;
        localStorage.setItem('productData', JSON.stringify(jsonWithoutImage));
    }

    const _setSelectedTemplate = (templateId) => {
        localStorage.setItem('selectedTemplate', templateId);
        setSelectedTemplate(templateId);
    }

    const _setselectedSize = (id) => {
        localStorage.setItem('selectedSize', id);
        setselectedSize(id)
    }

    return (
        <GlobalContext.Provider
            value={{
                productData, selectedTemplate, selectedUnsplashPhoto, unsplashCachedSearchResult, selectedSize, selectedThemeColor,
                setProductData: _setProductData,
                setSelectedTemplate: _setSelectedTemplate,
                setSelectedUnsplashPhoto: setSelectedUnsplashPhoto,
                setUnsplashCachedSearchResult: setUnsplashCachedSearchResult,
                setselectedSize: _setselectedSize,
                setselectedThemeColor: setselectedThemeColor
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
}
