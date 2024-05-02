import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Chart = () => {
  const data = [
    { name: 'Янв', доход: 40000 },
    { name: 'Фев', доход: 35000 },
    { name: 'Мар', доход: 20000 },
    { name: 'Апр', доход: 27800 },
    { name: 'Май', доход: 18900 },
    { name: 'Июн', доход: 23900 },
    { name: 'Июл', доход: 34900 },
  ];

  return (
    <div style={{ width: '100%', height: '400px', marginTop: '20px' }}>
      <LineChart width={800} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="доход" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default Chart;
