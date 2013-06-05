require 'spec_helper'

RSpec.configure do |config|
  config.include All::SessionSteps, type: :feature
  config.include All::Dialogs, type: :feature
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
    current_path.should == user_assignments_path(user)

    monday_assignment.should have_content('Other')
    monday_assignment.should have_content('Changed description')
    monday_assignment.should_not have_content('Example description')

  end

  scenario 'edit month of due date for assignment' do
    

    # assure assignment is in Monday
    monday_assignment.should have_content('Example description')

    #edit day
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

    # make sure no longer on Monday
    # not tested yet

    # make sure assignment moved to correct place
    visit user_assignments_path(user, :query => 'week', :which => "April 1, 2013".to_date.beginning_of_week)
    page.should have_content('Example description')

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

