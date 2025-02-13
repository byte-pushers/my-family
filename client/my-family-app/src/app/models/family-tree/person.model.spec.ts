import { PersonModel } from './person.model';
import { FamilyTreeModel } from './family-tree.model';
import { FamilyTreeRequestPayload } from './family-tree-request.payload';

describe('Person Domain Model', () => {
  const createdDate = '2024-10-16T10:00:00.000Z';
  const createdBy = 'adminUser';
  const updatedBy = 'technicianUser';
  const updatedDate = '2024-10-17T10:00:00.000Z'

  function generatePersonWithOneSibling(): Person {
    const siblings = [new PersonModel(undefined, 'James', 'Davis', undefined, 'Male', true)]
    const somePerson = new PersonModel(1, 'John', 'Davis', new Date('1970-01-01'), 'Male', false, siblings, null, createdBy, new Date(createdDate), updatedBy, new Date(updatedDate));

    console.log(`some person: ${somePerson}`);

    return somePerson;
  }

  it('should be able to serialize sibling array', async () => {
    const expectedPerson = JSON.parse(JSON.stringify(personWithASibling));
    delete expectedPerson.default;
    const expectFlattenPerson = JSON.stringify(expectedPerson).replace(/(\r\n|\r|\n|\t| )/gm, "");
    const actualPerson = generatePersonWithOneSibling();
    const actualFlattenPerson = actualPerson.toString().replace(/(\r\n|\r|\n|\t| )/gm, "");

    console.log(`expectFlattenPayload: "${expectFlattenPerson}"`);
    console.log(`actualFlattenPayload: "${actualFlattenPerson}"`);

    expect(actualFlattenPerson).toBe(expectFlattenPerson);
    expect(actualPerson.siblings && actualPerson.siblings[0].firstName).toBe(expectedPerson.siblings[0].firstName);
    expect(actualPerson.siblings && actualPerson.siblings[0].deceased).toBe(expectedPerson.siblings[0].deceased);
  });
});

import * as personWithASibling from '../../../../test/data/person.with.a.sibling.json';
import { Person } from './person';

