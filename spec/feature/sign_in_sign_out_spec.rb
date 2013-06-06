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

  scenario 'sign in with wrong user email' do
    sign_in_with("wrong@emai.com", 'p@ssword')

    page.should have_button("Sign in")
  end

  scenario 'sign in with wrong password' do
    sign_in_with(user.email, 'invalid')

    page.should have_button("Sign in")
  end

  scenario 'signing up succeeds' do
    click_link 'Sign up'
    current_path.should == new_user_registration_path

    sign_up_with('pat@example.com', 'p@ssword', 'p@ssword', 'Pat', 'Johnson')
    current_path.should == user_assignments_path(User.where(:email => "pat@example.com").first)
    
    user_exists("pat@example.com")
  end

  scenario 'sign up with invalid email' do
    click_link 'Sign up'
    current_path.should == new_user_registration_path

    sign_up_with('invalid', 'p@ssword', 'p@ssword', 'Pat', 'Johnson')

    page.should have_button("Sign up")
    user_doesnt_exist('invalid')
  end

  scenario 'sign up with unmatched passwords' do
    click_link 'Sign up'
    current_path.should == new_user_registration_path

    sign_up_with('pat@example.com', 'p@ssword', 'unmatched', 'Pat', 'Johnson')
    
    page.should have_button("Sign up")
    user_doesnt_exist('pat@example.com')
  end

  scenario 'sign up with no first name' do
    click_link 'Sign up'
    current_path.should == new_user_registration_path

    sign_up_with('pat@example.com', 'p@ssword', 'p@ssword', '', 'Johnson')

    page.should have_button("Sign up")
    user_doesnt_exist("pat@example.com")
  end

  scenario 'sign up with no last name' do
    click_link 'Sign up'
    current_path.should == new_user_registration_path 

    sign_up_with('pat@example.com', 'p@ssword', 'p@ssword', 'Pat', '')

    page.should have_button("Sign up")
    user_doesnt_exist('pat@example.com')
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
