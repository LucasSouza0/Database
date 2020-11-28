import { Database, Transaction, ISOLATION_READ_COMMITED } from 'node-firebird';
import { format } from 'date-fns';
import { FormatString } from '../../util/Format';
import AppError from '../../error';

import {iFieldsSelect} from '../../interfaces';

class Transations {
  private database: Database;
  constructor(db: Database) {
    this.database = db;
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

  async post(transaction: Transaction, SQL: string) {
    return new Promise<boolean>((resolve) => {
      transaction.query(SQL, [], function (err: Error, resutl: any[]) {
        if (err) {
          new AppError(err.message, format(new Date(), 'dd/MM/yyyy HH:mm'), SQL);
          resolve(false);
          return;
        }
        resolve(true);
      });
    });
  }

  async find(transaction: Transaction, SQL: string, field: iFieldsSelect[]) {
    return new Promise<{dados: any[], isError: boolean}>((resolve) => {
      const dados: Object[] = [];
      transaction.query(SQL, [], function (err: Error, result: any[]) {
        if (err) {
          new AppError(err.message, format(new Date(), 'dd/MM/yyyy HH:mm'), SQL);
          resolve({dados: [], isError: true});
          return;
        }
        try {
          result.map(row => {
            let arrayValores: Object[] = [];
            let objetoValores = {};
            field.map(res => {
              let parametro: any = res.name;
              arrayValores[parametro] = FormatString(row[res.name.toUpperCase()]);
            });
            objetoValores = Object.assign({}, arrayValores);
            dados.push(objetoValores);
          });
          resolve({ dados: dados, isError: false });
        } catch (erro) {
          new AppError(erro.message, format(new Date(), 'dd/MM/yyyy HH:mm'));
          resolve({dados: [], isError: true});
          return;
        }
      });
    });
  }

  async delete(transaction: Transaction, SQL: string) {
    return new Promise<boolean>((resolve) => {
      transaction.query(SQL, [], function (err: Error, resutl: any[]) {
        if (err) {
          new AppError(err.message, format(new Date(), 'dd/MM/yyyy HH:mm'), SQL);
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
