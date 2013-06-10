require 'spec_helper'

RSpec.configure do |config|
  config.include All::SessionSteps, type: :feature
  config.include All::Dialogs, type: :feature
  config.include All::Views, type: :feature
end

feature 'edit account information' do
  let(:user) {FactoryGirl.create(:user)}

  before do
    visit '/'
    sign_in_with(user.email, 'p@ssword')

    account_button.click

  end

  scenario 'change first name' do

    current_path = edit_user_registration_path

    User.where(:first_name => 'Al').should_not be_empty
    User.where(:first_name => 'Allan').should be_empty
    within "#form_wrapper" do
      fill_in_first_name('Allan')

      fill_in_current_password('p@ssword')
      submit_button.clic
    end

    User.where(:first_name => 'Al').should be_empty
    User.where(:first_name => 'Allan').should_not be_empty
  end

end
