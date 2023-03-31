export default class Utils {
	static cleanString(input: string): string {
		const punctuationRegex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
		const cleanedContent = input.replace(punctuationRegex, '');
		const singleWordContent = cleanedContent.split(' ').slice(-1)[0];
		return singleWordContent.trim().toLowerCase();
	}
}
