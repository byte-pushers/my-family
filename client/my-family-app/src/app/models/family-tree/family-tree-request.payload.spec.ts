import * as jsonData from '../../../../test/data/family.tree.request.payload.one.person.json';
import { PersonModel } from './person.model';
import { FamilyTreeModel } from './family-tree.model';
import { FamilyTreeRequestPayload } from './family-tree-request.payload';

describe('FamilyTreeRequestPayload Object', () => {
  const createdDate = '2024-10-16T10:00:00Z';
  const createdBy = 'adminUser';

  function generateFamilyTreeRequestPayload() {
    const somePerson: PersonModel = new PersonModel(1, 'John', 'Davis', new Date('1970-01-01'), 'Male', false, null, null, createdBy, new Date(createdDate));
    const someFamilyTree: FamilyTreeModel = new FamilyTreeModel({
      name: 'The Pouncils',
      people: [somePerson],
      createdBy,
      createdDate
    });
    return new FamilyTreeRequestPayload(1, 'transaction-id-value', someFamilyTree);
  }

  it('should create the app', async () => {
    const expectPayload = JSON.parse(JSON.stringify(jsonData));
    delete expectPayload.default;
    const expectFlattenPayload = JSON.stringify(expectPayload).replace(/(\r\n|\r|\n|\t| )/gm, "");
    const actualPayload = generateFamilyTreeRequestPayload();
    const actualFlattenPayload = actualPayload.toString().replace(/(\r\n|\r|\n|\t| )/gm, "");

    console.log(`expectFlattenPayload: "${expectFlattenPayload}"`);
    console.log(`actualFlattenPayload: "${actualFlattenPayload}"`);

    expect(actualFlattenPayload).toBe(expectFlattenPayload);
    expect(actualPayload.getFamilyTree().people[0].firstName).toBe(expectPayload.familyTree.people[0].firstName);
  });
});
