class BillSplitterController < ApplicationController
  def new
    
  end
  def create
    @amount = params[:amount].to_f
    @tax = params[:tax].to_f
    @tip = params[:tip].to_f
    @number_of_people = params[:number_of_people].to_f
    calc_tax = @amount * (@tax / 100)
    calc_tip = @amount * (@tip / 100)
    calculation = (@amount + calc_tax + calc_tip) / @number_of_people
    @per_person_payment = calculation.round(2)
  end
  
end
