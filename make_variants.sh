#!/bin/bash

cd ${0%/*}

make_variant() {
  mkdir variants/$1
  cp -R ext-icon/* variants/$1/
  sed -i.bak "s/Repro ICONS/Repro ICONS var$1/" variants/$1/manifest.json
}

rm -rf variants/*
make_variant 0
make_variant 1
make_variant 2
make_variant 3
make_variant 4
make_variant 5
make_variant 6
make_variant 7
make_variant 8
make_variant 9
make_variant A
make_variant B
make_variant C
make_variant D
make_variant E
make_variant F
make_variant G
make_variant H
make_variant I
make_variant J
make_variant K
make_variant L
make_variant M
make_variant N
make_variant O
make_variant P
make_variant Q
make_variant R
make_variant S
make_variant T
make_variant U
make_variant V
make_variant W
make_variant X
make_variant Y
make_variant Z
