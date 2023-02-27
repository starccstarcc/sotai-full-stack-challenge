import React, { useEffect, useState, version } from 'react';
import { getChartData } from '@client/apis';
import { DateField } from '@client/components/Chart/DateField';
import { SelectField, OptionValue } from '@client/components/Chart/SelectField';
import { viewTypeOptions, chartTypeOptions, chartOptions } from '@client/constants';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin,
);

type ChartData = {
  labels: string[];
  datasets: [
    {
      label: string;
      data: Float32Array[];
      borderColor: string;
      backgroundColor: string;
    },
  ];
};

export function ChartView() {
  const [query, setQuery] = useState({
    viewType: { label: 'Yearly', value: 'Yearly' },
    from: '1993-04-10',
    to: '2023-02-26',
    chartType: { label: 'Line', value: 'Line' },
  });

  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: 'CPU Hours',
        data: [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  });

  useEffect(() => {
    const getData = async () => {
      const responseData = await getChartData({
        view_type: query.viewType.value,
        from: query.from,
        to: query.to,
      });
      const currentLabels: string[] = [];
      const currentData: Float32Array[] = [];
      switch (query.viewType.value) {
        case 'Yearly':
          responseData.data.forEach((data: { year: string; hours: Float32Array }) => {
            currentLabels.push(data.year);
            currentData.push(data.hours);
          });
          break;
        case 'Monthly':
          responseData.data.forEach(
            (data: { year: string; month: string; hours: Float32Array }) => {
              currentLabels.push(data.year + '-' + data.month);
              currentData.push(data.hours);
            },
          );
          break;
        case 'Daily':
          responseData.data.forEach((data: { logged_date: string; cpu_hours: Float32Array }) => {
            currentLabels.push(data.logged_date);
            currentData.push(data.cpu_hours);
          });
          break;
        default:
          break;
      }
      setChartData({
        labels: currentLabels,
        datasets: [
          {
            ...chartData.datasets[0],
            data: currentData,
          },
        ],
      });
    };

    getData();
  }, [query]);

  const handleQueryChange = (field: string, value: string | OptionValue) => {
    setQuery({
      ...query,
      [field]: value,
    });
  };

  return (
    <div>
      <div className='flex items-center space-x-4 p-3'>
        <DateField
          name='from'
          label='From'
          handleQueryChange={handleQueryChange}
          value={query.from}
        />
        <DateField name='to' label='To' handleQueryChange={handleQueryChange} value={query.to} />
        <SelectField
          name='viewType'
          label='View Type'
          options={viewTypeOptions}
          handleQueryChange={handleQueryChange}
          value={query.viewType}
        />
        <SelectField
          name='chartType'
          label='Chart Type'
          options={chartTypeOptions}
          handleQueryChange={handleQueryChange}
          value={query.chartType}
        />
      </div>
      {query.chartType.value === 'Line' ? (
        <Line options={chartOptions} data={chartData} />
      ) : (
        <Bar options={chartOptions} data={chartData} />
      )}
    </div>
  );
}
