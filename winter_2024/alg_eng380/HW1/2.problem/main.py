
if __name__ == "__main__":
    num_tests = int(input())

    for test_idx in range(num_tests):
        line = input().split()
        S = int(line[0]) # Starting bet
        k = int(line[1]) # Number of rounds
        #while loop to get through all the specified rounds 
        while k > 0:
            if S % 2 == 0:
                S -= 99
                S *= 3
            #if odd -15 then times by 2
            elif S %2 == 1:
                S -=15
                S *=2
            # **note part of the problem was that i had an else if so the comparator was never triggering 
            #if its over a million just mod it 
            #modifieded it because wether its negative or positive you have to mod it 
            #that way it is condensed but still need a if statment that deals with the remainder of the negative #
            if S > 1000000 or S < 0:
                S %= 1000000
            #take the remainder and add (subtract) from 1 mil 
            if S < 0:
                S += 1000000
            
            k -=1
        print (S)