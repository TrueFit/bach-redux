import {useDispatch} from 'react-redux';
import {DISPATCH} from '../util/constants';

export default () => () => {
  return {
    dependencies: {
      useDispatch,
    },
    initialize: `const ${DISPATCH} = useDispatch();`,
    props: [DISPATCH],
  };
};
