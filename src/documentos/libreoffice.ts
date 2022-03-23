import * as fs from 'fs';
import * as path from 'path';
import * as async from 'async';
import * as tmp from 'tmp';
import { execFile } from 'child_process';

export const convertWithOptions = (
  document: any,
  format: any,
  filter: any,
  options: any,
  callback: any,
) => {
  const tmpOptions = (options || {}).tmpOptions || {};
  const asyncOptions = (options || {}).asyncOptions || {};
  const tempDir = tmp.dirSync({
    prefix: 'libreofficeConvert_',
    unsafeCleanup: true,
    ...tmpOptions,
  });
  const installDir = tmp.dirSync({
    prefix: 'soffice',
    unsafeCleanup: true,
    ...tmpOptions,
  });
  return async.auto(
    {
      soffice: (callback) => {
        let paths = [];
        switch (process.platform) {
          case 'darwin':
            paths = ['/Applications/LibreOffice.app/Contents/MacOS/soffice'];
            break;
          case 'linux':
            paths = [
              '/usr/bin/libreoffice',
              '/usr/bin/soffice',
              '/snap/bin/libreoffice',
            ];
            break;
          case 'win32':
            paths = [
              path.join(
                process.env['PROGRAMFILES(X86)'],
                'LIBREO~1/program/soffice.exe',
              ),
              path.join(
                process.env['PROGRAMFILES(X86)'],
                'LibreOffice/program/soffice.exe',
              ),
              path.join(
                process.env.PROGRAMFILES,
                'LibreOffice/program/soffice.exe',
              ),
            ];
            break;
          default:
            return callback(
              new Error(
                `Operating system not yet supported: ${process.platform}`,
              ),
            );
        }

        return async.filter(
          paths,
          (filePath, callback) =>
            fs.access(filePath, (err) => callback(null, !err)),
          (err, res) => {
            if (res.length === 0) {
              return callback(new Error('Could not find soffice binary'));
            }

            return callback(null, res[0]);
          },
        );
      },
      saveSource: (callback) =>
        fs.writeFile(path.join(tempDir.name, 'source'), document, callback),
      convert: [
        'soffice',
        'saveSource',
        (results, callback) => {
          let command = `swriter.exe --headless --convert-to ${format}`;
          //let command = `-env:UserInstallation=file://${installDir.name} --headless --convert-to ${format}`;
          if (filter !== undefined) {
            command += `:"${filter}"`;
          }
          command += ` --outdir ${tempDir.name} ${path.join(
            tempDir.name,
            'source',
          )}`;
          const args = command.split(' ');
          return execFile(results.soffice, args, callback);
        },
      ],
      loadDestination: [
        'convert',
        (results, callback) =>
          async.retry(
            {
              times: asyncOptions.times || 3,
              interval: asyncOptions.interval || 200,
            },
            (callback) =>
              fs.readFile(
                path.join(tempDir.name, `source.${format.split(':')[0]}`),
                callback,
              ),
            callback,
          ),
      ],
    },
    (err, res) => {
      tempDir.removeCallback();
      installDir.removeCallback();

      if (err) {
        return callback(err);
      }

      return callback(null, res.loadDestination);
    },
  );
};

export const convert = (
  document: any,
  format: any,
  filter: any,
  callback: any,
) => {
  return convertWithOptions(document, format, filter, {}, callback);
};
