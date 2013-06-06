module Subjects
  module Helpers

    def choose_subject(subject)
      find(".dk_toggle").click
      find(".dk_options_inner").find("a", :text => subject).click
    end

    def edit_subject_button
      find(".edit_subj_btn")
    end
  end
end
