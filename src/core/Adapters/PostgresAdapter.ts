import { Pool } from 'pg';
import { DbAdapter } from './DbAdapter';

interface PostgresQuery {
  params: string;
  postIndices?: string;
  newValues: any[];
}

// Helper for Postgres queries
function objectToParams(
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
          (key, index) => `$${index + 1}`
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

export default function postgresAdapter(dbConnection: Pool): DbAdapter {
  return {
    // CREATE
    post(table: string, entity) {
      const postParams = objectToParams('post', entity);

      return dbConnection
        .query(
          `INSERT INTO ${table} ${postParams.params} VALUES ${postParams.postIndices}`,
          postParams.newValues
        )
        .then(result => result.rows);
    },
    // READ -- get by id; TODO -- get all
    get(table: string, attribute: string, id: string) {
      return dbConnection
        .query(`SELECT * from ${table} WHERE ${attribute}=($1)`, [[+id]])
        .then(result => result.rows);
    },
    // UPDATE
    update(table: string, entity) {
      const updateParams = objectToParams('update', entity);

      return dbConnection
        .query(
          `UPDATE ${table} SET ${updateParams.params}`,
          updateParams.newValues
        )
        .then(result => result.rows);
    },
    // DELETE
    delete(table: string, id: string) {
      return dbConnection
        .query(`DELETE FROM ${table} WHERE id=$${id}`)
        .then(result => result.rows);
    },
  };
}
