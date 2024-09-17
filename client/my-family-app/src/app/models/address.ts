export class Address {
  public addressLine1: string;
  public addressLine2: string;
  public city: string;
  public state: string;
  public zipcode: string;

  constructor(addressLine1: string, addressLine2: string, city: string, state: string, zipcode: string) {
    this.addressLine1 = addressLine1;
    this.addressLine2 = addressLine2;
    this.city = city;
    this.state = state;
    this.zipcode = zipcode;
  }

  getAddressLine1(): string {
    return this.addressLine1;
  }

  setAddressLine1(addressLine1: string) {
    this.addressLine1 = addressLine1;
  }

  getAddressLine2(): string {
    return this.addressLine2;
  }

  setAddressLine2(addressLine2: string) {
    this.addressLine2 = addressLine2;
  }

  getCity(): string {
    return this.city;
  }

  setCity(city: string) {
    this.city = city;
  }

  getState(): string {
    return this.state;
  }

  setState(state: string) {
    this.state = state;
  }

  getZipcode(): string {
    return this.zipcode;
  }

  setZipcode(zipcode: string) {
    this.zipcode = zipcode;
  }
}
