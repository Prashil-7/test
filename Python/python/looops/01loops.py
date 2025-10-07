# 1 -> count postive no..

numbers =[ 1, 2, 6, - 5, 9, -54, 45, -85, -414]
positivre_no_count = 0
negativer__no_count =0
for num in numbers:
    if(num > 0):
        positivre_no_count+=1
    else:
        negativer__no_count+=1
        
#print(positivre_no_count)
#print(negativer__no_count)

# 2-->> count even out n

even_no = 45
sum =0

for i in range(1, even_no+1):
    if( i%2 == 0):
        sum +=1
#print ("sum is ", sum) 

#3 -->>

numberat = 3

for i in range(1, 11):
    if(i ==5):
        continue
    #print(i*numberat)
    
    # 4-->> reverse string
    
str= "prashil"
rev_str= ""

for char in str:
    rev_str = char + rev_str
#print(rev_str)

# 5 -->>  first non repeated character

str_ = "prashilpras"

#for char in str_:
   # if str_.count(char) ==1:
       #print( char)
       
# 6-->> factorial 

factorial = 1
no = 4

while no> 0:
    factorial*= no
    no-=1
print(factorial)


        
    
 
     
