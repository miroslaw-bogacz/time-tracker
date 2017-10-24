import { IJiraPaginatedResponse } from './jira-paginated-response.mode';
import { IJiraWorklog } from './jira-worklog.model';

export interface IJiraWorklogs extends IJiraPaginatedResponse {
  worklogs: IJiraWorklog[];
}
