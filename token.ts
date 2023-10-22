export enum TokenType {
  NUMBER,
  L_PAR,
  R_PAR,
  PLUS,
  MINUS,
  MUL,
  DIV,
}

export class Token {
  type: TokenType;
  lexeme: string;

  constructor(type: TokenType, lexeme: string) {
    this.type = type;
    this.lexeme = lexeme;
  }

  toString() {
    return this.lexeme;
  }
}
