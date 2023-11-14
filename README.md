# nri4-api-solo

## アプリケーション名   
会社周辺のランチマップ

※ソースは[こちら](https://github.com/kktarok28/nri4-api-solo)

## アプリケーション概要
忙しいNRI社員のクオリティー オブ ランチ (OQL)を向上させる。<br>
MM/大手町/木場ごとに、飲食店を社員自身が評価し、NRI社員限定で使えるマップを作成する。

## 機能一覧
- ユーザが飲食店情報を登録できる
- ユーザが飲食店情報を更新できる
- ユーザが飲食店を評価できる
- ユーザが飲食店の評価を変更できる
- ユーザが飲食店の評価を削除できる
- 評価観点は、「美味しさ」、「提供の速さ」、「混雑度」の3観点
  - 美味しさ：非常に美味しい、美味しい、まあまあ、微妙
  - 提供の速さ：15分以上、5分以上-15分未満、5分未満
  - 混雑度：必ず並ぶ、たまに並ぶ、すぐ入れる
- その他口コミ項目
  - フリーフォーマット項目
　- キャパシティー
- ユーザが画面から飲食店の一覧を閲覧できる。場所や評価順でソートできる。
- ユーザが画面から飲食店の口コミを入力・変更・削除できる。
- ユーザは1つの飲食店に1つの口コミを投稿できる

## ER図
### データイメージ

![ER図](design/ER.svg)


## APIエンドポイント

### 飲食店評価
- 評価一覧取得：GET http://api/restaurants/reviews/users/{:user}
- 評価取得：GET http://api/restaurants/{:restaurant}/reviews/users/{:user}
- 評価登録：POST http://api/restaurants/{:restaurant}/reviews/users/{:user}
- 評価変更：PATCH  http://api/restaurants/{:restaurant}/reviews/users/{:user}
- 評価削除：DELETE http://api/restaurants/{:restaurant}/reviews/users/{:user}