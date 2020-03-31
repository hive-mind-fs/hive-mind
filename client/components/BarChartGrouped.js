import React, { PureComponent, Fragment } from 'react';
import { Svg, G, Line, Rect, Text } from 'react-native-svg';
import { H3 } from 'native-base';
import * as d3 from 'd3';

const GRAPH_MARGIN = 35;
const GRAPH_BAR_WIDTH = 10;
const colors = {
  axis: '#aaa',
  bars1: 'gold',
  bars2: 'black'
};

const colorsArr = [colors.bars1, colors.bars2];

export default class BarChartGrouped extends PureComponent {
  render() {
    // Dimensions
    const SVGHeight = 200;
    const SVGWidth = 400;
    const graphHeight = SVGHeight - 2 * GRAPH_MARGIN;
    const graphWidth = SVGWidth - 2 * GRAPH_MARGIN;
    // const data = this.props.data;

    const data = [
      {
        label: '4',
        player: 5,
        opponent: 3
      },
      {
        label: '5',
        player: 2,
        opponent: 2
      },
      {
        label: '6',
        player: 1,
        opponent: 1
      },
      {
        label: '7',
        player: 1,
        opponent: 3
      },
      {
        label: '8',
        player: 2,
        opponent: 0
      },
      {
        label: '9',
        player: 0,
        opponent: 1
      }
    ];

    // X scale point
    const xDomain = data.map(item => item.label);
    const xRange = [0, graphWidth];
    const x = d3
      .scalePoint()
      .domain(xDomain)
      .range(xRange)
      .padding(1);

    // Y scale linear
    const maxValue = d3.max(data, d =>
      d.player > d.opponent ? d.player : d.opponent
    );
    const topValue = maxValue % 2 === 0 ? maxValue + 2 : maxValue + 1;
    const yDomain = [0, topValue];
    const yRange = [0, graphHeight];
    const y = d3
      .scaleLinear()
      .domain(yDomain)
      .range(yRange);

    const yValues = () => {
      let arr = [];

      for (let i = 1; i <= topValue; i++) {
        let yCoord = (graphHeight / topValue) * i;
        let value = i;

        if (i % 2 === 0) {
          arr.push({
            value,
            yCoord
          });
        }
      }

      return arr;
    };

    // top axis and middle axis
    const middleValue = topValue / 2;

    return (
      <Svg width={SVGWidth} height={SVGHeight}>
        <Text y="20" x="17" fontSize="22">
          Word Length
        </Text>
        <G y={graphHeight + GRAPH_MARGIN - 5} x={GRAPH_MARGIN / 2}>
          {/* Top value label */}
          {['You', 'Opponent'].map((name, i) => (
            <Text
              key={name}
              fill={colorsArr[i % colorsArr.length]}
              stroke={colorsArr[i % colorsArr.length]}
              fontSize="12"
              fontWeight="100"
              textAnchor="end"
              x={graphWidth}
              y={-graphHeight + 15 + i * 15}
              // x="0"
              // y={5 + i * 15}
            >
              {name}
            </Text>
          ))}

          {/* top axis */}
          <Line
            x1="0"
            y1={y(topValue) * -1}
            x2={graphWidth}
            y2={y(topValue) * -1}
            stroke={colors.axis}
            strokeDasharray={[3, 3]}
            strokeWidth="0.5"
          />

          {/* bottom axis */}
          <Line
            x1="0"
            y1="2"
            x2={graphWidth}
            y2="2"
            stroke={colors.axis}
            strokeWidth="0.5"
          />

          {/* left axis */}
          <Line
            x1="0"
            y1="2"
            x2="0"
            y2={y(topValue) * -1}
            stroke={colors.axis}
            strokeWidth="2.5"
          />

          {/* bars */}
          {data.map(item => (
            <>
              <Rect
                key={'bar-player' + item.label}
                x={x(item.label) - GRAPH_BAR_WIDTH * 1.2}
                y={y(item.player) * -1}
                rx={2.5}
                width={GRAPH_BAR_WIDTH}
                height={y(item.player)}
                fill={colors.bars1}
              />
              <Rect
                key={'bar-opponent' + item.label}
                x={x(item.label) + GRAPH_BAR_WIDTH * 0.1}
                y={y(item.opponent) * -1}
                rx={2.5}
                width={GRAPH_BAR_WIDTH}
                height={y(item.opponent)}
                fill={colors.bars2}
              />
            </>
          ))}

          {/* X labels */}
          <Text y="35" x={graphWidth / 2} textAnchor="middle">
            Word Length
          </Text>
          {data.map((item, idx) => (
            <Text
              key={'label' + idx}
              fontSize="8"
              x={x(item.label)}
              y="20"
              textAnchor="middle"
              fontSize="14"
            >
              {item.label}
            </Text>
          ))}

          {/* Y labels */}
          <Text
            transform="rotate(-90)"
            y="-5"
            x={graphHeight / 2}
            textAnchor="middle"
          >
            Words Got
          </Text>
          {yValues().map(yValue => (
            <>
              <Text
                key={yValue.value}
                fontSize="8"
                x="10"
                y={-yValue.yCoord + 14}
                textAnchor="middle"
                fontSize="14"
              >
                {yValue.value}
              </Text>

              <Line
                x1="0"
                y1={-yValue.yCoord}
                x2={graphWidth}
                y2={-yValue.yCoord}
                stroke={colors.axis}
                strokeDasharray={[3, 3]}
                strokeWidth="0.5"
              />
            </>
          ))}
        </G>
      </Svg>
    );
  }
}
