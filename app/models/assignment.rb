class Assignment < ActiveRecord::Base
  # attr_accessible :title, :body
  belongs_to :user
  
 validates :description, :due_date, :user_id, :presence => true 
end
