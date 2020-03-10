// from: https://react-redux.js.org/next/api/hooks

import {bindActionCreators, ActionCreatorsMapObject} from 'redux';
import {useDispatch} from 'react-redux';
import {useMemo} from 'react';

export default (actions: ActionCreatorsMapObject): ActionCreatorsMapObject => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return bindActionCreators(actions, dispatch);
  }, [actions, dispatch]);
};
