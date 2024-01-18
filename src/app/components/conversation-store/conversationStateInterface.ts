import { ConversationInterface } from "../../models/ConversationInterface";




export interface ConversationStateInterface {
    status: string;
    conversation: ConversationInterface | null;  
}