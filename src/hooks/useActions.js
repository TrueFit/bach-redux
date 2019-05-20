// from: https://react-redux.js.org/next/api/hooks

import {bindActionCreators} from 'redux';
import {useDispatch} from 'react-redux';
import {useMemo} from 'react';

export default actions => {
  const dispatch = useDispatch();

  return useMemo(() => {
    if (Array.isArray(actions)) {
      return actions.map(a => bindActionCreators(a, dispatch));
    }

    return bindActionCreators(actions, dispatch);
  }, [actions, dispatch]);
};
