function getStats(txt) {
	let words = txt.split(/[\W_]/g).filter(function (word) {
			return word.length > 0;
		});
		
	for (let i in words)
		words[i] = words[i].toLowerCase();
	
	words.sort(); // alphabetize

	let lines = txt.split(/[\r\n]/);
	let nonEmptyLines = lines.filter(function (line) {
			return line.length > 0;
		});

	return {
		nChars: txt.length,
		nWords: words.length,
		nLines: lines.length,
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
	for (let word of words) {
		map.has(word) ? map.set(word, map.get(word) + 1) : map.set(word, 1);
	}

	freqArray = [];
	for (let[key, value]of map) {
		freqArray.push([key, value]);
	}

	freqArray.sort(function (first, second) {
		return second[1] - first[1];
	});
	
	stringArray = [];
	for (let elem of freqArray.slice(0, 10))
		stringArray.push( elem[0] + "(" + elem[1] + ")");

	return stringArray;
}

function findPalindromes(words) {
	let palindromes = [];
	for (let word of words) {
		if (isPalindrome(word))
			palindromes.push(word);
	}

	return palindromes;
}

function isPalindrome(word) {
	let chars = word.split("");
	if (chars.length <= 2) {
		return false
	} else {
		let left = 0;
		let right = chars.length - 1;
		while (left < right) {
			if (chars[left] != chars[right]) {
				return false;
			}

			left++;
			right--;
		}

		return true;
	}

	return false;
}

function findLongest(words) {
	return words.sort(
		function (first, second) {
		return second.length - first.length;
	}).slice(0, 10);
}

function getAverageLength(words) {
	let numChars = 0;
	for (let word of words) {
		numChars += word.length;
	}

	return numChars / words.length;
}

function getMaxLength(words) {
	let currentMax = "";
	for (let word of words) {
		if ( word.length > currentMax.length)
			currentMax = word;
	}

	return currentMax.length;
}
