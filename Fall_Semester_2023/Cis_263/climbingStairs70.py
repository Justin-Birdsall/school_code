class Solution:
    #this is another dynamic programing problem
    #Looking at the constraints 1 <= n <= 45
    # we could in all honestly make a 46 x 46 grid store all the values of the stairs
    # the use n+1 to access the one that we need 
    # although i am unsure if leetcode will mark me for space in time. 
    # Best practice may not == leet code top performance 
    # but then agiain we are only passing in one int so this may be expected of me
    def climbStairs(self, n: int) -> int:
        #doing the constraint +1 so that we can have a zero row
        if n == 0 or n == 1:
            return 1
        #thinking what would our base cases?
        #
        #
        dp = [0 for _ in range(46)]
        dp [0] = 1
        dp [1] = 1
        #since we need so sum the previus two we need to start indexing at 2 in our array or else we will throw an exception
        for i in range(2, 46):
            dp[i] = dp[i-1] + dp[i-2]
        return dp[n]

            


        
