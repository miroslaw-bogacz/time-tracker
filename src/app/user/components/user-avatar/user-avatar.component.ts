import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { IUser } from './../../models/i-user.model';
import { IAvatarConfig } from './../../models/i-avatar-config.model';

@Component({
  selector: 'us-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: [ './user-avatar.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAvatarComponent {

  @Input() public user: IUser;

  @Input() public config?: IAvatarConfig = {
    alt: 'Avatar',
    height: 28,
    width: 28,
    textColor: '#007bff',
  };

}
