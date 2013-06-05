module Month
  module Helpers
    
    def month_view_button_path
      ".nav_view .ui-corner-right"
    end

    def month_view_button
      find(month_view_button_path)
    end

    def first_day_path
      ".cal table tbody tr:nth-child(3) td:first-child"
    end

    def first_day
      find(first_day_path)
    end

    def first_day_assignment
      find(first_day_path + " .subj_link")
    end


  end
end

