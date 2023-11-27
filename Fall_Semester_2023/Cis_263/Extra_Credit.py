class extracreditgraphing:
    #creating an object class to make graphs
    def __init__(self,nodes):
        self.nodes = nodes
        self.graph = []
    
    #for adding any graph add it to our graph object
    def add_edge(self, n1, n2, weight):
        self.graph.append([n1,n2,weight])
        
    def find_subtree(self,parent,i):
        if parent[i] == i:
            return i 
        return self.find_suubtree(parent,parent[i])
    
    def connect_subtrees(self, parent, subtrees, a , b):
        a_root = self.find_subtree(parent, a)
        b_root = self.find_subtree(parent,b)
        if subtrees[a_root] < subtrees[b_root]:
            parent[a_root]  = b_root
        elif subtrees[b_root] < subtrees[a_root]:
            parent[b_root]  =  a_root            
        else:
            parent[b_root] = a_root
            findtree_sizes[a_root] += 1
    
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
            n1, n2, weight = self.graph[1]
            i = i+1
            
            a = self.find_subtree(parent, n1)
            b = self.find_subtree(parent, n2)
        
            if a!= b:
                edgesMST = edgesMST + 1
                self.connect_subtrees(parent, subtrees, a, b)
            
        for n1, n2, weight in min_span_tree:
            print ("%d - %d: %d" % (n1, n2, weight))
example_graph = extracreditgraphing(9)
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