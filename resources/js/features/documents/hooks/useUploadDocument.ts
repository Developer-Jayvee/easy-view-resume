import axios from "axios";


export default function useUploadDocument() {
    return {
        uploadDocument: async (selectedFile: File | null) => {
            const response = await axios.postForm("upload", {
                resume: selectedFile
            })
            const data = await response?.data;
            return data;
        }
    }
}