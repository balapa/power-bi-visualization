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
			value: [],
			rtl: false,
		};
	},
	handleSelectChange (value) {
		this.setState({ value });
		const arr = value.split(",").map(item=> parseInt(item, 10));
		this.props.onChange(arr);
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
		const { disabled, stayOpen, value } = this.state;

		return (
			<div className="section">
				<Select
					closeOnSelect={!stayOpen}
					disabled={disabled}
					multi
					onChange={this.handleSelectChange}
					options={this.props.items}
					placeholder={this.props.placeholder}
          removeSelected={this.state.removeSelected}
					rtl={this.state.rtl}
					simpleValue
					value={value}
				/>

			</div>
		);
	}
});

export default MultiSelectField;
