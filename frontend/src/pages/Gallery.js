import React, {useEffect, useState} from 'react';
import axios from 'axios';
import DefaultURL from "../GlobalVariables";

const ImageUploadForm = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [images, setImages] = useState([]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await axios.post(`${DefaultURL}/image/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setMessage(response.data);
        } catch (error) {
            setMessage('Failed to upload image');
        }
    };

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(`${DefaultURL}/image`);
                setImages(response.data);
            } catch (error) {
                console.error('Failed to fetch images:', error);
            }
        };
        fetchImages();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/image/delete/${id}`);
            // Remove the deleted image from the state
            setImages(images.filter(image => image.id !== id));
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    return (
        <div style={{marginTop: 100}}>
            <h2>Upload Image</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange}/>
                <button type="submit">Upload</button>
            </form>
            {message && <p>{message}</p>}

            <h2>Image Gallery</h2>
            <div className="image-grid">
                {images.map((image) => (
                    <div key={image.id} className="image-item">
                        <img src={`http://localhost:8080/image/${image.id}`} alt={image.fileName} style={{width: '200px', height: 'auto', margin: '10px'}}/>
                        <button onClick={() => handleDelete(image.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageUploadForm;
