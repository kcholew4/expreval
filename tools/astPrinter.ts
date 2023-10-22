import { Binary, Grouping, NumberLiteral, Unary, Visitor, Expr } from "../expr";

export class AstPrinter implements Visitor<string> {
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

export class AstRPNPrinter implements Visitor<string> {
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
