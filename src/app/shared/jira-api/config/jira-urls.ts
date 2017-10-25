export const JQL = 'jql={jql}';
export const URL_QUERY = '{urlQuery}';

export const GET_ISSUE = `issue/{issueId}?${JQL}`;
export const GET_ISSUES = `search?${JQL}&${URL_QUERY}`;

export const GET_ISSUE_WORKLOGS = `issue/{issueId}/worklog`;
export const GET_ISSUE_WORKLOG = `issue/{issueId}/worklog/{worklogId}`;
export const PUT_ISSUE_WORKLOG = `issue/{issueId}/worklog/{worklogId}`;
export const CREATE_ISSUE_WORKLOG = `issue/{issueId}/worklog?newEstimate=new&reduceBy=manual`;
export const DELETE_ISSUE_WORKLOG = `issue/{issueId}/worklog/{worklogId}?newEstimate=new&reduceBy=manual`;

export const GET_PROJECTS = `project`;
export const GET_PROJECT = `project/{projectId}`;

export const GET_WORKLOGS = `worklogs`;

export const GET_CURRENT_USER = 'myself';
