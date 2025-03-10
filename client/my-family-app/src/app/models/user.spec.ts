// src/app/models/user.model.spec.ts

import { User } from './user';
import { Role } from './role';
import { FamilyMember } from './family-tree/family-member.model';
import { Person } from './family-tree/person';
import { RelationshipType } from './family-tree/relationship-type';
import { Permission } from './permission';

//jasmine describe which helps group related test cases, to be used
describe('User Model', () => {
  let user: User;
  let roles: Role[];
  let familyMembers: FamilyMember[];

  beforeEach(() => {
    // Mock data for permissions(array permission)
    const permissions = [new Permission('READ'), new Permission('WRITE')];

    // creating to roles that have different permissions.Mock data for roles with permissions
    roles = [
      new Role('Admin', permissions),
      new Role('User', [new Permission('READ')])
    ];

    //  Person object class

    const person1 = new Person(
      1,                                // id: number
      'John',                           // firstName: string
      'Doe',                            // lastName: string
      new Date(1970, 0, 1),             // birthdate: Date
      [],                               // familyMembers: FamilyMember[]
      'creatorUser',                    // createdBy?: string
      new Date(),                       // createdDate?: Date
      'updaterUser',                    // updatedBy?: string
      new Date()                        // updatedDate?: Date
    );

    const person2 = new Person(
      2,                                // id: number
      'Jane',                           // firstName: string
      'Doe',                            // lastName: string
      new Date(1972, 5, 15),            // birthdate: Date
      [],                               // familyMembers: FamilyMember[]
      'creatorUser',                    // createdBy?: string
      new Date(),                       // createdDate?: Date
      'updaterUser',                    // updatedBy?: string
      new Date()                        // updatedDate?: Date
    );

    // Mock data for family members using RelationshipType enum values
    familyMembers = [
      new FamilyMember(
        1,                             // id: number
        RelationshipType.FATHER,       // relationship: RelationshipType
        person1,                       // person: Person
        'creatorUser',                 // createdBy: string
        'updaterUser',                 // updatedBy: string
        new Date(),                    // createdDate: Date
        new Date()                     // updatedDate: Date
      ),
      new FamilyMember(
        2,                             // id: number
        RelationshipType.SPOUSE,       // relationship: RelationshipType
        person2,                       // person: Person
        'creatorUser',                 // createdBy: string
        'updaterUser',                 // updatedBy: string
        new Date(),                    // createdDate: Date
        new Date()                     // updatedDate: Date
      )
    ];

    // Initialize the User model with mock data
    user = new User('testUser', 'password123', roles, familyMembers);
  });

  it('should create an instance', () => {
    expect(user).toBeTruthy();
  });

  it('should return the correct username using getUsername method', () => {
    expect(user.getUsername()).toBe('testUser');
  });

  it('should return the correct password using getPassword method', () => {
    expect(user.getPassword()).toBe('password123');
  });

  it('should return the correct roles using getRoles method', () => {
    expect(user.getRoles()).toEqual(roles);
  });

  it('should return the correct family members using getFamilyMembers method', () => {
    expect(user.getFamilyMembers()).toEqual(familyMembers);
  });

  it('should return the correct family members using the familyMembers getter', () => {
    expect(user.familyMembers).toEqual(familyMembers);
  });

  it('should produce a valid JSON string in toString method', () => {
    const expectedString = `"user": {
              "username": "testUser",
              "roles": [${roles.map(role => role.toString()).join(', ')}],
              "familyMembers": [${familyMembers.map(member => member.toString()).join(', ')}]
            }`;
    expect(user.toString()).toBe(expectedString);
  });
});
