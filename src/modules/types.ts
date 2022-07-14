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

export interface INewPostContent {
  title?: string;
  description?: string;
  code?: string;
  language?: string;
  level?: number;
  tags?: string[];
  problemUrl?: string;
}
export interface IPostContent {
  postId?: string;
  userId?: string;
  title?: string;
  description?: string;
  code?: string;
  language?: string;
  level?: number;
  uploadTime?: Date;
  lastUpdatedTime?: Date;
  tags?: string[];
  problemUrl?: string;
  likes?: number;
  comments?: number;
}

export interface ITitle {
  language: string;
  languageDisplayName: string;
  title: string;
  isOriginal: boolean;
}
export interface IDisplayName {
  language: string;
  name: string;
  short: string;
}
export interface ITag {
  key: string;
  isMeta: boolean;
  bojTagId: number;
  problemCount: number;
  displayNames: IDisplayName[];
}
export interface IProblemInfo {
  problemId: number;
  titleKo: string;
  titles: ITitle[];
  isSolvable: boolean;
  isPartial: boolean;
  acceptedUserCount: number;
  level: number;
  votedUserCount: number;
  sprout: boolean;
  givesNoRating: boolean;
  isLevelLocked: boolean;
  averageTries: number;
  official: boolean;
  tags: ITag[];
}
