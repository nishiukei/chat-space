# DB設計
--------------------------------------------------------
## userテーブル
|column|Type|Options|
|------|----|------|
|name|string|null: false, index: true|
|email|string|null: false|
|password|string|null: false|
### Association
- has_many :groups, througth: :groups_users
- has_many :groups_users
- has_many :messages


## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user


## groupテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Association
- has_many :users, througth :groups_users
- has_many :messages
- has_many :groups_users

## messageテーブル
|Column|Type|Options|
|------|----|-------|
|message|text||
|image|string||
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|
### Association
- belongs_to: user
- belongs_to: group
