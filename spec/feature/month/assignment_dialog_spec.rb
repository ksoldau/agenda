require 'spec_helper'

RSpec.configure do |config|
  config.include All::SessionSteps, type: :feature
  config.include All::Dialogs, type: :feature
  config.include Month::Helpers, type: :feature
end

feature 'create assignment', :js => true do 
  let(:user) { FactoryGirl.create(:user) }
  
  before do
    #sign in
    visit '/'
    sign_in_with(user.email, 'p@ssword')

    #click on button to go to month view
    month_view_button.click

    # bring up assignment dialog for first day in calendar
    first_day.base.double_click

    # fill in and submit add form
    within ".add_dialog" do
      select_subject('Other')
      write_description('Example description')
      submit_button.click
    end

  end

  scenario 'dialog has correct information' do
    
    first_day_assignment.click
    
    find(".a_dialog").should have_content('Other')
    find(".a_dialog").should have_content('Example description')
    find(".a_dialog").should have_content ('at 11:59 pm')

  end

  scenario 'edit button in dialog works' do
    
    first_day_assignment.click
    

    # should not have edit dialog open before click edit button
    page.has_no_css?(".edit_dialog")

    within ".a_dialog" do
      find(".edit_btn").click
    end

    # should have edit dialog open after edit button clicked
    page.should have_content('Update Assignment')
    page.has_css?(".edit_dialog")

  end

  scenario 'delete button in dialog works' do
    first_day_assignment.click

    page.has_no_css?(".delete_dialog")
    within ".a_dialog" do 
      find(".delete_btn").click
    end
    
    # should have edit dialog open after edit button clicked
    page.should have_content('Delete Assignment')
    page.has_css?(".delete_dialog")

  end


end


