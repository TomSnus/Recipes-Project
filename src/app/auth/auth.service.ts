import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { throwError } from 'rxjs';
import { ɵangular_packages_platform_browser_platform_browser_k } from "@angular/platform-browser";

export interface AuthResponseData {
    kind: string;
    IdToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}



@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(private http: HttpClient) { }

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDJrbt9LW8L2AttJp_JSP2yKBJKf4JKe5I',
            {
                email: email,
                password: password,
                returnSecureToken: true,
            }
        ).pipe(catchError(this.handleError));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDJrbt9LW8L2AttJp_JSP2yKBJKf4JKe5I', {
            email: email,
            password: password,
            returnSecureToken: true,
        }).pipe(catchError(this.handleError));
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email already exists';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist';
                break;
            case 'PASSWORD_NOT_FOUND':
                errorMessage = 'Wrong password';
                break;
        }
        return throwError(errorMessage);
    }
}