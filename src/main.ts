import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

// Ignore the import error
// @ts-ignore
import { graphqlUploadExpress } from 'graphql-upload';
import helmet from 'helmet';
import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(
    '/graphql',
    graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }),
  );
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: false,
    }),
  );
  app.use(cookieParser());

  await app.listen(3001);

  console.log(`\n link: http://localhost:3001/graphql`);
}
bootstrap();
