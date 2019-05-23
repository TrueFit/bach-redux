# @truefit/bach-redux

## Enhancers

### withAction

### withActions

argument around why we are keeping this

### withDispatch

### withSelector

adds back in props

_Helper Signature_

| Parameter    | Type             | Description                                                                                     |
| ------------ | ---------------- | ----------------------------------------------------------------------------------------------- |
| selectorName | string           | the name of the value in the props passed to the wrapped component                              |
| fn           | js function      | the function that returns the desired value from the store                                      |
| conditions   | array of strings | names of the properties on the props object react should restrict the firing of the function to |

_Example_

```
import React from 'react';
import {compose} from '@truefit/bach';
import {withSelector} from '@truefit/bach-redux';

const WithSelector = ({todos}) => (
  <div>
    <h1>withSelector</h1>
    <ul>
      {todos.map(todo => (
        <li key={todo}>{todo}</li>
      ))}
    </ul>
  </div>
);

export default compose(
  withSelector('todos', (state, props) => state.features.bachRedux.todo),
)(WithSelector);
```

_React Hook_

[useState](https://reactjs.org/docs/hooks-reference.html#usestate)

### withStore

## Warnings

https://react-redux.js.org/next/api/hooks
