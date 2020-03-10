import {ActionCreator} from 'redux';
import {DependencyList, EnhancerContext, EnhancerResult} from '@truefit/bach';
import withActions from './withActions';

export default <T>(
  actionName: keyof T,
  fn: ActionCreator<unknown>,
  conditions?: DependencyList<T>,
): ((c: EnhancerContext) => EnhancerResult) => withActions({[actionName]: fn}, conditions);
