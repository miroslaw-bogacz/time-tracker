import { IJiraRequestOptions } from '../../shared/jira-api/models/jira-request-options.interface';

export function getHeaderOptionsByAccount(options): IJiraRequestOptions {
  const url: URL = new URL(options.www);
  const { protocol, host, port } = url;

  return {
    protocol: protocol.replace(':', '') as any,
    port: Number(port) || null,
    domain: host,
    authentication: 'Basic Auth',
    token: options.token,
  }
}
