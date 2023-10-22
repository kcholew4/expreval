import { TokenType } from "./token";
import { Lexer } from "./lexer";

export class ExprEval {
  static eval(expression: string) {
    const lexer = new Lexer(expression);
    const tokens = lexer.scanTokens();

    tokens.forEach((token) => {
      console.log(TokenType[token.type]);
    });
  }

  static error(message: string) {
    console.error(message);
  }
}
