import * as d3 from "d3";

export default function(svg, width, height, data) {
  console.log("[Data]", data);
  console.log("[Data Nodes]", data.nodes);
  console.log("[Data Links]", data.links);
  const links = data.links;
  const nodes = data.nodes;
  const simulation = d3
    .forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("forceManyBody", d3.forceManyBody());

  // -----------------------------------------------------------

  simulation.on("tick", ticked);

  // DRAG -----------------------------------------------------------

  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  var dragHandler = d3
    .drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);
  // DRAG END -----------------------------------------------------------

  // ZOOM  --------------------------------------------------------------
  svg
    .call(
      d3
        .zoom()
        .scaleExtent([1 / 2, 4])
        .on("zoom", zoomed)
    )
    .attr("width", width)
    .attr("height", height);
  //add encompassing group for the zoom
  var g = svg.append("g");
  function zoomed() {
    g.attr("transform", d3.event.transform);
  }

  // ZOOM END -----------------------------------------------------------

  var link = g
    .append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(links)
    .enter()
    .append("line")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6);

  var node = g
    .append("g")
    .attr("class", "nodes")
    .selectAll(".node")
    .data(nodes)
    .enter()
    .append("g")
    .attr("class", "node");

  node
    .append("circle")
    .attr("r", 10)
    .attr("stroke", "#413c58")
    .attr("fill", "#a3cabc")
    .attr("stroke-width", 1);

  node
    .append("text")
    .attr("dx", -10)
    .attr("dy", 0)
    .attr("font", "5px sans-serif")
    .text(function(d) {
      console.log("[D Index]", d.id);
      return d.id;
    });

  dragHandler(node);

  function ticked() {
    //update circle positions each tick of the simulation
    node
      // .attr("cx", function(d) {
      //   return d.x;
      // })
      // .attr("cy", function(d) {
      //   return d.y;
      // })
      .attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
      });

    //update link positions
    link
      .attr("x1", function(d) {
        return d.source.x;
      })
      .attr("y1", function(d) {
        return d.source.y;
      })
      .attr("x2", function(d) {
        return d.target.x;
      })
      .attr("y2", function(d) {
        return d.target.y;
      });
  }
  // -----------------------------------------------------------
}
