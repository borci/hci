#!/usr/bin/env python

def D(count):
	return 1.10

def T(count):
	return count * 0.28

P = 1.10
B = 0.10
H = 0.40
M = 1.20
vysledok = M + P + B + B + M + P + B + B + P + B + B + M + P + B + P + B + P + B + D(4) + B + P + B + P + B + P + B + P + B + P + B + D(3) + B + P + B + P + B + P + B + P + B + P + B + D(4) + B + P + B + P + B + P + B + P + B + P + B +D(3) + B + M + P + B + B + P + B + B + T(8) + P + B + B + M + P + B + B
print(vysledok)


