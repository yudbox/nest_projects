import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { format } from 'date-fns';
import { ensureDir, writeFile } from 'fs-extra';
import { FileElementResponse } from './dto/file-element.response';
import { MFile } from './dto/mFile.class';
import * as sharp from 'sharp';

@Injectable()
export class FilesService {
  async saveFiles(files: MFile[]): Promise<FileElementResponse[]> {
    // чтоб типизация для файл работала нужно установить типы для multer
    // npm install --save @types/multer

    // для сохранения файлов сщздаем папку с сегодняшней датой в формате yyyy-MM-dd
    // и путь к папке будет rootDir (path) -> uploads -> dateFolder

    const dateFolder = format(new Date(), 'yyyy-MM-dd');
    const uploadFolder = `${path}/uploads/${dateFolder}`;
    // убеждаемся что папака по данному пути существует
    // если нет ensureDir создаст ее
    await ensureDir(uploadFolder);
    const responseData: FileElementResponse[] = [];

    // перевираем обэект с файлами и каждый сохраняем в папку uploads с помощью writeFile
    for (const file of files) {
      await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);
      responseData.push({
        url: `${dateFolder}/${file.originalname}`,
        name: file.originalname,
      });
    }

    return responseData;
  }

  async convertToWebP(file: Buffer): Promise<Buffer> {
    return sharp(file).webp().toBuffer();
  }
}
