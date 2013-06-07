
require 'spec_helper'

RSpec.configure do |config|
  config.include All::SessionSteps, type: :feature
  config.include All::Dialogs, type: :feature
  config.include All::Views, type: :feature
  config.include All::Subjects, type: :feature
  config.include Subjects::Helpers, type: :feature
end

feature 'create subject', :js => true do 
  let(:user) { FactoryGirl.create(:user) }


  before do
    #sign in
    visit '/'
    sign_in_with(user.email, 'p@ssword')

    #go to subjects page
    subject_tab.click

    add_subject('Geometry')

  end

  scenario 'delete a subject without assignments' do
    # make sure has the subject Geometry
    choose = find(".dk_toggle")

    # make sure the subject Geometry exists
    user.subjects.where(name: 'Geometry').should_not be_empty
   
    choose_subject('Geometry')

    # delete subject

    delete_subject_button.click

    within ".delete_subj_dialog" do
      find("a", :text => 'Delete Geometry').click
    end

    choose.click
    find(".dk_options").should_not have_content("Geometry")
    
    # make sure subject doesn't exist anymore
    user.subjects.where(name: 'Geometry').should be_empty
  end

  scenario 'delete a subject with assignments' do

    #choose = find(".dk_toggle")


    # make sure subject exists
    user.subjects.where(name: 'Geometry').should_not be_empty

    # add assignments
    within ".panel" do
      add_assignment('Geometry', 'worksheet 3')
      add_assignment('Geometry', 'worksheet 4')
    end

    #make sure assignments exist
    user.assignments.where(description: 'worksheet 3').should_not be_empty
    user.assignments.where(description: 'worksheet 4').should_not be_empty

    # delete subject
    choose_subject('Geometry')
    delete_subject_button.click

    within ".delete_subj_dialog" do
      find("a", :text => 'Delete Geometry').click
    end

    #make sure that subjects assignments no longer there
    user.assignments.where(description: 'worksheet 3').should be_empty
    user.assignments.where(description: 'worksheet 3').should be_empty
    

  end

 end

