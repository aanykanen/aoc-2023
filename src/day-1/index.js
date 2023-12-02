// Common formatter for both puzzles
function formatNumber(firstNumber, secondNumber) {
  if (Number.isNaN(firstNumber) || Number.isNaN(secondNumber)) {
    throw new Error(
      `One of the numbers was NaN, cannot finish calculation!\n -Firstnumber: ${firstNumber}\n  -Secondnumber: ${secondNumber}`,
    );
  }

  return Number(`${firstNumber}${secondNumber}`);
}

export function solvePuzzle1(puzzleInput) {
  const rows = puzzleInput.split('\n');
  return rows.map(getRowNumbers).reduce((prev, next) => (next += prev), 0);

  function getRowNumbers(row) {
    const firstNumber = Number([...row].find((v) => v.match(/\d/)));
    const secondNumber = Number([...row].reverse().find((v) => v.match(/\d/)));

    return formatNumber(firstNumber, secondNumber);
  }
}

export function solvePuzzle2(puzzleInput) {
  const numbersAsDict = Array.from({ length: 9 }, (_, i) => i + 1).reduce((prev, next) => ({ ...prev, [`${next}`]: next }), {});

  const validNumbers = {
    ...numbersAsDict,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };

  const rows = puzzleInput.split('\n').filter((row) => row.length !== 0);
  return rows.map(getRowNumbers).reduce((prev, next) => (next += prev), 0);

  // Note the edge case when same number has multiple entries
  function getRowNumbers(row) {
    const firstValue = {};
    const secondValue = {};

    // Iterate through every possible valid key to find key in lowest and highest index
    Object.keys(validNumbers).forEach((numberKey) => {
      const rowFirstIndex = row.indexOf(numberKey);
      const rowLastIndex = row.lastIndexOf(numberKey);

      if (rowFirstIndex === -1) {
        return;
      }

      if (!Object.keys(firstValue).includes('key')) {
        firstValue.key = numberKey;
        firstValue.index = rowFirstIndex;
      } else if (firstValue.index > rowFirstIndex) {
        firstValue.key = numberKey;
        firstValue.index = rowFirstIndex;
      }

      if (!Object.keys(secondValue).includes('key')) {
        secondValue.key = numberKey;
        secondValue.index = rowLastIndex;
      } else if (secondValue.index < rowLastIndex) {
        secondValue.key = numberKey;
        secondValue.index = rowLastIndex;
      }
    });

    const firstNumber = validNumbers[firstValue.key];
    const secondNumber = validNumbers[secondValue.key];

    return formatNumber(firstNumber, secondNumber);
  }
}
