
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
    #See if that weight already has a conncting node in our MST
    # If i isn't then we add it.
    def kruskals(self):
        #initalize our retun
        min_span_tree = []
        
        #sorting our by weight in reverse order. https://blogboard.io/blog/knowledge/python-sorted-lambda/
        self.graph = sorted(self.graph, key=lambda graph: -graph[2]) 
        
        #initalize our parent and subtree see if we can add them together for mst
        parent = []
        subtrees = []
        
        #set up our iterator and edge counter of MST
        #Remeber that edges of graph - 1 == max edges MST
        #otherwise we will have a cycle thus not a tree
        i = 0
        edgesMST = 0
        
        for node in range(self.nodes):
            parent.append(node)
            subtrees.append(0)
    
        while edgesMST < (self.nodes -1):
            n1, n2, weight = self.graph[i]
            i += 1
            
            a = self.find_subtree(parent, n1)
            b = self.find_subtree(parent, n2)
        
            if a!= b:
                edgesMST += 1
                self.connect_subtrees(parent, subtrees, a, b)
                min_span_tree.append([n1, n2, weight])
                
            
        for n1, n2, weight in min_span_tree:
            print ("%d - %d: %d" % (n1, n2, weight))
            
class Floyd_Warshall:
    #we need to initialize a self class to make doing this easier for the future
    #without the init method we would have to create a new object each time
    #now we can make any graph we want to solve with Floys Warshall
	def __init__(self, graph, vertices):
		self.graph = graph
		self.num_vertices = vertices 
        #Part of the algorithm is making values that you can't traverse for that step infinity so 
        #it is just easier to create this object for later use
		self.INF = float('inf')
		self.distance = self.initalize_distance_matrix()
    
    #    
	def floyd_warshall(self):
		for k in range(self.num_vertices):
			for i in range(self.num_vertices):
				for j in range(self.num_vertices):
					self.distance[i][j] = min(self.distance[i][j], self.distance[i][k] + self.distance[k][j])
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
				print(self.distance[i][j], end = " ")
			print(" ")

class efficentCaching:
    class Node:
 
        def __init__(self, key, value):
            self.key = key
            self.val = value
            self.prev = None
            self.next = None

    class LeastRecentlyUsedCache:
        def __init__(self, capacity):
            self.capacity = capacity
            self.hashMap = dict()
            self.head = Node('#', 0)
            self.tail = Node('', 0)
            self.head.next = self.tail
            self.tail.prev = self.head
        
        def get(self, key):
            if key in self.hashMap:
                node = self.hashMap[key]
                self._remove(node)
                self._add(node)
                return node.val
            else:
                return -1
        def put(self, key, value):
            if key in self.hashMap:
                self._remove(self.hashMap[key])
            newNode = self.Node(key, value)
            self._add(newNode)
            self.hashMap[key] = newNode
            if len(self.hashMap) > self.capacity:
                nodeToRemove = self.tail.prev
                self._remove(nodeToRemove)
                del self.hashMap[nodeToRemove.key]
        def remove_node(self, node):
            prevNode = node.prev
            nextNode = node.next
            prevNode.next = nextNode
            nextNode.prev = prevNode
            
        def add_node(self, node):
            nextNode = self.head.next
            previousNode = self.head
            previousNode.next = node
            nextNode.prev = node
            node.next = nexNode
            node.prev = previousNode



#------------------------------------------------------------------------------------------------------------------------
G = [
[0, 3, float('inf'), 5],
[2, 0, float('inf'), 4],
[float('inf'), 1, 0, float('inf')],
[float('inf'), float('inf'), 2, 0] 
]


vertices = 4
fw_instance = Floyd_Warshall(G, vertices)
fw_instance.floyd_warshall()

example_graph = KruskalsExtraCredit(9)
example_graph.add_edge(0, 1, 4)
example_graph.add_edge(0, 2, 7)
example_graph.add_edge(1, 2, 11)
example_graph.add_edge(1, 3, 9)
example_graph.add_edge(1, 5, 20)
example_graph.add_edge(2, 5, 1)
example_graph.add_edge(3, 6, 6)
example_graph.add_edge(3, 4, 2)
example_graph.add_edge(4, 6, 10)
example_graph.add_edge(4, 8, 15)
example_graph.add_edge(4, 7, 5)
example_graph.add_edge(4, 5, 1)
example_graph.add_edge(5, 7, 3)
example_graph.add_edge(6, 8, 5)
example_graph.add_edge(7, 8, 12)
example_graph.kruskals()