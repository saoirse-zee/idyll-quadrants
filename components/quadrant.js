const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');

const size = 600;

const xScale = d3.scaleLinear()
  .domain([-5, 5])
  .range([10, 550])

const yScale = d3.scaleLinear()
  .domain([-5, 5])
  .range([550, 10])

const xAxis = d3.axisBottom(xScale)

const yAxis = d3.axisLeft(yScale)

const historyLine =
  d3.line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y))

const projectionLine =
  d3.line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y))
    .curve(d3.curveCatmullRom.alpha(0.5))

class Quadrant extends D3Component {

  initialize(node, props) {
    const { data = [] } = props
    console.log(data);
    const svg = this.svg = d3.select(node).append('svg');

    svg.attr('viewBox', `0 0 ${size} ${size}`)
      .style('width', '100%')
      .style('height', 'auto')

    svg.append("g")
      .attr('class', 'axis')
      .attr('transform', 'translate(0, 300)')
      .call(xAxis)

    svg.append("g")
      .attr('class', 'axis')
      .attr('transform', 'translate(300, 0)')
      .call(yAxis)

    svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d.x))
      .attr('cy', d => yScale(d.y))
      .attr('r', 20)
      .attr('fill', 'steelblue')
      .attr('opacity', '0.5')
  }
}

module.exports = Quadrant
