import React, { PureComponent, Fragment } from 'react';
import { Svg, G, Line, Rect, Text } from 'react-native-svg';
import { View } from 'react-native';
import * as d3 from 'd3';

const GRAPH_MARGIN = 30;
const GRAPH_BAR_WIDTH = 20;
const colors = {
  axis: '#aaa',
  bars1: 'gold',
  bars2: 'black'
};

const colorsArr = [colors.bars1, colors.bars2];

export default class BarChartStacked extends PureComponent {
  render() {
    // Dimensions
    const SVGHeight = 250;
    const SVGWidth = 400;
    const graphHeight = SVGHeight - 2 * GRAPH_MARGIN;
    const graphWidth = SVGWidth - 2 * GRAPH_MARGIN;

    let data = [
      {
        label: 'PANGRAM',
        player: 40,
        totalPossible: 100
      },
      {
        label: 'DANGROM',
        player: 60,
        totalPossible: 200
      },
      {
        label: 'SAMGRAM',
        player: 80,
        totalPossible: 90
      },
      {
        label: 'SONORAM',
        player: 34,
        totalPossible: 50
      },
      {
        label: 'JAMARAM',
        player: 80,
        totalPossible: 90
      },
      {
        label: 'WOMORAM',
        player: 34,
        totalPossible: 50
      },
      {
        label: 'LIMIRAM',
        player: 34,
        totalPossible: 50
      }
    ];

    if (this.props.data) {
      data = this.props.data.slice(data.length - 7);
    }

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
      d.player > d.totalPossible ? d.player : d.totalPossible
    );
    const topValue = Math.ceil(maxValue / this.props.round) * this.props.round;
    const yDomain = [0, topValue];
    const yRange = [0, graphHeight];
    const y = d3
      .scaleLinear()
      .domain(yDomain)
      .range(yRange);

    // Create y-axis value labels and lines
    const yValues = () => {
      let arr = [];

      for (let i = 1; i <= topValue; i++) {
        let yCoord = (graphHeight / topValue) * i;
        let value = i;

        if (i % this.props.round === 0) {
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
      <View style={{ paddingTop: 50 }}>
        <Svg width={SVGWidth} height={SVGHeight}>
          <Text y="15" x="17" fontSize="20">
            Points Per Game
          </Text>
          <G y={graphHeight + GRAPH_MARGIN - 5} x={GRAPH_MARGIN / 2}>
            {/* LEGEND - Top value label */}
            {['You', 'Possible'].map((name, i) => (
              <Text
                key={name}
                fill={colorsArr[i % colorsArr.length]}
                stroke={colorsArr[i % colorsArr.length]}
                fontSize="12"
                fontWeight="100"
                textAnchor="end"
                x={graphWidth}
                y={-graphHeight - 15 + i * 15}
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
              strokeWidth="1"
            />

            {/* bars */}
            {data.map((item, idx) => (
              <>
                <Rect
                  key={'bar-possible' + item.label}
                  x={x(item.label) - GRAPH_BAR_WIDTH + 15}
                  y={y(item.totalPossible) * -1}
                  rx={2.5}
                  width={GRAPH_BAR_WIDTH}
                  height={y(item.totalPossible)}
                  fill={colors.bars2}
                />
                <Rect
                  key={'bar-player' + item.label}
                  x={x(item.label) - GRAPH_BAR_WIDTH + 15}
                  y={y(item.player) * -1}
                  rx={2.5}
                  width={GRAPH_BAR_WIDTH}
                  height={y(item.player)}
                  fill={colors.bars1}
                />
              </>
            ))}

            {/* X labels */}
            <Text y="20" x={graphWidth / 2} textAnchor="middle">
              Last 7 Games
            </Text>

            {/* Y labels */}
            <Text
              transform="rotate(-90)"
              y="-5"
              x={graphHeight / 2}
              textAnchor="middle"
            >
              Points
            </Text>

            {yValues().map(yValue => (
              <>
                <Text
                  key={yValue.value}
                  fontSize="8"
                  x="5"
                  y={-yValue.yCoord + 14}
                  textAnchor="Left"
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
      </View>
    );
  }
}
