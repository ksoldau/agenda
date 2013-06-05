module Subjects
  module Helpers
  
    def add_subject_button
      find(".add_subj_btn", :text => 'Add Subject')
    end

    def name_subject(name)
      fill_in 'subject[name]', :with => name
    end

  end
end
