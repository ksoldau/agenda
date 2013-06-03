require 'spec_helper'

feature 'create assignment', :js => true do 
  let(:user) { FactoryGirl.create(:user) }
  
  before do
    #sign in
    visit '/'
    fill_in 'user[email]', :with => user.email
    fill_in 'user[password]', :with => 'p@ssword'
    click_button 'Sign in'
  end

  scenario 'add assignment' do
    current_path.should == user_assignments_path(user) #signed in

    # click on add assignment button for first day in week
    assignment_box = ".week .side:first-child .assignment_box:first-child"
    find(assignment_box).hover
    find(assignment_box).find(".add_btn").click

    # fill in and submit form 
    select('Other', :from => 'assignment[subject_id]')
    fill_in('assignment[description]', :with => 'Example description.')
    find('input[type="submit"]').click

    current_path.should == user_assignments_path(user)
    newa = assignment_box + " .as_box"
    find(newa).should have_content('Other')
    find(newa).should have_content('Example description')

  end

  scenario 'add assignment to Friday' do
    # check to make sure signed in
    current_path.should == user_assignments_path(user)

    #click on add assignment for Friday
    assignment_box = ".week .side:first-child .assignment_box:first-child"
    find(assignment_box).hover
    find(assignment_box).find(".add_btn").click

    #fill in and submit form
    select('Other', :from => 'assignment[subject_id]')
    fill_in('assignment[description]', :with => "Example description")
    find('input[type="submit"]').click

    #make sure still in current week view
    current_path.should == user_assignments_path(user)
    new_a = assignment_box + " .as_box"
    find(new_a).should have_content('Other')
    find(new_a).should have_content('Example description')



  end

 end

