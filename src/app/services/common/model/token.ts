export class Token {
    public id?: string;
    public authToken?: string;
    public expiresIn?: string;
    public value?: string;
    public claim?: any;
    public nonce?: string;
    public isAuthenticated = false;
    public role?: string;
    public isprofilecompleted?: true;
}