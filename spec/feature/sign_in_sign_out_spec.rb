require 'spec_helper'

RSpec.configure do |config|
  config.include All::SessionSteps, type: :feature
end

feature 'sign in/sign up' do
  let(:user) { FactoryGirl.create(:user) }
  
  before do
    visit '/'

  end

  scenario 'signing in succeeds' do
    sign_in_with(user.email, 'p@ssword')
  end

  scenario 'signing up succeeds' do
    click_link 'Sign up'
    current_path.should == new_user_registration_path

    sign_up_with('pat@example.com', 'p@ssword', 'Pat', 'Johnson')
    current_path.should == user_assignments_path(User.where(:email => "pat@example.com").first)
    
    user_exists("pat@example.com")
  end
end


feature 'sign out' do
  let(:user) { FactoryGirl.create(:user) }

  before do
    visit '/'
    sign_in_with(user.email, 'p@ssword')
  end

  scenario 'signing out succeeds' do

    #verify logged in 
    current_path.should == user_assignments_path(user)

    click_link 'Sign out'
    
    #verify signed out 
    current_path.should == '/' #new_user_session_path
    page.should have_button('Sign in')
    page.should have_link('Sign up')

  end
end
