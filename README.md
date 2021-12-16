# ゴロツク

数字から語呂わせを自動で生成するアプリです。

## デモ

ゴロツク: https://goro-tsuku.herokuapp.com/

## 使い方
```
$ yarn install
$ npm start
```

## 実装

Bi-gram言語モデルで語呂の良さを評価し、Beam Searchにより出力しています。
