import { TJiraProtocol } from '../models/jira-protocol.type';
import { IJiraRequestOptions } from '../models/jira-request-options.interface';
import { Injectable } from '@angular/core';

@Injectable()
export class JiraRequestOptionsService {

  public protocol: TJiraProtocol;

  public domain: string;

  public port: number;

  public uri: string;

  public token: string;

  get url(): string {
    return `${this.protocol}://${this.domain}:${this.port}/${this.uri}/rest/api/latest`
      .replace(':null', '') // remove empty port
      .replace(/([^:]\/)\//g, '$1'); // remove double slash
  }

  public setOptions(options: IJiraRequestOptions): void {
    this.protocol = options.protocol;
    this.domain = options.domain;
    this.port = options.port || null;
    this.uri = options.uri || '';
    this.token = options.token;
  }
}
