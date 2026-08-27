# Data Structures & Memory Architectures — Definitive Study Guide

Welcome to the **Data Structures & Memory Architectures Study Guide**. This comprehensive reference details foundational and advanced data structures across 6 core domains—from linear primitives and constant-time hash tables to hierarchical search trees, network graphs, multidimensional spatial partitioning, and cryptographic probabilistic structures.

---

## 📏 1. Linear Data Structures (The Primitives - BS Level)

### 1.1 Static Array
* **Memory Model**: Fixed-size contiguous block of memory allocated at compile or runtime. Elements are addressed via base memory address offset: $\text{Address}(A[i]) = \text{Base} + (i \times \text{ElementSize})$.
* **Complexities**:
  * Access / Lookup by Index: $O(1)$
  * Search by Value: $O(n)$ uncompressed ($O(\log n)$ if sorted)
  * Insertion / Deletion at End: $O(1)$ (if capacity available)
  * Insertion / Deletion at Beginning / Middle: $O(n)$ (requires element shifting)
* **Space Complexity**: $O(n)$
* **Key Advantages**: Optimal spatial locality, CPU L1/L2 cache prefetching, zero per-element memory overhead.
* **Vulnerabilities**: Fixed buffer bounds; target of stack and heap **Buffer Overflow** vulnerabilities in C/C++.
* **Applications**: Lookup tables, low-level OS kernels, memory buffers, foundation for multidimensional matrices.

### 1.2 Dynamic Array (Vector / ArrayList)
* **Memory Model**: Backed by a contiguous static array on the heap. When capacity is exceeded, the structure allocates a new array (typically $1.5\times$ to $2\times$ the previous capacity), copies existing elements, and deallocates the old buffer.
* **Complexities**:
  * Access by Index: $O(1)$
  * Append (Push Back): $O(1)$ amortized ($O(n)$ during reallocation)
  * Insertion / Deletion at Middle: $O(n)$
* **Space Complexity**: $O(n)$ with unused buffer headroom.
* **Amortized Analysis**: Doubling capacity upon full ensures $N$ insertions require $O(N)$ total copy operations, resulting in $O(1)$ amortized cost per append.
* **Applications**: Default sequence containers in modern runtimes (`std::vector` in C++, `ArrayList` in Java, `list` in Python, slices in Go).

### 1.3 Singly Linked List
* **Memory Model**: Non-contiguous heap-allocated nodes containing a data payload and a single `next` pointer pointing to the memory address of the subsequent node.
* **Complexities**:
  * Access / Search: $O(n)$
  * Insertion / Deletion at Head: $O(1)$
  * Insertion / Deletion at Tail (with tail pointer): $O(1)$ insert, $O(n)$ delete (requires traversing to second-to-last node)
  * Insertion / Deletion after given node: $O(1)$
* **Space Complexity**: $O(n)$ plus 1 pointer per node (8 bytes on 64-bit systems).
* **Key Properties**: Dynamic size with zero reallocation spikes; poor CPU cache locality due to pointer chasing.
* **Applications**: Memory allocators (free lists), chaining in hash tables, polynomial arithmetic representation.

### 1.4 Doubly Linked List
* **Memory Model**: Nodes store data and two pointers: `next` and `prev`.
* **Complexities**:
  * Access / Search: $O(n)$
  * Insertion / Deletion at Head or Tail (with pointers): $O(1)$
  * Deletion of a known node reference: $O(1)$ (no preceding traversal required)
* **Space Complexity**: $O(n)$ plus 2 pointers per node (16 bytes overhead on 64-bit systems).
* **Applications**: LRU (Least Recently Used) Cache implementations (paired with a Hash Map), browser Forward/Backward navigation history, music playlist queues, OS process task lists.

### 1.5 Stack
* **Behavior Model**: Last-In, First-Out (**LIFO**). Access is strictly constrained to the top element via `push`, `pop`, and `peek`.
* **Complexities**:
  * Push / Pop / Peek: $O(1)$
  * Search: $O(n)$
* **Space Complexity**: $O(n)$
* **Implementation**: Can be implemented using a dynamic array or a singly linked list.
* **Applications**: CPU call stack and activation records, recursive function execution, undo/redo mechanisms in software, expression evaluation and syntax parsing (Dijkstra’s Shunting-Yard algorithm, matching parentheses).

### 1.6 Queue
* **Behavior Model**: First-In, First-Out (**FIFO**). Elements enter at the `rear` (`enqueue`) and exit from the `front` (`dequeue`).
* **Complexities**:
  * Enqueue / Dequeue / Front: $O(1)$
  * Search: $O(n)$
* **Space Complexity**: $O(n)$
* **Implementation**: Singly linked list with head and tail pointers, or circular buffer.
* **Applications**: CPU task scheduling, print job spoolers, network packet buffering, Breadth-First Search (BFS) graph traversal frontier.

### 1.7 Ring Buffer (Circular Queue)
* **Behavior Model**: Fixed-size queue using a single contiguous memory block where the end logically wraps around to the beginning using modulo arithmetic: $\text{index} = (\text{index} + 1) \pmod{\text{Capacity}}$.
* **Complexities**:
  * Enqueue / Dequeue / Overwrite: $O(1)$
* **Space Complexity**: $O(N)$ strictly bounded.
* **Key Properties**: Zero dynamic allocation after initialization; lock-free Single-Producer Single-Consumer (SPSC) concurrency support using atomic read/write head pointers.
* **Applications**: Real-time audio and video streaming pipelines, OS kernel circular log buffers (Linux `dmesg`), network interface card (NIC) DMA ring buffers.

---

## ⚡ 2. Hash-Based Structures (Constant Time - BS/MS Level)

### 2.1 Hash Table (Hash Map)
* **Core Principle**: Associates keys with values by computing an integer hash code from the key via a hash function, mapping it to a bucket index: $\text{Index} = \text{hash}(\text{key}) \pmod M$.
* **Collision Resolution Techniques**:
  1. **Separate Chaining**: Each bucket points to a linked list (or Red-Black tree when chain length $> 8$, as in Java 8+).
  2. **Open Addressing**: All items stored directly in the table array. Collisions resolved via:
     * *Linear Probing*: $h(k, i) = (h(k) + i) \pmod M$ (susceptible to primary clustering).
     * *Quadratic Probing*: $h(k, i) = (h(k) + c_1 i + c_2 i^2) \pmod M$.
     * *Double Hashing*: $h(k, i) = (h_1(k) + i \cdot h_2(k)) \pmod M$.
* **Complexities**:
  * Average: Search / Insert / Delete: $O(1)$
  * Worst Case (all keys collide): $O(n)$
* **Load Factor ($\alpha = N / M$)**: Rehashes and resizes when $\alpha > 0.75$ to preserve $O(1)$ average performance.
* **Applications**: Symbol tables in compilers, database indexing, in-memory caches (Memcached, Redis), associative arrays.

### 2.2 Hash Set
* **Core Principle**: A specialized Hash Table that stores only unique keys without associated values.
* **Complexities**:
  * Insert / Remove / Contains: $O(1)$ average, $O(n)$ worst.
* **Space Complexity**: $O(n)$
* **Applications**: Deduplication of data streams, existence checking (e.g., verifying username availability in registration systems), mathematical set operations (union, intersection, difference).

---

## 🌳 3. Trees (Hierarchical Search - BS/MS Level)

### 3.1 Binary Search Tree (BST)
* **Core Principle**: A binary tree where for every node $X$, all keys in the left subtree are strictly less than $X.\text{key}$, and all keys in the right subtree are strictly greater than $X.\text{key}$.
* **Complexities**:
  * Average (Balanced): Search / Insert / Delete: $O(\log n)$
  * Worst Case (Degenerate / Skewed into a linked list): $O(n)$
* **Traversals**:
  * *In-Order (Left, Root, Right)*: Produces elements in monotonically sorted order.
  * *Pre-Order (Root, Left, Right)*: Ideal for tree serialization and copying.
  * *Post-Order (Left, Right, Root)*: Used for bottom-up node deletion and expression trees.
* **Applications**: Fundamental building block for hierarchical searching, syntax tree parsing.

### 3.2 Heap (Min-Heap / Max-Heap)
* **Core Principle**: A complete binary tree satisfying the **Heap Invariant**: In a Min-Heap, $\text{parent} \le \text{children}$; in a Max-Heap, $\text{parent} \ge \text{children}$.
* **Array-Based Layout**: Root at index 0. For node at index $i$:
  * $\text{Left Child} = 2i + 1$
  * $\text{Right Child} = 2i + 2$
  * $\text{Parent} = \lfloor (i - 1) / 2 \rfloor$
* **Complexities**:
  * Find Min/Max: $O(1)$
  * Insert (`push` / `sift-up`): $O(\log n)$
  * Extract Min/Max (`pop` / `sift-down`): $O(\log n)$
  * Build Heap (`heapify`): $O(n)$ linear time
* **Applications**: Priority Queues, Dijkstra’s shortest path algorithm, Prim’s MST algorithm, HeapSort, OS CPU interrupt scheduling.

### 3.3 AVL Tree & Red-Black Tree (Self-Balancing BSTs)
* **AVL Tree**: Strictly balanced BST where the balance factor ($\text{Height}(\text{Left}) - \text{Height}(\text{Right})$) of every node must be $\in \{-1, 0, 1\}$. Restores balance via 4 rotation types (LL, RR, LR, RL). Height is bounded by $\approx 1.44 \log_2 n$.
  * *Strengths*: Faster lookups due to tighter balance; ideal for read-heavy workloads.
* **Red-Black Tree**: Balanced BST enforcing 5 structural color invariants (root is black, no two adjacent red nodes, every root-to-leaf path has equal black nodes). Height bounded by $2 \log_2(n + 1)$.
  * *Strengths*: Faster insertions and deletions due to fewer rotations (max 2 rotations on insert, 3 on delete).
* **Complexities**: Search / Insert / Delete: $O(\log n)$ guaranteed in worst case.
* **Applications**: Linux kernel Completely Fair Scheduler (CFS), C++ `std::map`/`std::set`, Java `TreeMap`.

### 3.4 Trie (Prefix Tree)
* **Core Principle**: An $M$-ary tree structure where each node represents a character along a string prefix path. Nodes contain an array or map of child character pointers and an `isEndOfWord` boolean flag.
* **Complexities**:
  * Insert / Search / Prefix Query: $O(L)$ where $L$ is the string length, independent of the total number of words in the dataset.
* **Space Complexity**: $O(\text{Total Characters} \times |\Sigma|)$ (can be optimized via Compressed Tries / Radix Trees).
* **Applications**: Search engine autocomplete, spell checkers, IP routing longest prefix matching (Routing Information Base), T9 predictive text.

### 3.5 B-Tree & B+ Tree
* **B-Tree**: Self-balancing $M$-way search tree where each internal node holds multiple keys (up to $M-1$) and child pointers (up to $M$), keeping all leaves at the same depth. Data records are stored in both internal nodes and leaves.
* **B+ Tree**: An optimized variant where internal nodes store *only routing keys*, and *all actual data records reside in leaf nodes*. Leaf nodes are linked sequentially in a doubly linked list for ultra-fast range queries.
* **Complexities**: Search / Insert / Delete: $O(\log_M n)$ where $M$ is typically large ($M = 100 \text{ to } 1000+$).
* **Architectural Advantage**: Maximizes fan-out to match disk block and SSD page sizes (4 KB / 16 KB), minimizing costly physical disk I/O seek operations.
* **Applications**: Core storage engines for relational databases (MySQL InnoDB, PostgreSQL, SQLite) and modern file systems (NTFS, APFS, Ext4, Btrfs).

---

## 🕸️ 4. Graphs (Relationships & Networks - BS/MS Level)

### 4.1 Adjacency Matrix
* **Memory Model**: A 2D array of size $V \times V$ where entry $A[u][v]$ represents the presence (and weight) of an edge from vertex $u$ to vertex $v$.
* **Complexities**:
  * Edge Existence Query $(u, v)$: $O(1)$
  * Iterate Over All Neighbors of $u$: $O(V)$
  * Add / Remove Edge: $O(1)$
  * Add Vertex: $O(V^2)$
* **Space Complexity**: $O(V^2)$ dense matrix.
* **Trade-Off**: Memory-inefficient for sparse graphs where $E \ll V^2$, but exceptionally fast for dense graphs and algebraic graph algorithms (matrix multiplication for path counting, Floyd-Warshall).
* **Applications**: Dense communication matrices, transit route networks, neural network weight connectivity.

### 4.2 Adjacency List
* **Memory Model**: An array of size $V$ where each entry $A[u]$ points to a dynamic list (or array) of adjacent neighbor nodes and edge weights.
* **Complexities**:
  * Edge Existence Query $(u, v)$: $O(\text{degree}(u))$
  * Iterate Over All Neighbors of $u$: $O(\text{degree}(u))$
  * Add Edge: $O(1)$
* **Space Complexity**: $O(V + E)$ optimal memory allocation.
* **Trade-Off**: Vastly superior memory footprint for sparse real-world graphs; optimal for BFS, DFS, Dijkstra’s, and topological sorting algorithms.
* **Applications**: Social media friend graphs, Internet router Autonomous System (AS) topologies, web page link graphs.

---

## 🔬 5. Advanced & Spatial Structures (MS/PhD Level)

### 5.1 Disjoint-Set Union-Find (DSU)
* **Core Principle**: Maintains a collection of disjoint (non-overlapping) sets. Supports two core operations:
  * `find(x)`: Identifies the representative root of the set containing element $x$.
  * `union(x, y)`: Merges the sets containing elements $x$ and $y$.
* **Optimizations**:
  1. *Path Compression*: Flattening the tree during `find` so all nodes point directly to the root.
  2. *Union by Rank / Size*: Attaching the smaller tree under the root of the larger tree.
* **Complexity**: Time per operation is $O(\alpha(n))$ (where $\alpha$ is the Inverse Ackermann Function, practically $\alpha(n) \le 4$ for all physical values of $n$).
* **Applications**: Kruskal’s Minimum Spanning Tree algorithm, cycle detection in undirected graphs, connected component labeling in image processing.

### 5.2 Quadtree & Octree
* **Quadtree (2D)**: Tree structure where every internal node recursively decomposes 2D space into exactly four quadrants (NW, NE, SW, SE) when point density exceeds a capacity threshold.
* **Octree (3D)**: Extends decomposition into eight octants for 3D volumetric space.
* **Complexities**: Spatial Search / Range Query: $O(\log n)$ average.
* **Applications**: Video game spatial partitioning (broad-phase collision detection), spatial indexing in GIS (Google Maps), 3D graphics rendering (frustum culling, ray tracing acceleration), image compression.

### 5.3 Segment Tree & Fenwick Tree (Binary Indexed Tree)
* **Segment Tree**: Full binary tree where each node represents an aggregated interval/segment $[L, R]$ of an array.
  * Range Query (Sum, Min, Max): $O(\log n)$
  * Point / Range Update: $O(\log n)$
  * Space Complexity: $O(4n)$
* **Fenwick Tree (BIT)**: Compact array using bitwise two's complement lowest set bit operations (`i & -i`) to compute prefix sums and updates in place.
  * Prefix Query & Point Update: $O(\log n)$
  * Space Complexity: $O(n)$ in-place without tree pointer overhead.
* **Applications**: Dynamic range queries, competitive programming, real-time financial cumulative metrics.

### 5.4 Suffix Tree & Suffix Array
* **Suffix Tree**: A compressed trie containing all suffixes of a string $S$ of length $n$.
  * Construction Time: $O(n)$ using Ukkonen’s algorithm.
  * Pattern Matching: $O(m)$ time where $m$ is the pattern length, independent of document size $n$.
* **Suffix Array**: A sorted array of all suffix starting indices of $S$. Paired with an LCP (Longest Common Prefix) array, it matches the power of a Suffix Tree with a fraction of the memory footprint.
  * Pattern Matching: $O(m \log n)$ via binary search (or $O(m + \log n)$ with LCP).
* **Applications**: Whole genome DNA sequence alignment (BLAST), full-text search engines, Burrows-Wheeler Transform (BWT) in data compression (Bzip2).

### 5.5 Skip List
* **Core Principle**: A probabilistic alternative to balanced trees consisting of layered linked lists. Lower layers contain all elements; upper layers act as geometric "express lanes" promoted probabilistically via coin flips ($p = 1/2$).
* **Complexities**: Search / Insert / Delete: $O(\log n)$ average time, $O(n)$ worst. Space: $O(n)$.
* **Architectural Advantage**: Trivial to implement compared to Red-Black trees; enables highly efficient **lock-free concurrent implementations** using atomic Compare-And-Swap (CAS) primitives.
* **Applications**: In-memory sorted sets in **Redis** (`ZSET`), LevelDB / RocksDB MemTables.

---

## 🔒 6. Probabilistic & Cryptographic Structures (The Cybersecurity/Big Data Bridge)

### 6.1 Bloom Filter
* **Core Principle**: Space-efficient probabilistic data structure used to test set membership. Composed of a bit array of $m$ bits initialized to 0 and $k$ independent uniform hash functions.
* **Operations**:
  * *Insert*: Compute $h_1(x), \dots, h_k(x)$ and set all corresponding bit indices to 1.
  * *Query*: Compute hash indices. If any bit is 0, the element is **definitely not in the set**. If all bits are 1, the element is **possibly in the set (false positive possible, zero false negatives)**.
* **False Positive Probability**: $P \approx \left(1 - e^{-kn/m}\right)^k$. Optimal hash count $k = \frac{m}{n} \ln 2$.
* **Applications**: Malicious URL filtering in web browsers (Google Chrome), reducing disk seeks in LSM-tree databases (Apache Cassandra, RocksDB, Bigtable), Bitcoin SPV wallet transaction filtering.

### 6.2 HyperLogLog (HLL)
* **Core Principle**: Probabilistic cardinality estimation algorithm that calculates the number of distinct elements in massive streaming datasets by observing the distribution of leading zeros in hashed binary tokens.
* **Mathematical Invariant**: If the maximum leading zeros seen across registers is $Z$, the expected cardinality is approximately $2^Z$. Uses stochastic averaging over $m = 2^p$ harmonic mean registers to eliminate variance.
* **Memory Footprint**: Estimates distinct counts in the billions with a standard error of $\approx 1.04 / \sqrt{m}$ using only **1.5 KB of RAM**.
* **Applications**: Real-time unique visitor counting (Google Analytics, Wikipedia), network telemetry traffic cardinality tracking.

### 6.3 Merkle Tree (Hash Tree)
* **Core Principle**: A complete binary tree where every leaf node contains the cryptographic hash of a data block, and every non-leaf node contains the cryptographic hash of its concatenated child hashes: $\text{Parent} = \text{Hash}(\text{LeftChild} \parallel \text{RightChild})$.
* **Merkle Proofs**: Any single data block can be proven to belong to the authenticated dataset in $O(\log n)$ time and space by providing an authentication path of sibling hashes up to the **Merkle Root**.
* **Tamper Evident**: Modifying a single bit of data anywhere in the tree propagates a cascading hash change all the way to the root hash.
* **Applications**: Blockchain transaction verification (Bitcoin, Ethereum), Git commit version control trees, distributed storage consistency synchronization (Apache Cassandra, DynamoDB, IPFS).

---

## 🔗 The Algorithm & Data Structure Pairing Matrix

Data structures and algorithms are complementary primitives. Mastering computer science requires understanding how specific structures empower corresponding algorithmic paradigms:

| Data Structure | Paired Core Algorithm | Primary Engineering Objective |
| :--- | :--- | :--- |
| **Static / Dynamic Array** | Binary Search / QuickSort | Direct memory addressing, cache-friendly partition sorting |
| **Queue (FIFO)** | Breadth-First Search (BFS) | Level-order graph traversal, shortest path in unweighted graphs |
| **Stack (LIFO)** | Depth-First Search (DFS) | Deep branch exploration, backtracking, topological sort |
| **Heap (Min/Max)** | Dijkstra's / Prim's / HeapSort | Instant minimum extraction, priority scheduling |
| **Hash Table** | Rabin-Karp / Two-Sum | Constant-time key lookup, rolling hash matching |
| **Trie** | Aho-Corasick / KMP | Simultaneous multi-pattern dictionary search |
| **Disjoint-Set (DSU)** | Kruskal's Algorithm | Cycle detection, Minimum Spanning Tree construction |
| **B+ Tree** | Database Index Scans | High-fanout block reads, contiguous range scans on SSDs |
| **Skip List** | Concurrent Ordered Sets | Lock-free concurrent indexing in in-memory databases |
| **Merkle Tree** | SHA-256 Hashing / Proofs | Cryptographic data integrity, lightweight audit proofs |
| **Bloom Filter** | Cache-Bypass Verification | Pre-filtering non-existent keys before physical disk I/O |
