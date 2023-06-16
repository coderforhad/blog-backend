import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule, MongooseModuleOptions } from "@nestjs/mongoose";

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (ConfigService: ConfigService) => {
              const options: MongooseModuleOptions = {
                uri: ConfigService.get<string>('DATABASE_URL'),
              };
      
              return options;
            },
          }),
    ]
})
export class MongoModule{}