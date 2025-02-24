import { Person } from './person';
import { PersonModel } from './person.model';
import { UnionsModel } from "./unions.model";

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

  function generatePersonWithASpouse(): Person {
    const spouse = new PersonModel(undefined, 'Tammy', 'Davis', new Date('1970-01-01'), 'Female', false);
    const unionWithSpouse = new UnionsModel(undefined, true, spouse, null);
    const somePersonWithSpouse = new PersonModel(1, 'John', 'Davis', new Date('1970-01-01'), 'Male', false, null, null, unionWithSpouse, createdBy, new Date(createdDate), updatedBy, new Date(updatedDate));

    return somePersonWithSpouse;
  }

  function generatePersonWithOneChild(): Person {
    const child = [new PersonModel(undefined, 'Mike', 'Davis', new Date('2000-05-12'), 'Male', false)];
    const unionWithChild = new UnionsModel(undefined, true, undefined, child);
    const somePersonWithChild = new PersonModel(1, 'John', 'Davis', new Date('1970-01-01'), 'Male', false, undefined, undefined, unionWithChild, createdBy, new Date(createdDate), updatedBy, new Date(updatedDate));

    return somePersonWithChild;
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

  it('should be able to create a person with a spouse', async () => {
    const expectedPerson = JSON.parse(JSON.stringify(personWithASpouse)).default;
    console.log(`expected person name: ${expectedPerson.unions[0].spouse.firstName}`);
    const expectFlattenPerson = JSON.stringify(expectedPerson).replace(/(\r\n|\r|\n|\t| )/gm, "");
    const actualPerson = generatePersonWithASpouse();
    const actualFlattenPerson = actualPerson.toString().replace(/(\r\n|\r|\n|\t| )/gm, "");

    console.log(`expectFlattenPayload: "${expectFlattenPerson}"`);
    console.log(`actualFlattenPayload: "${actualFlattenPerson}"`);

    expect(actualFlattenPerson).toBe(expectFlattenPerson);
    expect(actualPerson.unions && actualPerson.unions.spouse && actualPerson.unions.spouse.firstName).toBe(expectedPerson.unions[0].spouse.firstName);
  })

  it('should be able to create a person with a child', async () => {
    const expectedPerson = JSON.parse(JSON.stringify(personWithAChild)).default;
    const expectFlattenPerson = JSON.stringify(expectedPerson).replace(/(\r\n|\r|\n|\t| )/gm, "");
    const actualPerson = generatePersonWithOneChild();
    const actualFlattenPerson = actualPerson.toString().replace(/(\r\n|\r|\n|\t| )/gm, "");

    console.log(`expectFlattenPayload: "${expectFlattenPerson}"`);
    console.log(`actualFlattenPayload: "${actualFlattenPerson}"`);

    expect(actualFlattenPerson).toBe(expectFlattenPerson);
    expect(actualPerson.unions && actualPerson.unions.children && actualPerson.unions.children[0].firstName).toBe(expectedPerson.unions[0].children[0].firstName);
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

  it('should be able to add patriarchal uncle for a specific person', async() => {
    // todo:

  });
});

import * as personWithASibling from '../../../../test/data/person.with.a.sibling.json';
import * as personWithNoUnion from '../../../../test/data/person.with.no.union.json';
import * as personWithEmptyUnion from '../../../../test/data/person.with.empty.union.json';
import * as personWithASpouse from '../../../../test/data/person.with.a.spouse.json';
import * as personWithAChild from '../../../../test/data/person.with.a.child.json';
