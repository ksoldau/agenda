require 'spec_helper'

feature 'sign in/sign up' do
  let(:user) { FactoryGirl.create(:user) }
  
  before do
    visit '/'
    #fill_in 'user[email]', :with => user.email
    #fill_in 'user[password]', :with => 'p@ssword'
    #click_button 'Sign in'
    #wait_until { current_path != "/users/sign_in" }
    #visit "/users/edit"
  end

  scenario 'signing in succeeds' do
    fill_in'user[email]', :with => user.email
    fill_in 'user[password]', :with => 'p@ssword'
    click_button 'Sign in'
    current_path.should == user_assignments_path(user)
  end

  scenario 'signing up succeeds' do
    click_link 'Sign up'
    current_path.should == new_user_registration_path
    fill_in 'user[email]', :with => 'pat@example.com'
    fill_in 'user[password]', :with => 'p@ssword'
    fill_in 'user[password_confirmation]', :with => 'p@ssword'
    fill_in 'user[first_name]', :with => "Pat"
    fill_in 'user[last_name]', :with => "Johnson"
    click_button 'Sign up'
    current_path.should == user_assignments_path(User.where(:email => "pat@example.com").first)
    User.where(:email => "pat@example.com").should_not be_empty
  end
end

feature 'sign out' do
  let(:user) { FactoryGirl.create(:user) }

  before do
    visit '/'
    fill_in 'user[email]', :with => user.email
    fill_in 'user[password]', :with => 'p@ssword'
    click_button 'Sign in'
  end

  scenario 'signing out succeeds' do

    #verify logged in 
    current_path.should == user_assignments_path(user)

    #click sign out 
    find('#header_link a').click
    
    #verify signed out 
    current_path.should == '/' #new_user_session_path
  end
end
