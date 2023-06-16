import { Module } from '@nestjs/common';
import { GrapgqlModule } from './graphql.module';
import { MongoModule } from './mongo.module';

@Module({
    imports:[GrapgqlModule, MongoModule]
})
export class CommonModule {}