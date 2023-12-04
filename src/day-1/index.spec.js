import { expect } from 'chai';

import { solvePuzzle1, solvePuzzle2 } from '.';
import { readPuzzleInput } from '../utils';

describe('day-1', () => {
  describe('solvePuzzle1', () => {
    it('should solve puzzle with example input', async () => {
      const testInput = await readPuzzleInput(null, '../day-1/test-input');
      const testOutput = await readPuzzleInput(null, '../day-1/test-output');

      const result = await solvePuzzle1(testInput);
      expect(result).to.eql(Number(testOutput));
    });
  });

  describe('solvePuzzle2', () => {
    it('should solve puzzle with example input', async () => {
      const testInput = await readPuzzleInput(null, '../day-1/test-input2');
      const testOutput = await readPuzzleInput(null, '../day-1/test-output2');

      const result = await solvePuzzle2(testInput);
      expect(result).to.eql(Number(testOutput));
    });
  });
});
