import { IJiraAvatarUrls } from './jira-avatar-urls.mode';

export interface IJiraUser {
  accountId: string;
  active: boolean;
  displayName: string;
  emailAddress: string;
  key: string;
  name: string;
  self: string;
  timeZone: string;
  avatarUrls: IJiraAvatarUrls;
}
