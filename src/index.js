import React, { Component } from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';

/**
 * Context provider
 */
class Context extends Component {

  getChildContext() {
    return this.props.context;
  }

  render() {
    return this.props.children;
  }

}

/**
 * setup virtual component
 * @return { output, props, context }
 */
export function setup(Component, props, context) {

  const renderer = TestUtils.createRenderer();

  renderer.render(
    <Context context={context}>
      <Component {...props} />
    </Context>
  );

  const output = renderer.getRenderOutput().props.children;

  return {
    output,
    props,
    context
  };

}

function convertObject(object) {

  if (typeof object === 'object') {
    return JSON.stringify(object);
  }

  return object;

}

// const defaultTags = ['a', 'address', 'abbr', 'acronym', 'article', 'aside', 'b', 'big', 'blockquote', 'br', 'button', 'caption', 'cite', 'code', 'col', 'del', 'dd', 'details', 'div', 'dl', 'dt', 'em', 'fieldset', 'figure', 'figcaption', 'font', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hgroup', 'hr', 'i', 'img', 'ins', 'kbd', 'label', 'legend', 'li', 'menu', 'nav', 'p', 'pre', 'q', 's', 'span', 'section', 'strike', 'strong', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'title', 'tr', 'tt', 'u', 'ul', 'ol', 'var'];

export function tc(element, type, props = {}, childsLength = 0) { // test component

  try {
    expect(element.type).toBe(type);
  } catch (e) {
    throw new Error(`Type ${convertObject(element.type)} not equal with ${convertObject(type)}`);
  }

  for (const key in props) {
    if (props.hasOwnProperty(key)) {

      if (props[key] === 'test_off') { // if propery have some trobule like a react component
        continue;
      }

      try {
        expect(element.props[key]).toBe(props[key]);
      } catch (_) {
        try {
          expect(element.props[key]).toEqual(props[key]);
        } catch (e) {
          throw new Error(`Property ${key} not equal Expected: ${convertObject(element.props[key])} To be: ${convertObject(props[key])}`);
        }
      }

    }
  }

  if (childsLength !== null) {

    let length = 1;

    if (!element.props.children || element.props.children.length === 0) {
      length = 0;
    } else if (element.props.children instanceof Array) {
      length = element.props.children.length;
    }

    if (length !== childsLength) {
      throw new Error(`Children length not correct: Expected - ${length} not equal with ${childsLength}`);
    }

  }

  if (typeof type === 'string') {

    const elementPropsKeys = Object.keys({ ...element.props, children: undefined });
    const propsKeys = Object.keys({ ...props, children: undefined });

    if (elementPropsKeys.length !== propsKeys.length) {
      throw new Error(`Property count not correct: Expected - ${elementPropsKeys.length} | ${convertObject(elementPropsKeys)} not equal with ${propsKeys.length} | ${convertObject(propsKeys)} (with children property by default)`);
    }

  }

}
