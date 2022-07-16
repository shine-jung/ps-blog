export interface IUser {
  uid?: string;
  name?: string;
  email?: string;
  id?: string;
  bojId?: string;
  blogTitle?: string;
  introduction?: string;
  photoURL?: string;
  isRegistered?: boolean;
  createdTime?: Date;
  lastLoginTime?: Date;
}
export interface IUpdateUser {
  name: string;
  email: string;
  bojId: string;
  blogTitle: string;
  introduction: string;
  photoURL: string;
}
export interface ICurrentUser extends IUser {
  updateUser: (args: IUpdateUser) => Promise<void>;
  deleteUser: () => Promise<void>;
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
export interface INestedComment {
  nestedcommentId?: string;
  nestedComment?: string;
  userId?: string;
  uploadTime?: Date;
  lastUpdatedTime?: Date;
}
export interface IComment {
  commentId?: string;
  comment?: string;
  userId?: string;
  uploadTime?: Date;
  lastUpdatedTime?: Date;
  likedUsers?: string[];
  likeCount?: number;
  nestedComments?: INestedComment[];
  nestedCount?: number;
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
  likedUsers?: string[];
  likeCount?: number;
  comments?: IComment[];
  commentCount?: number;
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
