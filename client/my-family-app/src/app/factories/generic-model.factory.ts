import { BaseDomain } from '../models/base-domain';

export class GenericModelFactory <T extends BaseDomain> {

  constructor() {

  }

  public create(props: any):T {
    return new T(props);
  }
}
