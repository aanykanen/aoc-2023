export function solvePuzzle1(puzzleInput) {
  const lines = puzzleInput.split('\n').filter((r) => r !== '');
  return lines
    .map((line, idx) => getPartNumbers(line, idx, lines))
    .flat()
    .reduce((p, n) => p + n, 0);

  function getPartNumbers(line, lineIdx, lines) {
    const lineNumbers = line.matchAll(/\d+/g);
    return Array.from(lineNumbers)
      .filter((number) => {
        const startIdx = number.index;
        const endIdx = number.index + number[0].length;

        const symbolSliceStartIdx = startIdx === 0 ? startIdx : startIdx - 1;
        const symbolSliceEndIdx = endIdx === line.length ? endIdx : endIdx + 1;

        return numberIsPartNumber({ startIdx, endIdx, symbolSliceStartIdx, symbolSliceEndIdx, line, lineIdx, lines });
      })
      .map((number) => Number(number[0]));
  }

  function numberIsPartNumber({ startIdx, endIdx, symbolSliceStartIdx, symbolSliceEndIdx, line, lineIdx, lines }) {
    // Test current line character in previous idx
    if (startIdx !== 0 && isSymbol(line[startIdx - 1])) {
      return true;
    }

    // Test current line character in next idx
    if (endIdx !== line.length && isSymbol(line[endIdx])) {
      return true;
    }

    // Test line prior slice
    if (lineIdx !== 0 && sliceHasSymbol(lines[lineIdx - 1], symbolSliceStartIdx, symbolSliceEndIdx)) {
      return true;
    }

    // Test line after slice
    if (lineIdx !== lines.length - 1 && sliceHasSymbol(lines[lineIdx + 1], symbolSliceStartIdx, symbolSliceEndIdx)) {
      return true;
    }

    return false;
  }

  function isSymbol(character) {
    return character.match(/\d/) === null && character !== '.';
  }

  function sliceHasSymbol(line, startIdx, endIdx) {
    return [...line.slice(startIdx, endIdx)].some(isSymbol);
  }
}

export function solvePuzzle2(puzzleInput) {
  const lines = puzzleInput.split('\n').filter((r) => r !== '');
  return lines
    .map((line, idx) => getGearRatios(line, idx, lines))
    .flat()
    .reduce((p, n) => p + n, 0);

  function getGearRatios(line, lineIdx, lines) {
    const gearCharacters = line.matchAll(/\*/g);
    const gears = Array.from(gearCharacters).map((gear) => {
      const gearIdx = gear.index;

      const gearSliceStartIdx = gearIdx === 0 ? gearIdx : gearIdx - 1;
      const gearSliceEndIdx = gearIdx === line.length - 1 ? gearIdx + 1 : gearIdx + 2;

      return getGearRatio({ gearIdx, gearSliceStartIdx, gearSliceEndIdx, line, lineIdx, lines });
    });

    return gears;
  }

  function getGearRatio({ gearIdx, gearSliceStartIdx, gearSliceEndIdx, line, lineIdx, lines }) {
    const numbersAdjacent = [];
    // Test current line character in previous idx
    if (gearIdx !== 0 && isNumber(line[gearIdx - 1])) {
      const foundNumber = line.slice(0, gearIdx).match(/\d+$/);
      numbersAdjacent.push(foundNumber);
    }

    // Test current line character in next idx
    if (gearIdx !== line.length - 1 && isNumber(line[gearIdx + 1])) {
      const foundNumber = line.slice(gearIdx + 1, line.length).match(/^\d+/);
      numbersAdjacent.push(foundNumber);
    }

    // Note: All line numbers in prior/after lines must be tested
    // since it's possible to have two adjacent numbers in line prior/after

    // Test line prior slice
    if (lineIdx !== 0) {
      const priorLineNumbers = getLineNumbers(lines[lineIdx - 1]).filter((v) => isAdjacentToGear(v, gearIdx));
      priorLineNumbers.forEach((n) => numbersAdjacent.push(n));
    }

    // Test line after slice
    if (lineIdx !== lines.length - 1 && sliceHasNumber(lines[lineIdx + 1], gearSliceStartIdx, gearSliceEndIdx)) {
      const afterLineNumbers = getLineNumbers(lines[lineIdx + 1]).filter((v) => isAdjacentToGear(v, gearIdx));
      afterLineNumbers.forEach((n) => numbersAdjacent.push(n));
    }

    // Specs specify there must be exactly two adjacent numbers, therefore early return is not option
    return numbersAdjacent.length === 2 ? numbersAdjacent.map((v) => Number(v[0])).reduce((p, n) => p * n, 1) : null;
  }

  function isNumber(character) {
    return character.match(/\d/) !== null;
  }

  function sliceHasNumber(line, startIdx, endIdx) {
    return [...line.slice(startIdx, endIdx)].some(isNumber);
  }

  function getLineNumbers(line) {
    return Array.from(line.matchAll(/\d+/g));
  }

  function isAdjacentToGear(matchedLineNumber, gearIdx) {
    // If any index the number contains is adjacent, the number is adjacent
    const validAdjacentIndices = [gearIdx - 1, gearIdx, gearIdx + 1];
    const numberStartIdx = matchedLineNumber.index;
    const numberEndIdx = matchedLineNumber.index + matchedLineNumber[0].length - 1;

    if (validAdjacentIndices.some((idx) => idx === numberStartIdx || idx === numberEndIdx)) {
      return true;
    }

    if (numberStartIdx < gearIdx - 1 && numberEndIdx > gearIdx + 1) {
      return true;
    }

    return false;
  }
}
