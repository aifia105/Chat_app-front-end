import { MessageInterface } from "./MessageInterface";

export interface ConversationInterface {
    id: string;
    type: string;
    participants: string[];
    messages: MessageInterface[];
}