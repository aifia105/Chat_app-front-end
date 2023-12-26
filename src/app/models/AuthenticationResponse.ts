export interface AuthenticationResponse {
    id: string;
    picture: number[] | string  ;
    username: string;
    email: string;
    password: string;
    onlineStatus: boolean;
    token: string;
}