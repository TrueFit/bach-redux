import {useCallback} from 'react';
import {
  PROPS,
  EnhancerContext,
  EnhancerResult,
  DependencyList,
  generateConditionCode,
} from '@truefit/bach';
import {useSelector, shallowEqual} from 'react-redux';

export default <T, K>(
  selectorName: keyof T,
  fn: (...args: never) => K,
  conditions?: DependencyList<T>,
) => ({generateNewVariable}: EnhancerContext): EnhancerResult => {
  const fnName = generateNewVariable();

  const equality = `equality_${generateNewVariable()}`;
  const conditionCode = generateConditionCode(conditions);

  return {
    dependencies: {
      useCallback,
      useSelector,
      shallowEqual,
      [fnName]: fn,
    },
    initialize: `
      const ${equality} = useCallback(shallowEqual, [${conditionCode}]);
      const ${selectorName} = useSelector(
        function (state) {
          return ${fnName}(state, ${PROPS});
        }, ${equality}
      );
    `,
    props: [selectorName as string],
  };
};
