export const viewTypeOptions = [
  { value: 'Yearly', label: 'Yearly' },
  { value: 'Monthly', label: 'Monthly' },
  { value: 'Daily', label: 'Daily' },
];

export const chartTypeOptions = [
  { value: 'Line', label: 'Line' },
  { value: 'Bar', label: 'Bar' },
];

export const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'CPU Hours Chart',
    },
    zoom: {
      zoom: {
        wheel: {
          enabled: true, // SET SCROOL ZOOM TO TRUE
        },
        mode: 'xy',
        speed: 100,
      },
      pan: {
        enabled: true,
        mode: 'xy',
        speed: 100,
      },
    },
  },
};
