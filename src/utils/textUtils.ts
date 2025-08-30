import KeyValue from "@/types/keyValuePair";

const lineBreakRegex = /\r\n|\r|\n/;
const lineBreakRegexGlobal = /\r\n|\r|\n/g;
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

export const escapeXml = (input: string): string =>
	input
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");

export const unescapeXml = (input: string): string =>
	input
		.replace(/&apos;/g, "'")
		.replace(/&quot;/g, '"')
		.replace(/&gt;/g, ">")
		.replace(/&lt;/g, "<")
		.replace(/&amp;/g, "&");

export const formatAsArrayString = (input: string): string => `[${input}]`;

export const encloseTextInSingleQuotes = (input: string): string =>
	`'${input}'`;

export const encloseTextInDoubleQuotes = (input: string): string =>
	`"${input}"`;

export const splitOnLineBreak = (input: string): string[] =>
	input.split(lineBreakRegex);

export const removeAllSpaces = (input: string): string =>
	input.replace(/ /g, "");

export const replaceAllLineBreaksWithComma = (input: string): string =>
	input.replace(lineBreakRegexGlobal, ",");

export const escapeAllSingleQuotes = (input: string): string =>
	input.replace(/'/g, "''");

export const removeAllLineBreaks = (input: string): string =>
	input.replace(lineBreakRegexGlobal, "");

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

export const encodeBase64 = (input: string): string => {
	if (typeof window !== "undefined" && typeof btoa === "function") {
		return btoa(input);
	}

	return Buffer.from(input, "utf-8").toString("base64");
};

export const decodeBase64 = (base64: string): string => {
	if (typeof window !== "undefined" && typeof atob === "function") {
		return atob(base64);
	}

	return Buffer.from(base64, "base64").toString("utf-8");
};

export const toProperCase = (input: string): string => {
	if (!input) return ""; // Handle empty strings to avoid RangeErrors
	if (input.length === 1) return input.toUpperCase(); // Handle strings with one character to avoid RangeErrors when rejoining the substring

	return input.charAt(0).toUpperCase() + input.substring(1);
};

export const generateHtmlTable = (
	columns: string[],
	rows: string[][],
	setHeaderRowToPropercase: boolean = true,
): string => {
	const body = rows
		.map(
			(row) =>
				`<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`,
		)
		.join("");

	if (columns.length > 0) {
		const header = columns
			.map(
				(col) =>
					`<th>${setHeaderRowToPropercase ? toProperCase(col) : col}</th>`,
			)
			.join("");
		return `<table><thead><tr>${header}</tr></thead><tbody>${body}</tbody></table>`;
	} else {
		return `<table><tbody>${body}</tbody></table>`;
	}
};

export const copyAsRichHtmlTable = async (html: string): Promise<void> => {
	const blob = new Blob([html], { type: "text/html" });
	const clipboardItem = new ClipboardItem({ "text/html": blob });
	await navigator.clipboard.write([clipboardItem]);
};

export const splitOnCommaOrTab = (source: string): string[] => {
	const delimiter: string = source.includes(",") ? "," : "\t";
	return source
		.split(delimiter)
		.map((s) => s.trim())
		.filter(Boolean);
};

export const getQueryStringParams = (url: string): KeyValue[] => {
	url = removeAllLineBreaks(decodeURI(url));
	const urlParts: string[] = url.split("?");

	if (urlParts.length < 2) return [];

	const queryParamSegments: string[] = urlParts[1].split("&");

	let response: KeyValue[] = [];

	queryParamSegments.forEach((queryParamPart) => {
		const queryParam: string[] = queryParamPart.split("=");

		const key: string = queryParam[0];
		const value: string = queryParam.length > 1 ? queryParam[1] : "";

		response.push({
			key: key,
			value: value,
		});
	});

	return response;
};
