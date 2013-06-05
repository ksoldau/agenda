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

  module Dialogs
    def submit_button 
      find('input[type="submit"]')
    end

    def select_subject(subject)
      select(subject, :from => 'assignment[subject_id]')
    end

    def select_year(year)
      select(year, :from => 'assignment[due_date(1i)]')
    end

    def select_month(month)
      select(month, :from => 'assignment[due_date(2i)]')
    end

    def select_day(day)
      select(day, :from => 'assignment[due_date(3i)]')
    end

    def select_hour(hour)
      select(hour, :from => 'assignment[due_date(4i)]')
    end

    def select_minute(minute)
      select(minute, :from => 'assignment[due_date(5i)]')
    end

    def write_description(description)
      fill_in('assignment[description]', :with => description)
    end
  end
end

