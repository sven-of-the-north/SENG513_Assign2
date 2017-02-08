function getStats(txt) {
	let words = txt.toLowerCase().split(/[\W_]+/g).filter(function (word) {
			return word.length > 0;
		});

	let lines = txt.split(/[\r\n]/);
	let nonEmptyLines = lines.filter(function (line) {
			return line.trim().length > 0;
		});
		
	return {
		nChars: txt.length,
		nWords: words.length,
		nLines: getNumOfLines(lines),
		nNonEmptyLines: nonEmptyLines.length,
		averageWordLength: getAverageLength(words),
		maxLineLength: getMaxLength(lines),
		palindromes: "[ " + findPalindromes(words).join(", ") + " ]",
		longestWords: "[ " + findLongest(words).join(", ") + " ]",
		mostFrequentWords: "[ " + findMostFrequent(words).join(", ") + " ]"
	};
}

function findMostFrequent(words) {
	let map = new Map();
	for (let word of words)
		map.has(word) ? map.set(word, map.get(word) + 1) : map.set(word, 1);

	freqArray = [];
	for (let[key, value]of map)
		freqArray.push([key, value]);

	freqArray.sort(
		function (first, second) {
		return (second[1] - first[1]) === 0 ? second[0] < first[0] : second[1] - first[1];
	});

	stringArray = [];
	for (let elem of freqArray.slice(0, 10))
		stringArray.push(elem[0] + "(" + elem[1] + ")");

	return stringArray;
}

function findLongest(words) {
	return words.sort(
		function (first, second) {
		return (second.length - first.length) === 0 ? second < first : second.length - first.length;
	}).slice(0, 10);
}

function findPalindromes(words) {
	let palindromes = words.filter(
		function (word) {
		return (word.split('').length > 2) && (word === word.split('').reverse().join(''));
	});
	
	return palindromes.filter(
		function(word, index, self) {
		return index == self.indexOf(word);
		});
}

function getAverageLength(words) {
	if (words.length === 0)
		return 0;

	let numChars = 0;
	for (let word of words)
		numChars += word.length;

	return numChars / words.length;
}

function getMaxLength(lines) {
	return lines.sort(
		function (first, second) {
		return second.length - first.length;
	})[0].length;
}

function getNumOfLines(lines) {
	if (lines.length > 1)
		return lines.length;
	else
		return lines[0].length === 0 ? 0 : 1;
}
