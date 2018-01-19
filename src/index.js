import React from 'react';
import ReactDOM from 'react-dom';
import Chart1 from './components/Chart1';
import Chart2 from './components/Chart2';
import Chart3 from './components/Chart3';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Chart1 />, document.getElementById('chart-wrapper'));
ReactDOM.render(<Chart2 />, document.getElementById('chart2-wrapper'));
ReactDOM.render(<Chart3 />, document.getElementById('chart3-wrapper'));
registerServiceWorker();
