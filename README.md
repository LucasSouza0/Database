# Descrição
  Projeto para facilitar a conexão e a execução de querys no banco de dados Firebird.
  Esse projeto foi escrito a partir do proejeto [node-firebird](https://www.npmjs.com/package/node-firebird).

# Instalação:
    npm install lucassouza0-database
    or
    yarn add lucassouza0-database
  
# Modo de uso
    import { Connection, Transaction } from 'lucassouza0-database';
    const connection = new Connection({database: 'C:\\banco\\DADOS.FDB'});

# Exemplo de POST
    const conexao = await connection.Connect();
    if (!conexao) {
      return 'falha na conexao';
    }

    const transaction = new Transaction(conexao);
    const tra = await transaction.InitializeTransition();

    if (!tra) {
      return 'falha na criação da transação';
    }

    const post = await transaction.post({
      transaction: tra,
      props: {
        fields: [{field: 'CODIGO', value: 1}, {field: 'NOME', value: 'TESTE'}],
        update: true,
        table: 'USUARIO',
      }
    });

    /** Or */

    // const post = await transaction.post({
    //   transaction: tra,
    //   SQL: 'INSERT INTO USUARIO (CODIGO, NOME) VALUE (?, ?)',
    //   params: [1, 'TESTE'],
    // });

    if (!post) {
      transaction.rollback(tra);
      return 'erro'
    }
    transaction.commit(tra);
    connection.Disconnect(conexao);
    return 'sucesso';

# Exemplo de PUT
    const conexao = await connection.Connect();
    if (!conexao) {
      return 'falha na conexao';
    }
    const transaction = new Transaction(conexao);
    const tra = await transaction.InitializeTransition();
    if (!tra) {
      return 'falha na criação da transação';
    }

    const put = await transaction.update({
      transaction: tra,
      props: {
        fields: [{field: 'NOME', value: 'TESTE01'}],
        table: 'USUARIO',
        where: [{field: 'CODIGO', value: '1'}],
      }
    });

    /** Or */

    // const put = await transaction.update({
    //   transaction: tra,
    //   SQL: 'UPDATE USUARIO SET NOME = ?',
    //   params: ['TESTE01'],
    // });

    if (!put) {
      transaction.rollback(tra);
      return 'erro';
    }
    transaction.commit(tra);
    connection.Disconnect(conexao);
    return 'sucesso';
    
# Exemplo de GET
    const conexao = await connection.Connect();
    if (!conexao) {
      return 'falha na conexao';
    }
    const transaction = new Transaction(conexao);
    const tra = await transaction.InitializeTransition();

    if (!tra) {
      return 'falha na criação da transação';
    }

    const {dados, isError} = await transaction.find({
      transaction: tra,
      props: {
        fields: [{field: 'CODIGO', name: 'codigo'}, {field: 'NOME', name: 'nome'}],
        table: 'USUARIO',
        where: [{field: 'CODIGO', value: '1'}],
      }
    });

    /** Or */

    // const {dados, isError} = await transaction.find({
    //   transaction: tra,
    //   SQL: 'SELECT CODIGO, NOME FROM USUARIO WHERE CODIGO = ?',
    //   params: [1]
    // });

    /** usando join */

    // const {dados, isError} = await transaction.find({
    //   transaction: tra,
    //   props: {
    //     fields: [{field: 'USUARIO.CODIGO', name: 'codigo'}, {field: 'USUARIO.NOME', name: 'nome'}, {field: 'CONTATO.EMAIL', name: 'email'}],
    //     table: 'USUARIO',
    //     join: [{table: 'CONTATO', type: 'LEFT JOIN', description: 'CONTATO.CODIGOUSUARIO = USUARIO.COIDOG'}],
    //     where: [{field: 'USUARIO.CODIGO', value: '1'}],
    //   }
    // });
    
    if (isError) {
      transaction.rollback(tra);
      return 'erro';
    }
    transaction.commit(tra);
    connection.Disconnect(conexao);
    return dados;
    
# Exemplo de DELETE
    const conexao = await connection.Connect();
    if (!conexao) {
      return response.json({message: 'falha na conexao'});
    }
    const transaction = new Transaction(conexao);
    const tra = await transaction.InitializeTransition();
    
    if (!tra) {
      return 'falha na criação da transação';
    }

    const deletar = await transaction.delete({
      transaction: tra,
      props: {
        table: 'USUARIO',
        where: [{field: 'CODIGO', value: '1'}],
      }
    });

    /** Or */

    // const deletar = await transaction.delete({
    //   transaction: tra,
    //   SQL: 'DELETE FROM USUARIO WHERE CODIGO = ?',
    //   params: [1],
    // });

    if (!deletar) {
      transaction.rollback(tra);
      return 'erro';
    }
    transaction.commit(tra);
    connection.Disconnect(conexao);
    return 'sucesso';
