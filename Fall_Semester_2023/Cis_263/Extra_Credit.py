from collections import OrderedDict
from collections import Counter
"""
Resources: 

Kruskals
--------------------------------------------------------------------------------------

https://www.programiz.com/dsa/kruskal-algorithm

https://www.geeksforgeeks.org/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/

Floyd Warshall 
----------------------------------------------------------------------------------------

https://favtutor.com/blogs/floyd-warshall-algorithm
https://www.programiz.com/dsa/floyd-warshall-algorithm
https://www.geeksforgeeks.org/floyd-warshall-algorithm-dp-16/

Cache Problem
----------------------------------------------------------------------------------------
https://www.geeksforgeeks.org/lru-cache-implementation/
https://www.geeksforgeeks.org/lru-cache-in-python-using-ordereddict/
https://www.enjoyalgorithms.com/blog/implement-least-recently-used-cache

Wanted to implement part of the cache homework for 351 so I needed to 
implement a counter that works over multiple functions
https://www.geeksforgeeks.org/counters-in-python-set-2-accessing-counters/
https://www.digitalocean.com/community/tutorials/python-counter-python-collections-counter


Every Problem Just In Case
--------------------------------------------------------------------------------------
I want to make it known that I did use ChatGPT at points for this code. I will provide 
some examples of what I used it for.

When I was looking into how to do Floyd Warshall in Python I saw this lambda function repeatably 

distance = list(map(lambda i: list(map(lambda j: j, i)), G))

I am still kind of new to python while I understand that it is basically a throw away function this syntaxing is a little over my head
So I asked ChatGPT to turn it into def functions and it did but named them after where I couldn't undertand what it was trying to do.
Following the code I looked at what it was trying to do and then renamed them to what they are now. I then asked the AI if the naming 
seemed correct to which it agreed. I only used it to grasp onto concepts or help understand the error I was recieving. 
I just wanted to make it know that it was used.  

"""

class KruskalsExtraCredit:
    #creating an object class to make graphs
    def __init__(self,nodes):
        self.nodes = nodes
        self.graph = []
    
    #for adding any graph add it to our graph object
    def add_edge(self, n1, n2, weight):
        self.graph.append([n1,n2,weight])
        
    def find_subtree(self,parent,i):
        #if the subtree is just one node 
        if parent[i] == i:
            return i 
        return self.find_subtree(parent,parent[i])
    
    def connect_subtrees(self, parent, subtrees, a , b):
        #go and grab the subtrees in find subtree
        a_root = self.find_subtree(parent, a)
        b_root = self.find_subtree(parent,b)
        #
        if subtrees[a_root] < subtrees[b_root]:
            parent[a_root]  = b_root
        elif subtrees[b_root] < subtrees[a_root]:
            parent[b_root]  =  a_root            
        else:
            parent[b_root] = a_root
            subtrees[a_root] += 1
    
    #main computing for kruskals putting all the classes together
    #the first thing that we need to do is sort for ease
    #That we we already know smallest weight and the biggest
    #See if that weight already has a connecting node in our MST
    # If i isn't then we add it.
    
    def kruskals(self):
        #initialize our return
        min_span_tree = []
        
        #sorting our by weight in order. https://blogboard.io/blog/knowledge/python-sorted-lambda/
        #this makes sure that the weight of the edges goes from smallest to biggest
        #makes processing a little bit easier 
        self.graph = sorted(self.graph, key=lambda graph: graph[2]) 
        
        #initalize our parent and subtree see if we can add them together for mst
        parent = []
        subtrees = []
        
        #set up our iterator and edge counter of MST
        i = 0
        edgesMST = 0
        
        #fill our parent with nodes and append subrees with same # of nodes but 0
        for node in range(self.nodes):
            parent.append(node)
            subtrees.append(0)
    
        #Remember that edges of graph - 1 == max edges MST
        #otherwise we will have a cycle thus not a tree
        #hence why we have self.nodes -1
        while edgesMST < (self.nodes -1):
            n1, n2, weight = self.graph[i]
            i += 1
            #see if we have subtrees of that node
            a = self.find_subtree(parent, n1)
            b = self.find_subtree(parent, n2)
            #if they are not connected connect them
            if a!= b:
                edgesMST += 1
                self.connect_subtrees(parent, subtrees, a, b)
                min_span_tree.append([n1, n2, weight])
                
        #loop through the connected nodes and their edge weight and print it   
        for n1, n2, weight in min_span_tree:
            print ("%d - %d: %d" % (n1, n2, weight))
            
class Floyd_Warshall:
    #we need to initialize a self class to make doing this easier for the future
    #without the init method we would have to create a new object each time
    #now we can make any graph we want to solve with Floyd Warshall
	def __init__(self, graph, vertices):
		self.graph = graph
		self.num_vertices = vertices 
        #just a way to shorthand initalize_distance_matrix() 1 word vs 3 type of deal
		self.distance = self.initalize_distance_matrix()
    
    #Main computing function of our algorithm     
	def floyd_warshall(self):
        #k is our intermediate node
		for k in range(self.num_vertices):
            #from our intermediate node loop through graph
			for i in range(self.num_vertices):
				for j in range(self.num_vertices):
                    #take the minimum distance and path and make it the value of that index
					self.distance[i][j] = min(self.distance[i][j], self.distance[i][k] + self.distance[k][j])
        #after looping through print matrix out 
		self.print_distance_matrix()
        
    
	def initalize_distance_matrix(self):
		result = []
		for i in self.graph:
			result.append(self.copy_elements(i))
		return result
    
	def copy_elements(self, elements):
		result = []
		for i in elements:
			#add each element to the result 
			result.append(i)
		return result
	def print_distance_matrix(self):
		for i in range(self.num_vertices):
			for j in range(self.num_vertices):
                #need the end "" so that way each element doesn't print on a new line
				print(self.distance[i][j], end = " ")
            #need a way to make a new line
			print(" ")

class efficentCaching:
    # initialise our dictionary(Cache) object
    def __init__(self, capacity: int):
        #https://realpython.com/python-ordereddict/ how to use OrderedDict() <- you get more control
        #make cache object 1. for understanding and 2. for being lazy
        self.cache = OrderedDict()
        #we also need to access the capacity passed in -1 now so we  
        #don't have to do self.capacity-1 
        self.capacity = capacity-1
        #also need a counter for how many times data has been accessed
        #internet pointed out this method lets try to implement it
        self.addCount = Counter({'hit': 0, 'miss': 0, 'total': 0})
        
    
    def get(self, key: int) -> int:
        #just increment counter before for loop instead of 
        #writing it twice for both statements
        self.addCount['total'] += 1
        if key not in self.cache:
            #if the key is not currently present in our dict return -1
            self.addCount['miss'] += 1
            return -1
        else:
            #if key is in the cache move to the end so know it is the most recently accessed one
            self.cache.move_to_end(key)
            #returning the value of the key since it is in cache.
            self.addCount['hit'] += 1
            return self.cache[key]
        
 

    def put(self, key: int, value: int) -> None:
        #first thing might as well just add to total now 
        self.addCount['total'] += 1
        self.addCount['miss'] += 1
        self.cache[key] = value
        #kind of like acessing it putting something into cache makes it the most recently used
        #so he have to move it to the back of the cache 
        self.cache.move_to_end(key)
        #this if statement is checking to make sure our cache is not out of bounds
        if len(self.cache) > self.capacity+1:
            #Check order dict link for further syntax
            #Orderdict normally when you .popitem it will pop the last one on the stack
            #in our situation that would get rid of the most recent accessed element
            #by giving the parameter last = False it now pops the from of the que
            self.cache.popitem(last = False)
    #printing out our miss rate  
    def print_miss_rate(self):
        total = self.addCount['total']
        miss = self.addCount['miss']
        if total != 0:
             missRate = miss/total
             #http://cissandbox.bentley.edu/sandbox/wp-content/uploads/2022-02-10-Documentation-on-f-strings-Updated.pdf
             print(f"The miss rate of the cache is: {missRate:.2%}")
        else:
            print("no data accessed miss rate = none")


#Calling functions and Initalizing their respective elements to the algorithims 
#-----------------------------------------------------------------------------------------------------------------------

print ("Floyd Warshall Matrix \n")
#Floyd Warshall and it's A0 state 
G = [
[0, 3, float('inf'), 7],
[8, 0, 2, float('inf')],
[5, float('inf'), 0, 1],
[2, float('inf'), float('inf'), 0] 
]


vertices = 4
#pass in the graph and # of vertices
fw_instance = Floyd_Warshall(G, vertices)
fw_instance.floyd_warshall()


#this is the same example as in Profs notes and the one we did in class
#the way the code works expects the node to start at 0 
#so if you don't have a 0 node then it will error (recursive 998)
print(" ") # <- like having a new line but was formating the Start of Kruskals tabbed over essentially 
print ("Kruskals minimum spanning tree represented in nodes \n " )
example_graph = KruskalsExtraCredit(7)
example_graph.add_edge(0, 5, 10)
example_graph.add_edge(0, 1, 28)
example_graph.add_edge(1, 2, 16)
example_graph.add_edge(2, 3, 12)
example_graph.add_edge(3, 4, 22)
example_graph.add_edge(4, 5, 25)
example_graph.add_edge(6, 4, 24)
example_graph.add_edge(6, 3, 18)
example_graph.add_edge(6, 1, 14)
example_graph.kruskals()
print(" ")

"""

simulating direct cache from my last 351 homework
Although this implementation isn't quite the same
let's say I put a key of 5 in. The code we have here
is going to kick out the lru element even thought 
"we don't have a set 5" like in the 351 hw assignment
This code doesn't worry about sets its more smart just
kicking out lru element. Knowing how this works we can still
work around it. we can use the key to represent a set
We can kick out elements in our set manually. 
but this is why when it prints they are not represented
in the set order they are represented in LRU being farthest 
to the left and most recent item accessed furthest to the right

"""
# initializing our cache with the capacity of 4
cache = efficentCaching(4) 
#indexing starts at 0 
#miss
cache.put(2, 64)
print(cache.cache)
#miss 
cache.put(0, 128)
print(cache.cache)
#miss
cache.put(0, 256)
print(cache.cache)
#hit 
cache.get(2)
print(cache.cache)
#miss
cache.put(3, 224)
print(cache.cache)
cache.put(1, 32)
print(cache.cache)
#hit
cache.get(1)
print(cache.cache)
#hit
cache.get(3)
print(cache.cache)
#miss
cache.put(0,256)
print(cache.cache)
#print missrate
#should print out around 66% like we theorized 
cache.print_miss_rate()