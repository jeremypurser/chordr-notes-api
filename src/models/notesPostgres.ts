import { Pool } from 'pg';
import { connection } from '../config/config';
import postgresAdapter from '../core/Adapters/PostgresAdapter';

export default postgresAdapter(new Pool(connection));
