import { IJiraAvatarUrls } from './jira-avatar-urls.mode';

export interface IJiraProject {
  expand: string;
  id: string;
  key: string;
  name: string;
  projectTypeKey: string;
  self: string;
  avatarUrls: IJiraAvatarUrls;
}
