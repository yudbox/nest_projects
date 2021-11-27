import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path } from 'app-root-path';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: `${path}/uploads`,
      serveRoot: '/static', //нужно указывать путь в формате http://localhost:3000/static/path/to/file.jpg
    }),
  ],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
