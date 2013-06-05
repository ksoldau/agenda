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
  end

  scenario 'add a subject' do
    add_subject("Biology") 

    find(".dk_toggle").click
    find(".dk_options").should have_content("Biology")
     
    # make sure Other subject is still there
    find(".dk_options").should have_content("Other")
  end

  scenario 'add a subject without a name' do
    add_subject("")

    page.should have_css(".add_subj_dialog")
  end

 end

