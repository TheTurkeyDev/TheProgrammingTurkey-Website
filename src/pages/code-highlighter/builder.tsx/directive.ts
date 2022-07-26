import { DirectiveType } from './directives-type';

export type Directive = {
  readonly type: DirectiveType,
  readonly duration: number,
  readonly startFrame: number
}