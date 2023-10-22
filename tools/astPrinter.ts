import { Binary, Grouping, NumberLiteral, Unary, Visitor, Expr } from "../expr";
import { Token, TokenType } from "../token";

class AstPrinter implements Visitor<string> {
  visitBinaryExpr(expr: Binary): string {
    return `${expr.left.accept(this)} ${expr.operator.toString()} ${expr.right.accept(this)}`;
  }
  visitGroupingExpr(expr: Grouping): string {
    return `(${expr.expression.accept(this)})`;
  }
  visitNumberLiteralExpr(expr: NumberLiteral): string {
    return expr.value.toString();
  }
  visitUnaryExpr(expr: Unary): string {
    return `${expr.operator.toString()}${expr.right.accept(this)}`;
  }

  print(expression: Expr) {
    return expression.accept(this);
  }
}

class AstRPNPrinter implements Visitor<string> {
  visitBinaryExpr(expr: Binary): string {
    return `${expr.left.accept(this)} ${expr.right.accept(this)} ${expr.operator.toString()}`;
  }
  visitGroupingExpr(expr: Grouping): string {
    return expr.expression.accept(this);
  }
  visitNumberLiteralExpr(expr: NumberLiteral): string {
    return expr.value.toString();
  }
  // Unary operators are problematic here
  visitUnaryExpr(expr: Unary): string {
    return `${expr.right.accept(this)} ${expr.operator.toString()}`;
  }

  print(expression: Expr) {
    return expression.accept(this);
  }
}

const expression = new Binary(
  new Grouping(
    new Binary(new NumberLiteral(1), new Token(TokenType.PLUS, "+"), new NumberLiteral(2))
  ),
  new Token(TokenType.MUL, "*"),
  new Grouping(
    new Binary(new NumberLiteral(4), new Token(TokenType.MINUS, "-"), new NumberLiteral(3))
  )
);

const astPrinter = new AstPrinter();
const astRPNPrinter = new AstRPNPrinter();

console.log(`Infix notation: ${astPrinter.print(expression)}`);
console.log(`Postfix notation: ${astRPNPrinter.print(expression)}`);
