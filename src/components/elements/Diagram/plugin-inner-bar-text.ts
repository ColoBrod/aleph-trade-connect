// import Chart from "chart.js";
import Chart from 'chart.js/auto';

Chart.register({
  id: 'innerBarText',
  afterDatasetsDraw(chart, args, options: { display: boolean; }) {
    if (!options?.display) return;
    const { ctx, data, chartArea: { left }, scales: { x, y } } = chart;
    if (data.datasets.length === 0) return;
    ctx.save();
    data.datasets[0].data.forEach((dataPoint, index) => {
      ctx.font = "normal 12px sans-serif";
      ctx.fillStyle = "black";
      const label = data.labels?.[index];
      ctx.fillText(`${label ? label : ""}`, left + 10, y.getPixelForValue(index) - 30);
      ctx.font = "bold 24px sans-serif";
      ctx.fillStyle = "white";
      ctx.fillText(`${dataPoint}`, left + 10, y.getPixelForValue(index) + 9);
    });
  }
});