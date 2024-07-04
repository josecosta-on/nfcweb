import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class FileService {
	constructor() {}

	public firstFileToBase64(fileImage: File): Promise<{}> {
		return new Promise((resolve, reject) => {
			let fileReader: FileReader = new FileReader();
			if (fileReader && fileImage != null) {
				fileReader.readAsDataURL(fileImage);
				fileReader.onload = () => {
					resolve(fileReader.result);
				};

				fileReader.onerror = (error) => {
					reject(error);
				};
			} else {
				reject(new Error('No file found'));
			}
		});
	}
}
