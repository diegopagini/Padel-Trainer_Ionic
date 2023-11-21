import { Injectable, signal } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import {
  Auth,
  getAuth,
  signInWithEmailAndPassword,
  User,
  UserCredential,
} from 'firebase/auth';

import { LoginFormData } from '../interfaces/login-form.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth;
  private user = signal<User>(null as any);

  constructor(private _fireApp: FirebaseApp) {
    this.auth = getAuth(this._fireApp);
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
