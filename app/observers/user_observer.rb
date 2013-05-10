class UserObserver < ActiveRecord::Observer
  observe :user #class name might key it into it 

  def after_create(user) 
    user.subjects.create(:name => "Other")
  end
end
