import withActions from './withActions';

export default (actionName, fn, conditions) =>
  withActions({[actionName]: fn}, conditions);
