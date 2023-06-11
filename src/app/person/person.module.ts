import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonResolver } from './person.resolver';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Person, PersonSchema } from './entities/person.entity';

@Module({
  providers: [PersonResolver, PersonService, ConfigService],
  imports: [
    MongooseModule.forFeature([{ name: Person.name, schema: PersonSchema }]),
    ConfigModule.forRoot({
      cache: true,
    }),
  ],
})
export class PersonModule {}
