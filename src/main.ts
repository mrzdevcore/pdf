import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as helmet from 'helmet';
import * as express from 'express';
import { config } from '@/utils/config';
import { ServerConfig } from '@/types/config';
// import * as cors from 'cors';

const serverConfig: ServerConfig = config.server;
const port: number = serverConfig.port;

const app = express();
app.use(helmet());

async function bootstrap(expressInstance) {
  const _app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );

  _app.enableCors({
    origin: true,
    credentials: true,
  });

  const options = new DocumentBuilder()
    .setTitle('Afweba Pdf compiler')
    .setDescription('PDF Compiler API')
    .build();

  const document = SwaggerModule.createDocument(_app, options);
  SwaggerModule.setup('swagger-ui', _app, document);

  await _app.listen(port);
}

bootstrap(app).then(() => console.log(`Server started on port ${port} ! ✓`));
