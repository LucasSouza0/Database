import utf8_decode from 'locutus/php/xml/utf8_decode';
import utf8_encode from 'locutus/php/xml/utf8_encode';
import { format } from "date-fns";

interface Props {
  value: string;
  format: string;
}

export function FormatString(value: Buffer) {
  if (process.env.UTF8DEFINIDO == 'S') {
    value = utf8_encode(value).trim();
  } else if (value && value.length > 0) {
    value = utf8_encode(String.fromCharCode.apply(null, new Uint16Array(value))).trim();
  }
  if (value && value.toString() == '-0.1') {
    value = utf8_encode('0').trim();
  }
  return value ? utf8_decode(value) : '';
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
