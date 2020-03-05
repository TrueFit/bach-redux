import {useDispatch} from 'react-redux';
import {EnhancerResult} from '@truefit/bach';
import {DISPATCH} from '../constants';

export default () => (): EnhancerResult => {
  return {
    dependencies: {
      useDispatch,
    },
    initialize: `const ${DISPATCH} = useDispatch();`,
    props: [DISPATCH],
  };
};
