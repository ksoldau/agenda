class Subject < ActiveRecord::Base
  belongs_to :user
  has_many :assignments, :dependent => :destroy
  # attr_accessible :name

  validates :name, :user_id, :presence => true

  # to order alphabetically
 default_scope order('name') 
end
