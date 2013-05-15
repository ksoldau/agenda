require 'spec_helper'

feature 'create assignment', :js => true do 
  let(:user) { FactoryGirl.create(:user) }

  before do
    visit '/'
    fill_in 'user[email]', :with => user.email
    fill_in 'user[password]', :with => 'p@ssword'
    click_button 'Sign in'
  end

  scenario 'add assignment' do
    current_path.should == user_assignments_path(user) #signed in

    # click on add assignment button for first Monday in week
    assignment_box = ".week .left_side_days .assignment_box:first-child"
    find(assignment_box).hover
    find("#day_1").click

    # fill in and submit form 
    select('Other', :from => 'assignment[subject_id]')
    fill_in('assignment[description]', :with => 'Example description.')
    find('input[type="submit"]').click

    current_path.should == user_assignments_path(user)
    newa = assignment_box + " .as_box"
    find(newa).should have_content('Other')
    find(newa).should have_content('Example description')

  end
end

feature 'edit/delete assignment', :js => true do
  let(:user) { FactoryGirl.create(:user) }
  
  before do
    visit '/'
    fill_in 'user[email]', :with => user.email
    fill_in 'user[password]', :with => 'p@ssword'
    click_button 'Sign in'
    find(".week .left_side_days .assignment_box:first-child").hover
    find("#day_1").click
    select('Other', :from => 'assignment[subject_id]')
    fill_in('assignment[description]', :with => 'Example description.')
    find('input[type="submit" ]').click

    #wait_until { current_path != "/users/sign_in" }
    #visit "/users/edit"
  end

  scenario 'edit description of assignment' do
   
    a = ".week .left_side_days .assignment_box:first-child .as_box"

    find(a).hover
    find(a + " .edit_btn").click
    fill_in('assignment[description]', :with => 'Changed example description.')
    find('input[type="submit"]').click
    screenshot_and_open_image
    current_path.should == user_assignments_path(user)
    editeda = a
    find(editeda).should have_content('Other')
    find(editeda).should have_content('Changed example description')

  end

  scenario 'edit month of due date for assignment' do
    
    a = ".week .left_side_days .assignment_box:first-child"

    # assure assignment is in Monday
    find(a).should have_content('Example description.')

    #edit day
    find(a).hover
    find(a + " .edit_btn").click
    select('2013', :from => 'assignment[due_date(1i)]')
    select('July', :from => 'assignment[due_date(2i)]')
    select('1', :from => 'assignment[due_date(3i)]')
    find('input[type="submit"]').click

    


    # make sure no longer on Monday
    find(a).should_not have_content('Example description.')

    # make sure assignment moved to correct place
    visit user_assignments_path(user, :query => 'week', :which => "July 1, 2013".to_date.prev_week)
    page.should have_content('Example description.')

    
  end
    
  scenario 'delete assignment' do
   
    a = ".week .left_side_days .assignment_box:first-child .as_box"

    find(a).hover
    find(a + " .delete_btn").click
    screenshot_and_open_image
    find('.delete_dialog a').click
    screenshot_and_open_image
    page.should have_no_content('Other') 
    page.should have_no_content('This is an example description')

  end

 end
