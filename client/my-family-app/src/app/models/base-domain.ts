export interface BaseDomain {
  id?: number | null;
  createdBy?: string | null;
  updatedBy?: string | null;
  createdDate?: Date | null;
  updatedDate?: Date | null;

  // constructor(props: { id?: number, createdBy?: string, createdDate?: Date, updatedBy?: string, updatedDate?: Date }): BaseDomain;
}
