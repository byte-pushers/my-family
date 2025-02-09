import * as jsonData from '../../../../test/data/family.tree.request.payload.one.person.json';
import { PersonModel } from './person.model';
import { FamilyTreeModel } from './family-tree.model';
import { FamilyTreeRequestPayload } from './family-tree-request.payload';

describe('FamilyTreeRequestPayload Object', () => {
  const createdDate = '2024-10-16T10:00:00Z';
  const createdBy = 'adminUser';

  function flatten(obj: any, prefix = '', flattenedObj: any) {
    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        flatten(obj[key], prefix + key + '.', flattenedObj);
      } else {
        flattenedObj[prefix + key] = obj[key];
      }
    }
  }
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
    // const expectPayload: any = {};
    const expectPayload = jsonData;
    const actualPayload = generateFamilyTreeRequestPayload();

    // flatten(jsonData, '', expectPayload);

    // expect(JSON.stringify(actualPayload.toString())).toBe(JSON.stringify(expectPayload));
    expect(actualPayload.getFamilyTree().people[0].firstName).toBe(expectPayload.familyTree.people[0].firstName);
  });
});
