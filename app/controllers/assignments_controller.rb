class AssignmentsController < ApplicationController
  before_filter :authenticate_user!
  respond_to :html, :json 

  def index
    session[:return_to] ||= request.referer
    
    @newa = Assignment.new    
    @ss = current_user.subjects

    case params[:query]

    when 'week'
      getAssignmentsForWeek
      @as_grouped_sides = getAssignmentsForDays


    when 'month'
      get_first_day_cal
      get_last_day_cal
      get_month_as
      get_group_month_as

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
  end

  def create
    createNewAssignment
    #@assignment.save
    #respond_with @assignment do |format|
    #    format.json {render json: @assignment.to_json}
    #end
    if @assignment.save
      redirect_to request.referer
    else
      render :new #if saving doesn't work, doesn't run logic but renders view,
      #so user can correct themselves
    end

  end

  def update
    # get assignment want to update 
    @as = current_user.assignments.where(id: params[:id]).first
   
    # save url of where you are
    session['referer'] = request.referer

    @as.update_attributes(params[:assignment])
    
    if request.xhr?
      respond_with @as do |format|
        format.json {render json: @as.to_json}
      end
    else 
      redirect_to request.referer
    end
    
  end

  def edit
    session[:return_to] ||= request.referer
    @as = current_user.assignments.where(id: params[:id]).first
    #redirect_to user_assignments_path(current_user, :query => "week", :which => Date.today.end_of_month)
  end

  def destroy
    #deletes
    current_user.assignments.where(id: params[:id]).first.destroy
    #binding.pry
    #redirect_to request.referer || user_assignments_path(current_user, :query => "week", :which => Date.today.beginning_of_week)

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
    @as_grouped_sides = []
    @as_grouped_sides = @as_grouped_sides << @as_grouped_left
    @as_grouped_sides = @as_grouped_sides << @as_grouped_right

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


  def createNewAssignment
    @assignment = Assignment.new(params['assignment'])
    @assignment.user_id = current_user.id

  end

end
