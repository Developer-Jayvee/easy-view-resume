import axios from "axios";

interface SendUserPromptData {
    chat: string;
    convo_id: string|null;
    document_id: string;
}
export default function usePrompt() {
    return {
        sendUserPrompt: async ( data: SendUserPromptData ) => {
            const response = await axios.post('conversation/agent-prompt',data)
            return response?.data;
        },
        storeUserPrompt: async ( data: SendUserPromptData ) => {
            const response = await axios.post('conversation/user-prompt',data)
            return response?.data;
        },
    }
}