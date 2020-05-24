import { Pool } from 'pg';
import { connection } from '../config/config';
import makePostgresAdapter from '../core/Adapters/PostgresAdapter';

export default makePostgresAdapter(new Pool(connection));
