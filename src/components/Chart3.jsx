import React from "react";
import createClass from "create-react-class";
import "./../css/style.css";
import data from "./../data/chart3.json";
import dataServices from "./../data/chart3-services.json";
import dataProducts from "./../data/chart3-products.json";
import dataBlank from "./../data/chart3-blank.json";
import _ from "lodash";

const Chart3 = createClass({
	displayName: "Chart3",
	getInitialState() {
		return {
			flights: data.map(item=> {
				item.isActive = true;
				return item;
			}),
			airportCodes: _.uniqBy(data, (item)=> item.airport_code).map(item=> {
				return {
					content: item.airport_code,
					isActive: true
				}
			}),
			yAxisArray: [0,1,2],
			yAxisBase: 300,
			yAxisBaseWidth: 125,
			xAxisArray: [0,1,2],
			xAxisBase: 2000,
			xAxisBaseHeight: 125,
			airportColors: {
				"ATL": "rgb(239, 107, 93)",
				"JFK": "#1abc9c",
				"LAX": "#3498db",
				"LGA": "#9b59b6"
			},
			types: [
				{
					content: "(Blank)",
					isActive: false
				},
				{
					content: "PRODUCTS",
					isActive: false
				},
				{
					content: "SERVICES",
					isActive: false
				}
			]
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

	handleType(e) {
		const elValue = e.target.dataset.value;
		let newType = {}
		const newTypes = this.state.types.map(type=> {
			if(type.content === elValue){
				newType = {
					content: type.content,
					isActive: !type.isActive
				}
				return newType;
			} else {
				return {
					content: type.content,
					isActive: false
				};
			}
		});

		this.setState({
			types: newTypes,
			airportCodes: this.state.airportCodes.map(code=> {
				return {
					content: code.content,
					isActive: true
				}
			})
		});

		if(newType.content === "SERVICES" && newType.isActive) {
			this.setState({
				yAxisBase: 100,
				yAxisBaseWidth: 115,
				yAxisArray: [0,1,2,3],
				flights: dataServices.map(item=> {
					item.isActive = true;
					return item;
				})
			})
		} else if(newType.content === "PRODUCTS" && newType.isActive) {
			this.setState({
				yAxisBase: 200,
				yAxisBaseWidth: 115,
				yAxisArray: [0,1,2,3],
				flights: dataProducts.map(item=> {
					item.isActive = true;
					return item;
				})
			})
		} else if(newType.content === "(Blank)" && newType.isActive) {
			this.setState({
				yAxisBase: 0.5,
				yAxisBaseWidth: 115,
				yAxisArray: [0,1,2,3],
				flights: dataBlank.map(item=> {
					item.isActive = true;
					return item;
				})
			})
		} else {
			this.setState({
				yAxisBase: 300,
				yAxisBaseWidth: 125,
				yAxisArray: [0,1,2],
				flights: data.map(item=> {
					item.isActive = true;
					return item;
				})
			})
		}
	},

	render() {

		return (
			<div>

				<div className="legend-list">
					{
						Object.keys(this.state.airportColors).map((key, index)=> {
							return <div key={index} className="legend">
								<div className="legend-ball" style={{ background: this.state.airportColors[key] }}></div>
								<div className="legend-text">{key}</div>
							</div>
						})
					}
				</div>

				<div className="checkbox-filters-wrapper">

					<div className="checkbox-filter">
						<h3>Airport Code</h3>
						<div className="airport-codes display-flex">
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

					<div className="checkbox-filter">
						<h3>Type</h3>
						<div className="types display-flex">

							{
								this.state.types.map((type, index)=> {

									let elClass = "";
									(type.isActive) ? elClass = "code-item active" : elClass = "code-item";

									return <div key={index} data-value={type.content} className={elClass} onClick={(e)=> this.handleType(e)}>
										<div className="code-checkbox">

											<svg width="15" height="15" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
												<path fill="none" className="checkmark" stroke="#FFF" strokeWidth="2" d="M2 7l4 4 7-7"/>
											</svg>

										</div>
										<div className="code-content">{type.content}</div>
									</div>

								})
							}
						</div>
					</div>

				</div>

				<div className="chart">

					<div className="x-axis">
						{
							this.state.xAxisArray.map((item, index, arr)=> {
								return <div className="line" key={index} style={{ height: this.state.xAxisBaseHeight }}>
									<div className="line-content">{(arr.length - index) * this.state.xAxisBase}</div>
								</div>
							})
						}
					</div>

					<div className="y-axis">
						{
							this.state.yAxisArray.map((item, index, arr)=> {
								return <div className="line" key={index} style={{ width: this.state.yAxisBaseWidth }}>
									<div className="line-content">{(index + 1) * this.state.yAxisBase}</div>
								</div>
							})
						}

						{
							this.state.flights.map((flight, index, arr)=> {

								const ballStyle = {
									left: flight.Quantity / (this.state.yAxisBase / this.state.yAxisBaseWidth),
									bottom: flight.flights / (this.state.xAxisBase / this.state.xAxisBaseHeight)
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

								if(Number.isInteger(flight.Quantity)) {
									return <div key={index} className={flightBallClass} style={ballStyle}></div>
								}

								return undefined;
							})
						}

					</div>

				</div>

			</div>
		);
	}
})

export default Chart3;
