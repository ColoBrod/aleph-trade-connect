import React, { Component, ReactNode } from 'react';
// import { useMediaQuery } from 'react-responsive'
import Chart, { BubbleDataPoint, CartesianScaleTypeRegistry, ChartConfiguration, ChartData, ChartDataset, ChartTypeRegistry, Point, ScaleOptionsByType, scales } from 'chart.js/auto';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';

import './plugin-inner-bar-text';

import './style.css';

// @ts-ignore
// window.Chart = Chart;
// @ts-ignore
window.chart = {};

interface Props {
  id: string;
  type: "bar" | "pie" | "line" | "doughnut";
  direction?: "horizontal" | "vertical";
  legend?: boolean;
  labels: string[];
  datasets: ChartDataset<keyof ChartTypeRegistry, (number | [number, number] | Point | BubbleDataPoint | null)[]>[];
  scales?: _DeepPartialObject<{
    [key: string]: ScaleOptionsByType<"radialLinear" | keyof CartesianScaleTypeRegistry>;
  }> | undefined;
  innerBarText?: {
    display: boolean;
    pos: 'left' | 'right' | 'top';
  };
  doughnutInner?: ReactNode;
  responsive?: boolean;
  width?: string;
  height?: string;
  cutout?: number; // Only for doughnut chart
}

class Diagram extends Component<Props> {

	private chartRef = React.createRef<HTMLCanvasElement>();

  private config: ChartConfiguration;
  private chart: any;

  constructor(props: Props) {
    super(props);
    const { type, legend: displayLegend = true, direction = "vertical", scales, cutout = 74 } = props;
    const { innerBarText, responsive = true } = props;
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
          // @ts-ignore
          innerBarText: innerBarText ? innerBarText : false,
          colors: {
            enabled: false,
          },
          legend: {
            display: displayLegend,
            align: 'start',
            position: 'top',
            labels: {
              // borderRadius: 4,
              boxWidth: 8,
              boxHeight: 8,
              color: "#1D2129",
              font: {
                family: "'Segoi UI', sans-serif",
                size: 14,
              },
            },
            title: {
              text: "Неделя",
              display: false,
            }
          },
        },
        responsive,
        scales: scales,
        elements: type === 'line' ? {
          point: { radius: 0 },
        } : undefined,
        // @ts-ignore
        cutout: type === "doughnut" 
          ? cutout 
          : undefined,
      }
    }
    
  }

  componentDidMount() {
    const { config } = this;
    const { id } = this.props;
    const node = this.chartRef.current;
		const ctx = node?.getContext("2d");
    if (ctx) this.chart = new Chart(ctx, config);
    // @ts-ignore
    window.chart[id] = this.chart;
    // @ts-ignore
    // if (this.chart) window.chart = this.chart;
	}

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<{}>, snapshot?: any): void {
    const initial = JSON.stringify(this.config.data.datasets);
    const final = JSON.stringify(this.props.datasets);
    if (initial === final) return;
    // Object.assign(this.config.data.datasets, this.props.datasets);
    this.config.data.datasets = this.props.datasets;
    this.chart.update(); // 'none'
  }

  render() {
    const { id, type, doughnutInner, height = "", width = "" } = this.props;
		return (
      <div className={`diagram diagram__${id}`} >
        <div className="diagram__inner" style={{ width, height }}>
          <canvas
            id={id}
            ref={this.chartRef}
            // width={width}
            // height={height}
          />
          {
            type === 'doughnut' 
              ? <div className="diagram__doughnut-inner">
                  { doughnutInner || "" }
                </div>
              : null
          }
        </div>
      </div>
    );
	}


}

export default Diagram;