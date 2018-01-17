import React from 'react';
import ReactDOM from 'react-dom';
import Chart1 from './components/Chart1';
import Chart2 from './components/Chart2';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Chart1 />, document.getElementById('chart-wrapper'));
ReactDOM.render(<Chart2 />, document.getElementById('chart2-wrapper'));
registerServiceWorker();
