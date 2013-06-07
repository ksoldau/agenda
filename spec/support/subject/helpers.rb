module Subjects
  module Helpers

    def findDkToggle
      find(".dk_toggle")
    end

    def choose_subject(subj)
      findDkToggle.click
      find(".dk_options_inner").find("a", :text => subj).click
    end

    def edit_subject_button
      find(".edit_subj_btn")
    end

    def delete_subject_button 
      find(".delete_subj_btn")
    end

    def add_assignment(subj, description)
      choose_subject(subj)
      find(".add_btn_subj_view").click

      within ".add_dialog" do
        select_subject(subj)
        write_description(description)
        submit_button.click
      end
    end
  end
end
