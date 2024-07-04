import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';
import { Storage } from '@ionic/storage';
import { environment } from '@env/environment';

@Injectable()
export class StorageService {
	private secretKey = 'tERcEsgNiKCUf';
	private _storage: Storage | null = null;
	constructor(private storage: Storage) {
		this.init();
	}

	async init() {
		const storage = await this.storage.create();
		this._storage = storage;
	}

	async saveDataWithExpiration(key: string, value: any) {
		const data = {value,expiration:Date.now() + (1 * 60 * 1000)} // 1 minuto
		// console.log('saveDataWithExpiration',data)
		await this.storage.set(`${environment.app}-${key}`, data);	
	}

	async getIfValid(key: string): Promise<any> {
		const data = await this.storage.get(`${environment.app}-${key}`);
		const now = Date.now()
		// console.log('getIfValid',data,now)
		if(!data || data.expiration < now){
			return null;
		}
		return data.value
	}

	async get(key: string): Promise<any> {
		return await this.storage.get(`${environment.app}-${key}`);
	}

	public set(key: string, value: any) {
		this._storage?.set(`${environment.app}-${key}`, value);
	}

	public remove(key: string) {
		this.storage.remove(`${environment.app}-${key}`);
	}

	getPasswordEncrypted(password: string): string {
		// Decrypt
		const bytes = CryptoJS.AES.decrypt(password, this.secretKey);
		const plaintext = bytes.toString(CryptoJS.enc.Utf8);
		return plaintext;
	}

	setPasswordEncrypted(password: string): string {
		// Encrypt
		const ciphertext = CryptoJS.AES.encrypt(password, this.secretKey).toString();
		return ciphertext;
	}
}
