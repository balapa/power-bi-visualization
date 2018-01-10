import React, { Component } from "react";
import data from "./data.json";
import "./css/style.css";

// const compareNumbers = (a, b)=> a - b;

class Chart1 extends Component {

	handleClick = (e)=> {
		e.preventDefault();
		console.log(e.target);
		console.log(this.chilren);
	}

	render() {
		const flexBasis = {
			flexBasis: 100 / data.teams.length + "%"
		}

		return (
			<div>
				<div className="legend-list">
				{
					data.legends.map(el=> {
						const color = { background: el.color }
						return <div key={el.id} className="legend">
							<div className="legend-ball" style={color}></div>
							<div className="legend-text">{el.name}</div>
						</div>
					})
				}
				</div>

				<div className="chart">
					<div className="prices">
						<div className="price-wrapper">
							<div className="price">$4K</div>
						</div>
						<div className="price-wrapper">
							<div className="price">$3K</div>
						</div>
						<div className="price-wrapper">
							<div className="price">$2K</div>
						</div>
						<div className="price-wrapper">
							<div className="price">$1K</div>
						</div>
					</div>

					<div className="teams">
					{
						data.teams.map(el=> {
							return <div key={el.id} className="team-wrapper" style={flexBasis}>
								<div className="team">{el.name}</div>
								{
									el.sales.map((salesEl, index, arr)=> {
										const saleStyle = {
											bottom: salesEl.amount / 10,
											zIndex: arr.length * 10 - Math.round(salesEl.amount/100)
										}

										const ballStyle = {
											background: data.legends[salesEl.legendID - 1].color
										}

										return <div key={salesEl.legendID} className="sale" style={saleStyle} onClick={this.handleClick}>
											<div className="amount">${salesEl.amount}</div>
											<div className="sale-ball" style={ballStyle}></div>
										</div>
									})
								}
							</div>
						})
					}
					</div>
				</div>
			</div>
		);
	}
}

export default Chart1;
