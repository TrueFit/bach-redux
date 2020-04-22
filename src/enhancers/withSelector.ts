import {
  PROPS,
  generateConditionCode,
  EnhancerContext,
  EnhancerResult,
  DependencyList,
} from '@truefit/bach';
import {useSelector} from 'react-redux';

export default <T, K>(
  selectorName: keyof T,
  fn: (...args: never) => K,
  conditions?: DependencyList<T>,
) => ({generateNewVariable}: EnhancerContext): EnhancerResult => {
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
    props: [selectorName as string],
  };
};
