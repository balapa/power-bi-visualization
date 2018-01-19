import React from "react";
import createClass from 'create-react-class';
import data from "./../data/chart2.json";
import "./../css/style.css";
import MultiSelectField from './MultiSelectField';

const Chart2 = createClass({
	displayName: "Chart2",
	getInitialState() {
		return {
			universityList: data.universityList.map((item, index)=> {
				return {
					label: item.name,
					value: index,
					name: item.name,
					score: item.score,
					id: index
				}
			}),
			autocompleteValue: [],
			currentList: data.universityList.map((item, index)=> index)
		}
	},

	render() {
		let list = this.state.universityList;

		return (
			<div>

				<div className="filter-wrapper">
					<MultiSelectField closeOnSelect="1" placeholder="School Name" items={list} onChange={(arr, value)=> {

						let selectedSchools = arr.sort((a,b)=> a - b);

						// if array is NaN, populate with original array instead 
						if(isNaN(selectedSchools[0])) selectedSchools = list.map(x=> x.id);

						this.setState({
							currentList: selectedSchools,
							autocompleteValue: value
						});

					}} value={this.state.autocompleteValue} />

				</div>

				<div className="chart">

					<div className="univ-list">
						{
							this.state.currentList.map((currentItem, index, arr)=> {

								if(currentItem === list[currentItem].id) {
									const univ = list[currentItem];

									const univStatsStyle = {
										width: univ.score + "%",
										height: 15,
										paddingRight: 5,
										lineHeight: "16px",
										fontSize: ".6rem"
									}

									if(arr.length < 5) {
										univStatsStyle.height = 50;
										univStatsStyle.paddingRight = 20;
										univStatsStyle.lineHeight = "51px";
										univStatsStyle.fontSize = "1.5rem";
									} else if(arr.length < 8) {
										univStatsStyle.height = 25;
										univStatsStyle.paddingRight = 10;
										univStatsStyle.lineHeight = "26px";
										univStatsStyle.fontSize = "1rem";
									}

									return <div key={index} className="univ-item">
										<div className="univ-name">{univ.name}</div>
										<div className="univ-stats" style={ univStatsStyle }>{univ.score}</div>
									</div>

								}

								return undefined;
							})
						}
					</div>

					{/* level list */}
					<div className="level-list">
						<div className="level-item">
							<div className="level-amount">20%</div>
						</div>
						<div className="level-item">
							<div className="level-amount">40%</div>
						</div>
						<div className="level-item">
							<div className="level-amount">60%</div>
						</div>
						<div className="level-item">
							<div className="level-amount">80%</div>
						</div>
						<div className="level-item">
							<div className="level-amount">100%</div>
						</div>
						{/* <div className="level-item"></div> */}
						{/* 	<div className="level-amount">0%</div> */}
						{/* </div> */}
					</div>

				</div>

			</div>
		)
	}
});

export default Chart2;
