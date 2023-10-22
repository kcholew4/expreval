import { Binary, Expr, Grouping, NumberLiteral, Unary } from "./expr";
import { ExprEval } from "./exprEval";
import { Token, TokenType } from "./token";

/*
  expression -> term
  term -> factor ( ( "+" | "-" ) factor )*
  factor -> unary ( ( "/" | "*" ) unary )*
  unary -> "-" unary | primary
  primary -> NUMBER | "(" expression ")"
*/

export class ParseError extends Error {}

export class Parser {
  private readonly tokens: Token[];
  private current = 0;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  parse() {
    try {
      return this.expression();
    } catch (error) {
      return null;
    }
  }

  private expression() {
    return this.term();
  }

  private term() {
    let expr = this.factor();

    while (this.match(TokenType.PLUS, TokenType.MINUS)) {
      const operator = this.previous();
      const right = this.factor();
      expr = new Binary(expr, operator, right);
    }

    return expr;
  }

  private factor() {
    let expr = this.unary();

    while (this.match(TokenType.DIV, TokenType.MUL)) {
      const operator = this.previous();
      const right = this.unary();
      expr = new Binary(expr, operator, right);
    }

    return expr;
  }

  private unary(): Expr {
    if (this.match(TokenType.MINUS)) {
      const operator = this.previous();
      const right = this.unary();
      return new Unary(operator, right);
    }

    return this.primary();
  }

  private primary() {
    if (this.match(TokenType.NUMBER)) {
      return new NumberLiteral(parseFloat(this.previous().toString()));
    }

    if (this.match(TokenType.L_PAR)) {
      const expr = this.expression();
      this.consume(TokenType.R_PAR, "Expected ')' after expression.");
      return new Grouping(expr);
    }

    throw this.error(this.peek(), "Expected expression.");
  }

  private match(...types: TokenType[]) {
    for (const type of types) {
      if (this.check(type)) {
        this.advance();
        return true;
      }
    }

    return false;
  }

  private consume(type: TokenType, message: string) {
    if (this.check(type)) return this.advance();

    throw this.error(this.peek(), message);
  }

  private check(type: TokenType) {
    if (this.isAtEnd()) return false;
    return this.peek().type === type;
  }

  private advance() {
    if (!this.isAtEnd()) this.current++;
    return this.previous();
  }

  private isAtEnd() {
    return this.peek().type === TokenType.EOF;
  }

  private peek() {
    return this.tokens[this.current];
  }

  private previous() {
    return this.tokens[this.current - 1];
  }

  private error(token: Token, message: string) {
    if (token.type === TokenType.EOF) {
      ExprEval.error(`At end: ${message}`);
    } else {
      ExprEval.error(`At '${token.toString()}': ${message}`);
    }

    return new ParseError();
  }
}
