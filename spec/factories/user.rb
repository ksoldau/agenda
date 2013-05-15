FactoryGirl.define do
  factory :user do 
    email "usr@example.com"
    first_name "Al"
    last_name "Zu"
    password "p@ssword"
    password_confirmation "p@ssword"
  end
end
