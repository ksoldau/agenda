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

    add_subject('English')
  end

  scenario 'edit a subject' do

    page.should_not have_css(".add_subj_dialog")

    choose_subject('English')
    
    edit_subject_button.click
    
    page.should have_css(".edit_subj_dialog")

    within ".edit_subj_dialog" do
      name_subject("European Lit")
      submit_button.click
    end

    find(".dk_toggle").click
    page.should_not have_content('English')
    page.should have_content('European Lit') 
  end

  scenario 'edit a subject with invalid name' do
    
    choose_subject('English')
    edit_subject_button.click
    page.should have_css(".edit_subj_dialog")

    within ".edit_subj_dialog" do
      name_subject("")
      submit_button.click
    end

    page.should have_css(".edit_subj_dialog")
  end

 end

