import { User } from "../user.model";
import {
    AuthActions,
    LOGIN,
    LOGOUT,
    LOGIN_START,
    LOGIN_FAIL,
    SIGNUP_START,
    HANDLE_ERROR
} from './auth.actions';

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false,
};

export function authReducer(state: State = initialState, action: AuthActions) {
  switch (action.type) {
    case LOGIN:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        user,
        authError: null,
        loading: false
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        authError: null,
      };
    case LOGIN_START:
    case SIGNUP_START:
      return {
        ...state,
        authError: null,
        loading: true
      };
    case LOGIN_FAIL:
      return {
        ...state,
        authError: action.payload,
        loading: false

      };
      case HANDLE_ERROR:
        return {
          ...state,
          authError: null
  
        };
    default:
      return state;
  }
}
