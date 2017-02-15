import Enjoy from "enjoy-rn-support-elong";
const { React } = Enjoy;

var {Box, A, Body,  Util, document} = Enjoy;

var __dom__ = React.createElement;
var __class__ = Util.arrayClass;
var __util__ = Util.pageUtil(__project + "/views/home/index");

var __htmlIndex__ = Util.getHtmlIndex();
var __keyIndex__ = 0;
function __getKey__(){
	return __htmlIndex__ + __keyIndex__ ++;
}

__util__.header({});

export default function View() {
	var __view__ = {};
	var a, b, c;
	__view__.header = {
		render: function () {
			this.page.navbar.view({
				url: this.page.url,
				render: function (__nav_util__) {
					return __dom__(Box, {
						_styles: this._styles,
						css: [".rn-head", ".navbar"],
						_id: __getKey__()
					}, __dom__(Box, {
						css: [".rn-title", ".navbar-title"],
						_id: __getKey__()
					}, "\u9996\u9875"), __dom__(Box, {
						css: [".rn-left", ".navbar-left"],
						_id: __getKey__()
					}, __dom__(A, { onClick: this.openCalendar.bind(this), css: [".rn-a"],
						_id: __getKey__()
					}, this.state.date || "日历")), __dom__(Box, {
						css: [".rn-right", ".navbar-right"],
						_id: __getKey__()
					}, this.state.user ? __dom__(Box, {
						css: [".rn-span", ".user"],
						_id: __getKey__()
					}, "\u4F60\u597D", __dom__(A, { href: "/user-info?userId=" + this.state.user.id, css: [".rn-a"],
						_id: __getKey__(),
						_util: __util__,
						_navigator: this.page
					}, this.state.user.name)) : __dom__(Box, {
						css: [".rn-span", ".logining"],
						_id: __getKey__()
					}, "\u767B\u9646\u4E2D...")));
				}.bind(this)
			});
			a = this._styles;
			b = this.state.date;
			c = this.state.user ? __dom__(Box, {
				css: [".rn-span", ".user"],
				_id: __getKey__()
			}, "\u4F60\u597D", __dom__(A, { href: "/user-info?userId=" + this.state.user.id, css: [".rn-a"],
				_id: __getKey__(),
				_util: __util__,
				_navigator: this.page
			}, this.state.user.name)) : __dom__(Box, {
				css: [".rn-span", ".logining"],
				_id: __getKey__()
			}, "\u767B\u9646\u4E2D...");
		}.bind(this),
		check: function () {
			return (this.state.user ? __dom__(Box, {
				css: [".rn-span", ".user"],
				_id: __getKey__()
			}, "\u4F60\u597D", __dom__(A, { href: "/user-info?userId=" + this.state.user.id, css: [".rn-a"],
				_id: __getKey__(),
				_util: __util__,
				_navigator: this.page
			}, this.state.user.name)) : __dom__(Box, {
				css: [".rn-span", ".logining"],
				_id: __getKey__()
			}, "\u767B\u9646\u4E2D...")) !== c || this.state.date !== b || this._styles !== a;
		}.bind(this)
	};

	__view__.render = function (components) {
		return __dom__(Body, {
			_component_id: this.props._id,
			_styles: this._styles,
			css: [".rn-body"],
			_id: __getKey__()
		}, __dom__(Box, {
			css: [".rn-p"],
			_id: __getKey__()
		}, "Hello Enjoy!"), components);
	}.bind(this);

	return __view__;
}