 
import React, { useState, useEffect } from "react";
import { uploadWidget } from '../../../utils/cloudinaryUpload';

function UploaImage(props) {
    // const [file, setFile] = useState();
    const [file, setFile] = useState();
 

    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0])); 
    }

    // Set in a FavCard usestate for each favorite word
    useEffect(() => {
        console.log(file)
        props.setFileList(file);
    },[file]);

    const handleImageUpload = () => { 
        uploadWidget((secureUrlsList) => {
            console.log(secureUrlsList)
            props.setImageUrls(secureUrlsList)       
        }, true) //  set true for multi upload -> means secureUrlsList is an array
    }   
 
    return (
        <div className="App">
            <h2>Add Image:</h2>
            <input type="file" accept="image/*" onClick={handleImageUpload} />
            <img src={props.imageUrls} />
        </div>
    );
}
 
export default UploaImage;