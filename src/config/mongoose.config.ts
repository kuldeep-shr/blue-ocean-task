import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const mongooseConfig = (
  configService: ConfigService,
): MongooseModuleOptions => {
  return {
    uri: configService.get<string>('MONGO_URI'),
  };
};
