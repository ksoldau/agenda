require 'spec_helper'

RSpec.configure do |config| 
  config.include All::SessionSteps, type: :feature
  config.include All::Dialogs, type: :feature
end

feature 'forgot password' do
  let(:user) { FactoryGirl.create(:user) }

  before do
    visit '/'
    forgot_password_link = "#forgot_password_link a"
    find(forgot_password_link).click
  end

  scenario 'valid email' do
    #fill_in_email(user.email)

    #click_button("Send me reset password instructions")

    #page.should have_content "You will receive an email with instructions about how to reset your password in a few minutes."

    #don't have mail set up for testing so can't do this yet

  end

  scenario 'invalid email not an email' do
    fill_in_email('invalid')

    click_button("Send me reset password instructions")

    page.should_not have_content "You will receive an email"
  end

  scenario 'invalid email wrong email' do
      fill_in_email('invalid@example.com')

      click_button("Send me reset password instructions")

      page.should_not have_content "You will receive an email"
  end

  scenario 'go back to homescreen' do
      click_link("Sign in")

      page.should_not have_css("input[value='Send me reset password instructions']")
      page.should have_css("input[value='Sign in']")
  end

  scenario 'click on logo to go to homescreen' do
      click_link("Sign in")
      
      reset_password = "input[value='Send me reset password instructions']"
      page.should_not have_css(reset_password)
      page.should have_css("input[value='Sign in']")
  end


end
