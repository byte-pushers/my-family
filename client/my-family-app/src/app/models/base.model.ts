export interface BaseModel {
  id?: number;
  createdBy?: string;
  createdDate?: Date;
  updatedBy?: string | null;
  updatedDate?: Date | null;

  // constructor(props: { id?: number, createdBy?: string, createdDate?: Date, updatedBy?: string, updatedDate?: Date }): BaseModel;
}
