module All
  module SessionSteps
    def fill_in_email(email)
      fill_in 'user[email]', :with => email
    end
    
    def fill_in_password(password)
      fill_in 'user[password]', :with => password
    end

    def fill_in_password_confirmation(password)
      fill_in 'user[password_confirmation]', :with => password
    end

    def fill_in_first_name(first_name)
      fill_in 'user[first_name]', :with => first_name
    end

    def fill_in_last_name(last_name)
      fill_in 'user[last_name]', :with => last_name
    end

    def sign_in_with(email, password)
      fill_in_email(email)
      fill_in_password(password)
      click_button 'Sign in'
    end

    def sign_up_with(email, password, first_name, last_name)
      fill_in_email(email)
      fill_in_password(password)
      fill_in_password_confirmation(password)
      fill_in_first_name(first_name)
      fill_in_last_name(last_name)
      click_button 'Sign up'
    end

    def user_exists(email)
      User.where(:email => email).should_not be_empty
    end

  end
end

