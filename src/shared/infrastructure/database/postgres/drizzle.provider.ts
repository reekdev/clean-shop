import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sql } from 'drizzle-orm';
import { PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

export const DRIZZLE = Symbol('DRIZZLE');

export type DrizzleDb = PostgresJsDatabase<typeof schema>;

export const DrizzleProvider: Provider = {
  provide: DRIZZLE,
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<DrizzleDb> => {
    const connectionString = configService.getOrThrow<string>(
      'POSTGRES_DATABASE_URL',
    );

    const client = postgres(connectionString);
    const db = drizzle(client, {
      schema
    });
    const result = await db.execute(sql`SELECT CURRENT_TIMESTAMP as "nigger"`);
    console.dir({a: result}, {depth: Infinity})
    // console.log(result.statement)
    // for (const entry of Object.entries(result)) {
        
    // }
    return db;
  },
};
