class Floyd_Warshall:
	def __init__(self, graph, vertices):
		self.graph = graph
		self.num_vertices = vertices 
		self.INF = float('inf')
		self.distance = self.initalize_distance_matrix()
        
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
G = [
[0, 3, float('inf'), 5],
[2, 0, float('inf'), 4],
[float('inf'), 1, 0, float('inf')],
[float('inf'), float('inf'), 2, 0] 
]


vertices = 4
fw_instance = Floyd_Warshall(G, vertices)
fw_instance.floyd_warshall()