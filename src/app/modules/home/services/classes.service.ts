import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { Database } from '@angular/fire/database';
import {
  DataSnapshot,
  get,
  getDatabase,
  push,
  query,
  ref,
  set,
} from 'firebase/database';

import { AuthService } from '../../auth/services/auth.service';
import { PaddleClass } from '../interfaces/paddle-class.interface';

@Injectable({
  providedIn: 'root',
})
export class ClassesService {
  private database: Database;

  constructor(
    private _authService: AuthService,
    private _fireApp: FirebaseApp
  ) {
    this.database = getDatabase(this._fireApp);
  }

  createClass(paddleClass: PaddleClass): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const eventRef = ref(this.database, 'classes');
        const newRef = push(eventRef);
        const user = {
          id: this._authService.getUser().uid,
          email: this._authService.getUser().email!,
        };

        paddleClass.id = newRef.key!;
        paddleClass.user = user;

        await set(newRef, {
          ...paddleClass,
        });
        resolve(true);
      } catch (error) {
        console.error(error);
        reject(false);
      }
    });
  }

  getClasses(): Promise<DataSnapshot> {
    const queryDB = query(ref(this.database, 'classes'));
    return get(queryDB);
  }

  transformClasses(snapshot: DataSnapshot): PaddleClass[] {
    const classes: PaddleClass[] = [];
    snapshot.forEach((child) => {
      const data = child.val() as PaddleClass;
      classes.push(data);
    });
    return classes;
  }
}
