import { Person } from './person';
import { FamilyMember } from './family-member.model';
import { FamilyTreeRequestPayload } from './family-tree-request.payload';
import { Permission } from './permission';
import { Role } from './role';
import { User } from './user';
import { RelationshipType } from './relationship-type';
import * as moment from 'moment';

describe('Combined Model Tests', () => {
  // ISO 8601 format for date validation
  const iso8601Format = 'YYYY-MM-DDTHH:mm:ss';

  const testBaseDomainModel = (model: Person | FamilyMember, expectedId: number, expectedCreatedBy: string, expectedUpdatedBy: string) => {
    it('should have correct ID, createdBy, updatedBy properties', () => {
      expect(model.getId()).toBe(expectedId);
      expect(model.getCreatedBy()).toBe(expectedCreatedBy);
      expect(model.getUpdatedBy()).toBe(expectedUpdatedBy);
    });

    it('should have createdDate and updatedDate in ISO 8601 format', () => {
      const createdDate = moment(model.getCreatedDate()).format(iso8601Format);
      const updatedDate = moment(model.getUpdatedDate()).format(iso8601Format);
      expect(moment(createdDate, iso8601Format, true).isValid()).toBeTruthy();
      expect(moment(updatedDate, iso8601Format, true).isValid()).toBeTruthy();
    });

    it('should produce a valid JSON string in toString method', () => {
      expect(model.toString()).toContain('"id":');
    });
  };

  // ----- Tests for Person Model -----
  describe('Person Model Tests', () => {
    const person = new Person(1, 'John', 'Doe', new Date(1980, 0, 1), [] as FamilyMember[], 'creatorUser', new Date(), 'updaterUser', new Date());

    testBaseDomainModel(person, 1, 'creatorUser', 'updaterUser');

    it('should calculate the correct age', () => {
      const expectedAge = new Date().getFullYear() - 1980;
      expect(person.calculateAge()).toBe(expectedAge);
    });

    it('should return the correct JSON structure in toString method', () => {
      expect(person.toString()).toContain('"firstName": "John"');
      expect(person.toString()).toContain('"lastName": "Doe"');
    });
  });

  // ----- Tests for FamilyMember Model -----
  describe('FamilyMember Model Tests', () => {
    const person = new Person(2, 'Jane', 'Doe', new Date(1972, 5, 15), [] as FamilyMember[]);
    const familyMember = new FamilyMember(1, RelationshipType.SPOUSE, person, 'creatorUser', 'updaterUser', new Date(), new Date());

    testBaseDomainModel(familyMember, 1, 'creatorUser', 'updaterUser');

    it('should return the correct relationship and person properties', () => {
      expect(familyMember.relationship).toBe(RelationshipType.SPOUSE);
      expect(familyMember.person).toEqual(person);
    });

    it('should produce a valid JSON string in toString method', () => {
      expect(familyMember.toString()).toContain('"relationship": "SPOUSE"');
      expect(familyMember.toString()).toContain('"person":');
    });
  });

  // ----- Tests for Permission and Role Models -----
  describe('Permission and Role Tests', () => {
    const readPermission = new Permission('READ');
    const writePermission = new Permission('WRITE');
    const adminRole = new Role('Admin', [readPermission, writePermission]);

    it('should correctly get and print Permission and Role properties', () => {
      expect(readPermission.getName()).toBe('READ');
      expect(adminRole.getName()).toBe('Admin');
      expect(adminRole.getPermissions()).toEqual([readPermission, writePermission]);
    });

    it('should produce valid JSON strings in toString methods', () => {
      expect(readPermission.toString()).toContain('"name": "READ"');
      expect(adminRole.toString()).toContain('"name": "Admin"');
    });
  });

  // ----- Tests for User Model -----
  describe('User Model Tests', () => {
    const readPermission = new Permission('READ');
    const writePermission = new Permission('WRITE');
    const adminRole = new Role('Admin', [readPermission, writePermission]);
    const userRole = new Role('User', [readPermission]);

    const person1 = new Person(1, 'John', 'Doe', new Date(1970, 0, 1), [] as FamilyMember[]);
    const familyMember1 = new FamilyMember(1, RelationshipType.FATHER, person1, 'creatorUser', 'updaterUser', new Date(), new Date());

    const user = new User('testUser', 'password123', [adminRole, userRole], [familyMember1]);

    it('should return correct username, password, roles, and family members', () => {
      expect(user.getUsername()).toBe('testUser');
      expect(user.getPassword()).toBe('password123');
      expect(user.getRoles()).toEqual([adminRole, userRole]);
      expect(user.getFamilyMembers()).toEqual([familyMember1]);
    });

    it('should produce a valid JSON string in toString method', () => {
      expect(user.toString()).toContain('"username": "testUser"');
      expect(user.toString()).toContain('"roles":');
      expect(user.toString()).toContain('"familyMembers":');
    });
  });

  // ----- Tests for FamilyTreeRequestPayload -----
  describe('FamilyTreeRequestPayload Tests', () => {
    const parentPerson = new Person(1, 'Parent', 'One', new Date(1950, 0, 1), [] as FamilyMember[]);
    const childPerson = new Person(2, 'Child', 'One', new Date(1980, 0, 1), [] as FamilyMember[]);
    const parent = new FamilyMember(1, RelationshipType.FATHER, parentPerson, 'creatorUser', 'updaterUser', new Date(), new Date());
    const child = new FamilyMember(2, RelationshipType.CHILD, childPerson, 'creatorUser', 'updaterUser', new Date(), new Date());

    // Explicitly set spouse to null (not an array)
    const payload = new FamilyTreeRequestPayload(
      [parent],                      // parents
      [] as FamilyMember[],           // grandparents
      [child],                        // siblings
      null,                           // spouse (set to null)
      [] as FamilyMember[],           // children
      [] as FamilyMember[],           // cousins
      [] as FamilyMember[],           // uncles
      [] as FamilyMember[]            // aunts
    );

    it('should generate the correct payload structure', () => {
      const expectedPayload = {
        parents: [{
          relationship: RelationshipType.FATHER,
          person: {
            firstName: 'Parent',
            lastName: 'One',
            birthDate: parentPerson.birthDate,
            familyMembers: []
          }
        }],
        spouse: null,
        children: [/* children objects here */],
        grandparents: [],
        siblings: [],
        cousins: [],
        uncles: [],
        aunts: []
      };
      expect(payload.generatePayload()).toEqual(expectedPayload);
    });
  });

});
