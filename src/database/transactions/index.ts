import { Database, Transaction, ISOLATION_READ_COMMITED } from 'node-firebird';
import { format } from 'date-fns';
import { FormatString } from '../../util/Format';
import { iPost, iDelete, iSelect, iUpdade, iFieldsSelect } from '../../interfaces';
import Query from '../querys';
import AppError from '../../error';

class Transations {
  private database: Database;
  private query: Query;
  constructor(db: Database) {
    this.database = db;
    this.query = new Query();
  }

  async InitializeTransition() {
    return new Promise<Transaction | false>((resolve) => {
      this.database.transaction(ISOLATION_READ_COMMITED, function(err, transaction) {
        if (err) {
          new AppError(err.message, format(new Date(), 'dd/MM/yyyy HH:mm'));
          resolve(false);
          return;
        }
        resolve(transaction);
      });
    });
  }

  async post(parametros: iPost) {
    return new Promise<boolean>((resolve) => {
      if (!parametros.SQL && parametros.props) {
        const {params: ParamsFunction, SQL: SqlFuncion} = this.query.Insert(parametros.props);
        parametros.SQL = SqlFuncion;
        parametros.params = ParamsFunction;
      }
      parametros.transaction.query(parametros.SQL || '', parametros.params || [], function (err: Error, resutl: any[]) {
        if (err) {
          new AppError(err.message, format(new Date(), 'dd/MM/yyyy HH:mm'), parametros.SQL);
          resolve(false);
          return;
        }
        resolve(true);
      });
    });
  }

  async update(parametros: iUpdade) {
    return new Promise<boolean>((resolve) => {
      if (!parametros.SQL && parametros.props) {
        const {params: ParamsFunction, SQL: SqlFuncion} = this.query.Update(parametros.props);
        parametros.SQL = SqlFuncion;
        parametros.params = ParamsFunction;
      }
      parametros.transaction.query(parametros.SQL || '', parametros.params || [], function (err: Error, resutl: any[]) {
        if (err) {
          new AppError(err.message, format(new Date(), 'dd/MM/yyyy HH:mm'), parametros.SQL);
          resolve(false);
          return;
        }
        resolve(true);
      });
    });
  }

  async find(parametros: iSelect) {
    return new Promise<{dados: any[], isError: boolean}>((resolve) => {
      const dados: Object[] = [];
      let field: iFieldsSelect[] = [];
      if (!parametros.SQL && parametros.props) {
        const {params: ParamsFunction, SQL: SqlFuncion, fields: FieldsFunction} = this.query.Select(parametros.props);
        parametros.SQL = SqlFuncion;
        parametros.params = ParamsFunction;
        field = FieldsFunction;
      }
      parametros.transaction.query(parametros.SQL || '', parametros.params || [], async function (err: Error, result: any[]) {
        if (err) {
          new AppError(err.message, format(new Date(), 'dd/MM/yyyy HH:mm'), parametros.SQL);
          resolve({dados: [], isError: true});
          return;
        }
        try {
          if (parametros.props) {
            for (let i = 0; i < result.length; i++) {
              let arrayValores: Object[] = [];
              let objetoValores = {};
              for (let j = 0; j < field.length; j++) {
                let parametro: any = field[j].name;
                arrayValores[parametro] = await FormatString({
                  value: result[i][field[j].name.toUpperCase()],
                  valueAux: result[i][field[j].name.toUpperCase()],
                  obj: false,
                });
              }
              objetoValores = Object.assign({}, arrayValores);
              dados.push(objetoValores);
            }
          } else {
            dados.push(result);
          }
          resolve({ dados: dados, isError: false });
        } catch (erro) {
          new AppError(erro.message, format(new Date(), 'dd/MM/yyyy HH:mm'));
          resolve({dados: [], isError: true});
          return;
        }
      });
    });
  }

  async delete(parametros: iDelete) {
    return new Promise<boolean>((resolve) => {
      if (!parametros.SQL && parametros.props) {
        const {params: ParamsFunction, SQL: SqlFuncion} = this.query.Delete(parametros.props);
        parametros.SQL = SqlFuncion;
        parametros.params = ParamsFunction;
      }
      parametros.transaction.query(parametros.SQL || '', parametros.params || [], function (err: Error, resutl: any[]) {
        if (err) {
          new AppError(err.message, format(new Date(), 'dd/MM/yyyy HH:mm'), parametros.SQL);
          resolve(false);
          return;
        }
        resolve(true);
      });
    });
  }

  async commit(transaction: Transaction): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      transaction.commit(function (err) {
        if (err) {
          new AppError(err.message, format(new Date(), 'dd/MM/yyyy HH:mm'));
          resolve(false);
          return;
        }
        resolve(true);
      });
    });
  }

  async rollback(transaction: Transaction): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      transaction.rollback(function (err) {
        if (err) {
          new AppError(err.message, format(new Date(), 'dd/MM/yyyy HH:mm'));
          resolve(false);
          return;
        }
        resolve(true);
      });
    });
  }
}

export default Transations;
