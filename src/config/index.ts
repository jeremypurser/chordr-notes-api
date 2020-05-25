interface PostgresConnection {
  user: string;
  host: string;
  database: string;
  password: string;
}

export const connection: Readonly<PostgresConnection> = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
};

interface Config {
  port: number;
}

export const config: Readonly<Config> = {
  port: Number(process.env.PORT),
};
