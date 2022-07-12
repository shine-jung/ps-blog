export interface IUserUpdateArgs {
  displayName: string;
  photoURL: string;
}

export interface IUserObj {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  uid: string;
  updateProfile: (args: IUserUpdateArgs) => Promise<void>;
}
