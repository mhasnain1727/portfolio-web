import { Injectable } from '@angular/core';
import { Token } from './model/token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private tokenKey: string = "auth_token";

  private token: Token | undefined;

  public authenticate(token: any): void {
    try {
      this.token = this.retrieve();
      const claim = token;
      this.token.isAuthenticated = true;
      if (this.token.isAuthenticated) {
        var parseToken = token;
        this.token.claim = claim;
        this.token.value = token;
        this.token.id = parseToken.id;
        this.token.authToken = parseToken.auth_token;
        this.token.expiresIn = parseToken.expires_in;
        this.token.role = parseToken.role;
        this.token.isprofilecompleted = parseToken.isprofilecompleted;
      }
      // this.save();
    } catch (e) {
      console.log(e);
      return;
    }
  }

  // public initializeForRefresh() {
  //   this.token.nonce = this.createNonce();
  //   //this.token.state = this.createRandomString();
  //   this.save();
  // }


  // private createRandomString(): string {
  //   let text = "";
  //   const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  //   for (let i = 0; i < 32; i++) {
  //     text += possible.charAt(Math.floor(Math.random() * possible.length));
  //   }
  //   return text;
  // }

  // private createNonce(): string {
  //   return this.createRandomString() + Date.now().toString();
  // }

  // private save(): void {
  //   try {
  //     // sessionStorage.setItem(this.tokenKey, JSON.stringify(this.token));
  //   } catch (e) {
  //     return;
  //   }
  // }

  public retrieve(): Token {
    try {
      if (this.token == null) {
        this.token = JSON.parse(sessionStorage.getItem(this.tokenKey)!);
        if (this.token == null) {
          this.token = new Token();
        }
      }
    } catch (e) {
      this.token = new Token();
    }
    return this.token;
  }

  // public clear(): void {
  //   try {
  //     this.token = new Token();
  //     sessionStorage.removeItem(this.tokenKey);
  //   } catch (e) {
  //     return;
  //   }
  // }
}
