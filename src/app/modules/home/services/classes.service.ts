import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { Database } from '@angular/fire/database';
import { getDatabase } from 'firebase/database';

@Injectable({
  providedIn: 'root',
})
export class ClassesService {
  private database: Database;

  constructor(private _fireApp: FirebaseApp) {
    this.database = getDatabase(this._fireApp);
  }
}
