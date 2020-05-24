import { Entity } from '../Entities';

export interface DbAdapter {
  post(table: string, userId: string, a: { [key: string]: any }): Promise<any>;
  get(table: string, attribute: string, id: string): Promise<any>;
  update(table: string, a: Required<Entity>): Promise<any>;
  delete(table: string, id: string): Promise<any>;
}
