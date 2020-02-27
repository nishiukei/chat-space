# DB設計
--------------------------------------------------------
## userテーブル
|column|Type|Options|
|------|----|------|
|name|text|null: false|
|email|text|null: false|
|password|text|null: false|
### Association
- has_many :group, througth: :groups_users
- has_many :groups_users
- has_many :message


## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user


## groupテーブル
|Column|Type|Options|
|------|----|-------|
|name|text|null: false|
### Association
- has_many :user, througth :groups_users
- has_many :message
- has_many :groups_users

## messageテーブル
|Column|Type|Options|
|------|----|-------|
|message|text|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to: user
- belongs_to: group
