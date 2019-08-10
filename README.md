## Usersテーブル

|Column|Type|Options|
|------|----|-------|
|nickname|string|null: false, foreign_key: false|
|email|text|null: false, foreign_key: false|
|password|string|null: false, foreign_key: false|

### Association
- has_many :groups through: :groups_users
- has_many :messages

## Groupsテーブル

|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false, foreign_key: false|

### Association
- has_many :users through: :groups_users

## Messagesテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group
