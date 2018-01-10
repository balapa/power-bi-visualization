import React from 'react';
import ReactDOM from 'react-dom';
import Chart1 from './Chart1';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Chart1 />, document.getElementById('chart-wrapper'));
registerServiceWorker();
