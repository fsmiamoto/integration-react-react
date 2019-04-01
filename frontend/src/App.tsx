import React, { useState } from "react";
import axios from "axios";
import { Input, Button, Layout, Row } from "antd";
import "antd/dist/antd.css";
import "./App.css";

const API_URL = "http://localhost:3300";

const { Header, Footer, Content } = Layout;

function App(props: {}) {
    document.title = "Numerial integration";

    const [func, setFunc] = useState("");
    const [lowLimit, setLowLimit] = useState("");
    const [upLimit, setUpLimit] = useState("");
    const [result, setResult] = useState("");

    async function submitValues() {
        const req = {
            f: func,
            inf_lim: lowLimit,
            sup_lim: upLimit
        };

        const res = await axios.post(`${API_URL}/integrate`, req);
        if (res) {
            setResult(res.data);
        }
    }

    return (
        <div className="App">
            <Layout>
                <Header>
                    <h1 className="header">Numerical Integration</h1>
                </Header>
                <Content style={{ minHeight: "80vh" }}>
                    <Row style={{ margin: 5 }}>
                        <Input
                            className="input"
                            placeholder="Function"
                            value={func}
                            onChange={e => setFunc(e.target.value)}
                        />
                    </Row>
                    <Row style={{ margin: 5 }}>
                        <Input
                            className="input"
                            placeholder="Lower limit"
                            value={lowLimit}
                            onChange={e => setLowLimit(e.target.value)}
                        />
                    </Row>
                    <Row style={{ margin: 5 }}>
                        <Input
                            className="input"
                            placeholder="Upper limit"
                            value={upLimit}
                            onChange={e => setUpLimit(e.target.value)}
                        />
                    </Row>
                    <Button onClick={submitValues}>Enviar</Button>
                    {result ? <h2>Resultado: {result}</h2> : null}
                </Content>
                <Footer>
                    <a href="https://github.com/fsmiamoto">
                        github.com/fsmiamoto
                    </a>
                </Footer>
            </Layout>
        </div>
    );
}

export default App;
