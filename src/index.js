import * as day1 from './day-1';
import { readPuzzleInput } from './utils';

// TODO: cli usage with day as parameter
async function run() {
  const puzzleInput = await readPuzzleInput(1);
  const result1 = await day1.solvePuzzle1(puzzleInput);
  const result2 = await day1.solvePuzzle2(puzzleInput);

  console.log('Result of puzzle 1: ', result1);
  console.log('Result of puzzle 2: ', result2);
}

run();
