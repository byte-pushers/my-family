import { FamilyReunionTransformer } from './FamilyReunionTransformer';
import { FamilyTreeResponseModel } from '../models/family-tree/family-tree-response.model';

export class FamilyTreeDomainModelApiTransformer implements FamilyReunionTransformer {
  public static readonly CREATE_FAMILY_TREE_API_REQUEST = { url: '/api/family-trees', httpMethod: 'POST' }
  public static readonly FIND_FAMILY_TREE_API_REQUEST = { url: '/api/family-trees/{id}', httpMethod: 'GET' }

  transform(data: any): any {
    return new FamilyTreeResponseModel(data);
  }
}
