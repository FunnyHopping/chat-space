# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...


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
