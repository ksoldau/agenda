require 'spec_helper'

RSpec.configure do |config|
  config.include All::SessionSteps, type: :feature
  config.include All::Views, type: :feature
end

feature 'navigation', :js => true do 
  let(:user) {FactoryGirl.create(:user)}

  before do 
    #sign in
    visit '/'
    sign_in_with(user.email, 'p@ssword')
  end

  scenario 'goes to week view' do
    
    agenda_tab.click
    
    page.should_not have_css(".cal")
    page.should_not have_css("#cal_wrapper")
    page.should_not have_css("td")
  end

  scenario 'goes to month view' do
    
    agenda_tab.click
    month_view_button.click

    page.should have_css(".cal")
    page.should have_css("td")

  end

  scenario 'clicks on logo' do
    
    logo.click

    page.should_not have_css(".cal")
    page.should_not have_css("#cal_wrapper")
    page.should_not have_css("td")
  end

  scenario 'clicks on sign out' do
    page.should_not have_css("#forgot_password_link")
    page.should_not have_content('Signed out successfully.')

    sign_out_button.click

    page.should have_css("#forgot_password_link")
    page.should have_content('Signed out successfully.')
  end

end
