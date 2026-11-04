import { useStream } from "@laravel/stream-react";

interface StreamChatData {
    onDataCallback : (data: string) => void;
    onFinishCallback : () => void;
    onErrorCallback: (error: Error) => void;
}
export default function useStreamChat({ onDataCallback, onFinishCallback, onErrorCallback } : StreamChatData) {
    return useStream('conversation/agent-prompt', {
        onData: onDataCallback,
        onFinish: () => onFinishCallback(),
        onError: onErrorCallback
    })
}