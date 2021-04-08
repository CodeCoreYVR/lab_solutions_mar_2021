# Create a method, get_user_info, that when called asks the user 
# for the following personal information: first name, last name, 
# city of birth and age. Then, return that information as a hash.
class User
    attr_accessor :first_name, :last_name, :city_of_birth, :age
  
    def get_user_info
      "{first_name: #{first_name}, last_name: #{last_name}, city_of_birth: #{city_of_birth}, age: #{age}}"
    end
  end
  
  user = User.new
  
  puts "What is your first name?"
  user.first_name = gets.chomp
  
  puts "What is your last name?"
  user.last_name = gets.chomp
  
  puts "Where were you born?"
  user.city_of_birth = gets.chomp
  puts "What is your age?"
  user.age = gets.chomp
  
  puts user.get_user_info
