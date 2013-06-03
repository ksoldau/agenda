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

  scenario 'hover over assignment' do
    week = ".cal table tbody tr:nth-child(3)"
    day = week + " td:first-child"
    assignment = day + " .subj_link"

    find(assignment).hover
    save_screenshot('screenshot31.png')

    # don't have anyway to test this right now
    # don't know how to get data attribute to use
    # it to find associated dialog

    #assignment_id = find(assignment).data('assignment-id')
    
    #find(".a_popup[data-assignment-id" + assignment_id + "]").should have_content('Other')
  end


end

