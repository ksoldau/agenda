class AssignmentsController < ApplicationController
  before_filter :authenticate_user!

  def index
    case params[:query] 

    when 'week'
      getAssignmentsForWeek
      getAssignmentsForDays

    when 'month'
      getAssignmentsForMonth
      #group assignments by date to use in view
      @as_grouped = @as.group_by {|a| a.due_date.to_date}

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
    # session['referer'] = request.referer
  end

  def create
    createNewAssignment
  end

  def update
    @as = current_user.assignments.where(id: params[:id]).first
    if @as.update_attributes(params[:assignment])
      #redirect_to request.referer || user_assignments_path(current_user, :query => "week", :which => Date.today.beginning_of_week)           
    else 
      render :new 
    end
  end

  def edit 
    @as = current_user.assignments.where(id: params[:id]).first
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
                                                    {:start_week => @week_want.to_date.beginning_of_week,                                                                                   :end_week => @week_want.to_date.end_of_week})
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

  # gets assignments that should be shown from wanted month
  def getAssignmentsForMonth
    @month_want = params[:which]
    if params[:which] != nil
      @as = current_user.assignments.where("due_date >= :start_month AND due_date <= :end_month", 
                                           {:start_month => @month_want.to_date.beginning_of_month,
                                             :end_month => @month_want.to_date.end_of_month})
    else 
      @as = current_user.assignments.where("due_date >= :start_month AND due_date <= :end_month", 
                                           {:start_month => Date.today.beginning_of_month,
                                             :end_month => Date.today.end_of_month})
    end
  end

  def createNewAssignment
    @assignment = Assignment.new(params['assignment'])
    @assignment.user_id = current_user.id
    if @assignment.save
      redirect_to session['referer'] || user_assignments_path(current_user, :query => "week", :which => Date.today.beginning_of_week)
    else
      render :new #if saving doesn't work, doesn't run logic but renders view,
      #so user can correct themselves
    end

  end

end
