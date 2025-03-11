// src/components/ImageUpload.jsx
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../services/supabaseClient';

const ImageUpload = ({ onUpload, initialUrl }) => {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(initialUrl || null);
    const [loading, setLoading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (initialUrl) {
            setPreviewUrl(initialUrl);
        }
    }, [initialUrl]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };

    useEffect(() => {
        if (file) {
            handleUpload();
        }
    }, [file]); // Trigger upload when file changes

    const handleUpload = async () => {
        if (!file) return; // No need to upload if no file

        setLoading(true);
        setUploadError(null);

        const filePath = `avatars/${Date.now()}-${file.name}`;

        try {
            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file);

            if (uploadError) {
                setUploadError(uploadError.message);
                console.error('Upload error:', uploadError);
            } else {
                const { data: { publicUrl } } = supabase.storage
                    .from('avatars')
                    .getPublicUrl(filePath);

                onUpload(publicUrl);
                setPreviewUrl(publicUrl);
            }
        } catch (error) {
            setUploadError(error.message);
            console.error('Upload error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div
                onClick={handleClick}
                className="w-32 h-32 rounded-full overflow-hidden cursor-pointer border border-gray-300"
            >
                {previewUrl ? (
                    <img
                        src={previewUrl}
                        alt="profile preview"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-100">
                        <span className="text-gray-500">+</span>
                    </div>
                )}
            </div>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                ref={fileInputRef}
            />
            {uploadError && <p className="text-red-500 mt-2">{uploadError}</p>}
        </div>
    );
};

export default ImageUpload;