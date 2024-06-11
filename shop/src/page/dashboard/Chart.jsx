import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import "./index.css"
import { Typography } from '@mui/material';

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490, 2000, 2780, 1890, 2390, 3490];
const pData = [240, 138, 90, 308, 200, 270, 180, 290, 490, 400, 30, 40];
const xLabels = [
  'Tháng 1',
  'Tháng 2',
  'Tháng 3',
  'Tháng 4',
  'Tháng 5',
  'Tháng 6',
  'Tháng 7',
  'Tháng 8',
  'Tháng 9',
  'Tháng 10',
  'Tháng 11',
  'Tháng 12',
];

export default function Chart() {
  return (
    <>
    <Typography variant='h6' className=''>Phân tích bán hàng</Typography>
    <LineChart
      series={[
        { data: pData, label: 'Đã bán' },
        { data: uData, label: 'Trả hàng' },
      ]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
     
    />
    </>
  );
}
