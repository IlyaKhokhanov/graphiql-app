export interface IFormData {
  email: string;
  password: string;
}

export interface IFormDataReset {
  email: string;
}

export interface IFormErrors {
  email?: { message: string };
  password?: { message: string };
}
