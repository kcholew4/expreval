import { TokenType, Token } from "./token";
import { ExprEval } from "./exprEval";

export class Lexer {
  private readonly source: string;
  private current: number = 0;
  private start: number = 0;
  private tokens: Token[] = [];

  constructor(source: string) {
    this.source = source;
  }

  scanTokens() {
    while (!this.isAtEnd()) {
      this.start = this.current;
      this.scanToken();
    }

    return this.tokens;
  }

  private scanToken() {
    const character = this.consume();

    switch (character) {
      case "(":
        this.addToken(TokenType.L_PAR, "(");
        break;
      case ")":
        this.addToken(TokenType.R_PAR, ")");
        break;
      case "+":
        this.addToken(TokenType.PLUS, "+");
        break;
      case "-":
        this.addToken(TokenType.MINUS, "-");
        break;
      case "*":
        this.addToken(TokenType.MUL, "*");
        break;
      case "/":
        this.addToken(TokenType.DIV, "/");
        break;
      case " ":
      case "\t":
        break;
      default:
        if (this.isNumeric(character)) {
          this.matchNumber();
          break;
        }

        ExprEval.error(`Unexpected character on index: ${this.start}.`);
    }
  }

  private addToken(type: TokenType, lexeme: string) {
    this.tokens.push(new Token(type, lexeme));
    this.start = this.current;
  }

  private consume() {
    return this.source[this.current++];
  }

  private isAtEnd() {
    return this.current >= this.source.length;
  }

  private peek() {
    if (this.isAtEnd()) {
      return "\0";
    }

    return this.source[this.current];
  }

  private peekNext() {
    if (this.current + 1 >= this.source.length) {
      return "\0";
    }

    return this.source[this.current + 1];
  }

  private isNumeric(char: string) {
    return /[0-9]/.test(char);
  }

  private matchNumber() {
    while (this.isNumeric(this.peek())) {
      this.consume();
    }

    if (this.peek() === "." && this.isNumeric(this.peekNext())) {
      // Go past the dot
      this.consume();

      while (this.isNumeric(this.peek())) {
        this.consume();
      }
    }

    this.addToken(
      TokenType.NUMBER,
      parseFloat(this.source.slice(this.start, this.current)).toString()
    );
  }
}
