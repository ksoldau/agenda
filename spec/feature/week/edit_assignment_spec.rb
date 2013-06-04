require 'spec_helper'

RSpec.configure do |config|
  config.include All::Helpers, type: :feature
  config.include Week::Helpers, type: :feature
end

feature 'edit/delete assignment', :js => true do
  let(:user) { FactoryGirl.create(:user) }
  
  before do
    visit '/'
    fill_in_email(user.email)
    fill_in_password('p@ssword')
    click_button 'Sign in'

    monday.hover
    
    find(monday_path + " .add_btn").click
    
    within ".add_dialog" do 
      select_subject('Other')
      write_description('Example description')
      submit_button.click
    end

  end

  scenario 'edit description of assignment' do
   
    a = ".week .side:first-child .assignment_box:first-child .as_box"

    find(a).hover
    find(a + " .edit_btn").click
    fill_in('assignment[description]', :with => 'Changed description.')
    find('input[type="submit"]').click
    current_path.should == user_assignments_path(user)
    editeda = a
    find(editeda).should have_content('Other')
    find(editeda).should have_content('Changed description')
    find(editeda).should_not have_content('Example description')

  end

  scenario 'edit month of due date for assignment' do
    
    a = ".week .side:first-child .assignment_box:first-child .as_box"

    # assure assignment is in Monday
    find(a).should have_content('Example description')

    #edit day
    find(a).hover
    find(".edit_btn").click
    select('2013', :from => 'assignment[due_date(1i)]')
    select('April', :from => 'assignment[due_date(2i)]')
    select('1', :from => 'assignment[due_date(3i)]')
    find('input[type="submit"]').click

    # make sure no longer on Monday
    # not tested yet

    # make sure assignment moved to correct place
    page.save_screenshot 'screenshot26.png'
    visit user_assignments_path(user, :query => 'week', :which => "April 1, 2013".to_date.beginning_of_week)
    page.should have_content('Example description')

  end
    
  scenario 'delete assignment' do
   
    a = ".week .side:first-child .assignment_box:first-child .as_box"

    find(a).hover
    find(a + " .delete_btn").click
    find('.delete_dialog a').click
    page.should have_no_content('Other') 
    page.should have_no_content('This is an example description')

  end

 end

