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
    return `${expr.operator.toString()} ${expr.right.accept(this)}}`;
  }

  print(expression: Expr) {
    return expression.accept(this);
  }
}

const expression = new Binary(
  new Grouping(
    new Binary(new NumberLiteral(2), new Token(TokenType.PLUS, "+"), new NumberLiteral(3))
  ),
  new Token(TokenType.MUL, "*"),
  new NumberLiteral(2)
);

const astPrinter = new AstPrinter();

console.log(astPrinter.print(expression));
