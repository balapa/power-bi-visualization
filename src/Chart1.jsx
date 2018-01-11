import React, { Component } from "react";
import data from "./data.json";
import "./css/style.css";

// const compareNumbers = (a, b)=> a - b;

class Chart1 extends Component {

	constructor(){
		super();
		this.state = {
			legends: data.legends,
			teams: data.teams,
			sales: data.sales
		}
	}

	handleClick = (e)=> {
		e.preventDefault();
	}

	render() {
		let legends = this.state.legends;
		let teams = this.state.teams;
		let sales = this.state.sales;

		const flexBasis = {
			flexBasis: 100 / teams.length + "%"
		}

		return (
			<div>
				<div className="legend-list">
					{
						legends.map(el=> {
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
							teams.map(el=> {

								return <div key={el.id} className="team-wrapper" style={flexBasis}>
									<div className="team">{el.name}</div>
									{
										sales.map((salesEl, index, arr)=> {
											if(salesEl.teamID === el.id){

												const saleStyle = {
													bottom: salesEl.amount / 10,
													zIndex: arr.length * 10 - Math.round(salesEl.amount/100)
												}

												const ballStyle = {
													background: legends[salesEl.legendID - 1].color
												}

												let saleClass = "";

												(salesEl.isHidden) ? saleClass = "sale hidden" : saleClass = "sale";

												return <div key={index} className={saleClass} style={saleStyle} onClick={this.handleClick} data-index={index}>
													<div className="amount">${salesEl.amount}</div>
													<div className="sale-ball" style={ballStyle}></div>
												</div>
											}

											return undefined; // just to get rid of warnings
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
