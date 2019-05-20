import ReactRedux from 'react-redux';
import {REACT_REDUX, STORE} from '../util/constants';

export default () => () => {
  return {
    dependencies: {
      [REACT_REDUX]: ReactRedux,
    },
    initialize: `const ${STORE} = ${REACT_REDUX}.useStore();`,
    props: [STORE],
  };
};
