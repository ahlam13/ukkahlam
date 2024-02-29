import React, { useState, useContext } from "react";
import axios from "axios";

const UpdatePhotoForm = () => {
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleUpload = () => {
        const formData = new FormData();
        formData.append("image", image);

        axios
            .post("http://127.0.0.1:8000/api/upload-image", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div>
            <input type="file" onChange={handleImageChange} />
            <button onClick={handleUpload}>Upload Image</button>
        </div>
    );
};

export default UpdatePhotoForm;
