import { AuthenticationResponse } from "../../models/AuthenticationResponse";

export interface AuthStateInterface {
    status: string;
    user: AuthenticationResponse | null;
}