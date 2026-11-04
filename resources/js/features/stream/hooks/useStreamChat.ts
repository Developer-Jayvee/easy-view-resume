import { useStream } from "@laravel/stream-react";

interface StreamChatData {
    onDataCallback : (data: string) => void;
    onFinishCallback : () => void;
}
export default function useStreamChat({ onDataCallback, onFinishCallback } : StreamChatData) {
    return useStream('conversation/agent-prompt', {
        onData: (data: string) => onDataCallback(data),
        onFinish: () => onFinishCallback()
    })
}