module All
  module Helpers
    def fill_in_email(email)
      fill_in 'user[email]', :with => email
    end
    
    def fill_in_password(password)
      fill_in 'user[password]', :with => 'p@ssword'
    end
  end
end

