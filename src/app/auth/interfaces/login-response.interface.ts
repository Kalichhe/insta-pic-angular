export interface LoginResponse {
    success: boolean;
    message?: string;
}

export interface SignUpResponse extends LoginResponse {
    success: boolean;
    message?: string;
}
