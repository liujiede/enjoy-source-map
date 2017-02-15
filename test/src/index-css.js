import Enjoy from "enjoy-rn-support-elong";
var {StyleSheet} = Enjoy;

export default new StyleSheet({
	rules: {
		"0": {
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: "#fcfcfc"
		},
		"1": {
			backgroundColor: "#f6f6f6",
			borderBottomWidth: "1px",
			borderStyle: "solid",
			borderBottomColor: "#eee"
		},
		"2": {
			color: "#666"
		},
		"3": {
			color: "#38f"
		},
		"4": {
			color: "#999"
		},
		"5": {
			fontSize: "60px",
			fontWeight: "100",
			color: "#aaa",
			textAlign: "center"
		}
	},
	index: {
		".rn-body": [{
			key: "0"
		}],
		".navbar": [{
			key: "1"
		}],
		".user": [{
			key: "2"
		}],
		".rn-a": [{
			selector: ".user .rn-a",
			key: "3"
		}],
		".logining": [{
			key: "4"
		}],
		".rn-p": [{
			key: "5"
		}]
	}
});