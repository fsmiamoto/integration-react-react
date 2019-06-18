import React, { useState } from "react";
import axios from "axios";
import { Card, Header, Input, Button, Grid } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

const { Row, Column: Col } = Grid;

const API_URL = "http://localhost:3300";

interface IResult {
  func: string;
  lowLimit: number | string;
  upLimit: number | string;
  result: number | string;
}

function App(props: {}) {
  document.title = "Numerial integration";

  const [func, setFunc] = useState("");
  const [results, setResults] = useState<IResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [lowLimit, setLowLimit] = useState("");
  const [upLimit, setUpLimit] = useState("");

  async function submitValues() {
    const req = {
      f: func,
      inf_lim: lowLimit,
      sup_lim: upLimit
    };

    setLoading(true);
    const response = await axios.post(`${API_URL}/integrate`, req);

    if (response) {
      const integrationResult = response.data.result;

      const result = {
        func,
        lowLimit,
        upLimit,
        result: integrationResult
      };

      const newResults = [...results, result];
      setResults(newResults);
    }
    setLoading(false);
  }

  return (
    <div className="App">
      <Grid centered={true} stretched={true} padded="vertically">
        <Row>
          <Header as="h2">Numerical Integration</Header>
        </Row>
        <Col width={8} textAlign="center" stretched={true}>
          <Row>
            <Input
              className="input"
              placeholder="Function"
              style={{ width: "100%", marginTop: 10 }}
              value={func}
              onChange={e => setFunc(e.target.value)}
            />
          </Row>
          <Row>
            <Input
              className="input"
              placeholder="Lower limit"
              style={{ width: "100%", marginTop: 10 }}
              value={lowLimit}
              onChange={e => setLowLimit(e.target.value)}
            />
          </Row>
          <Row>
            <Input
              className="input"
              placeholder="Upper limit"
              style={{ width: "100%", marginTop: 10 }}
              value={upLimit}
              onChange={e => setUpLimit(e.target.value)}
            />
          </Row>
          <Row>
            <Button
              onClick={submitValues}
              loading={loading}
              style={{ marginTop: 5 }}
            >
              Calculate
            </Button>
          </Row>
          {results.length ? (
            <>
              <Header as="h3">Results</Header>
              <Grid columns={3} padded={true} centered={true}>
                {results.map((result, index) => (
                  <Col>
                    <Card key={index}>
                      <Card.Content>
                        <Card.Header content={result.result} />
                        <Card.Description>
                          Integrating {result.func} from {result.lowLimit} up to{" "}
                          {result.upLimit}
                        </Card.Description>
                      </Card.Content>
                    </Card>
                  </Col>
                ))}
              </Grid>
            </>
          ) : null}
          <Grid centered={true}>
            <Col textAlign="center">
              <a
                style={{ marginTop: 10 }}
                target="_blank"
                href="https://github.com/fsmiamoto"
              >
                github.com/fsmiamoto
              </a>
            </Col>
          </Grid>
        </Col>
      </Grid>
    </div>
  );
}

export default App;
