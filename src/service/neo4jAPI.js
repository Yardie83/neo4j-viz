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