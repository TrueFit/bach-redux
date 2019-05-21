import {useStore} from 'react-redux';
import {STORE} from '../util/constants';

export default () => () => {
  return {
    dependencies: {
      useStore,
    },
    initialize: `const ${STORE} = useStore();`,
    props: [STORE],
  };
};
