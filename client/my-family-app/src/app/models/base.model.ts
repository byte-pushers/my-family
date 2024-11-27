export interface BaseModel {
  id?: number;
  createdBy?: string;
  createdDate?: Date;
  updatedBy?: string;
  updatedDate?: Date;

  new(props: any): BaseModel;
}
