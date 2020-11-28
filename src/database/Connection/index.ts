import { Database } from 'node-firebird';
import Connection from '../../util/Connection';

interface iPropsConnect {
  host?: string;
  port?: number;
  database: string;
  user?: string;
  password?: string;
  lowercase_keys?: boolean;
  role?: string;
  pageSize?: number;
}

export async function Connect(props: iPropsConnect): Promise<false | Database> {
  const connect = new Connection(props);
  return await connect.Connect();
}

export function Disconnect(db: Database, props: iPropsConnect): void {
  const connect = new Connection(props);
  return connect.Disconnect(db);
}
