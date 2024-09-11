import 'dotenv/config';
import { db, client } from './db';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

await migrate(db, { migrationsFolder: './drizzle', migrationsTable: 'migrations' });

await client.end();
