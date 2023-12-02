import { promises as fs } from 'fs';
import path from 'path';

// eslint-disable-next-line no-unused-vars
export async function readPuzzleInput(day, relativeInputPath = '', asStream = false) {
  // Note that fs docs tell that checking whether file exists or not with fs.stat is not recommended pattern
  // Instead error should be handled when using read function
  // See: https://nodejs.org/api/fs.html#fsstatpath-options-callback

  const puzzleInputPath = relativeInputPath
    ? path.resolve(__dirname, relativeInputPath)
    : path.resolve(__dirname, `../day-${day}/puzzle-input`);
  const data = await fs.readFile(puzzleInputPath);
  return Buffer.from(data).toString();

  // TODO: optional stream pattern - read file by row as stream if asStream is defined
}
