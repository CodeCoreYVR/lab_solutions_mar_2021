def most_common_letter(string) #sting is: apple
    obj = {}
    string  = string.strip # or
    # string = string.delete(" ").gsub(/[^a-zA-Z0-9]/)
    string.each_char do |letter|
        if obj[letter] == nil
            obj[letter] = 1
        else 
            obj[letter] += 1
        end  
    end
    puts obj
    max = string[0]
    obj.each_key do |value|
        if obj[value] > obj[max]
        max = value
        end
    end
    puts max
end
most_common_letter("aaa aasdfnvn!!!!!!!!!!!!!!zzzzzzjdf")