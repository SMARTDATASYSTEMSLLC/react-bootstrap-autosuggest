'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _shallowEqual = require('fbjs/lib/shallowEqual');

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Suggestions = function (_React$Component) {
  _inherits(Suggestions, _React$Component);

  function Suggestions() {
    _classCallCheck(this, Suggestions);

    return _possibleConstructorReturn(this, (Suggestions.__proto__ || Object.getPrototypeOf(Suggestions)).apply(this, arguments));
  }

  _createClass(Suggestions, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return !(0, _shallowEqual2['default'])(this.props, nextProps);
    }
  }, {
    key: 'isFocused',
    value: function isFocused() {
      var menuNode = _reactDom2['default'].findDOMNode(this.refs.menu);
      return menuNode && document && menuNode.contains(document.activeElement);
    }
  }, {
    key: 'focusFirst',
    value: function focusFirst() {
      var menu = this.refs.menu;

      menu.focusNext();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          items = _props.items,
          datalistMessage = _props.datalistMessage,
          onDatalistMessageSelect = _props.onDatalistMessageSelect;

      return _react2['default'].createElement(
        _reactBootstrap.Dropdown.Menu,
        {
          labelledBy: this.props.labelledBy,
          onClose: this.props.onClose,
          open: this.props.open,
          ref: 'menu' },
        items.map(this._renderItem, this),
        this.props.filtered && _react2['default'].createElement(
          _reactBootstrap.MenuItem,
          { key: 'show-all', onSelect: this.props.onDisableFilter },
          _react2['default'].createElement(
            'span',
            { className: 'show-all' },
            items.length === 0 ? _react2['default'].createElement('span', { className: 'no-matches' }) : null
          )
        ),
        datalistMessage && _react2['default'].createElement(
          _reactBootstrap.MenuItem,
          { key: 'datalist-message',
            disabled: onDatalistMessageSelect == null,
            onSelect: onDatalistMessageSelect },
          datalistMessage
        )
      );
    }
  }, {
    key: '_renderItem',
    value: function _renderItem(item, index) {
      var active = this.props.isSelectedItem(item);
      return _react2['default'].createElement(
        _reactBootstrap.MenuItem,
        {
          active: active,
          className: index === this.props.focusedIndex && !active ? 'pseudofocused' : undefined,
          eventKey: item,
          key: this.props.getItemKey(item),
          onSelect: this.props.onSelect },
        this.props.renderItem(item)
      );
    }
  }]);

  return Suggestions;
}(_react2['default'].Component);

Suggestions.propTypes = {
  datalistMessage: _react2['default'].PropTypes.node,
  filtered: _react2['default'].PropTypes.bool,
  focusedIndex: _react2['default'].PropTypes.number,
  getItemKey: _react2['default'].PropTypes.func.isRequired,
  isSelectedItem: _react2['default'].PropTypes.func.isRequired,
  items: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.any).isRequired,
  labelledBy: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number]),
  onClose: _react2['default'].PropTypes.func,
  onDatalistMessageSelect: _react2['default'].PropTypes.func,
  onDisableFilter: _react2['default'].PropTypes.func,
  onSelect: _react2['default'].PropTypes.func.isRequired,
  open: _react2['default'].PropTypes.bool,
  renderItem: _react2['default'].PropTypes.func.isRequired
};
exports['default'] = Suggestions;