import React from 'react';
import ReactDOM from 'react-dom';
import Chart1 from './Chart1';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Chart1 />, div);
});
