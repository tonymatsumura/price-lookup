function trimLowerCaseSplitStr(param_text) {
  return param_text.trim().toLowerCase().split(/\s+/);
}

function containsAllRequiredWords(param_text, param_requiredWords) {
  // Normalize the text (trim + lowercase) and split into words
  const normalizedWords = trimLowerCaseSplitStr(param_text);
  const requiredWords = trimLowerCaseSplitStr(param_requiredWords);

  console.log(`normalizedWords: ${normalizedWords}`);
  console.log(`requiredWords: ${requiredWords}`);

  // Check if all required words exist in the normalizedWords array
  return requiredWords.every(word =>
    normalizedWords.includes(word.toLowerCase())
  );
}

export { containsAllRequiredWords };
