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

    def sign_up_with(email, password, pw_confirmation, first_name, last_name)
      fill_in_email(email)
      fill_in_password(password)
      fill_in_password_confirmation(pw_confirmation)
      fill_in_first_name(first_name)
      fill_in_last_name(last_name)
      click_button 'Sign up'
    end

    def user_exists(email)
      User.where(:email => email).should_not be_empty
    end

    def user_doesnt_exist(email)
      User.where(:email => email).should be_empty
    end

    #def assignment_doesnt_exist(description)
      #User.assignments.where(:description => description).should be_empty
    #end

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

  module Views

    def logo
      find(".logo a")
    end
    
    def month_view_button_path
      ".nav_view .ui-corner-right"
    end

    def month_view_button
      find(month_view_button_path)
    end

    def week_view_button_path
      ".nav_view .ui-corner-left"
    end

    def week_view_button
      find(week_view_button_path)
    end

    def subject_tab
      find(".tab", :text => "Subjects")
    end

    def agenda_tab
      find(".tab", :text => "Agenda")
    end

    def sign_out_button 
      find("#header_link a", text: 'Sign out')
    end
    
    def account_button 
      find("#profile_button a")
    end
  end

  module Subjects

    def add_subject_button 
      find(".add_subj_btn", :text => 'Add Subject')
    end

    def name_subject(name)
      fill_in 'subject[name]', :with => name
    end
    
    def add_subject(subject_name)
      subject_tab.click
      add_subject_button.click

      within ".add_subj_dialog" do
        name_subject(subject_name)
        submit_button.click
      end
    end
  end
end

