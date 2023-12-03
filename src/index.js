import * as day2 from './day-2';
import { readPuzzleInput } from './utils';

// TODO: cli usage with day as parameter
async function run() {
  const puzzleInput = await readPuzzleInput(2);
  const result1 = await day2.solvePuzzle1(puzzleInput);
  const result2 = await day2.solvePuzzle2(puzzleInput);

  console.log('Result of puzzle 1: ', result1);
  console.log('Result of puzzle 2: ', result2);
}

run();
