export interface BaseModel {
  id?: number;
  createdBy?: string;
  createdDate?: Date;
  updatedBy?: string;
  updatedDate?: Date;

  // constructor(props: { id?: number, createdBy?: string, createdDate?: Date, updatedBy?: string, updatedDate?: Date }): BaseModel;
}
