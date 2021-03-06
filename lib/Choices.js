'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _shallowEqual = require('fbjs/lib/shallowEqual');

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Choices = function (_React$Component) {
  _inherits(Choices, _React$Component);

  function Choices() {
    var _ref;

    _classCallCheck(this, Choices);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = Choices.__proto__ || Object.getPrototypeOf(Choices)).call.apply(_ref, [this].concat(_toConsumableArray(args))));

    var self = _this; // https://github.com/facebook/flow/issues/1517
    self._handleKeyDown = _this._handleKeyDown.bind(_this);
    self._handleKeyPress = _this._handleKeyPress.bind(_this);
    self._handleClose = _this._handleClose.bind(_this);
    self._handleClick = _this._handleClick.bind(_this);
    self._focusInput = _this._focusInput.bind(_this);
    return _this;
  }

  _createClass(Choices, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return !(0, _shallowEqual2['default'])(this.props, nextProps);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          autoHeight = _props.autoHeight,
          disabled = _props.disabled,
          focused = _props.focused,
          inputValue = _props.inputValue,
          items = _props.items,
          renderItem = _props.renderItem,
          children = _props.children;

      var hasItems = items.length > 0;
      var inputStyle = void 0;
      if (hasItems) {
        // guesstimate input width since inline-block container
        // won't allow it to expand automatically
        inputStyle = { width: (inputValue.length + 1) * 0.75 + 'em' };
      }
      return _react2['default'].createElement(
        'ul',
        { className: (0, _classnames2['default'])('form-control', 'autosuggest-choices', {
            focused: focused,
            'has-items': hasItems,
            'auto-height': autoHeight
          }),
          disabled: disabled,
          onClick: this._focusInput },
        items.map(function (item, index) {
          return _react2['default'].createElement(
            'li',
            { key: index, 'data-index': index,
              tabIndex: !disabled ? '-1' : undefined,
              className: 'autosuggest-choice',
              onKeyDown: _this2._handleKeyDown,
              onKeyPress: _this2._handleKeyPress },
            _react2['default'].createElement('span', { className: 'autosuggest-choice-close',
              onClick: _this2._handleClose }),
            _react2['default'].createElement(
              'span',
              { className: 'autosuggest-choice-label',
                onClick: _this2._handleClick },
              renderItem(item)
            )
          );
        }),
        _react2['default'].createElement(
          'li',
          { className: 'autosuggest-input-choice', style: inputStyle },
          children
        )
      );
    }

    // autobind

  }, {
    key: '_handleKeyDown',
    value: function _handleKeyDown(event) {
      switch (event.keyCode) {
        case _keycode2['default'].codes.left:
          this._focusPrevious();
          event.preventDefault();
          break;
        case _keycode2['default'].codes.right:
          this._focusNext();
          event.preventDefault();
          break;
        case _keycode2['default'].codes.backspace:
          this._removeActive(-1);
          event.preventDefault();
          break;
        case _keycode2['default'].codes['delete']:
          this._removeActive(0);
          event.preventDefault();
          break;
      }
    }

    // autobind

  }, {
    key: '_handleKeyPress',
    value: function _handleKeyPress(event) {
      // Chrome and Safari lets the input accept the key, Firefox does not
      this._focusInput();

      var onKeyPress = this.props.onKeyPress;
      // istanbul ignore else

      if (onKeyPress) {
        onKeyPress(event);
      }
    }

    // autobind

  }, {
    key: '_handleClose',
    value: function _handleClose(event) {
      if (!this.props.disabled && event.target instanceof HTMLElement) {
        var choices = event.target.parentNode;
        // istanbul ignore else
        if (choices instanceof Element) {
          var _index = Number(choices.getAttribute('data-index'));
          this._remove(_index);
        }
      }
      event.stopPropagation();
    }

    // autobind

  }, {
    key: '_handleClick',
    value: function _handleClick(event) {
      event.stopPropagation();
    }
  }, {
    key: 'focusFirst',
    value: function focusFirst() {
      var items = this._getFocusableMenuItems(false);
      if (items.length > 0) {
        items[0].focus();
      }
    }
  }, {
    key: 'focusLast',
    value: function focusLast() {
      var items = this._getFocusableMenuItems(false);
      if (items.length > 0) {
        items[items.length - 1].focus();
      }
    }
  }, {
    key: '_focusPrevious',
    value: function _focusPrevious() {
      var _getItemsAndActiveInd = this._getItemsAndActiveIndex(true),
          items = _getItemsAndActiveInd.items,
          activeIndex = _getItemsAndActiveInd.activeIndex;

      if (activeIndex > 0) {
        items[activeIndex - 1].focus();
      } else {
        items[items.length - 1].focus();
      }
    }
  }, {
    key: '_focusNext',
    value: function _focusNext() {
      var _getItemsAndActiveInd2 = this._getItemsAndActiveIndex(true),
          items = _getItemsAndActiveInd2.items,
          activeIndex = _getItemsAndActiveInd2.activeIndex;
      // istanbul ignore else: currently input handles wrap-around


      if (activeIndex < items.length - 1) {
        items[activeIndex + 1].focus();
      } else if (items.length > 0) {
        items[0].focus();
      }
    }

    // autobind

  }, {
    key: '_focusInput',
    value: function _focusInput() {
      var node = _reactDom2['default'].findDOMNode(this);
      // istanbul ignore else
      if (node) {
        var input = node.querySelector('input');
        // istanbul ignore else
        if (input) {
          input.focus();
        }
      }
    }
  }, {
    key: '_remove',
    value: function _remove(index) {
      var onRemove = this.props.onRemove;
      // istanbul ignore else

      if (onRemove) {
        onRemove(index);
      }
    }
  }, {
    key: '_removeActive',
    value: function _removeActive(focusAdjust) {
      var _getItemsAndActiveInd3 = this._getItemsAndActiveIndex(false),
          items = _getItemsAndActiveInd3.items,
          activeIndex = _getItemsAndActiveInd3.activeIndex;
      // istanbul ignore else


      if (activeIndex >= 0) {
        var nextIndex = activeIndex + focusAdjust;
        if (nextIndex < 0 || nextIndex >= items.length - 1) {
          this._focusInput();
        } else if (focusAdjust != 0) {
          items[nextIndex].focus();
        }
        this._remove(activeIndex);
      }
    }
  }, {
    key: '_getItemsAndActiveIndex',
    value: function _getItemsAndActiveIndex(includeInput) {
      var items = this._getFocusableMenuItems(includeInput);
      var activeElement = document.activeElement;
      var activeIndex = items.indexOf(activeElement);
      return { items: items, activeIndex: activeIndex };
    }
  }, {
    key: '_getFocusableMenuItems',
    value: function _getFocusableMenuItems(includeInput) {
      var node = _reactDom2['default'].findDOMNode(this);
      // istanbul ignore if
      if (!node) {
        return [];
      }
      return Array.from(node.querySelectorAll(includeInput ? '[tabIndex="-1"],input' : '[tabIndex="-1"]'));
    }
  }]);

  return Choices;
}(_react2['default'].Component);

Choices.propTypes = {
  autoHeight: _react2['default'].PropTypes.bool,
  disabled: _react2['default'].PropTypes.bool,
  focused: _react2['default'].PropTypes.bool,
  inputValue: _react2['default'].PropTypes.string,
  items: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.any).isRequired,
  onKeyPress: _react2['default'].PropTypes.func,
  onRemove: _react2['default'].PropTypes.func,
  renderItem: _react2['default'].PropTypes.func.isRequired
};
exports['default'] = Choices;