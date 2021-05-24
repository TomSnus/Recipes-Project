import { LOGIN_START, LoginStart, Login, LOGIN, LoginFail } from './auth.actions';
import { Effect, ofType } from "@ngrx/effects";
import { Actions } from "@ngrx/effects";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { of } from "rxjs";
import { Router } from "@angular/router";
import { createEffect } from "@ngrx/effects";
import { Injectable } from "@angular/core";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthEffects {
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(LOGIN_START),
    switchMap((authData: LoginStart) => {
      return this.http
        .post<AuthResponseData>(
          "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +
            environment.firebaseApiKey,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          map((resData) => {
            const expirationDate = new Date(
              new Date().getTime() + +resData.expiresIn * 1000
            );
            return new Login({
              email: resData.email,
              userId: resData.localId,
              token: resData.idToken,
              expirationDate: expirationDate,
            });
          }),
          catchError((errorRes) => {
            let errorMessage = "An unknown error occurred!";
            if (!errorRes.error || !errorRes.error.error) {
              return of(new LoginFail(errorMessage));
            }
            switch (errorRes.error.error.message) {
              case "EMAIL_EXISTS":
                errorMessage = "This email exists already";
                break;
              case "EMAIL_NOT_FOUND":
                errorMessage = "This email does not exist.";
                break;
              case "INVALID_PASSWORD":
                errorMessage = "This password is not correct.";
                break;
            }
            return of(new LoginFail(errorMessage));
          })
        );
    })
  );

  @Effect({ dispatch: false })
  authSuccess = this.actions$.pipe(
    ofType(LOGIN),
    tap(() => {
      this.router.navigate["/"];
    })
  );
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
}
