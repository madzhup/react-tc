'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.setup = setup;
exports.tc = tc;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function convertObject(object) {

  if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object') {
    return JSON.stringify(object);
  }

  return object;
}

function setup(Component, props) {

  var renderer = _reactAddonsTestUtils2.default.createRenderer();

  renderer.render(_react2.default.createElement(
    Component,
    props,
    props.children
  ));

  var output = renderer.getRenderOutput();

  return {
    output: output,
    props: props
  };
}

// const defaultTags = ['a', 'address', 'abbr', 'acronym', 'article', 'aside', 'b', 'big', 'blockquote', 'br', 'button', 'caption', 'cite', 'code', 'col', 'del', 'dd', 'details', 'div', 'dl', 'dt', 'em', 'fieldset', 'figure', 'figcaption', 'font', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hgroup', 'hr', 'i', 'img', 'ins', 'kbd', 'label', 'legend', 'li', 'menu', 'nav', 'p', 'pre', 'q', 's', 'span', 'section', 'strike', 'strong', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'title', 'tr', 'tt', 'u', 'ul', 'ol', 'var'];

function tc(element, type) {
  var props = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
  var childsLength = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
  // test component

  try {
    (0, _expect2.default)(element.type).toBe(type);
  } catch (e) {
    throw new Error('Type ' + convertObject(element.type) + ' not equal with ' + convertObject(type));
  }

  for (var key in props) {
    if (props.hasOwnProperty(key)) {

      if (props[key] === 'test_off') {
        // if propery have some trobule like a react component
        continue;
      }

      try {
        (0, _expect2.default)(element.props[key]).toBe(props[key]);
      } catch (_) {
        try {
          (0, _expect2.default)(element.props[key]).toEqual(props[key]);
        } catch (e) {
          throw new Error('Property ' + key + ' not equal Expected: ' + convertObject(element.props[key]) + ' To be: ' + convertObject(props[key]));
        }
      }
    }
  }

  if (childsLength !== null) {

    var length = 1;

    if (!element.props.children || element.props.children.length === 0) {
      length = 0;
    } else if (element.props.children instanceof Array) {
      length = element.props.children.length;
    }

    if (length !== childsLength) {
      throw new Error('Children length not correct: Expected - ' + length + ' not equal with ' + childsLength);
    }
  }

  if (typeof type === 'string') {

    var elementPropsKeys = Object.keys(_extends({}, element.props, { children: undefined }));
    var propsKeys = Object.keys(_extends({}, props, { children: undefined }));

    if (elementPropsKeys.length !== propsKeys.length) {
      throw new Error('Property count not correct: Expected - ' + elementPropsKeys.length + ' | ' + convertObject(elementPropsKeys) + ' not equal with ' + propsKeys.length + ' | ' + convertObject(propsKeys) + ' (with children property by default)');
    }
  }
}