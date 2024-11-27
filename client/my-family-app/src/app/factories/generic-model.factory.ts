import { BaseModel } from '../models/base.model';

export class GenericModelFactory <T extends BaseModel> {

  constructor() {

  }

  public create(props: any):T {
    return new T(props);
  }
}
