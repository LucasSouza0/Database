import fs from 'fs';
import Path from 'path';

class AppError {
  public readonly message: string;
  public readonly dataHora: string;
  public readonly SQL: string
  private loacalLog: string;

  constructor(message: string, dataHora: string, SQL?: string) {
    this.message = message;
    this.dataHora = dataHora;
    this.SQL = SQL || '';
    this.loacalLog = Path.dirname(__dirname)+'/logsDatabase.txt';
    this.saveLog();
  }

  saveLog() {
    const caminho = this.loacalLog.split('node_modules');
    if (caminho.length > 0) {
      this.loacalLog = caminho[0];
    }
    let texto = `${this.dataHora} | ${this.message} | ${this.SQL} \r\n\n`; 
    fs.writeFile(this.loacalLog, texto, {flag: 'a'}, function(erro) { });
  }
}

export default AppError;
