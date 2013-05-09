class GroupByWeek
  
  attr_accessor :hash, :grouped_by_week

  def initialize(hash)
   @hash = hash
   group_by_week
  end

  def group_by_week
    @grouped_by_week = @hash.group_by.with_index{ |a, i| i / 7}
  end
end
