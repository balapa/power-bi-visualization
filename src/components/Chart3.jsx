import React from "react";
import createClass from "create-react-class";
import "./../css/style.css";
import data from "./../data/chart3.json";
import dataServices from "./../data/chart3-services.json";
import _ from "lodash";

const Chart3 = createClass({
	displayName: "Chart3",
	getInitialState() {
		return {
			flights: data.map(item=> {
				item.isActive = true;
				return item;
			}),
			maxFlight: _.maxBy(data, "flights").flights,
			minFlight: _.minBy(data, "flights").flights,
			maxQuantity: _.maxBy(data, "Quantity").Quantity,
			minQuantity: _.minBy(data, "Quantity").Quantity,
			airportCodes: _.uniqBy(data, (item)=> item.airport_code).map(item=> {
				return {
					content: item.airport_code,
					isActive: true
				}
			}),
			flightsRange: [],
			airportColors: {
				"ATL": "#e74c3c",
				"JFK": "#1abc9c",
				"LAX": "#3498db",
				"LGA": "#9b59b6"
			}
		}
	},

	handleCode(e) {
		const elValue = e.target.dataset.value;
		const newCodes = this.state.airportCodes.map(code=> {
			let newCode = {}
			if(code.content === elValue){
				newCode = {
					content: code.content,
					isActive: !code.isActive
				}

				this.state.flights.filter(item=> 
					item.airport_code === elValue
				).map(item=> item.isActive = !code.isActive)

				return newCode;

			} else {
				return code;
			}
		})
		this.setState({
			airportCodes: newCodes
		});
	},

	render() {

		return (
			<div>

				<div className="checkbox-filters-wrapper">
					{/* <div className="col-md-6 col-sm-12 col-xs-12"> */}

				<div className="checkbox-filter">
					<h3>Airport Code</h3>
					<div className="airport-codes">
						{
							this.state.airportCodes.map((code, index)=> {

								let codeClass = "";
								(code.isActive) ? codeClass = "code-item active" : codeClass = "code-item";

								return <div key={index} data-value={code.content} className={codeClass} onClick={(e)=> this.handleCode(e)}>
									<div className="code-checkbox">

										<svg width="15" height="15" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
											<path fill="none" className="checkmark" stroke="#FFF" strokeWidth="2" d="M2 7l4 4 7-7"/>
										</svg>

									</div>
									<div className="code-content">{code.content}</div>
								</div>
							})
						}
					</div>
				</div>

					{/* </div> */}

					{/* <div className="col-md-6 col-sm-12 col-xs-12"> */}
						<div className="checkbox-filter">
							<h3>Type</h3>
							<div className="types">
								<div className="code-item" onClick={(e)=> {

									e.target.classList.toggle("active");

									this.setState({
										flights: dataServices.map(item=> {
											item.isActive = true;
											return item
										})
									})

								}}>
									<div className="code-checkbox">
										<svg width="15" height="15" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
											<path fill="none" className="checkmark" stroke="#FFF" strokeWidth="2" d="M2 7l4 4 7-7"/>
										</svg>
									</div>
									<div className="code-content">Services</div>
								</div>
							</div>
						</div>
					{/* </div> */}

				</div>

				<div className="chart">

					<div className="x-axis">
						<div className="line">
							<div className="line-content">6K</div>
						</div>
						<div className="line">
							<div className="line-content">4K</div>
						</div>
						<div className="line">
							<div className="line-content">2K</div>
						</div>
					</div>

					<div className="y-axis">
						<div className="line">
							<div className="line-content">300</div>
						</div>
						<div className="line">
							<div className="line-content">600</div>
						</div>
						<div className="line">
							<div className="line-content">900</div>
						</div>
						<div className="line">
							<div className="line-content">1200</div>
						</div>

						{
							this.state.flights.map((flight, index, arr)=> {

								const ballStyle = {
									left: flight.Quantity / 2.5,
									bottom: flight.flights / 16
								}

								if(flight.airport_code === "JFK") {
									ballStyle.background = this.state.airportColors["JFK"];
								} else if(flight.airport_code === "ATL") {
									ballStyle.background = this.state.airportColors["ATL"];
								} else if(flight.airport_code === "LAX") {
									ballStyle.background = this.state.airportColors["LAX"];
								} else {
									ballStyle.background = this.state.airportColors["LGA"];
								}

								let flightBallClass = "";

								if(flight.isActive) {
									flightBallClass = "flight-ball";
								} else {
									flightBallClass = "flight-ball hidden";
								}

								return <div key={index} className={flightBallClass} style={ballStyle}></div>
							})
						}

					</div>

				</div>
			</div>
		);
	}
})

export default Chart3;
