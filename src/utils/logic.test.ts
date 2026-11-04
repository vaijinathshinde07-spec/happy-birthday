import test from 'node:test';
import assert from 'node:assert/strict';
import {
  shuffleArray,
  getNextMessage,
  calculateConstellationProgress,
  CONSTELLATION_STARS,
  HAPPINESS_MESSAGES,
  GARDEN_FLOWERS,
  LUCKY_STAR_MESSAGES,
} from './constants';

test('constellation stars count is exactly 6 as specified in prompt', () => {
  assert.equal(CONSTELLATION_STARS.length, 6);
  assert.equal(CONSTELLATION_STARS[0].message, 'Your smile makes ordinary moments brighter.');
  assert.equal(CONSTELLATION_STARS[1].message, 'Never stop being your wonderful self.');
  assert.equal(CONSTELLATION_STARS[2].message, 'You deserve beautiful things and endless happiness.');
  assert.equal(CONSTELLATION_STARS[3].message, 'May your dreams find their way to reality.');
  assert.equal(CONSTELLATION_STARS[4].message, 'Keep collecting little moments of joy.');
  assert.equal(CONSTELLATION_STARS[5].message, 'The world is better with people like you in it.');
});

test('happiness corner has at least 20 unique messages', () => {
  assert.ok(HAPPINESS_MESSAGES.length >= 20);
  const uniqueSet = new Set(HAPPINESS_MESSAGES);
  assert.equal(uniqueSet.size, HAPPINESS_MESSAGES.length, 'All messages must be unique');
});

test('calculateConstellationProgress calculates correct progress', () => {
  const initial = calculateConstellationProgress([]);
  assert.equal(initial.count, 0);
  assert.equal(initial.isComplete, false);
  assert.equal(initial.percentage, 0);

  const partial = calculateConstellationProgress([1, 2, 3]);
  assert.equal(partial.count, 3);
  assert.equal(partial.total, 6);
  assert.equal(partial.percentage, 50);
  assert.equal(partial.isComplete, false);

  // Duplicates should not increase count
  const withDupes = calculateConstellationProgress([1, 2, 2, 3]);
  assert.equal(withDupes.count, 3);

  const complete = calculateConstellationProgress([1, 2, 3, 4, 5, 6]);
  assert.equal(complete.count, 6);
  assert.equal(complete.isComplete, true);
  assert.equal(complete.percentage, 100);
});

test('shuffleArray returns all elements without mutating original', () => {
  const sample = [1, 2, 3, 4, 5];
  const shuffled = shuffleArray(sample);
  assert.equal(shuffled.length, sample.length);
  assert.deepEqual([...shuffled].sort(), [1, 2, 3, 4, 5]);
});

test('getNextMessage cycles through deck without crashing', () => {
  let deck: string[] = [];
  let index = 0;

  for (let i = 0; i < 30; i++) {
    const result = getNextMessage(deck, index);
    assert.ok(result.message.length > 0);
    deck = result.newDeck;
    index = result.nextIndex;
  }
});

test('garden flowers has exactly 6 unique flowers', () => {
  assert.equal(GARDEN_FLOWERS.length, 6);
  assert.ok(LUCKY_STAR_MESSAGES.length >= 5);
  const ids = new Set(GARDEN_FLOWERS.map((f: { id: number }) => f.id));
  assert.equal(ids.size, 6);
});
