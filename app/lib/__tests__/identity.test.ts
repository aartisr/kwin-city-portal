import { describe, expect, it } from 'vitest';
import { SITE_IDENTITY, personReference, personSchema } from '../identity';

describe('canonical site identity', () => {
  it('keeps human authorship separate from legal ownership', () => {
    expect(SITE_IDENTITY.person.name).toBe('Aarti S Ravikumar');
    expect(SITE_IDENTITY.legalOwner.name).toBe('BAJA Associates');
    expect(SITE_IDENTITY.legalOwner.url).toBe('https://baja.kwin-city.com');
    expect(SITE_IDENTITY.person.name).not.toBe(SITE_IDENTITY.legalOwner.name);
  });

  it('emits one stable, externally linked Person entity', () => {
    expect(personReference()).toEqual({ '@id': 'https://kwin-city.com/aarti-s-ravikumar#person' });
    expect(personSchema()).toMatchObject({
      '@type': 'Person',
      name: 'Aarti S Ravikumar',
      alternateName: ['Aarti Sri Ravikumar'],
      url: 'https://kwin-city.com/aarti-s-ravikumar',
      sameAs: ['https://ai-aarti.com'],
    });
  });
});
