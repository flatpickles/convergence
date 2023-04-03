export default class Utils {
	static cleanString(input: string): string {
		const punctuationRegex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
		const cleanedContent = input.replace(punctuationRegex, '');
		const singleWordContent = cleanedContent.split(' ').slice(-1)[0];
		return singleWordContent.trim().toLowerCase();
	}

	static get isMobileDevice(): boolean {
		return (
			typeof window.orientation !== 'undefined' || navigator.userAgent.indexOf('IEMobile') !== -1
		);
	}
}
