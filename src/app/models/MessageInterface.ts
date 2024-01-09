export interface MessageInterface {
    id: string;
    conversationId: string;
    senderId: string;
    content: string;
    timestamp: Date;
    read: boolean;
    readTimestamp: Date;
}