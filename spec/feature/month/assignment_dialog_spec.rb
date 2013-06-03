require 'spec_helper'

feature 'create assignment', :js => true do 
  let(:user) { FactoryGirl.create(:user) }
  
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

  end

  scenario 'dialog has correct information' do
    week = ".cal table tbody tr:nth-child(3)"
    day = week + " td:first-child"
    assignment = day + " .subj_link"
    save_screenshot('screenshot43.png')
    

    find_assignment = find(assignment)
    assignment_id = find_assignment[:'data-assignment-id']
    find_assignment.click
    save_screenshot('screenshot31.png')
    
    find_dialog = find(".a_dialog[data-assignment-id='" + assignment_id + "']")

    find_dialog.should have_content('Other')
    find_dialog.should have_content('Example description')
    find_dialog.should have_content ('at 11:59 pm')

  end

  scenario 'edit button in dialog works' do
    week = ".cal table tbody tr:nth-child(3)"
    day = week + " td:first-child"
    assignment = day + " .subj_link"
    
    find_assignment = find(assignment)
    assignment_id = find_assignment[:'data-assignment-id']
    find_assignment.click
    
    find_dialog = find(".a_dialog[data-assignment-id='" + assignment_id + "']")
   
    # edit dialog 
    edit_dialog = ".edit_dialog[data-assignment-id='" + assignment_id + "']"

    # should not have edit dialog open before click edit button
    page.has_no_css?(edit_dialog)
    find_dialog.find(".edit_btn").click

    # should have edit dialog open after edit button clicked
    page.should have_content('Update Assignment')
    page.has_css?(edit_dialog)

  end

  scenario 'delete button in dialog works' do
    week = ".cal table tbody tr:nth-child(3)"
    day = week + " td:first-child"
    assignment = day + " .subj_link"

    find_assignment = find(assignment)
    assignment_id = find_assignment[:'data-assignment-id']
    find_assignment.click

    find_dialog = find(".a_dialog[data-assignment-id='" + assignment_id + "']")

    # delete dialog
    delete_dialog = ".delete_dialog[data-assignment-id='" + assignment_id + "']"

    #should not have delete dialog open before click edit button
    page.has_no_css?(delete_dialog)
    find_dialog.find(".delete_btn").click

    # should have edit dialog open after edit button clicked
    page.should have_content('Delete Assignment')
    page.has_css?(delete_dialog)

  end


end


