/**
 * Interface representing a node in a family tree.
 *
 * @interface FamilyNode
 * @property {number} id - The unique identifier for the family node.
 * @property {string} name - The name of the family member.
 * @property {string} [image] - The optional image URL of the family member.
 * @property {number} [x] - The optional x-coordinate position of the family node.
 * @property {number} [y] - The optional y-coordinate position of the family node.
 * @property {FamilyNode[]} [children] - The optional list of child nodes.
 *
 * @version 1.0
 * @since 1.0
 * @author Danny Amezquita
 */
export interface FamilyNode {
  id: number;
  name: string;
  image?: string;
  x?: number;
  y?: number;
  children?: FamilyNode[];
}
