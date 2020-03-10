import {useStore} from 'react-redux';
import {EnhancerResult} from '@truefit/bach';
import {STORE} from '../constants';

export default () => (): EnhancerResult => {
  return {
    dependencies: {
      useStore,
    },
    initialize: `const ${STORE} = useStore();`,
    props: [STORE],
  };
};
