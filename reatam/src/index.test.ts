import { test, expect } from '@jest/globals';
import { dummyMaths } from './index';

test('DoMaths should return the sum of two numbers', () => {
    expect(dummyMaths(2, 3)).toBe(5);
    expect(dummyMaths(-5, 10)).toBe(5);
    expect(dummyMaths(0, 0)).toBe(0);
});
