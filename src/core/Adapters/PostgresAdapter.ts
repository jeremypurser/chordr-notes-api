import { Pool } from 'pg';
import { DbAdapter } from './DbAdapter';

interface PostgresQuery {
  params: string;
  postIndices?: string;
  newValues: any[];
}

export default class PostgresAdapter implements DbAdapter {
  dbConnection: Pool;

  constructor(dbConnection: Pool) {
    this.dbConnection = dbConnection;
  }

  // Transform helper
  objectToParams(
    method: 'post' | 'update',
    object: { [key: string]: any }
  ): PostgresQuery {
    // Remove id from object
    const pairsWithoutId = Object.entries(object)
      .filter(([key]) => key !== 'id')
      .reduce(
        (acc, [key, value]) => ({
          keys: [...acc.keys, key.toString()],
          values: [...acc.values, value.toString()],
        }),
        { keys: [], values: [] }
      );

    switch (method) {
      case 'post':
        return {
          params: `(${pairsWithoutId.keys})`,
          postIndices: `(${pairsWithoutId.keys.map(
            (_key, index) => `$${index + 1}`
          )})`,
          newValues: pairsWithoutId.values,
        };
      case 'update':
        return {
          params: pairsWithoutId.keys
            .map((key, index) => `${key}=${index + 1}`)
            .join(', '),
          newValues: pairsWithoutId.values,
        };
    }
  }

  // CREATE
  post(table: string, userId: string, entity: { [key: string]: string }) {
    const postParams = this.objectToParams('post', {
      user_id: userId,
      ...entity,
    });

    return this.dbConnection
      .query(
        `INSERT INTO ${table} ${postParams.params} VALUES ${postParams.postIndices}`,
        postParams.newValues
      )
      .then(result => result.rows);
  }

  // READ
  get(table: string, attribute: string, id: string) {
    return this.dbConnection
      .query(`SELECT * from ${table} WHERE ${attribute}=($${id})`, [+id])
      .then(result => result.rows);
  }

  // UPDATE
  update(table: string, entity: { [key: string]: any }) {
    const updateParams = this.objectToParams('update', entity);

    return this.dbConnection
      .query(
        `UPDATE ${table} SET ${updateParams.params}`,
        updateParams.newValues
      )
      .then(result => result.rows);
  }

  // DELETE
  delete(table: string, id: string) {
    return this.dbConnection
      .query(`DELETE FROM ${table} WHERE id=$${id}`)
      .then(result => result.rows);
  }
}
