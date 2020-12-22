import {iPropsInsert, iPropsDelete, iPropsSelect, iFieldsSelect, iPropsUpdate} from '../../interfaces';

class Querys {
  Insert({fields, update, table}: iPropsInsert): {SQL: string, params: any} {
    let SQL = '';
    let colunas = '';
    let valores = '';
    let separador = '';
    let inicioSQl = update ? 'UPDATE OR INSERT INTO' : 'INSERT INTO';
    const params: any = [];
    fields.map((row, index) => {
      row.value = row.value.toString();
      separador = index == 0 ? '' : ', ';
      colunas += `${separador}${row.field}`;
      valores += `${separador}?`;
      params.push(row.value);
    });
    SQL = `${inicioSQl} ${table} (${colunas}) VALUES (${valores})`;
    return {SQL: SQL, params: params};
  }

  Update({fields, where, table}: iPropsUpdate): {SQL: string, params: any} {
    let SQL = '';
    let colunas = '';
    let separador = '';
    let descWhere = '';
    const params: any = [];
    fields.map((row, index) => {
      row.value = row.value.toString();
      separador = index == 0 ? '' : ', ';
      colunas += `${separador}${row.field} = ?`;
      params.push(row.value);
    });
    if (where) {
      descWhere = 'WHERE ';
      where.map((row, index) => {
        row.condition = row.condition ? row.condition : 'AND';
        row.logicalOperator = row.logicalOperator ? row.logicalOperator : '=';
        descWhere += index != 0 ? ` ${row.condition}` : '';
        if (row.logicalOperator == 'between') {
          descWhere += ` ${row.field} ${row.logicalOperator} ? AND ?`;  
          params.push(row.initialDate);
          params.push(row.finalDate);
        } else {
          descWhere += ` ${row.field} ${row.logicalOperator} ?`;
          params.push(row.value);
        }
      });
    }
    SQL = `UPDATE ${table} SET ${colunas} ${descWhere}`;
    return {SQL: SQL, params: params};
  }

  Select({ table, fields, where, orderBy, first, join, groupBy }: iPropsSelect): {SQL: string, params: any, fields: iFieldsSelect[]} {
    let SQL = '';
    let camposSelect = '';
    let descFirst = first ? `FIRST ${first}` : '';
    let descOrdem = orderBy ? `ORDER BY ${orderBy}` : '';
    let descGroup = groupBy ? `GROUP BY ${groupBy}` : '';
    let descWhere = '';
    let descJoins = '';
    const params: any[] = [];
    fields.map((row, index) => {
      let separador = index == 0 ? '' : ', ';
      camposSelect += separador + row.field + ' as ' + row.name;
    });
  
    if (where) {
      descWhere = 'WHERE ';
      where.map((row, index) => { 
        row.condition = row.condition ? row.condition : 'AND';
        row.logicalOperator = row.logicalOperator ? row.logicalOperator : '=';
        descWhere += index != 0 ? ` ${row.condition}` : '';
        if (row.logicalOperator == 'between') {
          descWhere += ` ${row.field} ${row.logicalOperator} ? AND ?`;  
          params.push(row.initialDate);
          params.push(row.finalDate);
        } else {
          descWhere += ` ${row.field} ${row.logicalOperator} ?`;
          params.push(row.value);
        }
      });
    }
  
    if (join) {
      join.map((row, index) => {
        descJoins += `${row.type} ${row.table} as ${row.table} on ${row.description} `;
      }); 
    }

    SQL = `SELECT ${descFirst} ${camposSelect} FROM ${table} as ${table} ${descJoins} ${descWhere} ${descGroup} ${descOrdem}`; 
    return {SQL: SQL, params: params, fields: fields};
  }

  Delete({table, where}: iPropsDelete): {SQL: string, params: any} {
    let SQL = '';
    let descWhere = '';
    const params: any = [];
    if (where) {
      descWhere = 'WHERE ';
      where.map((row, index) => {
        row.condition = row.condition ? row.condition : 'AND';
        row.logicalOperator = row.logicalOperator ? row.logicalOperator : '=';
        descWhere += index != 0 ? ` ${row.condition}` : '';
        if (row.logicalOperator == 'between') {
          descWhere += ` ${row.field} ${row.logicalOperator} ? AND ?`;  
          params.push(row.initialDate);
          params.push(row.finalDate);
        } else {
          descWhere += ` ${row.field} ${row.logicalOperator} ?`;
          params.push(row.value);
        }
      });
    }
    SQL = `DELETE FROM ${table} ${descWhere}`;
    return {SQL: SQL, params: params};
  }
}

export default Querys;
