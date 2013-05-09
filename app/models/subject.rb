class Subject < ActiveRecord::Base
  belongs_to :user
  # attr_accessible :name

  validates :name, :assignment_id, :presence => true

  #may want to default scope it to order alphabetically
end
