Scratch::Application.routes.draw do
  devise_for :users

  resources :users do 
    resources :assignments
    resources :subjects
  end

  root :to => 'assignments#index'

end
