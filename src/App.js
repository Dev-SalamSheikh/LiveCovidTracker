import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Row } from "react-bootstrap";

function App() {
  const [leatest, setLatest] = useState([]);
  const [result, setResult] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");

  useEffect(() => {
    axios
      .all([
        axios.get("https://corona.lmao.ninja/v2/all"),
        axios.get("https://corona.lmao.ninja/v2/countries"),
      ])
      .then((responsArr) => {
        setLatest(responsArr[0].data);
        setResult(responsArr[1].data);
      });
  }, []);

  const date = new Date(parseInt(leatest.updated));
  const lastUpdate = date.toString();

  const filterCountry = result.filter((item) => {
    return searchCountry !== "" ? item.country.includes(searchCountry) : item;
  });

  const countries = filterCountry.map((data, i) => {
    return (
      <CardGroup>
        <Card
          key={i}
          className="text-center"
          bg="secondary"
          text={"white"}
          style={{ margin: "10px" }}
        >
          <Card.Img variant="top" src={data.countryInfo.flag} />
          <Card.Body>
            <Card.Title>{data.country}</Card.Title>
            <Card.Text>Total {data.cases} Cases</Card.Text>
            <Card.Text>Total {data.deaths} Deaths</Card.Text>
            <Card.Text>Total{data.recovered} Recovered</Card.Text>
            <Card.Text>Today's Cases {data.todayCases}</Card.Text>
            <Card.Text>Today's Deaths {data.todayDeaths}</Card.Text>
            <Card.Text>Active Cases {data.active}</Card.Text>
            <Card.Text>Critical {data.critical}</Card.Text>
          </Card.Body>
        </Card>
      </CardGroup>
    );
  });

  return (
    <div className="App">
      <CardGroup className="mx-3 text-center">
        <Card bg="secondary" text={"white"} style={{ margin: "10px" }}>
          <Card.Body>
            <Card.Title>Total Cases</Card.Title>
            <Card.Text>{leatest.cases}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdate}</small>
          </Card.Footer>
        </Card>
        <Card bg="danger" text={"white"} style={{ margin: "10px" }}>
          <Card.Body>
            <Card.Title>Total Deaths</Card.Title>
            <Card.Text>{leatest.deaths}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdate}</small>
          </Card.Footer>
        </Card>
        <Card bg="success" text={"white"} style={{ margin: "10px" }}>
          <Card.Body>
            <Card.Title>Total Recover</Card.Title>
            <Card.Text>{leatest.recovered}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdate}o</small>
          </Card.Footer>
        </Card>
      </CardGroup>
      <Form>
        <Form.Group className="mb-3 mx-4" controlId="exampleForm.ControlInput1">
          <Form.Control
            type="text"
            placeholder="Search a Country"
            onChange={(e) => setSearchCountry(e.target.value)}
          />
        </Form.Group>
      </Form>
      <Row xs={1} md={2} lg={4} className="g-4 mx-1">
        {countries}
      </Row>
    </div>
  );
}

export default App;
