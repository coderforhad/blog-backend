import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Ignore the import error
// @ts-ignore
import { graphqlUploadExpress } from 'graphql-upload';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }));
  await app.listen(3001);
  
  console.log(`\n link: http://localhost:3001/graphql`);
}
bootstrap();
