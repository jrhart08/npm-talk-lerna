"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.IdentityRenderer = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _constant = _interopRequireDefault(require("lodash/constant"));

var _noop = _interopRequireDefault(require("lodash/noop"));

var _identity = _interopRequireDefault(require("lodash/identity"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var IdentityRenderer = function IdentityRenderer(_ref) {
  var value = _ref.value;
  return value;
};
/**
 * Provides standard Select functionality, since dropdowns/tiles/choiceboxes
 * all have the same Select behavior.
 */


exports.IdentityRenderer = IdentityRenderer;

var _default = function _default(Component) {
  var Select = function Select(props) {
    var handleChange = (0, _react.useCallback)(function (option) {
      if (props.disabled || props.disableBy(option)) {
        return;
      } // only trigger if value changes


      if (option !== props.value) {
        props.onChange(option);
      } else if (props.nullable) {
        props.onChange(undefined);
      }
    });
    return _react["default"].createElement(Component, _extends({}, props, {
      onChange: handleChange
    }));
  };

  Select.propTypes = {
    /** select options (not configurator options) */
    options: _propTypes["default"].array.isRequired,
    value: _propTypes["default"].any,
    // eslint-disable-line react/forbid-prop-types
    onChange: _propTypes["default"].func,

    /** option-level */
    // optionRenderer: PropTypes.func,
    keyBy: _propTypes["default"].func,
    disableBy: _propTypes["default"].func,

    /** component-level */
    disabled: _propTypes["default"].bool,
    nullable: _propTypes["default"].bool
  };
  Select.defaultProps = {
    value: undefined,
    onChange: _noop["default"],
    // optionRenderer: IdentityRenderer,
    keyBy: _identity["default"],
    disableBy: (0, _constant["default"])(false),
    disabled: false,
    nullable: false
  };
  return Select;
};

exports["default"] = _default;
//# sourceMappingURL=withSelect.js.map