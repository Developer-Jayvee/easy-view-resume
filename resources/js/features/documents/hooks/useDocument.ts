import axios from "axios";
import { useState } from "react";


export default function useDocuments() {
    return {
        getDocuments: async () => {
            const response = await axios.get('document');
            return response?.data;
        },
        showDocument: async (id: string) => {
            const response = await axios.get(`document/${id}/show`);
            return response?.data;
        }
    }
}