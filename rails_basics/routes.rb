
Rails.application.routes.draw do
  get '/', to: 'welcome#home', as: 'home'
  get '/about', to:'welcome#about', as: 'about'

  get '/contacts/new',to: 'contacts#new', as: 'contacts_new'
  post '/contacts', to: 'contacts#create'

  get '/bill_splitter/new',to: 'bill_splitter#new', as: 'bill_splitter_new'
  post '/bill_splitter', to: 'bill_splitter#create'


end