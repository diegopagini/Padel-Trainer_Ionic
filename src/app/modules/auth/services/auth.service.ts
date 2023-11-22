import { Injectable, signal } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  User,
  UserCredential,
} from 'firebase/auth';

import { LoginFormData } from '../interfaces/login-form.interface';
import { RegisterFormData } from '../interfaces/register-form.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth;
  private user = signal<User>(null as any);

  constructor(private _fireApp: FirebaseApp) {
    this.auth = getAuth(this._fireApp);
  }

  register({ email, password }: RegisterFormData): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({ email, password }: LoginFormData): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  setUser(user: User): void {
    this.user.set(user);
  }

  getUser(): User {
    return this.user();
  }
}
