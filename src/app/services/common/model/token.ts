// export class Token {
//     public id?: string;
//     public authToken?: string;
//     public expiresIn?: string;
//     public value?: string;
//     public claim?: any;
//     public nonce?: string;
//     public isAuthenticated = false;
//     public role?: string;
//     public isprofilecompleted?: true;
// }

export class Token {
  isAuthenticated: boolean = false;
  value?: string;         // access token
  authToken?: string;     // same as value
  expiresIn?: number;     // timestamp in ms
  claim?: any;            // full user info
  id?: string;            // user email/id
  role?: string;          // e.g., "teacher"
  isprofilecompleted?: boolean;
}
