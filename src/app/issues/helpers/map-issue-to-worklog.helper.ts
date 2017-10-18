import * as moment from 'moment';

export const mapIssueToWorklog = (issue: any): any => ({
  id: issue.id,
  key: issue.key,
  summary: issue.fields.summary,
  parent: issue.fields.parent ? issue.fields.parent.fields.summary : null,
  activities: [],
  status: 0,
  started: moment().format('YYYY-MM-DDTHH:mm:ss.SSSZZ'),
});
