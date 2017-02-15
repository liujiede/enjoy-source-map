import Enjoy from "enjoy-rn-support-elong";
const { React } = Enjoy;

var { Util, document} = Enjoy;

var __dom__ = React.createElement;
var __class__ = Util.arrayClass;
var __util__ = Util.pageUtil(__project + "/views/home/index");

var __htmlIndex__ = Util.getHtmlIndex();
var __keyIndex__ = 0;
function __getKey__(){
	return __htmlIndex__ + __keyIndex__ ++;
}

var _dec, _class;

import Calendar from "../../components/calendar/index";
import UserService from "../../service/user";

const { Component, layers } = Enjoy;

let Home = (_dec = layers({
	calendar: Calendar
}), _dec(_class = class Home extends Component {
	static View = require("./index-html").default;
	static Styles = [require("./index-css").default];

	constructor(props) {
		super(props);

		this.state = {
			user: null,
			date: ""
		};

		if (Home.__start_list__) {
			Home.__start_list__.forEach(item => {
				item.call(this);
			});
		}
	}

	componentWillMount() {
		super.componentWillMount();

		this.loadUserInfo();
	}

	componentDidMount() {
		super.componentDidMount();

		this.calendar.onReady(() => {
			this.calendar.component.onSelect(date => {
				this.setState({
					date: date
				});
			});
		});
	}

	async loadUserInfo() {
		this.setState({
			user: await UserService.UserInfo()
		});
	}

	openCalendar() {
		this.calendar.show();
	}
	static __start_list__ = [function () {
		this._styles = Home.Styles;
	}, function () {
		this.view = Home.View.call(this);
	}];
}) || _class);
export { Home as default };