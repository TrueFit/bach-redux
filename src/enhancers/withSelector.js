import {PROPS, generateConditionCode} from '@truefit/bach';
import {useSelector} from 'react-redux';

export default (selectorName, fn, conditions) => ({generateNewVariable}) => {
  const fnName = generateNewVariable();
  const conditionCode = generateConditionCode(conditions);

  return {
    dependencies: {
      useSelector,
      [fnName]: fn,
    },
    initialize: `
      const ${selectorName} = useSelector(
        function (state) {
          return ${fnName}(state, ${PROPS});
        }, [${conditionCode}]
      );
    `,
    props: [selectorName],
  };
};
