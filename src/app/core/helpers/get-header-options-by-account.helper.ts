import { IJiraRequestOptions } from '../../shared/jira-api/models/jira-request-options.interface';
import { IAccount } from '../../account/models/i-account.model';

export function getHeaderOptionsByAccount(options: IAccount): IJiraRequestOptions {
  const url: URL = new URL(options.www);
  const { protocol, hostname, port } = url;

  return {
    protocol: protocol.replace(':', '') as any,
    port: Number(port) || null,
    domain: hostname,
    authentication: 'Basic Auth',
    token: options.token,
  }
}
