class AssignmentsController < ApplicationController
  before_filter :authenticate_user!

  def index
    #case statements currently doesn't do anything different
    #binding.pry
    case params[:query] 
    when 'week' 
      @assignments = current_user.assignments.where("due_date >= :start_week AND due_date <= :end_week", 
                                                    {:start_week => Date.today.beginning_of_month,
                                                      :end_week => Date.today.end_of_week})
      @assignments_grouped = @assignments.group_by {|a| a.due_date.wday}   
      
      @assignments_mon = @assignments_grouped.fetch(1, [])
      @assignments_tues = @assignments_grouped.fetch(2, [])
      @assignments_wed = @assignments_grouped.fetch(3, [])
      @assignments_thurs = @assignments_grouped.fetch(4, [])
      @assignments_fri = @assignments_grouped.fetch(5, [])
      @assignments_sat = @assignments_grouped.fetch(6, [])
      @assignments_sun = @assignments_grouped.fetch(0, [])
      #binding.pry

    when 'month'
      # only passes it dates in the current month
      @as = current_user.assignments.where("due_date >= :start_month AND due_date <= :end_month", 
                                                    {:start_month => Date.today.beginning_of_month,
                                                      :end_month => Date.today.end_of_month})
      @as_grouped = @as.group_by {|a| a.due_date.to_date}

      @as_to_array = []
      #binding.pry

    else #just here for now 
       @assignments = current_user.assignments #devise gives us current_user
       #for now
       redirect_to user_assignments_path(current_user, :query => 'week');
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
    @assignment = Assignment.new(params['assignment'])
    @assignment.user_id = current_user.id
    if @assignment.save
      redirect_to user_assignment_path(current_user, @assignment) #redirect
    else
      render :new #if saving doesn't work, doesn't run logic but renders view,
      #so user can correct themselves
    end
  end

  def update
    @as = current_user.assignments.where(id: params[:id]).first
    if @as.update_attributes(params[:assignment])
      redirect_to user_assignments_path(current_user, :query => 'week')      
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
    redirect_to user_assignments_path(current_user)
  end
end
