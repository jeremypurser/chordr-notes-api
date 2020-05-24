import { Pool } from 'pg';
import { connection } from '../../config';
import postgresAdapter from '../core/Adapters/PostgresAdapter';

export default postgresAdapter(new Pool(connection));
