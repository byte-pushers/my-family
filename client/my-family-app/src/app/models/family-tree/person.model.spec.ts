import { Person } from './person';
import { PersonModel } from './person.model';
import { UnionModel } from "./union.model";

describe('Person Domain Model', () => {
  const createdDate = '2024-10-16T10:00:00.000Z';
  const createdBy = 'adminUser';
  const updatedBy = 'technicianUser';
  const updatedDate = '2024-10-17T10:00:00.000Z'

  function generatePersonWithOneSibling(): Person {
    const siblings = [new PersonModel(undefined, 'James', 'Davis', undefined, 'Male', true)]
    const somePerson = new PersonModel(1, 'John', 'Davis', new Date('1970-01-01'), 'Male', false, siblings, null, null, createdBy, new Date(createdDate), updatedBy, new Date(updatedDate));

    return somePerson;
  }

  function generatePersonWithSpouse(): Person {
    // todo: create test case for spouse
    const union = new UnionModel(1, true, new PersonModel(1, 'Tammy', 'Davis', new Date('1970-01-01'), 'Female', false, null, null, null, createdBy, new Date(createdDate), updatedBy, new Date(updatedDate)), null, createdBy, new Date(createdDate));
    const somePerson = new PersonModel(1, 'John', 'Davis', new Date('1970-01-01'), 'Male', false, null, null, union, createdBy, new Date(createdDate), updatedBy, new Date(updatedDate));

    console.log(`some person: ${somePerson}`);

    return somePerson;
  }

  it('should be able to serialize sibling array', async () => {
    const expectedPerson = JSON.parse(JSON.stringify(personWithASibling)).default;
    const expectFlattenPerson = JSON.stringify(expectedPerson).replace(/(\r\n|\r|\n|\t| )/gm, "");
    const actualPerson = generatePersonWithOneSibling();
    const actualFlattenPerson = actualPerson.toString().replace(/(\r\n|\r|\n|\t| )/gm, "");

    console.log(`expectFlattenPayload: "${expectFlattenPerson}"`);
    console.log(`actualFlattenPayload: "${actualFlattenPerson}"`);

    expect(actualFlattenPerson).toBe(expectFlattenPerson);
    expect(actualPerson.siblings && actualPerson.siblings[0].firstName).toBe(expectedPerson.siblings[0].firstName);
    expect(actualPerson.siblings && actualPerson.siblings[0].deceased).toBe(expectedPerson.siblings[0].deceased);
  });

  it('should be able to create person with a spouse', async () => {
    const expectedPerson = JSON.parse(JSON.stringify(personWithASpouse)).default;
    const expectFlattenPerson = JSON.stringify(expectedPerson).replace(/(\r\n|\r|\n|\t| )/gm, "");
    const actualPerson = generatePersonWithSpouse();
    const actualFlattenPerson = actualPerson.toString().replace(/(\r\n|\r|\n|\t| )/gm, "");

    console.log(`expectFlattenPayload: "${expectFlattenPerson}"`);
    console.log(`actualFlattenPayload: "${actualFlattenPerson}"`);

    expect(actualFlattenPerson).toBe(expectFlattenPerson);
    expect(actualPerson.unions).toBe(expectedPerson.unions);
  })

  it('union array should be undefined if not specified.', async() => {
    const expectedPerson = JSON.parse(JSON.stringify(personWithNoUnion)).default;
    const expectFlattenPerson = JSON.stringify(expectedPerson).replace(/(\r\n|\r|\n|\t| )/gm, "");
    const actualPerson = new PersonModel(1, 'John', 'Davis', new Date('1970-01-01'), 'Male', false);
    const actualFlattenPerson = actualPerson.toString().replace(/(\r\n|\r|\n|\t| )/gm, "");

    console.log(`expectFlattenPayload: "${expectFlattenPerson}"`);
    console.log(`actualFlattenPayload: "${actualFlattenPerson}"`);

    expect(actualFlattenPerson).toBe(expectFlattenPerson);
  });

  it('union array should not be empty if specified with values.', async() => {
    // todo: implement test.
  });

  it('union array should be empty if specified with empty values.', async() => {
    const expectedPerson = JSON.parse(JSON.stringify(personWithEmptyUnion)).default;
    const expectFlattenPerson = JSON.stringify(expectedPerson).replace(/(\r\n|\r|\n|\t| )/gm, "");
    const actualPerson = new PersonModel(1, 'John', 'Davis', new Date('1970-01-01'), 'Male', false, undefined, undefined, []);
    const actualFlattenPerson = actualPerson.toString().replace(/(\r\n|\r|\n|\t| )/gm, "");

    console.log(`expectFlattenPayload: "${expectFlattenPerson}"`);
    console.log(`actualFlattenPayload: "${actualFlattenPerson}"`);

    expect(actualFlattenPerson).toBe(expectFlattenPerson);
  });

  it('union array should be null if specified with a null value.', async() => {
    // todo: implement test.
  });
});

import * as personWithASibling from '../../../../test/data/person.with.a.sibling.json';
import * as personWithNoUnion from '../../../../test/data/person.with.no.union.json';
import * as personWithEmptyUnion from '../../../../test/data/person.with.empty.union.json';
import * as personWithASpouse from '../../../../test/data/person.with.a.spouse.json';
