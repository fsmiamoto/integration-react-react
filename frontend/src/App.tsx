import React, { useState } from "react";
import axios from "axios";
// @ts-ignore
import Latex from "react-latex";
import {
    Form,
    Card,
    Header,
    Input,
    Button,
    Grid,
    Message,
    FormProps
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

const { Row, Column: Col } = Grid;

const API_URL = "http://localhost:3300";

interface IResult {
    func: string;
    lowerLimit: number | string;
    upperLimit: number | string;
    result: number | string;
}

function App() {
    const [func, setFunc] = useState("");
    const [results, setResults] = useState<IResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [lowLimit, setLowLimit] = useState("");
    const [upLimit, setUpLimit] = useState("");

    async function handleSubmitValues(event: React.FormEvent) {
        event.preventDefault();

        const req = {
            func: func,
            lower_limit: lowLimit,
            upper_limit: upLimit
        };

        setIsLoading(true);
        try {
            const response = await axios.post(`${API_URL}/integration`, req);
            const newResult = response.data as IResult;
            const newResults = [...results, newResult];
            setResults(newResults);
            setHasError(false);
        } catch (err) {
            console.log(err);
            setErrorMessage("Errou");
            setHasError(true);
        }
        setIsLoading(false);
    }

    function buildLatexString(result: IResult) {
        const latexFunction = result.func
            .replace(/\*\*/g, "^")
            .replace(/\*/g, "");
        return `$\\int_ {${result.lowerLimit}} ^ {${
            result.upperLimit
        }} ${latexFunction}dx \\approx ${result.result}$`;
    }
    return (
        <div className="App">
            <Grid centered={true} padded="vertically">
                <Col width="12" textAlign="center">
                    <Row>
                        <Header as="h2" style={{ marginBottom: 10 }}>
                            Numerical Integration
                        </Header>
                    </Row>
                    {hasError ? (
                        <Row>
                            <Message negative={true}>
                                <Message.Header>
                                    There was an error! Try again
                                </Message.Header>
                            </Message>
                        </Row>
                    ) : null}
                    <Row>
                        <Col width="16" textAlign="center" stretched={true}>
                            <Form
                                onSubmit={handleSubmitValues}
                                loading={isLoading}
                            >
                                <Form.Field required={true}>
                                    <label>Function</label>
                                    <Input
                                        onChange={e => setFunc(e.target.value)}
                                    />
                                </Form.Field>
                                <Form.Field required={true}>
                                    <label>Lower limit</label>
                                    <Input
                                        onChange={e =>
                                            setLowLimit(e.target.value)
                                        }
                                    />
                                </Form.Field>
                                <Form.Field required={true}>
                                    <label>Upper limit</label>
                                    <Input
                                        onChange={e =>
                                            setUpLimit(e.target.value)
                                        }
                                    />
                                </Form.Field>
                                <Button type="submit" style={{ marginTop: 5 }}>
                                    Calculate
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        {results.length ? (
                            <>
                                <Header as="h3" style={{ marginTop: 10 }}>
                                    Results
                                </Header>
                                <Grid
                                    padded={true}
                                    centered={true}
                                    stackable={true}
                                    columns={2}
                                >
                                    {results.map((result, index) => (
                                        <Col width="6" key={index}>
                                            <Card
                                                fluid={true}
                                                key={index}
                                                color="blue"
                                            >
                                                <Card.Content>
                                                    <Card.Header
                                                        content={
                                                            <Latex
                                                                displayMode={
                                                                    true
                                                                }
                                                            >
                                                                {buildLatexString(
                                                                    result
                                                                )}
                                                            </Latex>
                                                        }
                                                    />
                                                    <Card.Description>
                                                        Result #{index + 1}
                                                    </Card.Description>
                                                </Card.Content>
                                            </Card>
                                        </Col>
                                    ))}
                                </Grid>
                            </>
                        ) : null}
                    </Row>
                    <Row>
                        <a target="_blank" href="https://github.com/fsmiamoto">
                            github.com/fsmiamoto
                        </a>
                    </Row>
                </Col>
            </Grid>
        </div>
    );
}

export default App;
