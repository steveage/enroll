Rails.application.routes.draw do
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  # get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? };

  resources :students, only: [ :index, :create ]
  resources :semesters, only: [ :index, :create ]
  resources :teachers, only: [ :index, :create ]
  resources :courses, only: [ :index, :create ]
  resources :enrollments, only: [ :index, :create, :destroy, :update ]
  post '/login', to: "sessions#create"
end
