const lowercaseLetters: string[] = [
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"i",
	"j",
	"k",
	"l",
	"m",
	"n",
	"o",
	"p",
	"q",
	"r",
	"s",
	"t",
	"u",
	"v",
	"w",
	"x",
	"y",
	"z",
];

const uppercaseLetters: string[] = [
	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",
	"I",
	"J",
	"K",
	"L",
	"M",
	"N",
	"O",
	"P",
	"Q",
	"R",
	"S",
	"T",
	"U",
	"V",
	"W",
	"X",
	"Y",
	"Z",
];

const digits: string[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const specialCharacters: string[] = [
	"!",
	"@",
	"#",
	"$",
	"%",
	"^",
	"&",
	"*",
	"(",
	")",
	"-",
	"_",
	"=",
	"+",
	"[",
	"]",
	"{",
	"}",
	"|",
	";",
	":",
	"'",
	",",
	".",
	"<",
	">",
	"?",
	"~",
];

export const copyToClipboard = async (text: string): Promise<boolean> => {
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch (err) {
		return false;
	}
};

export const escapeJson = (input: string): string =>
	input
		.replace(/\\/g, "\\\\")
		.replace(/"/g, '\\"')
		.replace(/\x08/g, "\\b")
		.replace(/\f/g, "\\f")
		.replace(/\n/g, "\\n")
		.replace(/\r/g, "\\r")
		.replace(/\t/g, "\\t");

export const unescapeJson = (input: string): string =>
	input
		.replace(/\\b/g, "\b")
		.replace(/\\f/g, "\f")
		.replace(/\\n/g, "\n")
		.replace(/\\r/g, "\r")
		.replace(/\\t/g, "\t")
		.replace(/\\"/g, '"')
		.replace(/\\\\/g, "\\");

export const formatAsArrayString = (input: string): string => `[${input}]`;

export const getRandomCharacter = (
	isIncludeLower: boolean,
	isIncludeUpper: boolean,
	isIncludeDigits: boolean,
	isIncludeSpecial: boolean,
	excludeChars: string[] = [],
): string => {
	let optionsArray: string[] = [];

	if (isIncludeLower) {
		lowercaseLetters.forEach((item) => optionsArray.push(item));
	}

	if (isIncludeUpper) {
		uppercaseLetters.forEach((item) => optionsArray.push(item));
	}

	if (isIncludeDigits) {
		digits.forEach((item) => optionsArray.push(item));
	}

	if (isIncludeSpecial) {
		specialCharacters.forEach((item) => optionsArray.push(item));
	}

	// Remove any character from the array that is in the exclusion list.
	optionsArray = optionsArray.filter((x) => !excludeChars.includes(x));

	if (optionsArray.length === 0) {
		return "";
	}

	const max: number = optionsArray.length;

	const randIndex: number = Math.floor(Math.random() * max);

	return optionsArray[randIndex];
};
