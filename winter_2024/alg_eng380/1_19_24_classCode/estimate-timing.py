def merge(l: list, start: int, midpoint: int, end: int):
    """
    Given list that is has two independently sorted sections:
        [start:midpoint]
        [midpoint:end]
    merge the tow sections such that [start:end] is fully sorted
    """
    merged = []
    p1 = start
    p2 = midpoint
    # Merge two sorted sections into 'merged' until one side runs out.
    while p1 < midpoint and p2 < end:
        if (l[p1] < l[p2]):
            merged.append(l[p1])
            p1 += 1
        else:
            merged.append(l[p2])
            p2 += 1
    # Handle any unmerged values (only one of these should happen)
    while p1 < midpoint:
        merged.append(l[p1])
        p1 += 1

    while p2 < end:
        merged.append(l[p2])
        p2 += 1
    # Update original list
    for m in range(len(merged)):
        l[start + m] = merged[m]
def merge_sort(l: list, start: int = 0, end: int = -1):
    end = len(l) if end == -1 else end
    # If fewer than two items to sort, already sorted.
    if end - start < 2:
        return
    midpoint = (start + end) // 2
    # sort halves
    merge_sort(l, start, midpoint)
    merge_sort(l, midpoint, end)
    # merge together
    merge(l, start, midpoint, end)

def generate_worst(N):
    return [i for i in range(N, 0, -1)]

def generate_best(N):
    return [i for i in range(0, N)]

def generate_rand(N):
    values = [i for i in range(N)]
    random.shuffle(values)
    return values
def time_sort_fun(fun: Callable, l: list):
    start_time = time.process_time()
    fun(l, 0, len(l))
    total_time = time.process_time() - start_time
    return total_time
replicates = 5
N = [i for i in range(50)] + [i for i in range(50, 2000, 50)] + [i for i in range(2000, 10000, 1000)]

# For each input size, run R replicates of each sort, recording timing of each
data = []
for n in N:
    print(f"Generating timings for N={n}")
    for i in range(replicates):
        # Worst case timing
        merge_worst = generate_worst(n)
        ins_worst = copy.deepcopy(merge_worst)
        data.append({"sort": "merge", "input_size": n, "input_type": "worst", "rep_id": i, "time": time_sort_fun(merge_sort, merge_worst)})
        data.append({"sort": "insertion", "input_size": n, "input_type": "worst", "rep_id": i, "time": time_sort_fun(insertion_sort, ins_worst)})
        # Best case timing
        merge_best = generate_best(n)
        ins_best = copy.deepcopy(merge_best)
        data.append({"sort": "merge", "input_size": n, "input_type": "best", "rep_id": i, "time": time_sort_fun(merge_sort, merge_best)})
        data.append({"sort": "insertion", "input_size": n, "input_type": "best", "rep_id": i, "time": time_sort_fun(insertion_sort, ins_best)})
        # Random input timing
        merge_rand = generate_rand(n)
        ins_rand = copy.deepcopy(merge_rand)
        data.append({"sort": "merge", "input_size": n, "input_type": "rand", "rep_id": i, "time": time_sort_fun(merge_sort, merge_rand)})
        data.append({"sort": "insertion", "input_size": n, "input_type": "rand", "rep_id": i, "time": time_sort_fun(insertion_sort, ins_rand)})
