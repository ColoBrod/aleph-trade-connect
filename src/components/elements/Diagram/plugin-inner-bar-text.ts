// import Chart from "chart.js";
import Chart from 'chart.js/auto';

Chart.register({
  id: 'innerBarText',
  afterDatasetsDraw(chart, args, options: { display: boolean; pos: 'left' | 'right' | 'top'; }) {
    if (!options?.display) return;
    const { ctx, data, chartArea: { left, right, bottom, top }, scales: { x, y } } = chart;
    if (data.datasets.length === 0) return;
    
    /**
     * Горизонтальный бар-чарт. Надпись слева
     */
    if (options.pos === 'left') {
      ctx.save();
      data.datasets[0].data.forEach((dataPoint, index) => {
        ctx.font = "normal 12px sans-serif";
        ctx.fillStyle = "black";
        const label = data.labels?.[index];
        ctx.fillText(`${label ? label : ""}`, left + 10, y.getPixelForValue(index) - 22);
        ctx.font = "bold 18px sans-serif";
        ctx.fillStyle = "white";
        ctx.fillText(`${dataPoint}`, left + 10, y.getPixelForValue(index) + 7);
      });
    }

    /**
     * Горизонтальный бар-чарт. Надпись справа
     */
    else if (options.pos === 'right') {
      ctx.save();

      chart.getDatasetMeta(0).data.forEach((bar, index) => {
        // if (!bar?.width) return;
      })

      // data.datasets[0].data.forEach((dataPoint, index) => {
      //   const offsetX = x.getPixelForValue(index);
      //   const offsetY = y.getPixelForValue(index);
      //   const output = chart.getDatasetMeta(0);
      //   ctx.font = "normal 12px sans-serif";
      //   ctx.fillStyle = "black";
      //   const label = data.labels?.[index];
      //   ctx.fillText(`${label ? label : ""}`, left + 10, y.getPixelForValue(index) - 22);
      //   ctx.font = "bold 18px sans-serif";
      //   ctx.fillStyle = "white";
      //   ctx.fillText(`${dataPoint}`, left + 10, y.getPixelForValue(index) + 7);
      // });
    }
    
  }
});