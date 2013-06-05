require 'spec_helper'
RSpec.configure do |config|
  config.include All::SessionSteps, type: :feature
  config.include All::Dialogs, type: :feature
  config.include All::Views, type: :feature
  config.include Month::Helpers, type: :feature
end

feature 'create assignment', :js => true do 
  let(:user) { FactoryGirl.create(:user) }
  
  before do
    #sign in
    visit '/'
    sign_in_with(user.email, 'p@ssword')
    month_view_button.click
  end

  scenario 'add assignment' do
  
    # bring up assignment dialog for first day in calendar
    within ".cal" do
      first_day.base.double_click
    end

    # fill in and submit add form
    within ".add_dialog" do
      select_subject('Other')
      write_description('Example description')
      submit_button.click
    end

    # still in assignments index view
    current_path.should == user_assignments_path(user)

    first_day_assignment.should have_content('Other')

    #make sure description is correct
    first_day_assignment.click

    find(".a_dialog").should have_content('Example description')
  end

  scenario 'add assignment no subject' do 
    
    within ".cal" do
      first_day.base.double_click
    end

    within ".add_dialog" do
      write_description('Example description')
      submit_button.click
    end

    #page.should have_css(".add_dialog")

  end

end
