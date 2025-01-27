import { Client } from '../client';
import { JsonObject, JsonProperty } from 'typescript-json-serializer';
import { APIResource } from '../types';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ModelOptions {}

@JsonObject()
export abstract class Resource<
	TRelations = APIResource['relations'],
	TUpdates = APIResource['updates']
> {
	@JsonProperty()
	public readonly id: string = '';

	/**
	 * @internal
	 */
	public relations: Partial<TRelations> | APIResource['relations'] = {};

	/**
	 * @internal
	 */
	public updates: Partial<TUpdates> | APIResource['updates'] = {};

	/* istanbul ignore next */
	public constructor(protected readonly client: Client, protected options: ModelOptions = {}) {
		Object.defineProperty(this, 'client', {
			enumerable: false,
			writable: false,
		});

		Object.defineProperty(this, 'options', {
			enumerable: false,
		});
	}

	protected authenticated(): void {
		if (!this.client.authenticated) {
			throw new Error('Cannot retrieve data without user authentication!');
		}
	}
}
