#!/usr/bin/env python

from flask import Flask, jsonify, request
from flask_cors import CORS
from integrate import integrate

app = Flask(__name__)
CORS(app)


@app.route("/integrate", methods=["POST"])
def return_integration():
    a = request.json['inf_lim']
    b = request.json['sup_lim']
    f = request.json['f']

    # Convert a,b to float
    a, b = map(float, (a, b))

    response = {
        'result': integrate(f, a, b)
    }

    return jsonify(response)


if __name__ == '__main__':
    app.run(port=3300, debug=True)
