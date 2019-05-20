import {generateConditionCode} from '@truefit/bach';
import {useActions} from '../hooks';
import {USE_ACTIONS} from '../util/constants';

export default (actions, conditions) => ({generateNewVariable}) => {
  const actionKeys = Object.keys(actions);
  const actionRef = generateNewVariable();

  const actionVars = actionKeys.join(',');
  const conditionCode = generateConditionCode(conditions);

  return {
    dependencies: {
      [USE_ACTIONS]: useActions,
      [actionRef]: actions,
    },
    initialize: `const ${actionVars} = ${USE_ACTIONS}(${actionRef}, ${conditionCode});`,
    props: actionKeys,
  };
};
