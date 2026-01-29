
export interface AuthUserModel {
    uid: string;
    email: string;
    displayName?: string;
    isEmailVerified: boolean;
    role: string;
}