import { Transaction } from "node-firebird";

export interface iPropsInsert {
  fields: iFieldsInsert[];
  update: boolean;
  table: string;
}

export interface iFieldsInsert {
  field: string;
  value: any;
}

export interface iPropsDelete {
  table: string;
  where: iWhereDelete[];
}

export interface iWhereDelete {
  field: string;
  value: string;
  initialDate?: string;
  finalDate?: string;
  logicalOperator?: '=' | '>' | '<' | '>=' | '<=' | 'like' | 'between';
  condition?: 'AND' | 'OR';
}

export interface iPropsSelect {
  table: string;
  fields: iFieldsSelect[];
  where?: iWhereSelect[];
  join?: iOptionsJoins[];
  first?: number;
  orderBy?: string;
  groupBy?: string;
}

export interface iFieldsSelect {
  field: string;
  name: string;
}

export interface iWhereSelect {
  field: string;
  value: string;
  initialDate?: string;
  finalDate?: string;
  condition?: 'AND' | 'OR';
  logicalOperator?: '=' | '<>' | '>' | '<' | '>=' | '<=' | 'like' | 'between';
}

export interface iOptionsJoins {
  type: 'LEFT JOIN' | 'INNER JOIN';
  table: string;
  description: string;
}

export interface iPropsUpdate {
  fields: iFieldsInsert[];
  where: iWhereSelect[];
  table: string;
}

// Interface Transactions

export interface iPost {
  transaction: Transaction;
  SQL?: string;
  props?: iPropsInsert;
  params?: any[];
}

export interface iDelete {
  transaction: Transaction;
  SQL?: string;
  props?: iPropsDelete;
  params?: any[];
}

export interface iSelect {
  transaction: Transaction;
  SQL?: string;
  props?: iPropsSelect;
  params?: any[];
}

export interface iUpdade {
  transaction: Transaction;
  SQL?: string;
  props?: iPropsUpdate;
  params?: any[];
}
