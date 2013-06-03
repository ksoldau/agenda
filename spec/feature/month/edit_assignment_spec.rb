require 'spec_helper'

feature 'create assignment', :js => true do 
  let(:user) { FactoryGirl.create(:user) }
 
  find_assignment = nil

  before do
    #sign in
    visit '/'
    fill_in 'user[email]', :with => user.email
    fill_in 'user[password]', :with => 'p@ssword'
    click_button 'Sign in'

    # need to add assignment before can hover over it
    current_path.should == user_assignments_path(user) #signed in

    #click on button to go to month view
    month_view_button = ".nav_view .ui-corner-right"
    find(month_view_button).click
    page.should have_selector(".cal")

    # bring up assignment dialog for first day in calendar
    week = ".cal table tbody tr:nth-child(3)"
    day = week + " td:first-child"
    find(day).base.double_click
    save_screenshot("screenshot34.png")

    # fill in and submit add form
    select('Other', :from => 'assignment[subject_id]')
    fill_in('assignment[description]', :with => 'Example description.')
    find('input[type="submit"]').click

    # bring up the edit dialog
    week = ".cal table tbody tr:nth-child(3)"
    day = week + " td:first-child"
    assignment = day + " .subj_link"
    
    find_assignment = find(assignment)
    assignment_id = find_assignment[:'data-assignment-id']
    find_assignment.click
    
    find_dialog = find(".a_dialog[data-assignment-id='" + assignment_id + "']")
   
    edit_dialog = ".edit_dialog[data-assignment-id='" + assignment_id + "']"

    find_dialog.find(".edit_btn").click

  end

  scenario 'edit description' do
    # variables needed
    # find assignment
    week = ".cal table tbody tr:nth-child(3)"
    day = week + " td:first-child"
    assignment = day + " .subj_link"

    #find_assignment = find(assignment)
    assignment_id = find_assignment[:'data-assignment-id']

    a_dialog = ".a_dialog[data-assignment-id='" + assignment_id + "']"
    find_a_dialog = find(a_dialog)
    
    ###################

    # before edit dialog
    find_a_dialog.should have_content('Example description')
    find_a_dialog.should_not have_content('Changed description')

    fill_in('assignment[description]', :with => "Changed description")

    find("input[type='submit']").click

    # make sure assignment subject didn't change
    find_assignment.should have_content('Other')

    # open the assignment dialog
    find_assignment.click
    
    # the dialog
    find_a_dialog.should have_content('Changed description')
    find_a_dialog.should_not have_content('Example description')
    
    binding.pry

  end

  scenario 'edit due date in month' do 

  end

  scenario 'edit due date before month' do
  
  end

  scenario 'edit due date after month' do

  end


end


