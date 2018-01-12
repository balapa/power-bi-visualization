import React, { Component } from "react";
import data from "./data.json";
import "./css/style.css";

class Chart1 extends Component {

	constructor(){
		super();
		this.state = {
			legends: data.legends,
			teams: data.teams,
			sales: data.sales,
			currentLegend: data.legends.map(x=> x.id) // get all ids from legends object, we need the ids to highlight the related dots
		}
	}

	handleClick = (e)=> {
		e.preventDefault();
		this.setState({
			currentLegend: [parseInt(e.target.getAttribute("data-legendid"), 10)]
		});
	}

	restoreSalesVisibility = (e) => {
		e.stopPropagation();
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

					{
						sales.forEach(salesEl=> {

							salesEl.isHidden = true;

							// if currentlegend is similar to salesEl legendid, show the salesEl
							this.state.currentLegend.forEach((currentLegend, index)=> {
								console.log(currentLegend);

								if (currentLegend === salesEl.legendID) salesEl.isHidden = false;

							})
						})
					}

					<div className="teams" onClick={this.restoreSalesVisibility}>
						{
							teams.map(el=>

								<div key={el.id} className="team-wrapper" style={flexBasis}>
								<div className="team">{el.name}</div>
									{
										sales.map((salesEl, index, arr)=> {

											if (salesEl.teamID === el.id) {

												const saleStyle = {
													bottom: salesEl.amount / 10,
													zIndex: arr.length * 10 - Math.round(salesEl.amount/100)
												}

												const ballStyle = {
													background: legends[salesEl.legendID - 1].color
												}

												let saleClass = "";

												(salesEl.isHidden) ? saleClass = "sale hidden" : saleClass = "sale";

												return <div key={index} className={saleClass} style={saleStyle} onClick={this.handleClick} data-index={index} data-legendid={salesEl.legendID}>
													<div className="amount">${salesEl.amount}</div>
													<div className="sale-ball" style={ballStyle}></div>
												</div>
											}

											return undefined; // just to get rid of warnings
										})
									}
								</div>
							)
						}
					</div>
				</div>
			</div>
		);
	}
}

export default Chart1;
