import { Pool } from 'pg';
import { connection } from '../config/config';
import PostgresAdapter from '../core/Adapters/PostgresAdapter';

export default PostgresAdapter.from(new Pool(connection));
