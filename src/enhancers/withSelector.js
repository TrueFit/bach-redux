import {PROPS, generateConditionCode} from '@truefit/bach';
import ReactRedux from 'react-redux';
import {REACT_REDUX} from '../util/constants';

export default (selectorName, fn, conditions) => ({generateNewVariable}) => {
  const fnName = generateNewVariable();
  const conditionCode = generateConditionCode(conditions);

  return {
    dependencies: {
      [ReactRedux]: ReactRedux,
      [fnName]: fn,
    },
    initialize: `const ${selectorName} = ${REACT_REDUX}.useSelector(
      function (state) {
        return ${fnName}(state, ${PROPS});
      }, [${conditionCode}]);
    `,
    props: [selectorName],
  };
};
