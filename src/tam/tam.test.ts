import { describe, it, expect } from '@jest/globals';
import { createTam } from '../tam/tam';

describe('createTam', () => {
    it('should return a new TamUnit object with specified id', () => {
        const id = 'myId';
        const tam = createTam({id});
        expect(tam).toBeDefined();
        expect(tam.id).toBeTruthy();
        expect(typeof tam.id).toBe('string');
    });
});