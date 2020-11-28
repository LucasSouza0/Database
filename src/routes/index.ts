// import {Router} from 'express';
// import Querys from '../database/querys';
// import {Connect, Disconnect} from '../database/Connection';
// import Transactions from '../database/transactions';

// const appRouter = Router();

// appRouter.get('/', async (request, response) => {
//   const sqlInsert = Querys.Insert({
//     campos: [{campo: 'USUAICOD', valor: '1'}, {campo: 'USUAA60LOGIN', valor: 'LUCAS&lucas'}, {campo: 'USUAA5SENHA', valor: '123'}],
//     table: 'USUARIO',
//     update: true,
//   });

//   const sqlDelete = Querys.Delete({
//     table: 'USUARIO',
//     where: [{campo: 'CODIGO', valor: '1', operadorLogico: '=', condicao: 'AND'}, {campo: 'NOME', condicao: 'AND', operadorLogico: '=', valor: 'lucas'}],
//   });

//   const sqlSelect = Querys.Select({
//     table: 'USUARIO',
//     fields: [{field: 'CODIGO', name: 'codigo'}, {field: 'NOME', name: 'nome'}],
//     first: 2,
//     orderBy: 'CODIGO',
//     groupBy: 'NOME',
//     where: [{field: 'CODIGO', operadorLogico: '>', condicao: 'AND', value: '5'}, {field: 'NOME', value: 'lucas', condicao: 'AND', operadorLogico: 'like'}],
//     join: [{type: 'LEFT JOIN', table: 'CLIENTE', description: 'CLIENTE.USUARIO = USUARIO.CODIGO'}, {type: 'LEFT JOIN', table: 'VENDEDOR', description: 'VENDEDOR.USUARIO = USUARIO.CODIGO'}]
//   });
//   const conexao = await Connect();
//   if (!conexao) {
//     return;
//   }

//   const transactions = new Transactions(conexao);
//   const trans = await transactions.InitializeTransition();
//   if (!trans) {
//     return;
//   } 
//   const post = await transactions.post(trans, sqlInsert);

//   return response.json({message: post});
// });

// export default appRouter;
