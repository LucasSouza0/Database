export interface iPropsInsert {
  campos: iFieldsInsert[];
  update: boolean;
  table: string;
}

export interface iFieldsInsert {
  campo: string;
  valor: any;
}

export interface iPropsDelete {
  table: string;
  where: iWhereDelete[];
}

export interface iWhereDelete {
  campo: string;
  valor: string;
  operadorLogico: '=' | '>' | '<' | '>=' | '<=';
  condicao?: 'AND' | 'OR';
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
  condicao?: 'AND' | 'OR';
  operadorLogico: '=' | '<>' | '>' | '<' | '>=' | '<=' | 'like' | 'beetwen';
}

export interface iOptionsJoins {
  type: 'LEFT JOIN' | 'INNER JOIN';
  table: string;
  description: string;
}
