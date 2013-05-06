class AssignmentsController < ApplicationController
  before_filter :authenticate_user!

  def index
    #case statements currently doesn't do anything different
    #binding.pry
    case params[:query] 
    when 'week' 
      @assignments = current_user.assignments #devise gives us current_user
    when 'month'
      # only passes it dates in the current month
      @assignments = current_user.assignments.where("due_date >= :start_month AND due_date <= :end_month", 
                                                    {:start_month => Date.today.beginning_of_month,
                                                      :end_month => Date.today.end_of_month})
    else 
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

  end

  def destroy
    #deletes
    current_user.assignments.where(id: params[:id]).first.destroy
    redirect_to user_assignments_path(current_user)
  end
end
