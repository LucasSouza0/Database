import Firebird, {Options, Database} from 'node-firebird';
import { format } from 'date-fns';
import AppError from '../error';

interface iConstructor {
  host?: string;
  port?: number;
  database: string;
  user?: string;
  password?: string;
  lowercase_keys?: boolean;
  role?: string;
  pageSize?: number;
}

class Connection {
  private options: Options;
  constructor(props: iConstructor) {
    this.options = {
      host: props.host || '127.0.0.1',
      port: props.port || 3050 ,
      database: props.database,
      user: props.user || 'SYSDBA',
      password: props.password || 'masterkey',
      lowercase_keys: props.lowercase_keys || false,
      role: props.role,
      pageSize: props.pageSize || 4096,
    }
  }

  async Connect() {
    return new Promise<Database | false>((resolve) => {
      Firebird.attach(this.options, function(err: Error, db: Database) {
        if (err) {
          new AppError(err.message, format(new Date(), 'dd/MM/yyyy HH:mm'));
          resolve(false);
          return;
        }
       resolve(db);
      });
    });
  }

  Disconnect(db: Database): void {
    db.detach();
  }
}

export default Connection;
