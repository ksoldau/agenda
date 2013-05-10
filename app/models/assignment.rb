class Assignment < ActiveRecord::Base
  # attr_accessible :title, :body
  belongs_to :user
  belongs_to :subject

  validates :description, :subject_id, :due_date, :user_id, :presence => true

  #to order assignemnts by due date (closest due date is first)
  default_scope order('due_date')
end
