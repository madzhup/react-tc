##This modules have 2 export functions:
- setup - setup react component for testing
- tc(test component) - test component by type & props & children length

```js
import { setup, tc } from 'react-tc';
import React, { Component, PropTypes } from 'react';
import expect from 'expect';
import styles from './styles'; // scss file (if you use css modules)

/**
 * Simple component
 */
class YouComponent extends Component {

  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    callback: PropTypes.func.isRequired
  };

  render() {
    
    const { callback, items } = this.props;
  
    return (
      <div className={styles.general} onClick={callback}>
        {
          items.map((item) => {
            return (
              <h1 key={item.id} className={styles.item}>{item.name}</h1>
            );
          })
        }
      </div>
    );

  }

}

// %%%%%%%% TEST %%%%%%%%%%

/**
 * @return 
 *  {object} output - shallow render element
 *  {object} props - you passed props
 *  {object} context - you passed context
 */
const { output, props, context } = setup(YouComponent, {
  items: [{
    id: 1,
    name: 'one'
  }, {
    id: 2,
    name: 'two'
  }],
  callback: expect.createSpy()
});

/**
 * test first layer of output by their props and child length
 * if you child undefined, null, empty array [] - this is equal with 0 or miss 4 parameter tc function
 */
tc(output, 'div', {
  className: styles.general,
  onClick: props.callback
}, 2);

expect(props.callback.calls.length).toBe(0);
output.props.onClick();
expect(props.callback.calls.length).toBe(1);

const [item1, item2] = output.props.children;

tc(item1, 'h1', {
  children: props.items[0].name,
  className: styles.item
}, 1);

tc(item2, 'h1', {
  children: props.items[1].name,
  className: styles.item
}, 1);
