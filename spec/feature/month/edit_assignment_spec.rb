require 'spec_helper'

RSpec.configure do |config|
  config.include All::SessionSteps, type: :feature
  config.include All::Dialogs, type: :feature
  config.include Month::Helpers, type: :feature
end

feature 'create assignment', :js => true do 
  let(:user) { FactoryGirl.create(:user) }
 
  find_assignment = nil

  before do
    #sign in
    visit '/'
    sign_in_with(user.email, 'p@ssword')

    #click on button to go to month view
    month_view_button.click

    # bring up assignment dialog for first day in calendar
    first_day.base.double_click

    # fill in and submit add form
    within ".add_dialog" do
      select_subject('Other')
      write_description('Example description')
      submit_button.click
    end

    # bring up the assignment dialog
    first_day_assignment.click
    
    within ".a_dialog" do
      find(".edit_btn").click
    end
  end

  scenario 'edit description' do
    
    # before edit dialog
    find(".a_dialog").should have_content('Example description')
    find(".a_dialog").should_not have_content('Changed description')

    within ".edit_dialog" do
      write_description('Changed description')
      submit_button.click
    end

    # make sure assignment subject didn't change
    first_day_assignment.should have_content('Other')

    # see if popup on hover is correct
    first_day_assignment.hover

    find(".a_popup").should have_content('Changed description')
    find(".a_popup").should_not have_content('Example description')

    # open the assignment dialog
    first_day_assignment.click
    
    # the dialog
    find(".a_dialog").should have_content('Changed description')
    find(".a_dialog").should_not have_content('Example description')
    
  end

  scenario 'edit due date date in month' do
    
    month = find("h2").text().scan(/\w+/)[0]
    year = find("h2").text().scan(/\w+/)[1]

    within ".edit_dialog" do
      select_day('15')
      select_month(month)

      submit_button.click
    end

    #see if no longer in first day
    first_day.has_no_css?(".subj_link")

    #see if moved to correct day
    find("td", :text => "15").should have_css(".subj_link")

    #see if hover now correct
    assignment("15", "1").hover

    find(".a_popup").should have_content('Other')
    find(".a_popup").should have_content('Example description')
    find(".a_popup").should have_content('due on ' + month + ' 15, ' + year + ' at 11:59 pm') 
  end

  scenario 'edit due date time in month' do
  
    within ".edit_dialog" do
      select_hour('02 PM')
      select_minute('10')
      submit_button.click
    end

    #make sure still in correct day
    first_day.has_css?(".subj_link")

    #make sure subject still right
    first_day_assignment.should have_content('Other')

    #make sure hover right, that time changed
    first_day_assignment.hover

    find(".a_popup").should have_content('Other')
    find(".a_popup").should have_content('Example description')
    find(".a_popup").should have_content('at 02:10 pm')
  end


  scenario 'edit due date before month' do
  
  month = current_calendar_month 
  
  within ".edit_dialog" do
    if month != "January"
      month = "January"
    else 
      month = "April"
      select_year("2011")
    end
    select_month(month)
    select_day("15")


    submit_button.click
  end

  #make sure no longer on page
  page.should_not have_content('Other')

  #make sure moved to corrent place
  visit user_assignments_path(user, :query => 'month', :which => "#{month} 15, 2013".to_date.beginning_of_week)
  page.should have_content('Other')

  end

  scenario 'edit due date after month' do

    month = current_calendar_month
    year = current_calendar_year
    next_year = String(Integer(year) + 1)

    within ".edit_dialog" do
      select_year(next_year)
      submit_button.click
    end

    #make sure no longer on page
    page.should_not have_content('Other')
    
    #make sure moved to correct place
    visit user_assignments_path(user, :query => 'month', :which => "#{month} 15, #{next_year}".to_date.beginning_of_week)
    page.should have_content('Other')

  end

end


