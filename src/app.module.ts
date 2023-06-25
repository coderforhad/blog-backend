import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PersonModule } from './app/person/person.module';
import { CommonModule } from './common/common.module';
import { UploadResolver } from './app/upload/upload.resolver';
import { ImageModule } from './app/image/image.module';

@Module({
  imports: [
    CommonModule,
    PersonModule,
    ImageModule,
    ConfigModule.forRoot({
      cache: true,
    }),
  ],
  controllers: [],
  providers: [UploadResolver],
})
export class AppModule {}
