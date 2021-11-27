import {
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { FileElementResponse } from './dto/file-element.response';
import { FilesService } from './files.service';
import { MFile } from './dto/mFile.class';

@Controller('files')
export class FilesController {
  constructor(private readonly fileService: FilesService) {}

  @Post('upload')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('files'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<FileElementResponse[]> {
    // принимаем мултер объект с файлом
    // далее создаем объект с помощью конструктора MFile в котором сохраняем свойства
    //originalname и buffer
    const saveArray: MFile[] = [new MFile(file)];

    // если это картинка то запускаем функцию convertToWebP которая с помощью библиотеки
    // sharp преобразовывает буфер картинки в буфер webP
    if (file.mimetype.includes('image')) {
      const webPBufferFile = await this.fileService.convertToWebP(file.buffer);
      // после конвертации домолняем массив saveArray новым файлом с новым originalname
      // и конвертированным буфером webPBufferFile
      saveArray.push(
        new MFile({
          originalname: `${file.originalname.split('.')[0]}.webp`,
          buffer: webPBufferFile,
        }),
      );
    }
    // если переданный file - картинка то в saveArray отсылается два файла для сохранения jpeg и webp
    // если нет (видео или аудио) сохраняется один файл
    return this.fileService.saveFiles(saveArray);
  }
}
