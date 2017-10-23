import { IAvatarUrls } from './i-avatar-urls.model';

export interface IUser {
  accountId: string;
  active: boolean;
  applicationRoles?: {
    size: number;
    items: Array<any>;
  };
  avatarUrls: IAvatarUrls;
  displayName: string;
  emailAddress: string;
  expand?: string;
  groups?: {
    size: number;
    items:  Array<{ name: string; self: string; }>;
  };
  key: string;
  locale?: string;
  name: string;
  self: string;
  timeZone: string;
}
