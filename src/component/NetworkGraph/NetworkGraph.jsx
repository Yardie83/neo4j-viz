import React from "reactn";
import * as d3 from "d3";
var svg;
var width, height;

export default class NetworkGraph extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.data === this.props.data) {
      return false;
    }
    return true;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.nodes.length > 0 && nextProps.data !== this.props.data) {
      var data = Object.assign({}, nextProps.data);
      d3.selectAll("svg > *").remove();
      this.renderGraph(data);
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    svg = d3.select(".network").append("svg");

    if (this.props.data.nodes.length > 0) {
      var data = Object.assign({}, this.props.data);
      this.renderGraph(data);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize() {
    width = parseInt(d3.select(".network").style("width"));
    height = parseInt(d3.select(".network").style("height"));
  }

  // RENDER GRAPH START -------------------------------------------------------

  renderGraph(data) {
    const links = data.links;
    const nodes = data.nodes;

    const nodeRadius = 8;

    width = parseInt(d3.select(".network").style("width"));
    height = parseInt(d3.select(".network").style("height"));

    svg
      .attr("viewBox", "0 0 " + width + " " + height)
      .attr("preserveAspectRatio", "xMidYMid meet");

    svg.attr("width", width).attr("height", height);

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id(d => d.id)
          .distance(50)
      )
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "collide",
        d3
          .forceCollide()
          .radius(nodeRadius)
          .strength(1)
      );

    simulation.on("tick", ticked);

    // DRAG START --------------------------------------------------------

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

    // ZOOM START ---------------------------------------------------------
    svg.call(
      d3
        .zoom()
        .scaleExtent([1 / 2, 4])
        .on("zoom", zoomed)
    );

    //add encompassing group for the zoom
    var g = svg.append("g");
    function zoomed() {
      g.attr("transform", d3.event.transform);
    }

    // ZOOM END -----------------------------------------------------------

    // NODES & LINKS START -------------------------------------------------

    var link = g
      .append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke", "#ffffff")
      .attr("stroke-opacity", 0.8);

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
      .attr("r", nodeRadius)
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 1)
      //   .attr("fill-opacity","0.8")
      .attr("fill", "#006494")
      .on("click", d => {
        this.props.selectedNode(d.id);
      });

    node
      .append("text")
      .attr("dx", -10)
      .attr("dy", -20)
      .style("font", "8px sans-serif")
      .style("fill", "#ffffff")
      .text(function(d) {
        return d.id;
      })
      .style("cursor", "default");

    dragHandler(node);

    // NODES & LINKS END -------------------------------------------------

    function ticked() {
      //update circle positions each tick of the simulation
      node.attr("transform", function(d) {
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
  }

  // RENDER GRAPH END -------------------------------------------------------

  render() {
    return <div width="100%" height="100%" className="network " />;
  }
}
