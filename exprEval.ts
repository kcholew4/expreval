import { TokenType } from "./token";
import { Lexer } from "./lexer";
import { Parser } from "./parser";
import { AstPrinter, AstRPNPrinter } from "./tools/astPrinter";

export class ExprEval {
  static eval(source: string) {
    const lexer = new Lexer(source);
    const tokens = lexer.scanTokens();
    const parser = new Parser(tokens);
    const expr = parser.parse();

    if (!expr) return;

    console.log(`Infix notation: ${new AstPrinter().print(expr)}`);
    console.log(`Postfix notation: ${new AstRPNPrinter().print(expr)}`);
  }

  static error(message: string) {
    console.error(message);
  }
}
