import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

function BarChart({ data }) {
  const ref = useRef();

  useEffect(() => {
    // Use D3 to draw the bar chart
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove(); // Clear svg content before redrawing

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;
    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand().rangeRound([0, width]).padding(0.1).domain(data.map(d => d.letter));
    const y = d3.scaleLinear().rangeRound([height, 0]).domain([0, d3.max(data, d => d.frequency)]);

    g.append("g")
     .attr("class", "axis axis--x")
     .attr("transform", `translate(0,${height})`)
     .call(d3.axisBottom(x));

    g.append("g")
     .attr("class", "axis axis--y")
     .call(d3.axisLeft(y).ticks(10, "%"))
     .append("text")
     .attr("transform", "rotate(-90)")
     .attr("y", 6)
     .attr("dy", "0.71em")
     .attr("text-anchor", "end")
     .text("Frequency");

    g.selectAll(".bar")
     .data(data)
     .enter().append("rect")
     .attr("class", "bar")
     .attr("x", d => x(d.letter))
     .attr("y", d => y(d.frequency))
     .attr("width", x.bandwidth())
     .attr("height", d => height - y(d.frequency));
  }, [data]); // Redraw chart if data changes

  return (
    <svg ref={ref} width="600" height="400"></svg>
  );
}


export default BarChart