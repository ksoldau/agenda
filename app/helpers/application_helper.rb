module ApplicationHelper
  def getDate(n, beginning_of_week)
    $i = -1
    $day = beginning_of_week
    #binding.pry
     until $i > n
       $day = $day.tomorrow
       $i = $i + 1
     end
    return $day
  end
  #binding.pry
end
