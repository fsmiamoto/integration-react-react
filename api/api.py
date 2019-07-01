#!/usr/bin/env python

from flask import Flask, jsonify, request
from flask_cors import CORS
from integrate import integrate

app = Flask(__name__)
CORS(app)


@app.route("/integration", methods=["POST"])
def return_integration():
    try:
        func = request.json['func']
        lower_limit = float(request.json['lower_limit'])
        upper_limit = float(request.json['upper_limit'])

        result = integrate(func, lower_limit, upper_limit)

        response = {
            'func': func,
            'lowerLimit': lower_limit,
            'upperLimit': upper_limit,
            'result': '{:.6f}'.format(result),
        }
        return jsonify(response)
    except Exception as e:
        print(e)
        return e, 400


if __name__ == '__main__':
    app.run(port=3300, debug=True)
