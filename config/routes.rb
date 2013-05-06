Scratch::Application.routes.draw do
  devise_for :users

  resources :users do 
    resources :assignments 
  end

  root :to => 'assignments#index'

end
