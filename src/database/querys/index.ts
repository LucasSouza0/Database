import {iPropsInsert, iPropsDelete, iPropsSelect} from '../../interfaces';
import Characters from '../../util/specialCharacters';

class Querys {
  Insert({campos, update, table}: iPropsInsert) {
    let SQL = '';
    let colunas = '';
    let valores = '';
    let separador = '';
    let inicioSQl = update ? 'UPDATE OR INSERT INTO' : 'INSERT INTO';
    campos.map((row, index) => {
      row.valor = row.valor.toString();
      row.valor = SQLInjection(row.valor);
      separador = index == 0 ? '' : ', ';
      colunas += separador + row.campo;
      valores += separador + "'" + row.valor + "'";
    });
  
    SQL = `${inicioSQl} ${table} (${colunas}) VALUES (${valores})`;
    return SQL;
  }

  Select({ table, fields, where, orderBy, first, join, groupBy }: iPropsSelect): string {
    let SQL = '';
    let camposSelect = '';
    let camposWhere = '';
    let descFirst = '';
    let descOrdem = '';
    let descGroup = '';
    let descWhere = '';
    let descJoins = '';
    
    fields.map((row, index) => {
      let separador = index == 0 ? '' : ', ';
      camposSelect += separador + row.field + ' as ' + row.name;
    });
  
    if (where && where.length > 0) {
      where.map((row, index) => {
        let auxilizar = '';
        row.value = SQLInjection(row.value);
  
        if (row.operadorLogico == 'like') {
          auxilizar = '%';
        }
  
        if (row.operadorLogico == 'beetwen') {
          camposWhere += row.condicao + ' ' + row.field + ' ' + row.operadorLogico + ' ' + "'" + row.value.toUpperCase() + "'" + ' AND ' + "'" + row.value?.toUpperCase() + "'";
        }
  
        if (index == 0 && row.operadorLogico != 'beetwen') {
          camposWhere += row.field + ' ' + row.operadorLogico + ' ' + "'" + row.value.toUpperCase() + "" + auxilizar + "' ";
        } else if (row.operadorLogico != 'beetwen') {
          camposWhere += row.condicao + ' ' + row.field + ' ' + row.operadorLogico + ' ' + "'" + row.value.toUpperCase() + "" + auxilizar + "' ";
        }
      });
    }
  
    if (join) {
      join.map((row, index) => {
        descJoins += `${row.type} ${row.table} as ${row.table} on ${row.description} `;
      }); 
    }
  
    if (first != undefined && first != 0) {
      descFirst = `FIRST ${first}`;
    }
  
    if (orderBy != undefined && orderBy != '') {
      descOrdem = `ORDER BY ${orderBy}`;
    }
  
    if (groupBy != undefined && groupBy != '') {
      descGroup = `GROUP BY ${groupBy}`;
    }
  
    if (camposWhere != '') {
      descWhere = `WHERE ${camposWhere}`;
    }
  
    SQL = `SELECT ${descFirst} ${camposSelect} FROM ${table} as ${table} ${descJoins} ${descWhere} ${descGroup} ${descOrdem}`; 
    return SQL;
  }

  Delete({table, where}: iPropsDelete): string {
    let SQL = '';
    let camposWhere = '';
    let descWhere = '';
    where.map((row, index) => {
      row.condicao = row.condicao ? row.condicao : 'AND';
      row.valor = SQLInjection(row.valor);
      if (index == 0) {
        camposWhere += row.campo + ' ' + row.operadorLogico + ' ' + "'" + row.valor + "' ";
      } else {
        camposWhere += row.condicao + ' ' + row.campo + ' ' + row.operadorLogico + ' ' + "'" + row.valor + "' ";
      }
    });
    descWhere = `WHERE ${camposWhere}`;
    SQL = `DELETE FROM ${table} ${descWhere}`;
    return SQL;
  }
}

function SQLInjection(value: string): string {
  Characters.map(character => {
    try {
      let replace = new RegExp(character.caracter, 'g');
      value = value.replace(replace, character.replace);
      return value;
    } catch (err) {
      value = value.replace(character.caracter, character.replace);
      return value;
    } finally { return value; }
  });
  return value;
}

export default new Querys;
