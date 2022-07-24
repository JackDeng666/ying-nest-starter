// import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { dirname, join } from 'path';
import {
  writeFileSync,
  existsSync,
  mkdirSync,
  statSync,
  rmdirSync,
  unlinkSync,
  readdirSync,
} from 'fs';

@Injectable()
export class UploadService {
  // constructor(private readonly configService: ConfigService) {}

  saveFile(file): string {
    const fileName = this.getRandomFileName(file.originalname);
    const path = join(
      process.cwd(),
      `/uploadFiles/${new Date().toLocaleDateString()}/`,
    );
    this.checkDirExistAndCreate(path);
    writeFileSync(path + fileName, file.buffer);
    return 'save file success!';
  }

  /**
   * @description 批量判断文件夹是否存在 如果不存在则创建文件夹
   */
  checkDirExistAndCreate(path) {
    if (!existsSync(dirname(path))) {
      this.checkDirExistAndCreate(dirname(path));
    }
    if (!existsSync(path)) {
      mkdirSync(path);
    }
  }
  /**
   * @param {文件名} name
   * @description 获取文件名后缀
   */
  getFileExt(name) {
    const ext = name.split('.');
    return ext[ext.length - 1];
  }
  /**
   * @description 输入文件后缀,获取随机文件名
   */
  getRandomFileName(filename) {
    return `${this.GetRadomName(32, 32, 'NumAndLetter')}.${this.getFileExt(
      filename,
    )}`;
  }
  /**
   * @description 根据区间生成随机数
   */
  GetRandomNum(min, max) {
    const range = max - min;
    const rand = Math.random();
    return min + Math.round(rand * range);
  }
  /**
   * @description 输入一个区间和范围值,获取一个区间中长度的随机文件名
   */
  GetRadomName(min, max, include) {
    let tempStringArray;
    if (include === 'NumAndLetter') {
      tempStringArray = '0123456789qwertyuiopasdfghjklzxcvbnm'.split('');
    } else if (include === 'Num') {
      tempStringArray = '0123456789'.split('');
    } else if (include === 'Letter') {
      tempStringArray = 'qwertyuiopasdfghjklzxcvbnm'.split('');
    }
    let outPuttext = '';
    const length = this.GetRandomNum(min, max);
    for (let i = 1; i < length; i++) {
      outPuttext =
        outPuttext +
        tempStringArray[this.GetRandomNum(0, tempStringArray.length - 1)];
    }
    return outPuttext;
  }
  /**
   * @description 删除目录下的所有文件
   */
  delFile(fileUrl) {
    if (!existsSync(fileUrl)) return;
    // 当前文件为文件夹时
    if (statSync(fileUrl).isDirectory()) {
      // 读取下面的文件
      const files = readdirSync(fileUrl);
      const len = files.length;
      // 把下面的文件删了
      for (let i = 0; i < len; i++) {
        const url = fileUrl + '/' + files[i];
        this.delFile(url);
      }
      // 递归出来后把自己删了
      rmdirSync(fileUrl);
    } else {
      // 当前文件为文件时
      unlinkSync(fileUrl);
    }
  }
}
