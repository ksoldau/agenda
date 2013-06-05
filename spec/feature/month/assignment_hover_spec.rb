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

  scenario 'hover over assignment' do

    first_day_assignment.hover
    
    find(".a_popup").should have_content('Other')
    find(".a_popup").should have_content('Example description')
    find(".a_popup").should have_content('due on')

  end

end

