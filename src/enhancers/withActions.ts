import {
  generateConditionCode,
  generateAssignments,
  DependencyList,
  EnhancerContext,
  EnhancerResult,
} from '@truefit/bach';
import {ActionCreatorsMapObject} from 'redux';
import {useActions} from '../hooks';
import {USE_ACTIONS} from '../constants';

export default <T>(actions: ActionCreatorsMapObject, conditions?: DependencyList<T>) => ({
  generateNewVariable,
}: EnhancerContext): EnhancerResult => {
  const actionKeys = Object.keys(actions);
  const actionRef = generateNewVariable();
  const valueRef = generateNewVariable();

  const conditionCode = generateConditionCode(conditions);
  const assignments = generateAssignments(actionKeys, valueRef);

  return {
    dependencies: {
      [USE_ACTIONS]: useActions,
      [actionRef]: actions,
    },
    initialize: `
      const ${valueRef} = ${USE_ACTIONS}(${actionRef}, ${conditionCode});
      ${assignments}
    `,
    props: actionKeys,
  };
};
