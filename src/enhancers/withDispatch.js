import ReactRedux from 'react-redux';
import {REACT_REDUX, DISPATCH} from '../util/constants';

export default () => () => {
  return {
    dependencies: {
      [REACT_REDUX]: ReactRedux,
    },
    initialize: `const ${DISPATCH} = ${REACT_REDUX}.useDispatch();`,
    props: [DISPATCH],
  };
};
