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

    session['referer'] = request.referer
    @s = Subject.new(params['subject'])
    @s.user_id = current_user.id
    if @s.save
      redirect_to session['referer']
    else
      render :new #if saving doesn't work, doesn't run logic but renders view,
      #so user can correct themselves
    end

  end

  def update
    session['referer'] = request.referer

    #get subject want to update
    @s = current_user.subjects.where(id: params[:id]).first
    @s.update_attributes(params[:subject])

    redirect_to session['referer']
  end

  def edit
    session['referer'] = request.referer
    redirect_to session['referer']
  end

  def destroy
    #delete from database
    current_user.subjects.where(id: params[:id]).first.destroy 
    redirect_to request.referer
    end

 
####################################################### 
 
end
