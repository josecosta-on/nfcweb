import { Injectable } from "@angular/core";
import { NgbDateAdapter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

@Injectable()
export class DateAdapter {
	readonly DELIMITER = '-';

	fromModel(value: string | null): NgbDateStruct | null {
		if (value) {
			const date = value.split(this.DELIMITER);
			return {
				day: parseInt(date[2], 10),
				month: parseInt(date[1], 10),
				year: parseInt(date[0], 10),
			};
		}
		return null;
	}

	toModel(date: NgbDateStruct | null): string | null {
		return date ? date.year + this.DELIMITER + this.padToTwoDigits(date.month) + this.DELIMITER + this.padToTwoDigits(date.day) : null;
	}

	padToTwoDigits(number) {
		return String(number).padStart(2, '0');
	}

	format(dateStr: string,format:string = "${y}-${m}-${d}"): string {
		const date = new Date(dateStr)
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		const year = date.getFullYear();

		
		const replacements = {
			"${y}": year,
			"${m}": month,
			"${d}": day
		};
		const replacedString = this.replaceMultiple(format, replacements);
		return replacedString
	}

	replaceMultiple(str, replacements) {
		// Create a regular expression to match all occurrences of any key in the replacements object
		const regex = new RegExp(Object.keys(replacements).map(key => key.replace(/[-[\]{}()*+?.,\\^$|:]/g, "\\$&")).join("|"), "g");
	  
		// Replace each occurrence with the corresponding replacement value
		return str.replace(regex, match => {
		  return replacements[match];
		});
	  }
	  
}