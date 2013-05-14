class SubjectsController < ApplicationController
  before_filter :authenticate_user!

  def index
   @news = Subject.new
   @ss = current_user.subjects
   @as_grouped_by_s = current_user.assignments.group_by {|a| a.subject}
   @newa = Assignment.new
  end

  def show
  end

  def new
    @newsu = Assignment.new
  end

  def create
    @s = Subject.new(params['subject'])
    @s.user_id = current_user.id
    if @s.save
      redirect_to user_subjects_path(current_user)
    else
      render :new #if saving doesn't work, doesn't run logic but renders view,
      #so user can correct themselves
    end

  end

  def update
  end

  def edit 
  end

  def destroy
    #delete from database
    current_user.subjects.where(id: params[:id]).first.destroy 
    redirect_to user_subjects_path(current_user)
  end

 
####################################################### 
 
end
