export interface AuthenticationResponse {
    id: string;
    username: string;
    email: string;
    password: string;
    onlineStatus: boolean;
    token: string;
}