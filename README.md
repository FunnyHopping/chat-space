## Usersテーブル

|Column|Type|Options|
|------|----|-------|
|nickname|string|null: false|
|email|text|null: false|
|password|string|null: false|

### Association
- has_many :groups_users
- has_many :groups through: :groups_users
- has_many :messages

## Groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :groups_users
- has_many :users through: :groups_users
- has_many :messages

## Messagesテーブル

|Column|Type|Options|
|------|----|-------|
|image|text||
|text|text||

### Association
- belongs_to :user
- belongs_to :group

##Groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group
