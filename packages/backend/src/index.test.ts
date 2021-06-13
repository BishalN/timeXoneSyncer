import { sum } from './index';

test('test add', () => {
  expect(sum(1, 2)).toBeGreaterThan(2);
});
