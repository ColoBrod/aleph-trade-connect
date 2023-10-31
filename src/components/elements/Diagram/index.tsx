import React, { Component } from 'react';
import Chart, { BubbleDataPoint, ChartConfiguration, ChartData, ChartDataset, ChartTypeRegistry, Point } from 'chart.js/auto';

interface Props {
  id: string;
  type: "bar" | "pie" | "line" | "doughnut";
  direction?: "horizontal" | "vertical";
  legend?: boolean;
  labels: string[];
  datasets: ChartDataset<keyof ChartTypeRegistry, (number | [number, number] | Point | BubbleDataPoint | null)[]>[];
}

class Diagram extends Component<Props> {

	private chartRef = React.createRef<HTMLCanvasElement>();

  private config: ChartConfiguration;

  constructor(props: Props) {
    super(props);
    // const { config } = this;
    // const { data } = config;
    // data.labels = ;
    // data.datasets = ;
    // Other config props
    const { legend: displayLegend = true, direction = "vertical", type } = props;
    this.config = {
      type,
      data: {
        labels: [...props.labels],
        datasets: [...props.datasets],
      },
      options: {
        maintainAspectRatio: false,
        indexAxis: direction === "horizontal" ? 'y' : 'x',
        plugins: {
          colors: {
            enabled: false,
          },
          legend: {
            display: displayLegend,
            align: 'start',
            position: 'top',
          },
        },
        responsive: true,
      }
    }
  }

  componentDidMount() {
    const { config } = this;
    const node = this.chartRef.current;
		const ctx = node?.getContext("2d");
    if (ctx) new Chart(ctx, config);
	}

  render() {
    const { id } = this.props;
		return (
      <div className='diagram'>
        <canvas
          id={id}
          ref={this.chartRef}
        />
      </div>
    )
	}
}

export default Diagram;