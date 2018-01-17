import React from 'react';
import createClass from 'create-react-class';
import 'react-select/dist/react-select.css';
import PropTypes from 'prop-types';
import Select from 'react-select';

var MultiSelectField = createClass({
	displayName: 'MultiSelectField',
	label: PropTypes.string,
	propTypes: {
	},
	getInitialState () {
		return {
			removeSelected: true,
			disabled: false,
			stayOpen: false,
			rtl: false,
		};
	},
	handleSelectChange (value) {
		const arr = value.split(",").map(item=> parseInt(item, 10));
		this.props.onChange(arr, value);
	},
	toggleCheckbox (e) {
		this.setState({
			[e.target.name]: e.target.checked,
		});
	},
	toggleRtl (e) {
		let rtl = e.target.checked;
		this.setState({ rtl });
	},

	render () {

		return (
			<div className="section">
				<Select
					closeOnSelect={(parseInt(this.props.closeOnSelect, 10) > 0) ? true : false}
					multi
					onChange={this.handleSelectChange}
					options={this.props.items}
					placeholder={this.props.placeholder}
					removeSelected={this.state.removeSelected}
					rtl={this.state.rtl}
					simpleValue
					value={this.props.value}
				/>

			</div>
		);
	}
});

export default MultiSelectField;
