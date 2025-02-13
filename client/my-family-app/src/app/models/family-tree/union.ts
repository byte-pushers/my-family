import { UnionModel } from './union.model';
import { PersonModel } from './person.model';

export class Union extends UnionModel {
  constructor(
    id: number,
    married: boolean,
    spouse: PersonModel,
    children: PersonModel[],
    createdBy?: string,
    createdDate?: Date,
    updatedBy?: string,
    updatedDate?: Date
  ) {
    super(id, married, spouse, children, createdBy, createdDate, updatedBy, updatedDate);
  }

  public static fromJSON(json: any): Union {
    return new Union(
      json.id,
      json.married,
      new PersonModel(json.spouse),
      json.children?.map((child: any) => new PersonModel(child)) || [],
      json.createdBy,
      json.createdDate,
      json.updatedBy,
      json.updatedDate
    );
  }

  public override toString(): string {
    return super.toString();
  }
}
