// note: this module was made with GPT guidance 

/*
example usage (for single image only):

import { uploadWidget } from '...' 

const handleImageUpload = () => { // a click handler, eg. onClick={handleImageUpload}
    uploadWidget((secureUrl) => {
        console.log(secureUrl) // returns secureUrl when upload is good; then do whatever you need with it (display the image, add to form data, send to BE, etc)
    })
}

for multi image, the result is an array, so use something like secureUrlsList instead of secureUrl

*/
export const uploadWidget = (onSuccess, multiple=false) => {
    const urls = []
    const widget = window.cloudinary.createUploadWidget(
        {
            cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
            uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
            sources: ['local'],
            multiple: multiple,
            resourceType: 'image',
            clientAllowedFormats: ['jpg', 'png', 'jpeg'],
            styles: {
                palette: {
                    link: "#232f46",
                    tabIcon: "#232f46",
                    sourceBg: "#ffffff"
                },
                fonts: {
                },
                frame: {
                    background: '#0000001a' 
                }                
            }
        },
        (error, result) => {
            if (error) {
                 console.error("Upload failed:", error);
                return;
            }
            if (result.event === "success") {
                if (!multiple) {
                    onSuccess(result.info.secure_url) // Single upload: return URL directly
                    return
                }
                urls.push(result.info.secure_url) // Multiple uploads: collect URLs
            }
            if (result.event === "close" && multiple && urls.length > 0) {
                onSuccess(urls) // Multiple uploads: return array on close
            }
        }
    )
    widget.open()
}

