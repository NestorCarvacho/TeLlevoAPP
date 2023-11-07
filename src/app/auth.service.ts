import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _storage: Storage | null = null;
  private initPromise: Promise<void> | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  private async init() {
    this.initPromise = this.initStorage();
    await this.initPromise;
  }

  private async initStorage() {
    this._storage = await this.storage.create();
  }

  public getStorage(): Storage | null {
    return this._storage;
  }

  public async whenInitialized(): Promise<void> {
    if (!this.initPromise) {
      return Promise.resolve();
    }
    return this.initPromise;
  }
}