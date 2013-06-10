Scratch::Application.routes.draw do
  devise_for :users

  resources :users do 
    #resources :assignments
    #resources :subjects
  end
  
  resources :assignments
  resources :subjects

  authenticated :user do
    root :to => 'assignments#index'
  end
  
  devise_scope :user do
    root to: "devise/sessions#new"
  end

end
