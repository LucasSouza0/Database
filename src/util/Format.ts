import { format } from "date-fns";
import { base64 } from './Base64';

interface Props {
  value: string;
  format: string;
}

interface PropsFormatString {
  value: Buffer;
  valueAux?: any;
  obj?: boolean;
}

export async function FormatString({value, valueAux, obj}: PropsFormatString) {
  let response: string = '';
  if (typeof value == 'number' || typeof value == 'boolean') {
    return value;
  }
  
  if (typeof value == 'object' && !obj) {
    try {
      response = format(new Date(value.toString().trim()), 'dd/MM/yyyy HH:mm');
    } catch (err) {
      if (!value) {
        response = 'null';  
      } else {
        response = value.toString().trim();
      }
    } 
    return response;
  }

  if (typeof value == 'function' && valueAux) {
    return new Promise<string>((resolve) => { 
      let buffer: any;
      valueAux(function(err: Error, name: any, e: any) {
        if (err) {
          resolve('');
          return;
        }

        let buffers: any[] = [];
        e.on('data', function(chunk: any) {
          buffers.push(chunk);
        });
        e.once('end', function() {
          buffer = Buffer.concat(buffers);
          const isPicture = /xpacket/gi.test(buffer.toString());
          if (isPicture) {
            resolve(base64(buffer));
          } else {
            resolve(buffer.toString());
          }
        });
      });
    });
  }
  
  return response;
}

export function FormatDate({format: formato, value}: Props): string {
  let valueAuxiliar;
  let infos;
  let data = '';
  let hora = '';
  let dia = '';
  let mes = '';
  let ano = '';

  try {
    value = value.replace('T', ' ');
    valueAuxiliar = value.split(' ');
    data = valueAuxiliar[0];
    hora = valueAuxiliar[1] == undefined ? '00:00' : valueAuxiliar[1];

    infos = data.split('');  
    if (value.indexOf('.') != -1) {
      infos = data.split('.');
    }
  
    if (value.indexOf('/') != -1) {
      infos = data.split('/');
    }

    if (value.indexOf('-') != -1) {
      infos = data.split('-');
    }
  
    if (infos[2].length == 2) {
      dia = infos[2];
      ano = infos[0];
    } else if (infos[2].length == 4) {
      dia = infos[0];
      ano = infos[2];
    }

    mes = infos[1];
    data = `${ano}-${mes}-${dia} ${hora}`;
    return format(new Date(data), formato);
  } catch (erro) {
    return '';
  }
}
