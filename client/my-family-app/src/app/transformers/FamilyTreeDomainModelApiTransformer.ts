import { FamilyReunionTransformer } from './FamilyReunionTransformer';

export class FamilyTreeDomainModelApiTransformer implements FamilyReunionTransformer {
  public static readonly FIND_FAMILY_TREE_API_REQUEST = { url: '/api/family-trees/{id}', httpMethod: 'GET' }

  transform(data: any): any {
    return data;
  }
}
