class Subject < ActiveRecord::Base
  belongs_to :user
  has_many :assignments
  # attr_accessible :name

  validates :name, :user_id, :presence => true

  #may want to default scope it to order alphabetically
end
