import { Client } from '@/client';

export interface ModelOptions {

}

export abstract class BaseModel {
  public client: Client;
  public options: ModelOptions;

  /* istanbul ignore next */
  public constructor(client?: Client, options: ModelOptions = {}) {
    this.options = options;
    this.client = client;
  }

  public abstract load(): Promise<void>;
}
