import { Injectable } from '@angular/core';
import { Token } from './model/token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private tokenKey: string = "auth_token";

  private token: Token | undefined;

  // public authenticate(token: any): void {
  //   try {
  //     this.token = this.retrieve();
  //     const claim = token;
  //     this.token.isAuthenticated = true;
  //     if (this.token.isAuthenticated) {
  //       var parseToken = token;
  //       this.token.claim = claim;
  //       this.token.value = token;
  //       this.token.id = parseToken.id;
  //       this.token.authToken = parseToken.auth_token;
  //       this.token.expiresIn = parseToken.expires_in;
  //       this.token.role = parseToken.role;
  //       this.token.isprofilecompleted = parseToken.isprofilecompleted;
  //     }
  //     // this.save();
  //   } catch (e) {
  //     console.log(e);
  //     return;
  //   }
  // }

  // public retrieve(): Token {
  //   try {
  //     if (this.token == null) {
  //       this.token = JSON.parse(sessionStorage.getItem(this.tokenKey)!);
  //       if (this.token == null) {
  //         this.token = new Token();
  //       }
  //     }
  //   } catch (e) {
  //     this.token = new Token();
  //   }
  //   return this.token;
  // }

  public authenticate(tokenResponse: any): void {
    console.log(tokenResponse)
    const token = new Token();

    token.isAuthenticated = true;
    // token.value = tokenResponse.accessToken;
    token.authToken = tokenResponse.accessToken;
    token.claim = tokenResponse.user; // You can store user info here
    token.expiresIn = this.getExpiryFromToken(tokenResponse.accessToken);
    token.id = tokenResponse.user?.email;
    token.role = tokenResponse.user?.userType;
    token.isprofilecompleted = true; // optional if needed

    // Store in sessionStorage
    sessionStorage.setItem(this.tokenKey, JSON.stringify(token));
    this.token = token;
  }


  private getExpiryFromToken(token: string): number {
    try {
      const payload = JSON.parse(atob(token?.split('.')[1]));
      return payload.exp * 1000; // convert to ms
    } catch {
      return Date.now() + 15 * 60 * 1000; // fallback: 15 min
    }
  }

  isAccessTokenExpired(): boolean {
    const token = this.token?.authToken || '';
    console.log(token);
    const expireIn = token ? JSON.parse(atob(token?.split('.')[1])) : ''
    if (!expireIn) return true;

    const now = Math.floor(Date.now()); // current time in seconds
    return now >= expireIn;
  }

  public clear() {
    sessionStorage.clear(); // Clear token from client
  }

}
