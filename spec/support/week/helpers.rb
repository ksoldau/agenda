module Week
  module Helpers
    
    def monday_path
      ".week .side:first-child .assignment_box:first-child"
    end

    def monday
      find(monday_path)
    end

    def monday_assignment 
      monday.find(".as_box")
    end
    
    def day_in_week(num)
      find(".week .side:first-child .assignment_box:nth-child(" + num.to_s +  ")")
    end

    def day_in_week_from_day_date(month, day)
      find(".assignment_box", :text => month.to_s + " " + day.to_s)
    end

    
    def tomorrow(assignment_box)
      date = assignment_box.find(".day_heading").text()
      date_array = date.scan(/\w+/)
      day = Integer(date_array[2])
      month = date_array[1]
      month_num = Date::MONTHNAMES.index(month)
      year = Integer(date_array[3])
      current_date = Date.new(year, month_num, day)
      current_date.tomorrow()
    end

    def yesterday(assignment_box)
      date = assignment_box.find(".day_heading").text()
      date_array = date.scan(/\w+/)
      day = Integer(date_array[2])
      month = date_array[1]
      month_num = Date::MONTHNAMES.index(month)
      year = Integer(date_array[3])
      current_date = Date.new(year, month_num, day)
      current_date.yesterday()
    end

  end
end
