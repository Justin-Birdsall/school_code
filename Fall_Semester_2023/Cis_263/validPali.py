class Solution:
#My original thinking was to do longest common sequence
#I was writting my code I forgot to account for flipping one of the string
#Doing some further reaserch there is not an very easy way to do this
#You can however can tell python to put the cursor at the end of the string
#Kind of like this Hello World| aka a pointer (probs easier to do in C tbh)
#reference: https://www.w3schools.com/python/python_howto_reverse_string.asp

    def validPalindrome(self, s: str) -> bool:
        #set head pointer to the beginning
        HeadPointer = 0
        #set tail to the end (-1 for no out of bounds exception)
        TailPointer = len(s)-1

        #The goal of this is to go until the last step before the pointers cross
        #if they do then it's a palindrome 
        while HeadPointer < TailPointer:
            #Now according to the problem we can at most remove one character and have it still
            #be valid. So as we are looping through if we see that it doesn't match we have to do
            #something about it either delete head or tail and see if it is valid 
            if s[HeadPointer] != s[TailPointer]:
                # "remove"" the tail element
                rightDelete = s[HeadPointer:TailPointer] 
                # "remove" the head element 
                LeftDelete = s[HeadPointer+1:TailPointer+1]  
                #This is where that reference is important 
                #https://www.w3schools.com/python/python_howto_reverse_string.asp
                #if the reverse is == to the regular then it is still a valit input
                #otherwise if they don't == each other then our condition doesn't hold 
                #so return false
                return (rightDelete == rightDelete[::-1] or LeftDelete == LeftDelete[::-1])
            else:
                #move the pointers towards each other 
                HeadPointer += 1
                TailPointer -= 1
        #if we make it through the loop then its valid so return true 
        return True

        #I spent way too long on this thought too. I think that if this was any more complex than an
        #Palindrome we should use a rolling hash table using a dic. That way we can just access
        #if the input is valid. However this is fine for what we are doing. Here is the comment block of my
        #thought process during that period 
 #-------------------------------------------------------------------------------------
        #Now we have to figure out what algorithm works best for this 
        #Using the pointer method intuitevly is easier
        #but think about how long that is going to take
        #We could hash it it too using Rabin Karp 👀
        #prof notes: https://drive.google.com/drive/folders/1_6_uCbBmA6l58hNkwqkZ7TSzEzAbcTLI
        #You get free acess to useful books @ oreilly because you go to GVSU
#https://learning.oreilly.com/library/view/hands-on-data-structures/9781801073448/Text/Chapter_8.xhtml#_idParaDest-169
        #Goes over it in python a little too in depth for what we need but still useful
        #Has a growth method but we don't necisarilly need 
