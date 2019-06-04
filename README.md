# @truefit/bach-redux

This library brings redux connectivity to components composed with [@truefit/bach](https://github.com/truefit/bach) allowing you to add actions and selectors directly in your enhancer chain, rather than needing an extra HOC for connect.

_This library is based on the react-redux hooks found in the current rc release, so you will need to be using that version as well (https://react-redux.js.org/next/api/hooks)_

## Enhancers

### withAction

Allows you to specify a single action creator to be connected to the store. _See withActions for more discussion_

_Helper Signature_

| Parameter  | Type             | Description                                                                                       |
| ---------- | ---------------- | ------------------------------------------------------------------------------------------------- |
| actionName | string           | the name for the action creator in the props passed to the wrapped component                      |
| fn         | js function      | the function that is executed when the action creator is invoked                                  |
| conditions | array of strings | names of the properties on the props object react should restrict the creation of the function to |

_Example_

```
import React from 'react';
import {compose} from '@truefit/bach';
import {withAction} from '@truefit/bach-redux';

const ADD_TODO = 'ADD_TODO';
const addToDo = note => ({
  type: ADD_TODO,
  payload: note,
});

const WithAction = ({addToDo}) => (
  <div>
    <h1>withAction</h1>
    <button
      onClick={() => {
        addToDo('New ToDo from withAction');
      }}
    >
      Click Me
    </button>
  </div>
);

export default compose(withAction('addToDo', addToDo))(WithAction);
```

### withActions

Allows you to specify a map of action creators to be connected to the store.

_Side Note_
This functionality was removed from the react-redux standard hooks (https://react-redux.js.org/next/api/hooks#removed-useactions). That said, we don't agree with the reasoning. Although using dispatch directly in your components does match standard hooks more closely, that doesn't mean that it is better code. In our opinion, it leads to less readable code - thus we have included these enhancers in this library.

_Helper Signature_

| Parameter  | Type             | Description                                                                                                                        |
| ---------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| actions    | js object        | a js object that contains a map of keys and action creator functions. Each key will be a property passed to the wrapped component. |
| conditions | array of strings | names of the properties on the props object react should restrict the creation of the functions to                                 |

_Example_

```
import React from 'react';
import {compose} from '@truefit/bach';
import {withActions} from '@truefit/bach-redux';

const ADD_TODO = 'ADD_TODO';

const addToDo1 = note => ({
  type: ADD_TODO,
  payload: note,
});

const addToDo2 = note => ({
  type: ADD_TODO,
  payload: `Too: ${note}`,
});

const WithActions = ({addToDo}) => (
  <div>
    <h1>withActions</h1>
    <button
      onClick={() => {
        addToDo1('New ToDo 1 from withActions');
      }}
    >
      Click Me
    </button>
    <button
      onClick={() => {
        addToDo2('New ToDo 2 from withActions');
      }}
    >
      Click Me
    </button>
  </div>
);

export default compose(withActions({addToDo1, addToDo2}))(WithActions);
```

### withDispatch

Returns a reference to the dispatch function from the Redux store. You may use it to dispatch actions as needed.

_Helper Signature_

There are no parameters for this enhancer.

_Example_

```
import React from 'react';
import {compose} from '@truefit/bach';
import {withStore} from '@truefit/bach-redux';

const WithStore = ({store}) => (
  <div>
    <h1>withStore</h1>
    <ul>
      {store.getState().features.bachRedux.todo.map(todo => (
        <li key={todo}>{todo}</li>
      ))}
    </ul>
  </div>
);

export default compose(withStore())(WithStore);
```

_React-Redux Hook_

[useDispatch](https://react-redux.js.org/next/api/hooks#usedispatch)

### withSelector

Allows you to extract data from the Redux store state, using a selector function.

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

_React-Redux Hook_

[useSelector](https://react-redux.js.org/next/api/hooks#useselector)

### withStore

Returns a reference to the same Redux store that was passed in to the <Provider> component. This enhancer should probably not be used frequently. Prefer withSelector() as your primary choice.

_Helper Signature_

There are no parameters for this enhancer.

_Example_

```
import React from 'react';
import {compose} from '@truefit/bach';
import {withStore} from '@truefit/bach-redux';

const WithStore = ({store}) => (
  <div>
    <h1>withStore</h1>
    <ul>
      {store.getState().features.bachRedux.todo.map(todo => (
        <li key={todo}>{todo}</li>
      ))}
    </ul>
  </div>
);

export default compose(
  withStore(),
)(WithStore);
```

_React-Redux Hook_

[useStore](https://react-redux.js.org/next/api/hooks#usestore)
