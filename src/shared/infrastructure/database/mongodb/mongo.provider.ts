import { Provider } from '@nestjs/common';
import { ConfigService, registerAs } from '@nestjs/config';
import { Db, MongoClient } from 'mongodb';

export const MONGO_DB = Symbol('MONGO_DB');

export const MongoProvider: Provider = {
  provide: MONGO_DB,
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<Db> => {
    const uri = configService.getOrThrow<string>('MONGODB_URI');
    const dbName = configService.getOrThrow<string>('MONGODB_DB_NAME');
    const client = new MongoClient(uri);
    await client.connect();
    return client.db(dbName);
  },
};
