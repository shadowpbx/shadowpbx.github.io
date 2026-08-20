// Auto-generated fallback for offline file:// compatibility
const notesMarkdown = `# Master Index of Algorithms — Definitive Study Guide

Welcome to the **Master Index of Algorithms Study Guide**. This comprehensive reference breaks down the foundational and advanced algorithms in computer science across 11 core domains—from sorting primitives and graph routing to dynamic programming, cryptography, probabilistic streaming, distributed consensus, and quantum computing.

---

## ⚡ 1. Sorting & Searching (The Foundations)

### 1.1 Binary Search
* **Core Principle**: Divides a sorted search space in half repeatedly by comparing the target with the median element.
* **Complexity**: Time: \$O(\\log n)\$ | Space: \$O(1)\$ iterative, \$O(\\log n)\$ recursive.
* **Use Cases**: Database indexing (B-Trees), bisect libraries, finding boundaries in monotonic functions.

### 1.2 MergeSort
* **Core Principle**: Divide-and-conquer algorithm that recursively splits an array into halves until single elements remain, then merges sorted subarrays.
* **Complexity**: Time: \$O(n \\log n)\$ (Best, Average, Worst) | Space: \$O(n)\$.
* **Properties**: Stable sort; highly effective for linked lists and external disk-based sorting.

### 1.3 QuickSort
* **Core Principle**: Selects a pivot element and partitions the array such that elements smaller than the pivot precede it, and larger elements follow it, recursing on both partitions.
* **Complexity**: Time: \$O(n \\log n)\$ average, \$O(n^2)\$ worst-case | Space: \$O(\\log n)\$ stack.
* **Properties**: In-place, cache-friendly; often chosen for standard library sorting implementations (e.g., IntroSort).

### 1.4 HeapSort
* **Core Principle**: Builds a Binary Max-Heap from the input array, repeatedly swaps the root (maximum) with the last unsorted element, and restores the heap property.
* **Complexity**: Time: \$O(n \\log n)\$ (Best, Average, Worst) | Space: \$O(1)\$ auxiliary.
* **Properties**: In-place, non-stable; guaranteed \$O(n \\log n)\$ upper bound with no recursion stack.

### 1.5 Radix Sort
* **Core Principle**: Non-comparative integer sorting algorithm that processes digits sequentially from least significant digit (LSD) to most significant digit (MSD) using a stable sub-routine (like Counting Sort).
* **Complexity**: Time: \$O(d \\cdot (n + k))\$ where \$d\$ is digit count and \$k\$ is radix base | Space: \$O(n + k)\$.
* **Use Cases**: Sorting fixed-width integers, IPv4 addresses, and fixed-length alphanumeric strings.

### 1.6 Insertion Sort
* **Core Principle**: Iteratively consumes one element from the input and inserts it into its correct position within an already sorted prefix.
* **Complexity**: Time: \$O(n)\$ best (nearly sorted), \$O(n^2)\$ worst | Space: \$O(1)\$.
* **Use Cases**: Small arrays (\$n \\le 16\$), nearly sorted data, and hybrid sort fallbacks (e.g., TimSort, IntroSort).

### 1.7 Counting Sort
* **Core Principle**: Non-comparative sorting for integers within a known, small range \$[0, k]\$. Counts the occurrences of each distinct value and computes cumulative prefix sums to place elements directly into output positions.
* **Complexity**: Time: \$O(n + k)\$ | Space: \$O(n + k)\$.
* **Use Cases**: Dense integer ranges, sub-routine for Radix Sort.

---

## 🌐 2. Graph & Network Algorithms (Routing & Relationships)

### 2.1 Breadth-First Search (BFS)
* **Core Principle**: Explores graph vertices layer-by-layer (level-order) using a FIFO queue.
* **Complexity**: Time: \$O(V + E)\$ | Space: \$O(V)\$.
* **Use Cases**: Shortest path in unweighted graphs, peer-to-peer neighbor discovery, web crawling.

### 2.2 Depth-First Search (DFS)
* **Core Principle**: Traverses as deeply as possible along each branch before backtracking, utilizing a LIFO stack or call stack.
* **Complexity**: Time: \$O(V + E)\$ | Space: \$O(V)\$.
* **Use Cases**: Topological sorting, cycle detection, connected components, maze generation/solving.

### 2.3 Dijkstra’s Algorithm
* **Core Principle**: Greedy algorithm finding the shortest path from a single source to all vertices in a non-negative weighted graph using a Min-Priority Queue.
* **Complexity**: Time: \$O((V + E) \\log V)\$ with binary heap, \$O(E + V \\log V)\$ with Fibonacci heap | Space: \$O(V)\$.
* **Use Cases**: GPS navigation, IP routing protocols (OSPF, IS-IS).

### 2.4 A* (A-Star) Search
* **Core Principle**: Best-first search that evaluates paths using \$f(n) = g(n) + h(n)\$, where \$g(n)\$ is the exact cost from start to \$n\$, and \$h(n)\$ is an admissible, consistent heuristic estimate of the cost to the goal.
* **Complexity**: Time: \$O(E)\$ best, \$O(b^d)\$ worst | Space: \$O(V)\$.
* **Use Cases**: Video game pathfinding (NPC AI), robotics motion planning.

### 2.5 Kruskal’s & Prim’s Algorithms (Minimum Spanning Tree)
* **Kruskal’s**: Edge-centric greedy approach sorting all edges and adding them to the MST using Disjoint Set Union (DSU / Union-Find) to prevent cycles (\$O(E \\log E)\$).
* **Prim’s**: Vertex-centric greedy approach growing a single tree from a starting node using a Min-Priority Queue (\$O(E \\log V)\$).
* **Use Cases**: Telecommunication network wiring, pipeline layouts, circuit design.

### 2.6 Bellman-Ford Algorithm
* **Core Principle**: Computes single-source shortest paths on directed graphs by relaxing all \$E\$ edges \$V - 1\$ times. Can detect reachable negative weight cycles.
* **Complexity**: Time: \$O(V \\cdot E)\$ | Space: \$O(V)\$.
* **Use Cases**: Distance-Vector routing (RIP), financial currency arbitrage detection.

### 2.7 Floyd-Warshall Algorithm
* **Core Principle**: Dynamic programming algorithm that computes all-pairs shortest paths across a directed weighted graph with positive or negative edge weights (no negative cycles).
* **Recurrence**: \$D_{i,j}^{(k)} = \\min(D_{i,j}^{(k-1)}, D_{i,k}^{(k-1)} + D_{k,j}^{(k-1)})\$.
* **Complexity**: Time: \$O(V^3)\$ | Space: \$O(V^2)\$.
* **Use Cases**: Dense network traffic matrix routing, transitive closure computation.

### 2.8 Topological Sort
* **Core Principle**: Linearly orders vertices of a Directed Acyclic Graph (DAG) such that for every directed edge \$(u, v)\$, vertex \$u\$ comes before \$v\$. Implemented via Kahn's Algorithm (in-degree tracking) or DFS post-order reversal.
* **Complexity**: Time: \$O(V + E)\$ | Space: \$O(V)\$.
* **Use Cases**: Build dependency resolvers (Make, Webpack), course prerequisite scheduling.

### 2.9 Ford-Fulkerson & Edmonds-Karp (Maximum Flow)
* **Core Principle**: Calculates the maximum flow through a flow network by repeatedly finding augmenting paths from source \$s\$ to sink \$t\$ in residual graphs. Edmonds-Karp uses BFS to guarantee polynomial termination.
* **Complexity**: Ford-Fulkerson: \$O(E \\cdot f_{\\max})\$; Edmonds-Karp: \$O(V \\cdot E^2)\$.
* **Use Cases**: Network bandwidth allocation, bipartite matching, airline flight scheduling.

### 2.10 Tarjan’s Strongly Connected Components (SCC)
* **Core Principle**: Identifies maximal subgraphs where every vertex is reachable from every other vertex in a directed graph using a single DFS pass with discovery and low-link values.
* **Complexity**: Time: \$O(V + E)\$ | Space: \$O(V)\$.
* **Use Cases**: Social network cluster analysis, deadlock detection, compiler optimization.

---

## 🧩 3. Dynamic Programming (Optimization & Memory)

### 3.1 0-1 Knapsack Problem
* **Core Principle**: Determines the subset of \$N\$ items, each with weight \$w_i\$ and value \$v_i\$, to maximize total value without exceeding capacity \$W\$, where each item is chosen 0 or 1 times.
* **Complexity**: Time: \$O(N \\cdot W)\$ (Pseudo-polynomial) | Space: \$O(W)\$ optimized.
* **Use Cases**: Resource allocation, budget management, cargo packing optimization.

### 3.2 Longest Common Subsequence (LCS)
* **Core Principle**: Finds the longest sequence that appears in the same relative order (not necessarily contiguous) across two strings \$A\$ and \$B\$.
* **Complexity**: Time: \$O(m \\cdot n)\$ | Space: \$O(m \\cdot n)\$ or \$O(\\min(m, n))\$.
* **Use Cases**: \`git diff\` source control revision, DNA sequence alignment in bioinformatics.

### 3.3 Levenshtein Distance (Edit Distance)
* **Core Principle**: Measures the minimum number of single-character operations (insertions, deletions, substitutions) required to transform string \$A\$ into string \$B\$.
* **Complexity**: Time: \$O(m \\cdot n)\$ | Space: \$O(\\min(m, n))\$ space-optimized.
* **Use Cases**: Spell check correction, speech recognition matching, fuzzy string querying.

### 3.4 Matrix Chain Multiplication
* **Core Principle**: Finds the optimal parenthesization of a sequence of matrices to minimize the total number of scalar multiplications, using memoized interval subproblems.
* **Complexity**: Time: \$O(n^3)\$ | Space: \$O(n^2)\$.
* **Use Cases**: Graphics rendering pipelines, high-performance linear algebra engines.

---

## 📝 4. String Processing, Parsing, & Compression (Text Processing)

### 4.1 Knuth-Morris-Pratt (KMP)
* **Core Principle**: Performs linear-time pattern searching by precomputing a Longest Proper Prefix which is also a Suffix (LPS / \$\\pi\$) table, avoiding redundant comparisons upon mismatch.
* **Complexity**: Preprocessing: \$O(m)\$ | Matching: \$O(n)\$ | Space: \$O(m)\$.
* **Use Cases**: Exact text matching, stream filtering, gene sequence analysis.

### 4.2 Rabin-Karp Algorithm
* **Core Principle**: Employs rolling hash functions to compare the hash of a pattern against hashes of sliding windows in the text, verifying character-by-character only upon hash collision.
* **Complexity**: Average Time: \$O(n + m)\$; Worst Time: \$O(n \\cdot m)\$ | Space: \$O(1)\$.
* **Use Cases**: Plagiarism detection, multi-pattern searching in single pass.

### 4.3 Boyer-Moore Algorithm
* **Core Principle**: Scans pattern characters from right to left and utilizes the Bad Character Rule and Good Suffix Rule to skip large blocks of text upon mismatch.
* **Complexity**: Best Time: \$O(n / m)\$; Worst Time: \$O(n \\cdot m)\$ | Space: \$O(m + \\Sigma)\$.
* **Use Cases**: GNU \`grep\`, text editor "Find" functions (Ctrl+F).

### 4.4 Aho-Corasick Algorithm
* **Core Principle**: Constructs a finite-state machine (Trie augmented with failure and output links) to locate all occurrences of an arbitrary set of keywords simultaneously in linear time.
* **Complexity**: Preprocessing: \$O(\\sum |P_i|)\$; Searching: \$O(n + z)\$ where \$z\$ is match count | Space: \$O(\\sum |P_i| \\cdot \\Sigma)\$.
* **Use Cases**: Antivirus signature scanning, Intrusion Detection Systems (Snort, Suricata).

### 4.5 Huffman Coding
* **Core Principle**: Lossless data compression algorithm that builds a prefix-free binary tree based on character frequencies, assigning shorter bitcodes to frequent symbols.
* **Complexity**: Time: \$O(n \\log n)\$ | Space: \$O(n)\$.
* **Use Cases**: Deflate compression in ZIP, GZIP, PNG, and JPEG entropy encoding.

### 4.6 Lempel-Ziv-Welch (LZW) Compression
* **Core Principle**: Dictionary-based lossless compression algorithm that dynamically builds a table of recurring character sequences during encoding and decoding without transmitting the dictionary.
* **Complexity**: Time: \$O(n)\$ | Space: \$O(D)\$ where \$D\$ is dictionary capacity.
* **Use Cases**: GIF image compression, UNIX \`compress\`, TIFF formats.

---

## 📐 5. Mathematics & Number Theory

### 5.1 Euclidean Algorithm & Extended Euclidean
* **Core Principle**: Computes \$\\gcd(a, b)\$ recursively via \$\\gcd(b, a \\pmod b)\$ based on the principle that the GCD also divides their difference. The extended version computes coefficients \$x, y\$ such that \$a x + b y = \\gcd(a, b)\$.
* **Complexity**: Time: \$O(\\log(\\min(a, b)))\$ | Space: \$O(1)\$.
* **Use Cases**: Modular multiplicative inverse in RSA key generation, fraction simplification.

### 5.2 Sieve of Eratosthenes
* **Core Principle**: Finds all prime numbers up to a specified integer \$N\$ by iteratively marking the multiples of each prime as composite, starting from 2.
* **Complexity**: Time: \$O(N \\log \\log N)\$ | Space: \$O(N)\$ (or \$O(\\sqrt{N})\$ with segmented sieve).
* **Use Cases**: Prime generation for cryptographic primes, mathematical number theory engines.

### 5.3 Fast Fourier Transform (FFT)
* **Core Principle**: Computes the Discrete Fourier Transform (DFT) and its inverse by decomposing a sequence of length \$N = 2^k\$ into even and odd sub-sequences (Cooley-Tukey algorithm).
* **Complexity**: Time: \$O(N \\log N)\$ vs \$O(N^2)\$ standard DFT | Space: \$O(N)\$.
* **Use Cases**: Digital signal processing, audio spectral analysis, fast polynomial multiplication.

### 5.4 Monte Carlo Algorithm
* **Core Principle**: Randomized algorithmic paradigm that relies on repeated random sampling to compute numerical estimates where deterministic calculation is intractable.
* **Complexity**: Convergence rate: \$O(1 / \\sqrt{N})\$ independent of dimension.
* **Use Cases**: High-dimensional numerical integration, financial risk modeling, physics simulations.

---

## 🔺 6. Computational Geometry (Spatial & Visual)

### 6.1 Graham Scan (Convex Hull)
* **Core Principle**: Computes the convex hull of a 2D point set by sorting points by polar angle with respect to the lowest point and maintaining a stack of hull vertices using 2D cross-product orientation tests.
* **Complexity**: Time: \$O(n \\log n)\$ | Space: \$O(n)\$.
* **Use Cases**: Collision boundary generation, GIS spatial analysis, cluster perimeter calculation.

### 6.2 Sweep Line Algorithm
* **Core Principle**: Solves 2D geometric problems by sweeping an imaginary vertical line across the plane, maintaining active geometric objects in a self-balancing binary search tree.
* **Complexity**: Bentley-Ottmann line intersection: \$O((n + k) \\log n)\$ where \$k\$ is intersections.
* **Use Cases**: VLSI circuit design DRC verification, map overlay processing in GIS.

### 6.3 Ray Casting Algorithm
* **Core Principle**: Determines point-in-polygon inclusion by casting an infinite ray from the test point and counting intersections with polygon edges (odd = inside, even = outside).
* **Complexity**: Time: \$O(n)\$ per point query | Space: \$O(1)\$.
* **Use Cases**: Video game hitboxes, ray-tracing graphics, GIS geographic boundary lookups.

---

## 🔒 7. Cryptography & Security

### 7.1 RSA Algorithm
* **Core Principle**: Asymmetric public-key cryptosystem based on the mathematical difficulty of factoring large composite integers into two large prime factors (\$N = p \\cdot q\$).
* **Key Components**: Public exponent \$e\$, Private exponent \$d \\equiv e^{-1} \\pmod{\\phi(N)}\$.
* **Complexity**: Encryption/Decryption: \$O(k^3)\$ where \$k\$ is bit-length.
* **Use Cases**: Digital certificates, TLS handshake key exchange, SSH authentication.

### 7.2 AES (Advanced Encryption Standard)
* **Core Principle**: Symmetric block cipher operating on 128-bit blocks across 10, 12, or 14 rounds for 128, 192, or 256-bit keys via Substitution-Permutation Network (SubBytes, ShiftRows, MixColumns, AddRoundKey).
* **Modes**: AES-GCM (Authenticated Encryption), AES-CBC, AES-CTR.
* **Use Cases**: Disk encryption (BitLocker, LUKS), TLS 1.3 payload encryption, VPN tunnels.

### 7.3 SHA-256 (Secure Hash Algorithm)
* **Core Principle**: Merkle-Damgård cryptographic hash function producing a deterministic 256-bit output from arbitrary-length inputs through 64 rounds of bitwise logical functions.
* **Properties**: Pre-image resistance, second pre-image resistance, collision resistance.
* **Use Cases**: Blockchain Proof of Work (Bitcoin), file integrity verification, digital signatures.

### 7.4 Diffie-Hellman Key Exchange
* **Core Principle**: Allows two parties to establish a shared secret over an insecure channel using the Discrete Logarithm Problem in cyclic groups: \$(g^a)^b \\equiv (g^b)^a \\pmod p\$.
* **Modern Evolution**: ECDH (Elliptic Curve Diffie-Hellman) using Curve25519 or secp256r1.
* **Use Cases**: Perfect Forward Secrecy in TLS 1.3 and SSH.

---

## 📊 8. Big Data, Hashing, & Streaming (Scale)

### 8.1 Bloom Filter
* **Core Principle**: Space-efficient probabilistic data structure using a bit array of size \$m\$ and \$k\$ independent hash functions. Guarantees zero false negatives (answers "definitely not in set" or "possibly in set").
* **Complexity**: Query/Insert: \$O(k)\$ time | Space: \$O(m)\$ bits.
* **Use Cases**: Web cache filtering (Squid), database disk read reduction (Cassandra, RocksDB).

### 8.2 HyperLogLog (HLL)
* **Core Principle**: Probabilistic cardinality estimator that estimates the number of distinct elements in a massive stream by tracking the maximum number of leading zeros in hashed values across \$m\$ registers.
* **Accuracy**: Standard error \$\\approx 1.04 / \\sqrt{m}\$ using only \$\\sim 1.5 \\text{ KB}\$ memory for billions of items.
* **Use Cases**: Redis \`PFADD\`/\`PFCOUNT\`, unique visitor tracking in Google Analytics.

### 8.3 Count-Min Sketch
* **Core Principle**: 2D array of counters with \$d\$ hash functions tracking item frequencies in high-throughput data streams. Provides \$(\\epsilon, \\delta)\$ bounded frequency over-estimates.
* **Complexity**: Update/Query: \$O(d)\$ time | Space: \$O\\left(\\frac{e}{\\epsilon} \\ln \\frac{1}{\\delta}\\right)\$.
* **Use Cases**: Real-time trending hashtag tracking on Twitter/X, network heavy-hitter DDoS detection.

### 8.4 Locality-Sensitive Hashing (LSH)
* **Core Principle**: Hashing scheme where similar items hash into the same buckets with high probability, reducing nearest-neighbor search from \$O(N)\$ to sub-linear time.
* **Variants**: MinHash (Jaccard similarity), SimHash (Cosine similarity).
* **Use Cases**: Recommendation systems (Netflix, Spotify), audio fingerprinting (Shazam).

### 8.5 PageRank
* **Core Principle**: Link analysis algorithm modeling a random web surfer to assign numerical weights to hyperlinked documents based on eigenvector centrality in a transition probability matrix.
* **Equation**: \$PR(u) = \\frac{1-d}{N} + d \\sum_{v \\in B_u} \\frac{PR(v)}{L(v)}\$.
* **Use Cases**: Google web search ranking, citation impact analysis.

### 8.6 MapReduce
* **Core Principle**: Distributed programming paradigm splitting computation into a \`Map\` phase (filtering/sorting into key-value pairs) and a \`Reduce\` phase (aggregating values per key) across a computing cluster.
* **Fault Tolerance**: Automatic task re-execution on node failure.
* **Use Cases**: Hadoop big data processing, large-scale log aggregation, distributed indexing.

---

## 🤖 9. Machine Learning, AI, & Meta-Heuristics

### 9.1 Gradient Descent
* **Core Principle**: First-order iterative optimization algorithm that steps model parameters \$\\theta\$ in the direction of the negative gradient of the loss function: \$\\theta \\leftarrow \\theta - \\alpha \\nabla J(\\theta)\$.
* **Variants**: Batch Gradient Descent, Stochastic Gradient Descent (SGD), Adam Optimizer.
* **Use Cases**: Model training in linear regression, logistic regression, and deep neural networks.

### 9.2 Backpropagation
* **Core Principle**: Method for efficiently calculating the gradient of the loss function with respect to every weight in a neural network via the recursive application of the calculus Chain Rule.
* **Complexity**: Time: \$O(W)\$ per sample where \$W\$ is total weights.
* **Use Cases**: Deep learning neural network training (CNNs, Transformers, LLMs).

### 9.3 K-Means Clustering
* **Core Principle**: Unsupervised partitioning algorithm that clusters \$N\$ observations into \$K\$ clusters by alternating between assigning points to the nearest centroid and recomputing centroids as cluster means (Lloyd's algorithm).
* **Complexity**: Time: \$O(t \\cdot K \\cdot N \\cdot d)\$ | Space: \$O(N \\cdot d + K \\cdot d)\$.
* **Use Cases**: Customer market segmentation, image color quantization, anomaly detection.

### 9.4 Support Vector Machines (SVM)
* **Core Principle**: Supervised classification algorithm that finds the maximum-margin hyperplane separating classes in feature space. Employs the "Kernel Trick" (RBF, Polynomial) to map non-linear data into higher dimensions.
* **Complexity**: Training: \$O(N^2)\$ to \$O(N^3)\$ | Inference: \$O(d \\cdot |SV|)\$.
* **Use Cases**: Bioinformatics classification, image recognition, financial credit scoring.

### 9.5 Minimax with Alpha-Beta Pruning
* **Core Principle**: Decision-theoretic algorithm for two-player zero-sum turn-based games that maximizes the minimum gain. Alpha-Beta pruning discards branches that cannot influence the final decision.
* **Complexity**: Without pruning: \$O(b^d)\$; With optimal pruning: \$O(b^{d/2})\$.
* **Use Cases**: Chess engines (Stockfish), Checkers, Tic-Tac-Toe AI.

### 9.6 Simulated Annealing
* **Core Principle**: Probabilistic meta-heuristic inspired by metallurgical annealing. Accepts worse solutions with probability \$P = e^{-\\Delta E / T}\$, cooling temperature \$T\$ over time to escape local minima.
* **Use Cases**: Traveling Salesperson Problem (TSP), FPGA circuit placement, scheduling optimization.

### 9.7 Genetic Algorithms
* **Core Principle**: Optimization heuristic mimicking natural selection through iterative generations of selection, crossover (recombination), and random mutation on a population of candidate solutions.
* **Use Cases**: Complex engineering design optimization, automated neural network architecture search.

---

## 🌐 10. Distributed Systems & Consensus

### 10.1 Paxos & Raft Consensus Algorithms
* **Core Principle**: Distributed state machine replication protocols ensuring a cluster of nodes agrees on an ordered log of state transitions despite network partitions and node crashes (\$F\$ failures tolerated in \$2F + 1\$ cluster).
* **Raft Roles**: Leader, Follower, Candidate (decomposed into Leader Election, Log Replication, Safety).
* **Use Cases**: etcd (Kubernetes), Apache ZooKeeper, CockroachDB, Consul.

### 10.2 Proof of Work (PoW) & Proof of Stake (PoS)
* **Proof of Work**: Sybil-resistance mechanism requiring miners to compute a cryptographic hash below a target threshold (e.g., Bitcoin SHA-256).
* **Proof of Stake**: Consensus mechanism selecting validators proportionally to their economic stake locked in the network (e.g., Ethereum Casper).
* **Use Cases**: Decentralized blockchain ledgers, trustless Byzantine fault tolerance.

---

## ⚛️ 11. Quantum Algorithms (The PhD Frontier)

### 11.1 Shor’s Algorithm
* **Core Principle**: Quantum algorithm for integer factorization that reduces factoring to order-finding via Quantum Fourier Transform (QFT), achieving exponential speedup over classical algorithms.
* **Complexity**: Quantum Time: \$O((\\log N)^2 \\cdot (\\log \\log N) \\cdot (\\log \\log \\log N))\$ vs Sub-exponential classical GNFS.
* **Impact**: Renders RSA and Diffie-Hellman public-key cryptography insecure once fault-tolerant quantum computers are realized; motivates Post-Quantum Cryptography (PQC).

### 11.2 Grover’s Algorithm
* **Core Principle**: Quantum search algorithm that finds an item in an unstructured database of \$N\$ elements using quantum superposition and amplitude amplification.
* **Complexity**: Quantum Time: \$O(\\sqrt{N})\$ vs Classical \$O(N)\$ (Quadratic speedup).
* **Impact**: Effectively halves the security bit-strength of symmetric ciphers (e.g., AES-128 reduced to 64-bit security), requiring migration to AES-256 for post-quantum safety.
`;
