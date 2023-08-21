interface IUser {
  user: string;
  name: string;
  roles: IRoles;
  pwd: string;
  image?: string;
  sex: "male" | "female" | "other";
  borndate: Date | string;
  street: string;
  city: string;
  country: string;
  zip: string;
  mod?: string;
  email?: string;
  phone?: string;
  courses?: string[];
  refreshToken?: string;
}

interface IRoles {
  User: 1 | null;
  Editor: 1001 | null;
  Admin: 2001 | null;
}

interface IJwtUser {
  UserInfo: { user: string; roles: number[] };
  iat: number;
  exp: number;
}

interface ISignup {
  user: string;
  name: string;
  sex: "male" | "female" | "other";
  borndate: Date;
  street: string;
  city: string;
  country: string;
  zip: string;
  pwd: string;
}

export type { IUser, IRoles, IJwtUser, ISignup };
