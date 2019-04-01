#!/usr/bin/env python

from numpy import linspace
from numpy.random import uniform
from sympy.parsing.sympy_parser import eval_expr
import scipy.integrate as sp_integrate

# This is for the parsing of the expression string
import numpy
numpy_dict = {a: getattr(numpy, a) for a in dir(numpy)}


def get_function_from_text(f):
    """
    Returns a lambda from the f string
    """
    return lambda x: eval_expr(f, {'x': x}, numpy_dict)


def integrate(f, inf_lim, sup_lim):
    """
    Returns the numerical integration of f string in the supplied limmits
    """
    function = get_function_from_text(f)
    return sp_integrate.quad(function, inf_lim, sup_lim)[0]


if __name__ == '__main__':
    from sys import argv
    f, a, b = argv[1:4]
    a, b = map(int, (a, b))

    print('Integrating {} from {} to {}'.format(f, a, b))
    result = integrate(f, a, b)
    print('Approximation: {}'.format(result))
