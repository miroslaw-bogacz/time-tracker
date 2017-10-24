import { IJiraUser } from './jira-user.model';

export interface IJiraWorklog {
  id: string;
  issueId: string;
  created: string;
  started: string;
  updated: string;
  self: string;
  timeSpent: string;
  timeSpentSeconds: number;
  author: IJiraUser;
  updateAuthor: IJiraUser;
}
