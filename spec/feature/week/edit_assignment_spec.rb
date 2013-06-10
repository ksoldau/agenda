require 'spec_helper'

RSpec.configure do |config|
  config.include All::SessionSteps, type: :feature
  config.include All::Dialogs, type: :feature
  config.include All::Subjects, type: :feature
  config.include All::Views, type: :feature
  config.include Week::Helpers, type: :feature
end

feature 'edit/delete assignment', :js => true do
  let(:user) { FactoryGirl.create(:user) }
  
  before do
    visit '/'
    sign_in_with(user.email, 'p@ssword') 

    monday.hover
    
    within monday do 
      find(".add_btn").click
    end
    
    within ".add_dialog" do 
      select_subject('Other')
      write_description('Example description')
      submit_button.click
    end

  end

  scenario 'edit description of assignment' do
   
    monday_assignment.hover
    
    within monday_assignment do
      find(".edit_btn").click
    end

    within ".edit_dialog" do
      write_description('Changed description')
      submit_button.click
    end
    
    # should still be in assignments view
    current_path.should == assignments_path

    monday_assignment.should have_content('Other')
    monday_assignment.should have_content('Changed description')
    monday_assignment.should_not have_content('Example description')

  end

  scenario 'edit month of due date for assignment' do
    

    # assure assignment is in Monday
    monday_assignment.should have_content('Example description')

    #edit the month
    monday_assignment.hover
    
    within monday_assignment do
      find(".edit_btn").click
    end

    within ".edit_dialog" do
      select_year('2013')
      select_month('April')
      select_day('1')
      submit_button.click
    end
    #if in april ^ this won't work so have to change this
    #eventually
    
    # make sure no longer on Monday
    #monday.should_not have_content("Example description")
    #monday.should_not have_content("Other")
    # fix this test

    #make sure assignment moved to correct place
    visit assignments_path(:query => 'week', :which => "April 1, 2013".to_date.beginning_of_week)
    page.should have_content('Example description')
    page.should have_content('Other')

  end

  scenario 'edit day of due date for assignment' do
    
    #assure assignment is in Monday
    monday.should have_content('Example description')
    monday.should have_content('Other')

    #edit the day to tomorrow
    tomorrow = tomorrow(monday)
    tomorrow_month = Date::MONTHNAMES[tomorrow.month]
    tomorrow_day = tomorrow.day.to_s

    monday_assignment.hover

    monday_assignment.find(".edit_btn").click

    within ".edit_dialog" do
      select_month(tomorrow_month)
      select_day(tomorrow_day)
      submit_button.click
    end
    
    tuesday = day_in_week_from_day_date(tomorrow_month, tomorrow.day)
    tuesday.should have_content("Example description")
    
  end

  scenario 'edit day of due date to before current week' do
    #assure assignment is in Monday
    monday.should have_content('Example description')
    monday.should have_content('Other')

    page.should_not have_css(".edit_dialog")

    #edit the day to the sunday before this monday
    yesterday = yesterday(monday)
    yesterday_month = Date::MONTHNAMES[yesterday.month]
    yesterday_day = yesterday.day.to_s

    monday_assignment.hover
    monday_assignment.find(".edit_btn").click
    
    page.should have_css(".edit_dialog")
    
    within ".edit_dialog" do
      select_month(yesterday_month)
      select_day(yesterday_day)
      submit_button.click
    end
    
    # make sure no longer on Monday
    # find way to see if it's not there because it is there, 
    # it's just display: none

  end

  scenario 'edit subject of assignment' do
    
    add_subject('Subject II')
    
    agenda_tab.click
    
    # assure assignment on Monday with Other subject
    monday.should have_content('Example description')
    monday.should have_content('Other')

    # edit the subject
    monday_assignment.hover
    monday_assignment.find(".edit_btn").click

    within ".edit_dialog" do
      select_subject("Subject II")
      submit_button.click
    end

    monday.should_not have_content("Other")
    monday.should have_content("Subject II")

    monday.should have_content("Example description")
  end
    
  scenario 'delete assignment' do
   
    
    monday_assignment.hover

    within monday_assignment do
      find(".delete_btn").click
    end

    within ".delete_dialog" do
      click_link("Yes, delete this assignment")
    end
    
    # make sure assignment no longer there
    page.should have_no_content('Other') 
    page.should have_no_content('This is an example description')

  end

 end

