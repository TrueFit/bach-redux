import {generateConditionCode, generateAssignments} from '@truefit/bach';
import {useActions} from '../hooks';
import {USE_ACTIONS} from '../util/constants';

export default (actions, conditions) => ({generateNewVariable}) => {
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
