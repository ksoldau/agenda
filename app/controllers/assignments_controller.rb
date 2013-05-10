class AssignmentsController < ApplicationController
  before_filter :authenticate_user!

  def index
    case params[:query] 

    when 'week'
      getAssignmentsForWeek
      getAssignmentsForDays

    when 'month'
      get_first_day_cal
      get_last_day_cal
      get_month_as
      get_group_month_as
     # getAssignmentsForMonth
     # #group assignments by date to use in view
     # @as_grouped = @as.group_by {|a| a.due_date.to_date}
     # @as_grouped_by_week = GroupByWeek.new(

    else #goes here after log in
      @assignments = current_user.assignments #devise gives us current_user
      redirect_to user_assignments_path(current_user, :query => 'week', :which => Date.today.beginning_of_week);
    end

  end

  def show
    @assignment = current_user.assignments.where(id: params[:id]).first
    redirect_to user_assignments_path(current_user)
  end

  def new
    @assignment = Assignment.new
    #session['referer'] = request.referer
  end

  def create
    createNewAssignment
    if @assignment.save
      redirect_to user_assignments_path(current_user, :query => "week", :which => @assignment.due_date.to_date.beginning_of_week)
    else
      render :new #if saving doesn't work, doesn't run logic but renders view,
      #so user can correct themselves
    end

  end

  def update
   @as = current_user.assignments.where(id: params[:id]).first
   if @as.update_attributes(params[:assignment])
     #redirect_to request.referer || user_assignments_path(current_user, :query => "week", :which => Date.today.beginning_of_week) 
     redirect_to user_assignments_path(current_user, :query => "week", :which => @as.due_date.to_date.beginning_of_week)
   else 
     render :new 
   end
  end

  def edit
    @as = current_user.assignments.where(id: params[:id]).first
    #redirect_to user_assignments_path(current_user, :query => "week", :which => Date.today.end_of_month)
  end

  def destroy
    #deletes
    current_user.assignments.where(id: params[:id]).first.destroy
    #binding.pry
    redirect_to request.referer || user_assignments_path(current_user, :query => "week", :which => Date.today.beginning_of_week)
  end

  #--------------------------------------------------------------------#
  # gets assignments that should be shown for wanted week
  def getAssignmentsForWeek
    @week_want = params[:which]

    if params[:which] != nil
      @assignments = current_user.assignments.where("due_date >= :start_week AND due_date <= :end_week", 
                                                    {:start_week => @week_want.to_date.beginning_of_week,                                                                                   :end_week => @week_want.to_date.end_of_week.tomorrow})
    else 
      @assignments = current_user.assignments.where("due_date >= :start_week AND due_date <= :end_week", 
                                                    {:start_week => Date.today.beginning_of_week,
                                                      :end_week => Date.today.end_of_week})
    end
  end

  # creates arrays for each day of the week
  def getAssignmentsForDays
    @assignments_grouped = @assignments.group_by {|a| a.due_date.wday}
    @as_grouped_left = {}
    @as_grouped_right = {}

    @assignments_mon = @assignments_grouped.fetch(1, [])
    @assignments_tues = @assignments_grouped.fetch(2, [])
    @assignments_wed = @assignments_grouped.fetch(3, [])
    @assignments_thurs = @assignments_grouped.fetch(4, [])
    @assignments_fri = @assignments_grouped.fetch(5, [])
    @assignments_sat = @assignments_grouped.fetch(6, [])
    @assignments_sun = @assignments_grouped.fetch(0, [])

    
    #should do this in view instead of separating here, 
    #but this works for now
    @as_grouped_left[1] = @assignments_mon
    @as_grouped_left[2] = @assignments_tues
    @as_grouped_left[3] = @assignments_wed
    @as_grouped_right[4] = @assignments_thurs
    @as_grouped_right[5] = @assignments_fri
    @as_grouped_right[6] = @assignments_sat
    @as_grouped_right[0] = @assignments_sun

  end

  # get first day to be shown on month calendar 
  def get_first_day_cal
    @first_day = params[:which].to_date.beginning_of_month.beginning_of_week.yesterday
  end

  # now also creates list of days in month
  def get_last_day_cal
    #there has to be a better way to do this
    @day = @first_day
    @days_in_cal_month = []
    @days_in_cal_month << @day
    i = 0
    while i < 35
      @day = @day.tomorrow
      @days_in_cal_month << @day
      i += 1
    end
    @last_day = @day
  end

  # get all assignments to be shown on month calendar
  def get_month_as
    @month = params[:which]
    if params[:which] != nil
      @as = current_user.assignments.where("due_date >= :start_cal AND due_date <= :end_cal", 
                                          {:start_cal => @first_day, 
                                          :end_cal => @last_day})
    else
      @as = current_user.assignments.where("due_date >= :start_month AND due_date <= :end_month", 
                                           {:start_month => Date.today.beginning_of_month,
                                          :end_month => Date.today.end_of_month})
    end
  end

  # group assignments for the month by due_date
  def get_group_month_as
    @as_grouped_by_dd = @as.group_by {|a| a.due_date.to_date}
  end



  # gets assignments that should be shown from wanted month
  #def getAssignmentsForMonth
  #  @month_want = params[:which]
  #  if params[:which] != nil
   #   @as = current_user.assignments.where("due_date >= :start_month AND due_date <= :end_month", 
   #                                        {:start_month => @month_want.to_date.beginning_of_month,
   #                                          :end_month => @month_want.to_date.end_of_month})
   # else 
   #   @as = current_user.assignments.where("due_date >= :start_month AND due_date <= :end_month", 
   ##                                        {:start_month => Date.today.beginning_of_month,
   #                                          :end_month => Date.today.end_of_month})
   # end

    # should take this out of controller
    # getting first day of calendar
    # get first day of month, then first day of week, then previous day
      #################################

  #end

  def createNewAssignment
    @assignment = Assignment.new(params['assignment'])
    @assignment.user_id = current_user.id

  end

end
