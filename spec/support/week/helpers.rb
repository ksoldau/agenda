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

  end
end
