import { JsonProperty } from '@dhkatz/json-ts';

import { Client } from '@/client';
import { BaseModel, ModelOptions } from './BaseModel';
import { User } from './User';

export class GetMatched extends BaseModel {
  @JsonProperty('avatarname')
  public username: string;

  @JsonProperty('story')
  public story: string;

  @JsonProperty({ name: 'progress', type: Number })
  public progress: number[];

  @JsonProperty('status')
  public status: string;

  @JsonProperty('ap_profile')
  public isApProfile: boolean;

  public user: User;

  public constructor(client: Client, options?: ModelOptions) {
    super(client, options);

    this.username = undefined;
    this.story = undefined;
    this.progress = undefined;
    this.status = undefined;
    this.isApProfile = undefined;
  }

  public async load(): Promise<void> {
    const [user] = await this.client.users.search({ username: this.username });

    this.user = user;
  }
}
