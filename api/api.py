#!/usr/bin/env python

from flask import Flask, jsonify, request
from integrate import integrate

app = Flask(__name__)


@app.route("/integrate", methods=["POST"])
def return_integration():
    a = request.json['inf_lim']
    b = request.json['sup_lim']
    f = request.json['f']

    response = {
        'result': integrate(f, a, b)
    }

    return jsonify(response)


if __name__ == '__main__':
    app.run(port=3300, debug=True)
