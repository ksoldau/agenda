module ApplicationHelper
  def getDate(n, beginning_of_week)
    $i = -1
    $day = beginning_of_week

    #key for Sunday is 0, so have to change it 
    if n == 0 
      n = 7
    end

    #get correct date 
    until $i > n
       $day = $day.tomorrow
       $i = $i + 1
     end
    return $day
  end
end
