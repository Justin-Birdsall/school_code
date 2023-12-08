class Solution:
    #this is another dynamic programing problem
    #for this we don't even have to make a grid a good hint is that we are passing in only one int
    #this is essentaially a fib sequence sum of the previous two is the sum of the next index
    #Looking at the constraints 1 <= n <= 45
    # we can just make an array size 46 to hold it 
    # although i am unsure if leetcode will mark me for space in time. 
    # good practice may not == leet code top performance 
    def climbStairs(self, n: int) -> int:
        #thinking what would our base cases?
        #if it is like fib then this if statment should cover it
        #that way we don't get an indexing error 
        if n == 0 or n == 1:
            return 1
        dp = [0 for _ in range(46)]
        #although we returned it we still have to account for them in our array 
        dp [0] = 1
        dp [1] = 1
        #since we need so sum the previus two we need to start indexing at 2
        for i in range(2, 46):
            dp[i] = dp[i-1] + dp[i-2]
        return dp[n]

#turns out that creating it to the size of the constraints doesn't hurt you that much
#but i mean thinking rationally if n was 20 creating a 20 sized array versus 46 isn't that big of 
#a difference 
        