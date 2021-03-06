'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ObjectListAdapter = exports.MapListAdapter = exports.ArrayListAdapter = exports.EmptyListAdapter = exports.ListAdapter = exports.ItemAdapter = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _shallowEqual = require('fbjs/lib/shallowEqual');

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _Choices = require('./Choices');

var _Choices2 = _interopRequireDefault(_Choices);

var _Suggestions = require('./Suggestions');

var _Suggestions2 = _interopRequireDefault(_Suggestions);

var _ItemAdapter = require('./ItemAdapter');

var _ItemAdapter2 = _interopRequireDefault(_ItemAdapter);

var _ListAdapter = require('./ListAdapter');

var _ListAdapter2 = _interopRequireDefault(_ListAdapter);

var _EmptyListAdapter = require('./EmptyListAdapter');

var _EmptyListAdapter2 = _interopRequireDefault(_EmptyListAdapter);

var _ArrayListAdapter = require('./ArrayListAdapter');

var _ArrayListAdapter2 = _interopRequireDefault(_ArrayListAdapter);

var _MapListAdapter = require('./MapListAdapter');

var _MapListAdapter2 = _interopRequireDefault(_MapListAdapter);

var _ObjectListAdapter = require('./ObjectListAdapter');

var _ObjectListAdapter2 = _interopRequireDefault(_ObjectListAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.ItemAdapter = _ItemAdapter2['default'];
exports.ListAdapter = _ListAdapter2['default'];
exports.EmptyListAdapter = _EmptyListAdapter2['default'];
exports.ArrayListAdapter = _ArrayListAdapter2['default'];
exports.MapListAdapter = _MapListAdapter2['default'];
exports.ObjectListAdapter = _ObjectListAdapter2['default'];

/**
 * Combo-box input component that combines a drop-down list and a single-line
 * editable text box. The set of options for the drop-down list can be
 * controlled dynamically. Selection of multiple items is supported using a
 * tag/pill-style user interface within a simulated text box.
 */
var Autosuggest = function (_React$Component) {
  _inherits(Autosuggest, _React$Component);

  _createClass(Autosuggest, null, [{
    key: 'defaultInputSelect',
    value: function defaultInputSelect(input, value, completion) {
      // https://html.spec.whatwg.org/multipage/forms.html#do-not-apply
      switch (input.type) {
        case 'text':
        case 'search':
        case 'url':
        case 'tel':
        case 'password':
          // istanbul ignore else
          if (input.setSelectionRange) {
            input.setSelectionRange(value.length, completion.length);
          } else if (input.createTextRange) {
            // old IE
            var range = input.createTextRange();
            range.moveEnd('character', completion.length);
            range.moveStart('character', value.length);
            range.select();
          }
      }
    }
  }]);

  function Autosuggest(props) {
    var _ref;

    _classCallCheck(this, Autosuggest);

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = Autosuggest.__proto__ || Object.getPrototypeOf(Autosuggest)).call.apply(_ref, [this, props].concat(_toConsumableArray(args))));

    _this._itemAdapter = props.itemAdapter || new _ItemAdapter2['default']();
    _this._itemAdapter.receiveProps(props);

    _this._listAdapter = props.datalistAdapter || _this._getListAdapter(props.datalist);
    _this._listAdapter.receiveProps(props, _this._itemAdapter);

    var _this$_getValueFromPr = _this._getValueFromProps(props),
        inputValue = _this$_getValueFromPr.inputValue,
        inputItem = _this$_getValueFromPr.inputItem,
        inputItemEphemeral = _this$_getValueFromPr.inputItemEphemeral,
        selectedItems = _this$_getValueFromPr.selectedItems;

    _this._setValueMeta(inputItem, inputItemEphemeral, true, true);
    _this._lastValidItem = inputItem;
    _this._lastValidValue = inputValue;
    _this._keyPressCount = 0;

    _this.state = {
      open: false,
      disableFilter: false,
      inputValue: inputValue,
      inputValueKeyPress: 0,
      inputFocused: false,
      selectedItems: selectedItems,
      searchValue: null
    };
    _this._lastOnChangeValue = _this._getCurrentValue();
    _this._lastOnSelectValue = inputItem;

    var self = _this; // https://github.com/facebook/flow/issues/1517
    self._renderSelected = _this._renderSelected.bind(_this);
    self._getItemKey = _this._getItemKey.bind(_this);
    self._isSelectedItem = _this._isSelectedItem.bind(_this);
    self._renderSuggested = _this._renderSuggested.bind(_this);
    self._handleToggleClick = _this._handleToggleClick.bind(_this);
    self._handleInputChange = _this._handleInputChange.bind(_this);
    self._handleItemSelect = _this._handleItemSelect.bind(_this);
    self._removeItem = _this._removeItem.bind(_this);
    self._handleShowAll = _this._handleShowAll.bind(_this);
    self._handleKeyDown = _this._handleKeyDown.bind(_this);
    self._handleKeyPress = _this._handleKeyPress.bind(_this);
    self._handleMenuClose = _this._handleMenuClose.bind(_this);
    self._handleInputFocus = _this._handleInputFocus.bind(_this);
    self._handleInputBlur = _this._handleInputBlur.bind(_this);
    self._handleFocus = _this._handleFocus.bind(_this);
    self._handleBlur = _this._handleBlur.bind(_this);
    return _this;
  }

  _createClass(Autosuggest, [{
    key: '_getListAdapter',
    value: function _getListAdapter(list) {
      if (list == null) {
        return new _EmptyListAdapter2['default']();
      } else if (Array.isArray(list)) {
        return new _ArrayListAdapter2['default']();
      } else if (list instanceof Map) {
        return new _MapListAdapter2['default']();
      } else if (typeof list === 'object') {
        return new _ObjectListAdapter2['default']();
      } else {
        throw Error('Unexpected datalist type: datalistAdapter required');
      }
    }
  }, {
    key: '_getValueFromProps',
    value: function _getValueFromProps(props) {
      var inputValue = '';
      var inputItem = null;
      var inputItemEphemeral = false;
      var selectedItems = [];
      var value = props.value || props.defaultValue;
      if (value != null) {
        if (props.multiple) {
          if (Array.isArray(value)) {
            selectedItems = this._filterItems(value, props);
          } else {
            (0, _warning2['default'])(!value, 'Array expected for value property');
          }
        } else if (props.valueIsItem) {
          var itemValue = this._itemAdapter.getInputValue(value);
          if (props.datalist != null) {
            inputItem = this._listAdapter.findMatching(props.datalist, itemValue);
            if (inputItem != null) {
              inputValue = inputItem === value ? itemValue : this._itemAdapter.getInputValue(inputItem);
            } else if (props.datalistOnly && !props.datalistPartial) {
              this._warnInvalidValue(value);
            } else {
              inputValue = itemValue;
              inputItem = value;
            }
          } else {
            inputValue = itemValue;
            inputItem = value;
          }
        } else if (value) {
          if (props.datalist != null) {
            inputItem = this._listAdapter.findMatching(props.datalist, value);
            if (inputItem != null) {
              inputValue = this._itemAdapter.getInputValue(inputItem);
            } else if (props.datalistOnly && !props.datalistPartial) {
              this._warnInvalidValue(value);
            } else {
              inputValue = value.toString();
              inputItem = this._itemAdapter.newFromValue(value);
              inputItemEphemeral = true;
            }
          } else {
            inputValue = value.toString();
            inputItem = this._itemAdapter.newFromValue(value);
            inputItemEphemeral = true;
          }
        }
      }
      return { inputValue: inputValue, inputItem: inputItem, inputItemEphemeral: inputItemEphemeral, selectedItems: selectedItems };
    }
  }, {
    key: '_filterItems',
    value: function _filterItems(items, props) {
      if (props.datalist != null || !props.allowDuplicates) {
        var result = [];
        var valueSet = {};
        var different = false;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _item = _step.value;

            var _value = this._itemAdapter.getInputValue(_item);
            if (!props.allowDuplicates && valueSet[_value]) {
              different = true;
              continue;
            }
            var listItem = this._listAdapter.findMatching(props.datalist, _value);
            if (listItem != null) {
              result.push(listItem);
              valueSet[_value] = true;
              different = true;
            } else if (props.datalistOnly && !props.datalistPartial) {
              this._warnInvalidValue(_value);
              different = true;
            } else {
              result.push(_item);
              valueSet[_value] = true;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator['return']) {
              _iterator['return']();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        if (different) {
          return result;
        }
      }
      return items;
    }
  }, {
    key: '_warnInvalidValue',
    value: function _warnInvalidValue(value) {
      (0, _warning2['default'])(false, 'Value "%s" does not match any datalist value', value);
    }
  }, {
    key: '_setInputValue',
    value: function _setInputValue(value, callback) {
      // track keypress count in state so re-render is forced even if value is
      // unchanged; this is necessary when typing over the autocompleted range
      // with matching characters to properly maintain the input selection range
      this.setState({
        inputValue: value,
        inputValueKeyPress: this._keyPressCount
      }, callback);
    }
  }, {
    key: '_setValueMeta',
    value: function _setValueMeta(inputItem) {
      var inputItemEphemeral = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var isValid = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : inputItem != null;
      var validated = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : isValid;

      this._inputItem = inputItem;
      this._inputItemEphemeral = inputItemEphemeral;
      this._valueIsValid = isValid;
      this._valueWasValidated = validated;
    }
  }, {
    key: '_clearInput',
    value: function _clearInput() {
      this._setValueMeta(null, false, true, true);
      this._setInputValue('');
    }
  }, {
    key: '_getValueUsing',
    value: function _getValueUsing(props, inputValue, inputItem, selectedItems) {
      return props.multiple ? selectedItems : props.valueIsItem ? inputItem : inputValue;
    }
  }, {
    key: '_getCurrentValue',
    value: function _getCurrentValue() {
      return this._getValueUsing(this.props, this.state.inputValue, this._inputItem, this.state.selectedItems);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      // IE8 can jump cursor position if not immediately updated to typed value;
      // for other browsers, we can avoid re-rendering for the auto-complete
      this._autoCompleteAfterRender = !this.refs.input.setSelectionRange;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.itemAdapter != this.props.itemAdapter) {
        this._itemAdapter = nextProps.itemAdapter || new _ItemAdapter2['default']();
      }
      this._itemAdapter.receiveProps(nextProps);

      if (nextProps.datalist != this.props.datalist || nextProps.datalistAdapter != this.props.datalistAdapter) {
        if (nextProps.datalistAdapter) {
          this._listAdapter = nextProps.datalistAdapter;
        } else {
          var listAdapter = this._getListAdapter(nextProps.datalist);
          if (listAdapter.constructor != this._listAdapter.constructor) {
            this._listAdapter = listAdapter;
          }
        }
      }
      this._listAdapter.receiveProps(nextProps, this._itemAdapter);

      // if props.value changes (to a value other than the current state), or
      // validation changes to make state invalid, propagate props.value to state
      var nextValue = nextProps.value;
      var inputValue = this.state.inputValue;

      var valueChanged = nextValue !== this.props.value && nextValue !== this._getValueUsing(nextProps, inputValue, this._inputItem, this.state.selectedItems);
      var inputItem = void 0,
          inputValueInvalid = void 0,
          propsValueInvalid = void 0,
          validateSelected = void 0;
      if (!valueChanged) {
        if (nextProps.datalistOnly) {
          var canValidate = !nextProps.datalistPartial && nextProps.datalist != null;
          var validationChanged = !this.props.datalistOnly || !nextProps.datalistPartial && this.props.datalistPartial || nextProps.datalist != this.props.datalist;
          if (inputValue) {
            inputItem = this._listAdapter.findMatching(nextProps.datalist, inputValue);
            if (inputItem == null) {
              if (!canValidate && !this._inputItemEphemeral) {
                inputItem = this._inputItem;
              } else if (this._inputItemEphemeral && nextValue === inputValue) {
                propsValueInvalid = true;
              }
            }
            inputValueInvalid = inputItem == null && validationChanged;
            // update metadata but don't reset input value if invalid but focused
            if (inputValueInvalid && this._focused) {
              this._setValueMeta(null, false, false, true);
              if (validationChanged && canValidate && this._lastValidItem != null) {
                // revalidate last valid item, which will be restored on blur
                this._lastValidItem = this._listAdapter.findMatching(nextProps.datalist, this._lastValidValue);
                if (this._lastValidItem == null) {
                  this._lastValidValue = '';
                }
              }
              inputValueInvalid = false;
            }
          } else {
            inputItem = null;
            inputValueInvalid = false;
          }
          validateSelected = nextProps.multiple && canValidate && validationChanged;
        }
        if (nextProps.multiple && !nextProps.allowDuplicates && this.props.allowDuplicates) {
          validateSelected = true;
        }
      }
      // inputValueInvalid implies !multiple, since inputValue of multiple should
      // be blank when not focused
      if (valueChanged || inputValueInvalid) {
        var inputItemEphemeral = void 0,
            _selectedItems = void 0;
        if (propsValueInvalid) {
          inputValue = '';
          inputItemEphemeral = false;
          _selectedItems = [];
        } else {
          var _getValueFromProps2 = this._getValueFromProps(nextProps);

          inputValue = _getValueFromProps2.inputValue;
          inputItem = _getValueFromProps2.inputItem;
          inputItemEphemeral = _getValueFromProps2.inputItemEphemeral;
          _selectedItems = _getValueFromProps2.selectedItems;
        }
        // if props.value change resolved to current state item, don't reset input
        if (inputItem !== this._inputItem || !this._focused) {
          this._setValueMeta(inputItem, inputItemEphemeral, true, true);
          this._setInputValue(inputValue);
          this.setState({ selectedItems: _selectedItems });
          validateSelected = false;
          this._lastValidItem = inputItem;
          this._lastValidValue = inputValue;
          // suppress onChange (but not onSelect) if value came from props
          if (valueChanged) {
            this._lastOnChangeValue = this._getValueUsing(nextProps, inputValue, inputItem, _selectedItems);
          }
        } else if (valueChanged && nextProps.multiple) {
          this.setState({ selectedItems: _selectedItems });
        }
      } else if (inputValue && nextProps.datalist != this.props.datalist && this._focused) {
        // if datalist changed but value didn't, attempt to autocomplete
        this._checkAutoComplete(inputValue, nextProps);
      }
      if (validateSelected) {
        var _selectedItems2 = this._filterItems(this.state.selectedItems, nextProps);
        this.setState({ selectedItems: _selectedItems2 });
      }

      // open dropdown if datalist message is set while focused
      if (nextProps.datalistMessage && nextProps.datalistMessage != this.props.datalistMessage && this._focused) {
        this._open('message', nextProps);
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !(0, _shallowEqual2['default'])(this.props, nextProps) || !(0, _shallowEqual2['default'])(this.state, nextState);
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      var suggestions = this.refs.suggestions;

      this._menuFocusedBeforeUpdate = suggestions && suggestions.isFocused();

      var nextInputValue = nextState.inputValue;
      if (nextInputValue != this.state.inputValue) {
        var inputItem = void 0,
            inputItemEphemeral = void 0,
            isValid = void 0;
        if (!this._valueWasValidated) {
          if (nextInputValue) {
            inputItem = this._listAdapter.findMatching(nextProps.datalist, nextInputValue);
            if (inputItem == null && !nextProps.datalistOnly) {
              inputItem = this._itemAdapter.newFromValue(nextInputValue);
              inputItemEphemeral = true;
              isValid = true;
            } else {
              inputItemEphemeral = false;
              isValid = inputItem != null;
            }
          } else {
            inputItem = null;
            inputItemEphemeral = false;
            isValid = !nextProps.required;
          }
          this._setValueMeta(inputItem, inputItemEphemeral, isValid);
        } else {
          inputItem = this._inputItem;
          isValid = this._valueIsValid;
        }
        if (isValid) {
          this._lastValidItem = inputItem;
          this._lastValidValue = inputItem && !inputItemEphemeral ? this._itemAdapter.getInputValue(inputItem) : nextInputValue;
        }

        if (isValid) {
          var _multiple = nextProps.multiple,
              _onChange = nextProps.onChange;

          if (!_multiple && _onChange) {
            var _value2 = this._getValueUsing(nextProps, nextInputValue, inputItem, nextState.selectedItems);
            if (_value2 !== this._lastOnChangeValue) {
              this._lastOnChangeValue = _value2;
              _onChange(_value2);
            }
          }

          var _onSelect = nextProps.onSelect;

          if (_onSelect && inputItem !== this._lastOnSelectValue) {
            this._lastOnSelectValue = inputItem;
            _onSelect(inputItem);
          }
        }
      }

      var onToggle = nextProps.onToggle;

      if (onToggle && nextState.open != this.state.open) {
        onToggle(nextState.open);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.state.open && !prevState.open && this._lastOpenEventType === 'keydown' || this.state.disableFilter && !prevState.disableFilter && this._menuFocusedBeforeUpdate) {
        this.refs.suggestions.focusFirst();
      } else if (!this.state.open && prevState.open) {
        // closed
        if (this._menuFocusedBeforeUpdate) {
          this._menuFocusedBeforeUpdate = false;
          this._focusInput();
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this._focusTimeoutId);
      this._focusTimeoutId = null;
      clearTimeout(this._searchTimeoutId);
      this._searchTimeoutId = null;
    }
  }, {
    key: '_focusInput',
    value: function _focusInput() {
      var input = _reactDom2['default'].findDOMNode(this.refs.input);
      input.focus();
    }
  }, {
    key: '_open',
    value: function _open(eventType, props) {
      this._lastOpenEventType = eventType;
      var disableFilter = eventType !== 'autocomplete' && this._hasNoOrExactMatch(props);
      this.setState({ open: true, disableFilter: disableFilter });

      var onSearch = props.onSearch;
      var _state = this.state,
          inputValue = _state.inputValue,
          searchValue = _state.searchValue;

      if (onSearch && searchValue !== inputValue) {
        this.setState({ searchValue: inputValue });
        onSearch(inputValue);
      }
    }
  }, {
    key: '_close',
    value: function _close() {
      this.setState({ open: false });
    }
  }, {
    key: '_toggleOpen',
    value: function _toggleOpen(eventType, props) {
      if (this.state.open) {
        this._close();
      } else {
        this._open(eventType, props);
      }
    }
  }, {
    key: '_canOpen',
    value: function _canOpen() {
      var datalist = this.props.datalist;

      return datalist == null && this.props.onSearch || !this._listAdapter.isEmpty(datalist) || !!this.props.datalistMessage;
    }
  }, {
    key: '_hasNoOrExactMatch',
    value: function _hasNoOrExactMatch(props) {
      var _this2 = this;

      if (this._inputItem != null && !this._inputItemEphemeral) {
        return true; // exact match
      }
      var foldedValue = this._itemAdapter.foldValue(this.state.inputValue);
      return this._listAdapter.find(props.datalist, function (item) {
        return _this2._itemAdapter.itemIncludedByInput(item, foldedValue);
      }) == null;
    }
  }, {
    key: 'render',
    value: function render() {
      var showToggle = this.props.showToggle;

      var toggleCanOpen = this._canOpen();
      var toggleVisible = showToggle === 'auto' ? toggleCanOpen : showToggle;
      var classes = {
        autosuggest: true,
        open: this.state.open,
        disabled: this.props.disabled,
        dropdown: toggleVisible && !this.props.dropup,
        dropup: toggleVisible && this.props.dropup
      };
      return _react2['default'].createElement(
        'div',
        {
          key: 'dropdown',
          className: (0, _classnames2['default'])(classes),
          onFocus: this._handleFocus,
          onBlur: this._handleBlur },
        this._renderInputGroup(toggleVisible, toggleCanOpen),
        this._renderMenu()
      );
    }
  }, {
    key: '_renderInputGroup',
    value: function _renderInputGroup(toggleVisible, toggleCanOpen) {
      var addonBefore = this.props.addonBefore ? _react2['default'].createElement(
        'span',
        { className: 'input-group-addon', key: 'addonBefore' },
        this.props.addonBefore
      ) : null;

      var addonAfter = this.props.addonAfter ? _react2['default'].createElement(
        'span',
        { className: 'input-group-addon', key: 'addonAfter' },
        this.props.addonAfter
      ) : null;

      var buttonBefore = this.props.buttonBefore ? _react2['default'].createElement(
        'span',
        { className: 'input-group-btn' },
        this.props.buttonBefore
      ) : null;

      // Bootstrap expects the dropdown toggle to be last,
      // as it does not reset the right border radius for toggles:
      // .input-group-btn:last-child > .btn:not(:last-child):not(.dropdown-toggle)
      // { @include border-right-radius(0); }
      var toggle = toggleVisible && this._renderToggle(toggleCanOpen);
      var buttonAfter = toggle || this.props.buttonAfter ? _react2['default'].createElement(
        'span',
        { className: 'input-group-btn' },
        this.props.buttonAfter,
        toggle
      ) : null;

      var classes = (0, _classnames2['default'])({
        'input-group': addonBefore || addonAfter || buttonBefore || buttonAfter,
        'input-group-sm': this.props.bsSize === 'small',
        'input-group-lg': this.props.bsSize === 'large',
        'input-group-toggle': !!toggle
      });
      return classes ? _react2['default'].createElement(
        'div',
        { className: classes, key: 'input-group' },
        addonBefore,
        buttonBefore,
        this._renderChoices(),
        addonAfter,
        buttonAfter
      ) : this._renderChoices();
    }
  }, {
    key: '_renderToggle',
    value: function _renderToggle(canOpen) {
      return _react2['default'].createElement(_reactBootstrap.Dropdown.Toggle, {
        ref: 'toggle',
        key: 'toggle',
        id: this.props.toggleId,
        bsSize: this.props.bsSize,
        disabled: this.props.disabled || !canOpen,
        open: this.state.open,
        onClick: this._handleToggleClick,
        onKeyDown: this._handleKeyDown });
    }
  }, {
    key: '_renderChoices',
    value: function _renderChoices() {
      if (this.props.multiple) {
        var _props$choicesClass = this.props.choicesClass,
            ChoicesClass = _props$choicesClass === undefined ? _Choices2['default'] : _props$choicesClass;

        return _react2['default'].createElement(
          ChoicesClass,
          { ref: 'choices',
            autoHeight: !this.props.showToggle && !this.props.addonAfter && !this.props.addonBefore && !this.props.buttonAfter && !this.props.buttonBefore,
            disabled: this.props.disabled,
            focused: this.state.inputFocused,
            inputValue: this.state.inputValue,
            items: this.state.selectedItems,
            onKeyPress: this._handleKeyPress,
            onRemove: this._removeItem,
            renderItem: this._renderSelected },
          this._renderInput()
        );
      }
      return this._renderInput();
    }

    // autobind

  }, {
    key: '_renderSelected',
    value: function _renderSelected(item) {
      return this._itemAdapter.renderSelected(item);
    }
  }, {
    key: '_renderInput',
    value: function _renderInput() {
      var formGroup = this.context.$bs_formGroup;
      var controlId = formGroup && formGroup.controlId;
      var extraProps = {};
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = Object.keys(this.props)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var key = _step2.value;

          if (!Autosuggest.propTypes[key]) {
            extraProps[key] = this.props[key];
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2['return']) {
            _iterator2['return']();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      var noneSelected = !this.props.multiple || !this.state.selectedItems.length;
      // set autoComplete off to avoid a redundant browser drop-down menu,
      // but allow it to be overridden by extra props for auto-fill purposes
      return _react2['default'].createElement('input', _extends({
        autoComplete: 'off'
      }, extraProps, {
        className: (0, _classnames2['default'])(this.props.className, { 'form-control': !this.props.multiple }),
        ref: 'input',
        key: 'input',
        id: controlId,
        disabled: this.props.disabled,
        required: this.props.required && noneSelected,
        placeholder: noneSelected ? this.props.placeholder : undefined,
        type: this.props.type,
        value: this.state.inputValue,
        onChange: this._handleInputChange,
        onKeyDown: this._handleKeyDown,
        onKeyPress: this._handleKeyPress,
        onFocus: this._handleInputFocus,
        onBlur: this._handleInputBlur }));
    }
  }, {
    key: '_renderMenu',
    value: function _renderMenu() {
      var _this3 = this;

      this._pseudofocusedItem = null;
      var open = this.state.open;

      if (!open) {
        return null;
      }
      var datalist = this.props.datalist;

      var foldedValue = this._itemAdapter.foldValue(this.state.inputValue);
      this._foldedInputValue = foldedValue;
      var items = void 0;
      if (this.state.disableFilter) {
        items = this._listAdapter.toArray(datalist);
      } else {
        items = this._listAdapter.filter(datalist, function (item) {
          return _this3._itemAdapter.itemIncludedByInput(item, foldedValue) && _this3._allowItem(item);
        });
      }
      items = this._itemAdapter.sortItems(items, foldedValue);
      var filtered = items.length < this._listAdapter.getLength(datalist);
      // visually indicate that first item will be selected if Enter is pressed
      // while the input element is focused (unless multiple and not datalist-only)
      var focusedIndex = void 0;
      if (items.length > 0 && this.state.inputFocused && (!this.props.multiple || this.props.datalistOnly)) {
        this._pseudofocusedItem = items[focusedIndex = 0];
      }
      var _props = this.props,
          _props$suggestionsCla = _props.suggestionsClass,
          SuggestionsClass = _props$suggestionsCla === undefined ? _Suggestions2['default'] : _props$suggestionsCla,
          datalistMessage = _props.datalistMessage,
          onDatalistMessageSelect = _props.onDatalistMessageSelect,
          toggleId = _props.toggleId;

      return _react2['default'].createElement(SuggestionsClass, { ref: 'suggestions',
        datalistMessage: datalistMessage,
        filtered: filtered,
        focusedIndex: focusedIndex,
        getItemKey: this._getItemKey,
        isSelectedItem: this._isSelectedItem,
        items: items,
        labelledBy: toggleId,
        onClose: this._handleMenuClose,
        onDatalistMessageSelect: onDatalistMessageSelect,
        onDisableFilter: this._handleShowAll,
        onSelect: this._handleItemSelect,
        open: open,
        renderItem: this._renderSuggested });
    }
  }, {
    key: '_allowItem',
    value: function _allowItem(item) {
      var _this4 = this;

      if (this.props.allowDuplicates) {
        return true;
      }
      var value = this._itemAdapter.getInputValue(item);
      return !this.state.selectedItems.find(function (i) {
        return _this4._itemAdapter.getInputValue(i) === value;
      });
    }

    // autobind

  }, {
    key: '_getItemKey',
    value: function _getItemKey(item) {
      return this._itemAdapter.getReactKey(item);
    }

    // autobind

  }, {
    key: '_isSelectedItem',
    value: function _isSelectedItem(item) {
      return this._itemAdapter.itemMatchesInput(item, this._foldedInputValue);
    }

    // autobind

  }, {
    key: '_renderSuggested',
    value: function _renderSuggested(item) {
      return this._itemAdapter.renderSuggested(item);
    }

    // autobind

  }, {
    key: '_handleToggleClick',
    value: function _handleToggleClick() {
      this._toggleOpen('click', this.props);
    }

    // autobind

  }, {
    key: '_handleInputChange',
    value: function _handleInputChange(event) {
      var _this5 = this;

      var _ref2 = event.target,
          value = _ref2.value;
      // prevent auto-complete on backspace/delete/copy/paste/etc.

      var allowAutoComplete = this._keyPressCount > this.state.inputValueKeyPress;
      if (allowAutoComplete && value) {
        if (this._autoCompleteAfterRender) {
          this._setValueMeta();
          this._setInputValue(value, function () {
            _this5._checkAutoComplete(value, _this5.props);
          });
        } else if (!this._checkAutoComplete(value, this.props)) {
          this._setValueMeta();
          this._setInputValue(value);
        }
      } else {
        this._setValueMeta();
        this._setInputValue(value);
      }

      // suppress onSearch if can't auto-complete and not open
      if (allowAutoComplete || this.state.open) {
        (function () {
          var onSearch = _this5.props.onSearch;

          if (onSearch) {
            clearTimeout(_this5._searchTimeoutId);
            _this5._searchTimeoutId = setTimeout(function () {
              _this5._searchTimeoutId = null;
              if (value != _this5.state.searchValue) {
                _this5.setState({ searchValue: value });
                onSearch(value);
              }
            }, _this5.props.searchDebounce);
          }
        })();
      }
    }
  }, {
    key: '_checkAutoComplete',
    value: function _checkAutoComplete(value, props) {
      var _this6 = this;

      // open dropdown if any items would be included
      var valueUpdated = false;
      var datalist = props.datalist;

      var foldedValue = this._itemAdapter.foldValue(value);
      var includedItems = this._listAdapter.filter(datalist, function (i) {
        return _this6._itemAdapter.itemIncludedByInput(i, foldedValue) && _this6._allowItem(i);
      });
      if (includedItems.length > 0) {
        // if only one item is included and the value must come from the list,
        // autocomplete using that item
        var _datalistOnly = props.datalistOnly,
            _datalistPartial = props.datalistPartial;

        if (includedItems.length === 1 && _datalistOnly && !_datalistPartial) {
          (function () {
            var found = includedItems[0];
            var foundValue = _this6._itemAdapter.getInputValue(found);
            var callback = void 0;
            var inputSelect = props.inputSelect;

            if (value != foundValue && inputSelect && _this6._itemAdapter.foldValue(foundValue).startsWith(foldedValue)) {
              (function () {
                var input = _this6.refs.input;
                callback = function callback() {
                  inputSelect(input, value, foundValue);
                };
              })();
            }
            _this6._setValueMeta(found);
            _this6._setInputValue(foundValue, callback);
            valueUpdated = true;
            if (_this6.state.open ? props.closeOnCompletion : value != foundValue && !props.closeOnCompletion) {
              _this6._toggleOpen('autocomplete', props);
            }
          })();
        } else {
          // otherwise, just check if any values match, and select the first one
          // (without modifying the input value)
          var _found = includedItems.find(function (i) {
            return _this6._itemAdapter.itemMatchesInput(i, foldedValue);
          });
          if (_found) {
            this._setValueMeta(_found);
            this._setInputValue(value);
            valueUpdated = true;
          }
          // open dropdown unless exactly one matching value was found
          if (!this.state.open && (!_found || includedItems.length > 1)) {
            this._open('autocomplete', props);
          }
        }
      }
      return valueUpdated;
    }

    // autobind

  }, {
    key: '_handleItemSelect',
    value: function _handleItemSelect(item) {
      if (this.props.multiple) {
        this._addItem(item);
      } else {
        var itemValue = this._itemAdapter.getInputValue(item);
        this._setValueMeta(item);
        this._setInputValue(itemValue);
      }
      this._close();
    }
  }, {
    key: '_addItem',
    value: function _addItem(item) {
      if (this._allowItem(item)) {
        var _selectedItems3 = [].concat(_toConsumableArray(this.state.selectedItems), [item]);
        this.setState({ selectedItems: _selectedItems3 });
        var _props2 = this.props,
            _onAdd = _props2.onAdd,
            _onChange2 = _props2.onChange;

        if (_onAdd) {
          _onAdd(item);
        }
        if (_onChange2) {
          _onChange2(_selectedItems3);
        }
      }
      this._clearInput();
      if (this.state.open) {
        this._close();
      }
    }

    // autobind

  }, {
    key: '_removeItem',
    value: function _removeItem(index) {
      var previousItems = this.state.selectedItems;
      var selectedItems = previousItems.slice(0, index).concat(previousItems.slice(index + 1));
      this.setState({ selectedItems: selectedItems });
      var _props3 = this.props,
          onRemove = _props3.onRemove,
          onChange = _props3.onChange;

      if (onRemove) {
        onRemove(index);
      }
      if (onChange) {
        onChange(selectedItems);
      }
    }
  }, {
    key: '_addInputValue',
    value: function _addInputValue() {
      if (this._inputItem) {
        this._addItem(this._inputItem);
        return true;
      }
      return false;
    }

    // autobind

  }, {
    key: '_handleShowAll',
    value: function _handleShowAll() {
      this.setState({ disableFilter: true });
    }

    // autobind

  }, {
    key: '_handleKeyDown',
    value: function _handleKeyDown(event) {
      if (this.props.disabled) return;

      switch (event.keyCode || event.which) {
        case _keycode2['default'].codes.down:
        case _keycode2['default'].codes['page down']:
          if (this.state.open) {
            this.refs.suggestions.focusFirst();
          } else if (this._canOpen()) {
            this._open('keydown', this.props);
          }
          event.preventDefault();
          break;
        case _keycode2['default'].codes.left:
        case _keycode2['default'].codes.backspace:
          if (this.refs.choices && this.refs.input && this._getCursorPosition(this.refs.input) === 0) {
            this.refs.choices.focusLast();
            event.preventDefault();
          }
          break;
        case _keycode2['default'].codes.right:
          if (this.refs.choices && this.refs.input && this._getCursorPosition(this.refs.input) === this.state.inputValue.length) {
            this.refs.choices.focusFirst();
            event.preventDefault();
          }
          break;
        case _keycode2['default'].codes.enter:
          if (this.props.multiple && this.state.inputValue) {
            event.preventDefault();
            if (this._addInputValue()) {
              break;
            }
          }
          if (this.state.open && this.state.inputFocused) {
            event.preventDefault();
            if (this._pseudofocusedItem) {
              this._handleItemSelect(this._pseudofocusedItem);
            } else {
              this._close();
            }
          }
          break;
        case _keycode2['default'].codes.esc:
        case _keycode2['default'].codes.tab:
          this._handleMenuClose(event);
          break;
      }
    }
  }, {
    key: '_getCursorPosition',
    value: function _getCursorPosition(input) {
      var inputNode = _reactDom2['default'].findDOMNode(input);
      return inputNode ? inputNode.selectionStart : /* istanbul ignore next */
      undefined;
    }

    // autobind

  }, {
    key: '_handleKeyPress',
    value: function _handleKeyPress() {
      ++this._keyPressCount;
    }

    // autobind

  }, {
    key: '_handleMenuClose',
    value: function _handleMenuClose() {
      if (this.state.open) {
        this._close();
      }
    }

    // autobind

  }, {
    key: '_handleInputFocus',
    value: function _handleInputFocus() {
      this.setState({ inputFocused: true });
    }

    // autobind

  }, {
    key: '_handleInputBlur',
    value: function _handleInputBlur() {
      this.setState({ inputFocused: false });
    }

    // autobind

  }, {
    key: '_handleFocus',
    value: function _handleFocus() {
      if (this._focusTimeoutId) {
        clearTimeout(this._focusTimeoutId);
        this._focusTimeoutId = null;
      } else {
        this._focused = true;
        var _onFocus = this.props.onFocus;

        if (_onFocus) {
          var _value3 = this._getCurrentValue();
          _onFocus(_value3);
        }
      }
    }

    // autobind

  }, {
    key: '_handleBlur',
    value: function _handleBlur() {
      var _this7 = this;

      this._focusTimeoutId = setTimeout(function () {
        _this7._focusTimeoutId = null;
        _this7._focused = false;
        var inputValue = _this7.state.inputValue;
        var onBlur = _this7.props.onBlur;

        if (_this7.props.multiple) {
          if (inputValue && !_this7._addInputValue()) {
            _this7._clearInput();
          }
        } else if (inputValue != _this7._lastValidValue) {
          // invoke onBlur after state change, rather than immediately
          var callback = void 0;
          if (onBlur) {
            callback = function callback() {
              var value = _this7._getCurrentValue();
              onBlur(value);
            };
          }
          // restore last valid value/item
          _this7._setValueMeta(_this7._lastValidItem, false, true, true);
          _this7._setInputValue(_this7._lastValidValue, callback);
          return;
        }
        if (onBlur) {
          var _value4 = _this7._getCurrentValue();
          onBlur(_value4);
        }
      }, 1);
    }
  }]);

  return Autosuggest;
}(_react2['default'].Component);

Autosuggest.propTypes = {
  /**
   * Text or component appearing in the input group after the input element
   * (and before any button specified in `buttonAfter`).
   */
  addonAfter: _react2['default'].PropTypes.node,
  /**
    * Text or component appearing in the input group before the input element
    * (and before any button specified in `buttonBefore`).
    */
  addonBefore: _react2['default'].PropTypes.node,
  /**
   * Indicates whether duplicate values are allowed in `multiple` mode.
   */
  allowDuplicates: _react2['default'].PropTypes.bool,
  /**
   * Specifies the size of the form group and its contained components.
   * Leave undefined for normal/medium size.
   */
  bsSize: _react2['default'].PropTypes.oneOf(['small', 'large']),
  /**
   * Button component appearing in the input group after the input element
   * (and after any add-on specified in `addonAfter`).
   */
  buttonAfter: _react2['default'].PropTypes.node,
  /**
   * Button component appearing in the input group before the input element
   * (and after any add-on specified in `addonBefore`).
   */
  buttonBefore: _react2['default'].PropTypes.node,
  /**
   * React component class used to render the selected items in multiple mode.
   */
  choicesClass: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.func, _react2['default'].PropTypes.string]),
  /**
   * Indicates whether the drop-down menu should be closed automatically when
   * auto-completion occurs. By default, the menu will remain open, so the
   * user can see any additional information about the selected item (such as
   * a shorthand code that caused it to be selected).
   */
  closeOnCompletion: _react2['default'].PropTypes.bool,
  /**
   * A collection of items (such as an array, object, or Map) used as
   * auto-complete suggestions. Each item may have any type supported by the
   * `itemAdapter`. The default item adapter has basic support for any
   * non-null type: it will initially try to access item properties using the
   * configured property names (`itemReactKeyPropName`, `itemSortKeyPropName`,
   * and `itemValuePropName`), but will fall back to using the `toString`
   * method to obtain these properties to support primitives and other object
   * types.
   *
   * If `datalist` is undefined or null and `onSearch` is not, the datalist
   * is assumed to be dynamically populated, and the drop-down toggle will be
   * enabled and will trigger `onSearch` the first time it is clicked.
   * Conversely, an empty `datalist` or undefined/null `onSearch` indicates
   * that there are no auto-complete options.
   */
  datalist: _react2['default'].PropTypes.any,
  /**
   * An instance of the ListAdapter class that provides datalist access
   * methods required by this component.
   */
  datalistAdapter: _react2['default'].PropTypes.object,
  /**
   * Message to be displayed at the end of the datalist. It can be used to
   * indicate that data is being fetched asynchronously, that an error
   * occurred fetching data, or that additional options can be requested.
   * It behaves similarly to a menu item, except that it is not filtered or
   * sorted and cannot be selected (except to invoke `onDatalistMessageSelect`).
   * Changing this property to a different non-null value while the component
   * is focused causes the drop-down menu to be opened, which is useful for
   * reporting status, such as that options are being fetched or failed to be
   * fetched.
   */
  datalistMessage: _react2['default'].PropTypes.node,
  /**
   * Indicates that only values matching an item from the `datalist` property
   * are considered valid. For search purposes, intermediate values of the
   * underlying `input` element may not match while the component is focused,
   * but any non-matching value will be replaced with the previous matching
   * value when the component loses focus.
   *
   * Note that there are two cases where the current (valid) value may not
   * correspond to an item in the datalist:
   *
   * - If the value was provided by the `value` or `defaultValue` property
   *   and either `datalist` is undefined/null (as opposed to empty) or
   *   `datalistPartial` is true, the value is assumed to be valid.
   * - If `datalist` changes and `datalistPartial` is true, any previously
   *   valid value is assumed to remain valid. (Conversely, if `datalist`
   *   changes and `datalistPartial` is false, a previously valid value will
   *   be invalidated if not in the new `datalist`.)
   */
  datalistOnly: _react2['default'].PropTypes.bool,
  /**
   * Indicates that the `datalist` property should be considered incomplete
   * for validation purposes. Specifically, if both `datalistPartial` and
   * `datalistOnly` are true, changes to the `datalist` will not render
   * invalid a value that was previously valid. This is useful in cases where
   * a partial datalist is obtained dynamically in response to the `onSearch`
   * callback.
   */
  datalistPartial: _react2['default'].PropTypes.bool,
  /**
   * Initial value to be rendered when used as an
   * [uncontrolled component](https://facebook.github.io/react/docs/forms.html#uncontrolled-components)
   * (i.e. no `value` property is supplied).
   */
  defaultValue: _react2['default'].PropTypes.any,
  /**
   * Indicates whether the form group is disabled, which causes all of its
   * contained elements to ignore input and focus events and to be displayed
   * grayed out.
   */
  disabled: _react2['default'].PropTypes.bool,
  /**
   * Indicates whether the suggestion list should drop up instead of down.
   *
   * Note that currently a drop-up list extending past the top of the page is
   * clipped, rendering the clipped items inaccessible, whereas a drop-down
   * list will extend the page and allow scrolling as necessary.
   */
  dropup: _react2['default'].PropTypes.bool,
  /**
   * Custom class name applied to the input group.
   */
  groupClassName: _react2['default'].PropTypes.string,
  /**
   * Function used to select a portion of the input value when auto-completion
   * occurs. The default implementation selects just the auto-completed
   * portion, which is equivalent to:
   *
   * ```js
   *   defaultInputSelect(input, value, completion) {
   *     input.setSelectionRange(value.length, completion.length)
   *   }
   * ```
   */
  inputSelect: _react2['default'].PropTypes.func,
  /**
   * An instance of the ItemAdapter class that provides the item access
   * methods required by this component.
   */
  itemAdapter: _react2['default'].PropTypes.object,
  /**
   * Name of the item property used for the React component key. If this
   * property is not defined, `itemValuePropName` is used instead. If neither
   * property is defined, `toString()` is called on the item.
   */
  itemReactKeyPropName: _react2['default'].PropTypes.string,
  /**
   * Name of the item property used for sorting items. If this property is not
   * defined, `itemValuePropName` is used instead. If neither property is
   * defined, `toString()` is called on the item.
   */
  itemSortKeyPropName: _react2['default'].PropTypes.string,
  /**
   * Name of item property used for the input element value. If this property
   * is not defined, `toString()` is called on the item.
   */
  itemValuePropName: _react2['default'].PropTypes.string,
  /**
   * Enables selection of multiple items. The value property should be an
   * array of items.
   */
  multiple: _react2['default'].PropTypes.bool,
  /**
   * Callback function called whenever a new value should be appended to the
   * array of values in `multiple` mode. The sole argument is the added item.
   */
  onAdd: _react2['default'].PropTypes.func,
  /**
   * Callback function called whenever the input focus leaves this component.
   * The sole argument is current value (see `onChange for details`).
   */
  onBlur: _react2['default'].PropTypes.func,
  /**
   * Callback function called whenever the input value changes to a different
   * valid value. Validity depends on properties such as `datalistOnly`,
   * `valueIsItem`, and `required`. The sole argument is current value:
   *
   * - If `multiple` is enabled, the current value is an array of selected
   *   items.
   * - If `valueIsItem` is enabled, the current value is the selected
   *   datalist item.
   * - Otherwise, the current value is the `input` element value. Note that
   *   if `datalistOnly` or `required` are enabled, only valid values trigger
   *   a callback.
   */
  onChange: _react2['default'].PropTypes.func,
  /**
   * Callback function called whenever the datalist item created for
   * `datalistMessage` is selected. If this property is null, the associated
   * item is displayed as disabled.
   */
  onDatalistMessageSelect: _react2['default'].PropTypes.func,
  /**
   * Callback function called whenever the input focus enters this component.
   * The sole argument is current value (see `onChange for details`).
   */
  onFocus: _react2['default'].PropTypes.func,
  /**
   * Callback function called whenever a value should be removed from the
   * array of values in `multiple` mode. The sole argument is the index of
   * the value to remove.
   */
  onRemove: _react2['default'].PropTypes.func,
  /**
   * Callback function called periodically when the `input` element value has
   * changed. The sole argument is the current value of the `input` element.
   * This callback can be used to dynamically populate the `datalist` based on
   * the input value so far, e.g. with values obtained from a remote service.
   * Once changed, the value must then remain unchanged for `searchDebounce`
   * milliseconds before the function will be called. No two consecutive
   * invocations of the function will be passed the same value (i.e. changing
   * and then restoring the value within the debounce interval is not
   * considered a change). Note also that the callback can be invoked with an
   * empty string, if the user clears the `input` element; this implies that
   * any minimum search string length should be imposed by the function.
   */
  onSearch: _react2['default'].PropTypes.func,
  /**
   * Callback function called whenever an item from the suggestion list is
   * selected (regardless of whether it is clicked or typed). The sole
   * argument is the selected item.
   */
  onSelect: _react2['default'].PropTypes.func,
  /**
   * Callback function called whenever the drop-down list of suggestions is
   * opened or closed. The sole argument is a boolean value indicating whether
   * the list is open.
   */
  onToggle: _react2['default'].PropTypes.func,
  /**
   * Placeholder text propagated to the underlying `input` element (when
   * `multiple` is false or no items have been selected).
   */
  placeholder: _react2['default'].PropTypes.string,
  /**
   * `required` property passed to the `input` element (when `multiple` is
   * false or no items have been selected).
   */
  required: _react2['default'].PropTypes.bool,
  /**
   * The number of milliseconds that must elapse between the last change to
   * the `input` element value and a call to `onSearch`. The default is 250.
   */
  searchDebounce: _react2['default'].PropTypes.number,
  /**
   * Indicates whether to show the drop-down toggle. If set to `auto`, the
   * toggle is shown only when the `datalist` is non-empty or dynamic.
   */
  showToggle: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.bool, _react2['default'].PropTypes.oneOf(['auto'])]),
  /**
   * React component class used to render the drop-down list of suggestions.
   */
  suggestionsClass: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.func, _react2['default'].PropTypes.string]),
  /**
   * ID supplied to the drop-down toggle and used by the drop-down menu to
   * refer to it.
   */
  toggleId: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number]),
  /**
   * `type` property supplied to the contained `input` element. Only textual
   * types should be specified, such as `text`, `search`, `email`, `tel`, or
   * perhaps `number`. Note that the browser may supply additional UI elements
   * for some types (e.g. increment/decrement buttons for `number`) that may
   * need additional styling or may interfere with UI elements supplied by
   * this component.
   */
  type: _react2['default'].PropTypes.string,
  /**
   * The value to be rendered by the component. If unspecified, the component
   * behaves like an [uncontrolled component](https://facebook.github.io/react/docs/forms.html#uncontrolled-components).
   */
  value: _react2['default'].PropTypes.any,
  /**
   * Indicates that the `value` property should be interpreted as a datalist
   * item, as opposed to the string value of the underlying `input` element.
   * When false (the default), the `value` property (if specified) is
   * expected to be a string and corresponds (indirectly) to the `value`
   * property of the underlying `input` element. When true, the `value`
   * property is expected to be a datalist item whose display value (as
   * provided by the `itemAdapter`) is used as the `input` element value.
   * This property also determines whether the argument to the `onChange`
   * callback is the `input` value or a datalist item.
   *
   * Note that unless `datalistOnly` is also true, items may also be created
   * dynamically using the `newFromValue` method of the `itemAdapter`.
   *
   * Also note that this property is ignored if `multiple` is true; in that
   * case, the `value` property and `onChange` callback argument are
   * implicitly an array of datalist items.
   */
  valueIsItem: _react2['default'].PropTypes.bool
};
Autosuggest.contextTypes = {
  $bs_formGroup: _react2['default'].PropTypes.object
};
Autosuggest.defaultProps = {
  closeOnCompletion: false,
  datalistOnly: false,
  datalistPartial: false,
  disabled: false,
  dropup: false,
  inputSelect: Autosuggest.defaultInputSelect,
  multiple: false,
  itemReactKeyPropName: 'key',
  itemSortKeyPropName: 'sortKey',
  itemValuePropName: 'value',
  searchDebounce: 250,
  showToggle: 'auto',
  type: 'text',
  valueIsItem: false
};
exports['default'] = Autosuggest;