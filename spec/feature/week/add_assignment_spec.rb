require 'spec_helper'

RSpec.configure do |config|
  config.include Week::Helpers, type: :feature
  config.include All::SessionSteps, type: :feature
  config.include All::Dialogs, type: :feature
end

feature 'create assignment', :js => true do 
  let(:user) { FactoryGirl.create(:user) }

  before do
    #sign in
    visit '/'
    fill_in_email(user.email)
    fill_in_password('p@ssword')
    click_button 'Sign in'
  end

  scenario 'add assignment' do
    current_path.should == user_assignments_path(user) #signed in

    # click on add assignment button for first day in week
    monday.hover
    monday.find(".add_btn").click

    # fill in and submit form
    within ".add_dialog" do
      select_subject('Other')
      write_description('Example description.')
      submit_button.click
    end
   
    current_path.should == user_assignments_path(user)
    monday.should have_content('Other')
    monday.should have_content('Example description')

  end


  scenario 'add assignment to Friday' do
    # check to make sure signed in
    current_path.should == user_assignments_path(user)

    #click on add assignment for Friday
    monday.hover
    monday.find(".add_btn").click

    #fill in and submit form
    within ".add_dialog" do
      select_subject('Other')
      write_description('Example description')
      submit_button.click
    end

    #make sure still in current week view
    current_path.should == user_assignments_path(user)
   
    #see if monday assignment has corrent information
    monday_assignment.should have_content('Other')
    monday_assignment.should have_content('Example description')

  end

  scenario 'add assignment without subject' do
    monday.hover
    monday.find(".add_btn").click

    page.should have_css(".add_dialog")
    
    within ".add_dialog" do
      write_description('Example description')
      submit_button.click
    end
    
    #page.should have_css(".add_dialog")
    #assignment_doesnt_exist('Example description')
  end

 end

