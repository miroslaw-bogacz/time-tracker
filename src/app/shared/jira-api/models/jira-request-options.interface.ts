import { TJiraProtocol } from './jira-protocol.type';
import { TJiraAuthentication } from './jira-authentication.type';

export interface IJiraRequestOptions {
  protocol: TJiraProtocol;
  domain: string;
  port?: number;
  uri?: string;
  token: string;
  authentication: TJiraAuthentication;
}
