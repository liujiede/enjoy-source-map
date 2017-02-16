"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class2, _temp;

var _enjoyRnSupportElong = require("enjoy-rn-support-elong");

var _enjoyRnSupportElong2 = _interopRequireDefault(_enjoyRnSupportElong);

var _index = require("../../components/calendar/index");

var _index2 = _interopRequireDefault(_index);

var _user = require("../../service/user");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = _enjoyRnSupportElong2.default.React;
var Util = _enjoyRnSupportElong2.default.Util,
    document = _enjoyRnSupportElong2.default.document;


var __dom__ = React.createElement;
var __class__ = Util.arrayClass;
var __util__ = Util.pageUtil(__project + "/views/home/index");

var __htmlIndex__ = Util.getHtmlIndex();
var __keyIndex__ = 0;
function __getKey__() {
	return __htmlIndex__ + __keyIndex__++;
}

var _dec, _class;

var Component = _enjoyRnSupportElong2.default.Component,
    layers = _enjoyRnSupportElong2.default.layers;


var Home = (_dec = layers({
	calendar: _index2.default
}), _dec(_class = (_temp = _class2 = function (_Component) {
	_inherits(Home, _Component);

	function Home(props) {
		_classCallCheck(this, Home);

		var _this = _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this, props));

		_this.state = {
			user: null,
			date: ""
		};

		if (Home.__start_list__) {
			Home.__start_list__.forEach(function (item) {
				item.call(_this);
			});
		}
		return _this;
	}

	_createClass(Home, [{
		key: "componentWillMount",
		value: function componentWillMount() {
			_get(Home.prototype.__proto__ || Object.getPrototypeOf(Home.prototype), "componentWillMount", this).call(this);

			this.loadUserInfo();
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this2 = this;

			_get(Home.prototype.__proto__ || Object.getPrototypeOf(Home.prototype), "componentDidMount", this).call(this);

			this.calendar.onReady(function () {
				_this2.calendar.component.onSelect(function (date) {
					_this2.setState({
						date: date
					});
				});
			});
		}
	}, {
		key: "loadUserInfo",
		value: function () {
			var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.t0 = this;
								_context.next = 3;
								return _user2.default.UserInfo();

							case 3:
								_context.t1 = _context.sent;
								_context.t2 = {
									user: _context.t1
								};

								_context.t0.setState.call(_context.t0, _context.t2);

							case 6:
							case "end":
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function loadUserInfo() {
				return _ref.apply(this, arguments);
			}

			return loadUserInfo;
		}()
	}, {
		key: "openCalendar",
		value: function openCalendar() {
			this.calendar.show();
		}
	}]);

	return Home;
}(Component), _class2.View = require("./index-html").default, _class2.Styles = [require("./index-css").default], _class2.__start_list__ = [function () {
	this._styles = Home.Styles;
}, function () {
	this.view = Home.View.call(this);
}], _temp)) || _class);
exports.default = Home;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qaWUvRG9jdW1lbnRzL2dpdGh1Yi9lbmpveS1zb3VyY2UtbWFwL3Rlc3Qvc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiVXRpbCIsImRvY3VtZW50IiwiX19kb21fXyIsImNyZWF0ZUVsZW1lbnQiLCJfX2NsYXNzX18iLCJhcnJheUNsYXNzIiwiX191dGlsX18iLCJwYWdlVXRpbCIsIl9fcHJvamVjdCIsIl9faHRtbEluZGV4X18iLCJnZXRIdG1sSW5kZXgiLCJfX2tleUluZGV4X18iLCJfX2dldEtleV9fIiwiX2RlYyIsIl9jbGFzcyIsIkNvbXBvbmVudCIsImxheWVycyIsIkhvbWUiLCJjYWxlbmRhciIsInByb3BzIiwic3RhdGUiLCJ1c2VyIiwiZGF0ZSIsIl9fc3RhcnRfbGlzdF9fIiwiZm9yRWFjaCIsIml0ZW0iLCJjYWxsIiwibG9hZFVzZXJJbmZvIiwib25SZWFkeSIsImNvbXBvbmVudCIsIm9uU2VsZWN0Iiwic2V0U3RhdGUiLCJVc2VySW5mbyIsInNob3ciLCJWaWV3IiwicmVxdWlyZSIsImRlZmF1bHQiLCJTdHlsZXMiLCJfc3R5bGVzIiwidmlldyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBaUJBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBakJRQSxLLGlDQUFBQSxLO0lBRUZDLEksaUNBQUFBLEk7SUFBTUMsUSxpQ0FBQUEsUTs7O0FBRVosSUFBSUMsVUFBVUgsTUFBTUksYUFBcEI7QUFDQSxJQUFJQyxZQUFZSixLQUFLSyxVQUFyQjtBQUNBLElBQUlDLFdBQVdOLEtBQUtPLFFBQUwsQ0FBY0MsWUFBWSxtQkFBMUIsQ0FBZjs7QUFFQSxJQUFJQyxnQkFBZ0JULEtBQUtVLFlBQUwsRUFBcEI7QUFDQSxJQUFJQyxlQUFlLENBQW5CO0FBQ0EsU0FBU0MsVUFBVCxHQUFxQjtBQUNwQixRQUFPSCxnQkFBZ0JFLGNBQXZCO0FBQ0E7O0FBRUQsSUFBSUUsSUFBSixFQUFVQyxNQUFWOztJQUtRQyxTLGlDQUFBQSxTO0lBQVdDLE0saUNBQUFBLE07OztBQUVuQixJQUFJQyxRQUFRSixPQUFPRyxPQUFPO0FBQ3pCRTtBQUR5QixDQUFQLENBQVAsRUFFUkwsS0FBS0M7QUFBQTs7QUFJUixlQUFZSyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsMEdBQ1pBLEtBRFk7O0FBR2xCLFFBQUtDLEtBQUwsR0FBYTtBQUNaQyxTQUFNLElBRE07QUFFWkMsU0FBTTtBQUZNLEdBQWI7O0FBS0EsTUFBSUwsS0FBS00sY0FBVCxFQUF5QjtBQUN4Qk4sUUFBS00sY0FBTCxDQUFvQkMsT0FBcEIsQ0FBNEIsZ0JBQVE7QUFDbkNDLFNBQUtDLElBQUw7QUFDQSxJQUZEO0FBR0E7QUFaaUI7QUFhbEI7O0FBakJPO0FBQUE7QUFBQSx1Q0FtQmE7QUFDcEI7O0FBRUEsUUFBS0MsWUFBTDtBQUNBO0FBdkJPO0FBQUE7QUFBQSxzQ0F5Qlk7QUFBQTs7QUFDbkI7O0FBRUEsUUFBS1QsUUFBTCxDQUFjVSxPQUFkLENBQXNCLFlBQU07QUFDM0IsV0FBS1YsUUFBTCxDQUFjVyxTQUFkLENBQXdCQyxRQUF4QixDQUFpQyxnQkFBUTtBQUN4QyxZQUFLQyxRQUFMLENBQWM7QUFDYlQsWUFBTUE7QUFETyxNQUFkO0FBR0EsS0FKRDtBQUtBLElBTkQ7QUFPQTtBQW5DTztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsc0JBc0NQLElBdENPO0FBQUE7QUFBQSxlQXVDTSxlQUFZVSxRQUFaLEVBdkNOOztBQUFBO0FBQUE7QUFBQTtBQXVDTlgsYUF2Q007QUFBQTs7QUFBQSxvQkFzQ0ZVLFFBdENFOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlDQTJDTztBQUNkLFFBQUtiLFFBQUwsQ0FBY2UsSUFBZDtBQUNBO0FBN0NPOztBQUFBO0FBQUEsRUFBNEJsQixTQUE1QixXQUNEbUIsSUFEQyxHQUNNQyxRQUFRLGNBQVIsRUFBd0JDLE9BRDlCLFVBRURDLE1BRkMsR0FFUSxDQUFDRixRQUFRLGFBQVIsRUFBdUJDLE9BQXhCLENBRlIsVUE4Q0RiLGNBOUNDLEdBOENnQixDQUFDLFlBQVk7QUFDcEMsTUFBS2UsT0FBTCxHQUFlckIsS0FBS29CLE1BQXBCO0FBQ0EsQ0FGdUIsRUFFckIsWUFBWTtBQUNkLE1BQUtFLElBQUwsR0FBWXRCLEtBQUtpQixJQUFMLENBQVVSLElBQVYsQ0FBZSxJQUFmLENBQVo7QUFDQSxDQUp1QixDQTlDaEIsUUFBTCxLQW1ERVosTUFyREYsQ0FBSjtRQXNEaUJzQixPLEdBQVJuQixJIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRW5qb3kgZnJvbSBcImVuam95LXJuLXN1cHBvcnQtZWxvbmdcIjtcbmNvbnN0IHsgUmVhY3QgfSA9IEVuam95O1xuXG52YXIgeyBVdGlsLCBkb2N1bWVudH0gPSBFbmpveTtcblxudmFyIF9fZG9tX18gPSBSZWFjdC5jcmVhdGVFbGVtZW50O1xudmFyIF9fY2xhc3NfXyA9IFV0aWwuYXJyYXlDbGFzcztcbnZhciBfX3V0aWxfXyA9IFV0aWwucGFnZVV0aWwoX19wcm9qZWN0ICsgXCIvdmlld3MvaG9tZS9pbmRleFwiKTtcblxudmFyIF9faHRtbEluZGV4X18gPSBVdGlsLmdldEh0bWxJbmRleCgpO1xudmFyIF9fa2V5SW5kZXhfXyA9IDA7XG5mdW5jdGlvbiBfX2dldEtleV9fKCl7XG5cdHJldHVybiBfX2h0bWxJbmRleF9fICsgX19rZXlJbmRleF9fICsrO1xufVxuXG52YXIgX2RlYywgX2NsYXNzO1xuXG5pbXBvcnQgQ2FsZW5kYXIgZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvY2FsZW5kYXIvaW5kZXhcIjtcbmltcG9ydCBVc2VyU2VydmljZSBmcm9tIFwiLi4vLi4vc2VydmljZS91c2VyXCI7XG5cbmNvbnN0IHsgQ29tcG9uZW50LCBsYXllcnMgfSA9IEVuam95O1xuXG5sZXQgSG9tZSA9IChfZGVjID0gbGF5ZXJzKHtcblx0Y2FsZW5kYXI6IENhbGVuZGFyXG59KSwgX2RlYyhfY2xhc3MgPSBjbGFzcyBIb21lIGV4dGVuZHMgQ29tcG9uZW50IHtcblx0c3RhdGljIFZpZXcgPSByZXF1aXJlKFwiLi9pbmRleC1odG1sXCIpLmRlZmF1bHQ7XG5cdHN0YXRpYyBTdHlsZXMgPSBbcmVxdWlyZShcIi4vaW5kZXgtY3NzXCIpLmRlZmF1bHRdO1xuXG5cdGNvbnN0cnVjdG9yKHByb3BzKSB7XG5cdFx0c3VwZXIocHJvcHMpO1xuXG5cdFx0dGhpcy5zdGF0ZSA9IHtcblx0XHRcdHVzZXI6IG51bGwsXG5cdFx0XHRkYXRlOiBcIlwiXG5cdFx0fTtcblxuXHRcdGlmIChIb21lLl9fc3RhcnRfbGlzdF9fKSB7XG5cdFx0XHRIb21lLl9fc3RhcnRfbGlzdF9fLmZvckVhY2goaXRlbSA9PiB7XG5cdFx0XHRcdGl0ZW0uY2FsbCh0aGlzKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdGNvbXBvbmVudFdpbGxNb3VudCgpIHtcblx0XHRzdXBlci5jb21wb25lbnRXaWxsTW91bnQoKTtcblxuXHRcdHRoaXMubG9hZFVzZXJJbmZvKCk7XG5cdH1cblxuXHRjb21wb25lbnREaWRNb3VudCgpIHtcblx0XHRzdXBlci5jb21wb25lbnREaWRNb3VudCgpO1xuXG5cdFx0dGhpcy5jYWxlbmRhci5vblJlYWR5KCgpID0+IHtcblx0XHRcdHRoaXMuY2FsZW5kYXIuY29tcG9uZW50Lm9uU2VsZWN0KGRhdGUgPT4ge1xuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0XHRkYXRlOiBkYXRlXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHRhc3luYyBsb2FkVXNlckluZm8oKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHR1c2VyOiBhd2FpdCBVc2VyU2VydmljZS5Vc2VySW5mbygpXG5cdFx0fSk7XG5cdH1cblxuXHRvcGVuQ2FsZW5kYXIoKSB7XG5cdFx0dGhpcy5jYWxlbmRhci5zaG93KCk7XG5cdH1cblx0c3RhdGljIF9fc3RhcnRfbGlzdF9fID0gW2Z1bmN0aW9uICgpIHtcblx0XHR0aGlzLl9zdHlsZXMgPSBIb21lLlN0eWxlcztcblx0fSwgZnVuY3Rpb24gKCkge1xuXHRcdHRoaXMudmlldyA9IEhvbWUuVmlldy5jYWxsKHRoaXMpO1xuXHR9XTtcbn0pIHx8IF9jbGFzcyk7XG5leHBvcnQgeyBIb21lIGFzIGRlZmF1bHQgfTsiXX0=