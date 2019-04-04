import React, { useState } from "react";
import axios from "axios";
import { Input, Button, Layout, Row, Col } from "antd";
import "antd/dist/antd.css";
import "./App.css";

const API_URL = "http://localhost:3300";

const { Header, Footer, Content } = Layout;

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
    const [lowLimit, setLowLimit] = useState("");
    const [upLimit, setUpLimit] = useState("");

    async function submitValues() {
        const req = {
            f: func,
            inf_lim: lowLimit,
            sup_lim: upLimit
        };

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
    }

    return (
        <div className="App">
            <Layout>
                <Header>
                    <h1 className="header">Numerical Integration</h1>
                </Header>
                <Content style={{ minHeight: "80vh", minWidth: "100vw" }}>
                    <Row type="flex" justify="center" style={{ width: "100%" }}>
                        <Col>
                            <Row style={{ margin: 5 }}>
                                <Input
                                    className="input"
                                    placeholder="Function"
                                    style={{ width: "100%" }}
                                    value={func}
                                    onChange={e => setFunc(e.target.value)}
                                />
                            </Row>
                            <Row style={{ margin: 5 }}>
                                <Input
                                    className="input"
                                    placeholder="Lower limit"
                                    style={{ width: "100%" }}
                                    value={lowLimit}
                                    onChange={e => setLowLimit(e.target.value)}
                                />
                            </Row>
                            <Row style={{ margin: 5 }}>
                                <Input
                                    className="input"
                                    placeholder="Upper limit"
                                    style={{ width: "100%" }}
                                    value={upLimit}
                                    onChange={e => setUpLimit(e.target.value)}
                                />
                            </Row>
                            <Row type="flex" justify="center">
                                <Button onClick={submitValues}>Enviar</Button>
                            </Row>

                            <Row
                                type="flex"
                                justify="center"
                                style={{ marginTop: 20 }}
                            >
                                {results.length ? (
                                    <ol>
                                        {results.map((result, index) => (
                                            <li key={index}>
                                                Integrating {result.func} from{" "}
                                                {result.lowLimit} up to{" "}
                                                {result.upLimit} ={" "}
                                                {result.result}
                                            </li>
                                        ))}
                                    </ol>
                                ) : null}
                            </Row>
                        </Col>
                    </Row>
                </Content>
                <Footer>
                    <Row type="flex" justify="center">
                        <a href="https://github.com/fsmiamoto">
                            github.com/fsmiamoto
                        </a>
                    </Row>
                </Footer>
            </Layout>
        </div>
    );
}

export default App;
