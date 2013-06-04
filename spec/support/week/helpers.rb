module Week
  module Helpers
    def monday
      assignment_box = ".week .side:first-child .assignment_box:first-child"
      find(assignment_box)
    end

    def monday_assignment 
      monday.find(".as_box")
    end

    def submit_button
      find('input[type="submit"]')
    end

    def select_subject(subject)
      select(subject, :from => 'assignment[subject_id]')
    end

    def write_description(description)
      fill_in('assignment[description]', :with => description)
    end
  end
end
