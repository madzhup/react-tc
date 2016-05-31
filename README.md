##This modules have 2 functions:
- setup - to setup react component test
- tc(test component) - to test component by type & props & children length

```js
const anyProps = {
  some: 'some'
};

import { setup, tc } from 'react-tc';

  const { output, props } = setup(Timeslot, { ...anyProps });

  tc(output, 'div', { // output - our component, 'div' - typeof component
    style: 'someClassName' // style - props of component
  }, 1); // 1 - length of component children (if u set this arg in undefined - by default children expect - 0
  
```
