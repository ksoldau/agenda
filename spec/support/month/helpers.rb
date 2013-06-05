module Month
  module Helpers


    def first_day_path
      ".cal table tbody tr:nth-child(3) td:first-child"
    end

    def first_day
      find(first_day_path)
    end

    def first_day_assignment
      find(first_day_path + " .subj_link")
    end

    def assignment(day, assignment) 
      find("td", :text => day).find(".day_cal .subj_link:nth-child(" + assignment + ")")
    end

    def current_calendar_month
      find("h2").text().scan(/\w+/)[0]
    end

    def current_calendar_year 
      find("h2").text().scan(/\w+/)[1]
    end


  end
end

