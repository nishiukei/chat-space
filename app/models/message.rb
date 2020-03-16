class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group

  validates :contet, presence: true, unless: :image?

  mount_uploader :image, ImageUploader
end
