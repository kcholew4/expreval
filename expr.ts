import { Token } from "./token";

export interface Visitor<T> {
  visitBinaryExpr(expr: Binary): T;
  visitGroupingExpr(expr: Grouping): T;
  visitNumberLiteralExpr(expr: NumberLiteral): T;
  visitUnaryExpr(expr: Unary): T;
}

export abstract class Expr {
  abstract accept<T>(visitor: Visitor<T>): T;
}

export class Binary extends Expr {
  readonly left: Expr;
  readonly operator: Token;
  readonly right: Expr;

  constructor(left: Expr, operator: Token, right: Expr) {
    super();
    this.left = left;
    this.operator = operator;
    this.right = right;
  }

  accept<T>(visitor: Visitor<T>) {
    return visitor.visitBinaryExpr(this);
  }
}

export class Grouping extends Expr {
  readonly expression: Expr;

  constructor(expression: Expr) {
    super();
    this.expression = expression;
  }

  accept<T>(visitor: Visitor<T>) {
    return visitor.visitGroupingExpr(this);
  }
}

export class NumberLiteral extends Expr {
  readonly value: number;

  constructor(value: number) {
    super();
    this.value = value;
  }

  accept<T>(visitor: Visitor<T>) {
    return visitor.visitNumberLiteralExpr(this);
  }
}

export class Unary extends Expr {
  readonly operator: Token;
  readonly right: Expr;

  constructor(operator: Token, right: Expr) {
    super();
    this.operator = operator;
    this.right = right;
  }

  accept<T>(visitor: Visitor<T>) {
    return visitor.visitUnaryExpr(this);
  }
}
