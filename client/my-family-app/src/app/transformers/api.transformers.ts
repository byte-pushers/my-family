export const apiTransformers:Map<string, object> = new Map<string, object>();

apiTransformers.set('api/family-tree/{id}', new FamilyTreeResponseTransfomer());


