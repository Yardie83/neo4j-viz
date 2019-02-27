var neo4j = require("neo4j-driver").v1;
var _ = require("lodash");

var driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic("neo4j", process.env.REACT_APP_NEO4J_AUTH_PASSWORD)
);

export async function fetchData(search) {
  let _nodes = [];
  let _links = [];

  var session = driver.session();

  var queryString = `Match (a)-[r]-(b) where (any(prop in keys(a) where a[prop]=~'(?i).*${search}.*')) return a, r, b`;
  const response = await session.run(queryString).then(results => {
    session.close();

    results.records.forEach(res => {
      if (
        _.isEmpty(
          _nodes.filter(
            _nodes => _nodes.id === res.get("a").identity.toNumber()
          )
        )
      ) {
        _nodes.push({ id: res.get("a").identity.toNumber() });
      }
      if (
        _.isEmpty(
          _nodes.filter(
            _nodes => _nodes.id === res.get("b").identity.toNumber()
          )
        )
      ) {
        _nodes.push({ id: res.get("b").identity.toNumber() });
      }
      _links.push({
        source: res.get("r").start.toNumber(),
        target: res.get("r").end.toNumber()
      });
    });
    return { nodes: _nodes, links: _links };
  });
  return response;
}

export async function getChildrenById(parentID, existingNode) {
  let _nodes = existingNode;
  let _links = existingNode;

  var session = driver.session();

  //Match (a)-[r]-(b) where id(a) = 473918 return a,r,b
  var queryString = `Match (a)-[r]-(b) where id(a) = ${parentID} return r,b`;
  const response = await session.run(queryString).then(results => {
    session.close();

    results.records.forEach(res => {
      if (
        _.isEmpty(
          _nodes.filter(node => node.id === res.get("b").identity.toNumber())
        )
      ) {
        _nodes.push({
          id: res.get("b").identity.toNumber(),
          label: res.get("b").labels,
          properties: res.get("b").properties,
          parent: parentID
        });
      }
      if (
        _.isEmpty(
          _links.filter(
            link =>
              link === res.get("r").start.toNumber() ||
              link === res.get("r").end.toNumber()
          )
        )
      ) {
        _links.push({
          source: res.get("r").start.toNumber(),
          target: res.get("r").end.toNumber(),
          type: res.get("r").type
        });
      }
    });
    return { nodes: _nodes, links: _links };
  });
  return response;
}

export async function fetchNodebyId(nodeId) {
  let _node = [];

  var session = driver.session();

  var queryString = `MATCH (node)  WHERE ID(node) = ${nodeId}  RETURN node`;
  const response = await session.run(queryString).then(results => {
    session.close();

    results.records.forEach(res => {
      if (
        _.isEmpty(
          _node.filter(node => node.id === res.get("node").identity.toNumber())
        )
      ) {
        _node.push({
          id: res.get("node").identity.toNumber(),
          label: res.get("node").labels,
          properties: res.get("node").properties
        });
      }
    });
    return { node: _node };
  });
  return response;
}
