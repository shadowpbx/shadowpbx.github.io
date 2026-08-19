---
title: "Master Index of Algorithms"
date: "2026.08.18"
tags: ["ALGORITHMS", "COMPUTER SCIENCE"]
summary: "An MIT/CMU-grade comprehensive master taxonomy of algorithmic paradigms, computational complexity matrices, graph theory, dynamic programming, cryptography, streaming sketches, ML optimization, distributed consensus, and quantum computing."
is_macroview: true
---

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-left: 4px solid #8e44ad; padding: 1.25rem 1.5rem; border-radius: 0 8px 8px 0; margin-bottom: 2rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
    <p style="margin: 0; font-size: 1.05rem; line-height: 1.6; color: #334155; font-style: italic; font-weight: 500;">
        <strong>Academic Scope & Specification:</strong> A rigorous computational taxonomy and algorithmic reference synthesized according to top-tier university curricula (MIT 6.006/6.046, UC Berkeley CS 170, CMU 15-451). Spans 11 foundational domains featuring exact asymptotic complexities (Best, Worst, Average, Auxiliary Space), algorithmic design paradigms, formal state invariants, and practical systems implementations.
    </p>
</div>

---

## 🏛️ Algorithmic Design Paradigms

Before analyzing specific algorithms, computer scientists classify algorithms by their underlying design strategy:

1. **Divide-and-Conquer:** Break the problem into non-overlapping subproblems of the same type, solve them recursively, and combine solutions *(e.g., MergeSort, Fast Fourier Transform, Strassen's Matrix Multiplication)*. Governed by the **Master Theorem**: $T(n) = aT(n/b) + O(n^d)$.
2. **Greedy Strategy:** Construct a solution incrementally by choosing the locally optimal choice at each step without backtracking *(e.g., Dijkstra, Kruskal, Prim, Huffman Coding)*. Requires proving the **Greedy-Choice Property** and **Optimal Substructure**.
3. **Dynamic Programming (DP):** Solve optimization problems exhibiting **overlapping subproblems** and **optimal substructure** by caching intermediate subproblem solutions via memoization (top-down) or tabulation (bottom-up) *(e.g., Knapsack, Bellman-Ford, Floyd-Warshall)*.
4. **Reduction & Transform-and-Conquer:** Transform a problem into an instance of a known solved problem *(e.g., Bipartite Matching reduced to Max Flow, 3-SAT reductions)*.
5. **Randomization & Probabilistic Analysis:** Utilize pseudo-random choices to guarantee expected polynomial runtime or sublinear space bounds *(e.g., Randomized QuickSort, Miller-Rabin, HyperLogLog)*.
6. **Branch-and-Bound / Pruning:** Systematically enumerate candidate solutions along a search tree while pruning unpromising subtrees *(e.g., A* Search, Alpha-Beta Pruning, Traveling Salesperson exact solver)*.

---

## 1. Sorting & Searching (The Foundations)
*Comparative and non-comparative ordering, in-place partitioning, and retrieval complexity.*

### 📊 Sorting Complexity Matrix
<div style="overflow-x: auto;">
<table>
    <thead>
        <tr>
            <th>Algorithm</th>
            <th>Best Time</th>
            <th>Average Time</th>
            <th>Worst Time</th>
            <th>Space (Aux)</th>
            <th>Stable?</th>
            <th>Design Paradigm</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>Binary Search</strong></td>
            <td><code>O(1)</code></td>
            <td><code>O(log n)</code></td>
            <td><code>O(log n)</code></td>
            <td><code>O(1)</code></td>
            <td>N/A</td>
            <td>Divide &amp; Conquer / Decrease</td>
        </tr>
        <tr>
            <td><strong>MergeSort</strong></td>
            <td><code>O(n log n)</code></td>
            <td><code>O(n log n)</code></td>
            <td><code>O(n log n)</code></td>
            <td><code>O(n)</code></td>
            <td>Yes</td>
            <td>Divide &amp; Conquer</td>
        </tr>
        <tr>
            <td><strong>QuickSort (Randomized)</strong></td>
            <td><code>O(n log n)</code></td>
            <td><code>O(n log n)</code></td>
            <td><code>O(n²)</code></td>
            <td><code>O(log n)</code></td>
            <td>No</td>
            <td>Divide &amp; Conquer / Partitioning</td>
        </tr>
        <tr>
            <td><strong>HeapSort</strong></td>
            <td><code>O(n log n)</code></td>
            <td><code>O(n log n)</code></td>
            <td><code>O(n log n)</code></td>
            <td><code>O(1)</code></td>
            <td>No</td>
            <td>Selection / Binary Heap</td>
        </tr>
        <tr>
            <td><strong>Insertion Sort</strong></td>
            <td><code>O(n)</code></td>
            <td><code>O(n²)</code></td>
            <td><code>O(n²)</code></td>
            <td><code>O(1)</code></td>
            <td>Yes</td>
            <td>Incremental Insertion</td>
        </tr>
        <tr>
            <td><strong>Counting Sort</strong></td>
            <td><code>O(n + k)</code></td>
            <td><code>O(n + k)</code></td>
            <td><code>O(n + k)</code></td>
            <td><code>O(k)</code></td>
            <td>Yes</td>
            <td>Non-Comparative / Direct Indexing</td>
        </tr>
        <tr>
            <td><strong>Radix Sort (LSD)</strong></td>
            <td><code>O(nk)</code></td>
            <td><code>O(nk)</code></td>
            <td><code>O(nk)</code></td>
            <td><code>O(n + k)</code></td>
            <td>Yes</td>
            <td>Non-Comparative / Positional Digit</td>
        </tr>
        <tr>
            <td><strong>Timsort (Python / Java)</strong></td>
            <td><code>O(n)</code></td>
            <td><code>O(n log n)</code></td>
            <td><code>O(n log n)</code></td>
            <td><code>O(n)</code></td>
            <td>Yes</td>
            <td>Hybrid (MergeSort + Insertion Sort)</td>
        </tr>
    </tbody>
</table>
</div>

*   **Binary Search** — Searches a sorted collection by evaluating the median element and halving the remaining interval. Guaranteed `O(log n)` comparisons; optimal for static read-heavy arrays.
*   **MergeSort** — Recursively splits arrays into singletons, then merges subarrays using a two-pointer merge subroutine. Optimal when guaranteed worst-case `O(n log n)` and stability are mandatory (standard for linked lists and external disk sorting).
*   **QuickSort** — Partitions an array around a chosen pivot (Hoare or Lomuto partitioning) such that elements `< pivot` precede it and elements `> pivot` follow it. Highly cache-friendly; standard for in-memory primitive sorting (e.g., C `qsort`, Rust `sort_unstable`).
*   **HeapSort** — Constructs an in-place `Max-Heap` in `O(n)` time using `heapify`, then repeatedly swaps the root maximum with the terminal leaf and sifts down. Guarantees `O(n log n)` without auxiliary memory allocations (`O(1)` space).
*   **Radix Sort (LSD / MSD)** — Sorts multi-digit keys position by position using a stable sub-sort (typically Counting Sort). Avoids comparison-based lower bounds ($\Omega(n \log n)$), running in linear time `O(nk)` where $k$ is key width.
*   **Insertion Sort** — Builds the sorted array in-place one item at a time. Runs in linear `O(n)` time on nearly sorted inputs; serves as the base case switch threshold ($n \le 32$) inside hybrid engines like **Timsort** and **Introsort**.
*   **Counting Sort** — Computes key frequency histograms over an integer range $[0, k]$, transforming counts into prefix sums to place items directly into their output slots. Proves linear sorting is possible under bounded integer domains.

---

## 2. Graph & Network Algorithms (Routing & Relationships)
*Pathfinding, minimum spanning trees, cycle detection, and flow networks across directed/undirected graphs.*

### 📊 Graph Algorithms Complexity Matrix
<div style="overflow-x: auto;">
<table>
    <thead>
        <tr>
            <th>Algorithm</th>
            <th>Primary Objective</th>
            <th>Time Complexity</th>
            <th>Space Complexity</th>
            <th>Negative Edges?</th>
            <th>Design Paradigm</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>Breadth-First Search (BFS)</strong></td>
            <td>Shortest Path (Unweighted)</td>
            <td><code>O(V + E)</code></td>
            <td><code>O(V)</code></td>
            <td>N/A (Unweighted)</td>
            <td>Queue Traversal</td>
        </tr>
        <tr>
            <td><strong>Depth-First Search (DFS)</strong></td>
            <td>Topological Sort, Cycles, SCC</td>
            <td><code>O(V + E)</code></td>
            <td><code>O(V)</code></td>
            <td>N/A</td>
            <td>Recursive Stack Traversal</td>
        </tr>
        <tr>
            <td><strong>Dijkstra (Min-Heap)</strong></td>
            <td>Single-Source Shortest Path (SSSP)</td>
            <td><code>O((V + E) log V)</code></td>
            <td><code>O(V)</code></td>
            <td>❌ No (Non-negative only)</td>
            <td>Greedy + Priority Queue</td>
        </tr>
        <tr>
            <td><strong>A* (A-Star) Search</strong></td>
            <td>Heuristic Shortest Path</td>
            <td><code>O(E)</code> (Best) – <code>O(bᵈ)</code></td>
            <td><code>O(V)</code></td>
            <td>❌ No</td>
            <td>Best-First / Heuristic Search</td>
        </tr>
        <tr>
            <td><strong>Bellman-Ford</strong></td>
            <td>SSSP + Negative Cycle Detection</td>
            <td><code>O(V · E)</code></td>
            <td><code>O(V)</code></td>
            <td>✅ Yes</td>
            <td>Dynamic Programming</td>
        </tr>
        <tr>
            <td><strong>Floyd-Warshall</strong></td>
            <td>All-Pairs Shortest Path (APSP)</td>
            <td><code>O(V³)</code></td>
            <td><code>O(V²)</code></td>
            <td>✅ Yes (No neg cycles)</td>
            <td>Dynamic Programming</td>
        </tr>
        <tr>
            <td><strong>Kruskal’s Algorithm</strong></td>
            <td>Minimum Spanning Tree (MST)</td>
            <td><code>O(E log E)</code></td>
            <td><code>O(V)</code></td>
            <td>✅ Yes</td>
            <td>Greedy + Disjoint Set (DSU)</td>
        </tr>
        <tr>
            <td><strong>Prim’s Algorithm</strong></td>
            <td>Minimum Spanning Tree (MST)</td>
            <td><code>O((V + E) log V)</code></td>
            <td><code>O(V)</code></td>
            <td>✅ Yes</td>
            <td>Greedy + Priority Queue</td>
        </tr>
        <tr>
            <td><strong>Tarjan’s SCC</strong></td>
            <td>Strongly Connected Components</td>
            <td><code>O(V + E)</code></td>
            <td><code>O(V)</code></td>
            <td>N/A (Directed)</td>
            <td>Single-Pass DFS + Low-Link</td>
        </tr>
        <tr>
            <td><strong>Edmonds-Karp (Max Flow)</strong></td>
            <td>Maximum Network Flow</td>
            <td><code>O(V · E²)</code></td>
            <td><code>O(V + E)</code></td>
            <td>N/A (Capacities $\ge 0$)</td>
            <td>Augmenting Paths via BFS</td>
        </tr>
    </tbody>
</table>
</div>

*   **Breadth-First Search (BFS)** — Explores all neighbor nodes at current depth $k$ before advancing to $k+1$ using a FIFO queue. Computes shortest path on unweighted graphs and minimum hop counts in computer networks.
*   **Depth-First Search (DFS)** — Traverses deepest along paths before backtracking via a recursion call stack. Fundamental for cycle detection, bipartite testing, Euler paths, and topological ordering.
*   **Dijkstra’s Algorithm** — Computes single-source shortest paths on weighted directed graphs with non-negative edge weights $w(u, v) \ge 0$. Maintains distance estimates updated via the relaxation invariant:
    $$d[v] = \min(d[v], d[u] + w(u, v))$$
*   **A\* (A-Star) Search** — Heuristic graph search accelerating Dijkstra by prioritizing nodes minimizing evaluation function $f(n) = g(n) + h(n)$, where $g(n)$ is known cost from origin and $h(n)$ is an admissible, consistent heuristic estimate to the goal (powers GPS routing, robotics, and game AI).
*   **Kruskal’s Algorithm** — Minimum Spanning Tree (MST) algorithm that sorts all edges by weight and greedily unifies disjoint components using a **Disjoint-Set Union (DSU)** structure with path compression and union-by-rank running in near-linear $O(E \alpha(V))$ time.
*   **Prim’s Algorithm** — Builds an MST starting from an arbitrary root node, greedily expanding a cut boundary by consuming minimum-weight incident edges stored in a min-priority queue.
*   **Bellman-Ford Algorithm** — Solves single-source shortest paths on arbitrary directed graphs containing negative edge weights. Relaxes all $|E|$ edges $|V|-1$ times; a subsequent relaxation check that still decreases distance proves the existence of a negative-weight cycle.
*   **Floyd-Warshall Algorithm** — Dynamic programming algorithm computing all-pairs shortest paths simultaneously across every node pair $(i, j)$ using intermediate vertices $\{1, \dots, k\}$:
    $$D^{(k)}[i, j] = \min\left(D^{(k-1)}[i, j],\, D^{(k-1)}[i, k] + D^{(k-1)}[k, j]\right)$$
*   **Topological Sort (Kahn’s / DFS)** — Linearly orders DAG vertices such that every directed edge $u \to v$ guarantees $u$ precedes $v$. Critical for compiler build order systems (Make, CMake), CI/CD task graphs, and package dependency managers.
*   **Ford-Fulkerson & Edmonds-Karp** — Determines maximum flow across capacity-constrained source-to-sink networks. Edmonds-Karp implements BFS to find shortest augmenting paths in the residual graph, terminating in $O(VE^2)$ time via the Max-Flow Min-Cut theorem.
*   **Tarjan’s Algorithm** — Discovers all Strongly Connected Components (SCCs) in a directed graph during a single DFS traversal using DFS discovery timestamps and node `low-link` values stored on a stack in $O(V + E)$ time.

---

## 3. Dynamic Programming (Optimization & Memory)
*Decomposing NP-hard or combinatorial search spaces into overlapping subproblems with optimal substructure.*

### 📊 Canonical Dynamic Programming Formulations
<div style="overflow-x: auto;">
<table>
    <thead>
        <tr>
            <th>Problem</th>
            <th>State Definition</th>
            <th>Time Complexity</th>
            <th>Space Complexity</th>
            <th>Real-World Application</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>0/1 Knapsack</strong></td>
            <td><code>DP[i, w]</code> = max value using first $i$ items with capacity $w$</td>
            <td><code>O(n · W)</code> (Pseudo-poly)</td>
            <td><code>O(W)</code> (Optimized)</td>
            <td>Resource allocation, portfolio budgeting</td>
        </tr>
        <tr>
            <td><strong>Longest Common Subsequence (LCS)</strong></td>
            <td><code>DP[i, j]</code> = LCS length between $X[1..i]$ and $Y[1..j]$</td>
            <td><code>O(n · m)</code></td>
            <td><code>O(min(n, m))</code></td>
            <td><code>git diff</code>, file patching, DNA sequence alignment</td>
        </tr>
        <tr>
            <td><strong>Levenshtein Distance</strong></td>
            <td><code>DP[i, j]</code> = edit distance between $S[1..i]$ and $T[1..j]$</td>
            <td><code>O(n · m)</code></td>
            <td><code>O(min(n, m))</code></td>
            <td>Fuzzy search, OCR correction, spellchecking</td>
        </tr>
        <tr>
            <td><strong>Matrix Chain Multiplication</strong></td>
            <td><code>DP[i, j]</code> = min scalar multiplications to multiply $A_i \dots A_j$</td>
            <td><code>O(n³)</code></td>
            <td><code>O(n²)</code></td>
            <td>Query planning, graphics rendering pipelines</td>
        </tr>
        <tr>
            <td><strong>Kadane’s Algorithm</strong></td>
            <td><code>max_ending_here = max(A[i], max_ending_here + A[i])</code></td>
            <td><code>O(n)</code></td>
            <td><code>O(1)</code></td>
            <td>Max subarray analysis, financial trading window</td>
        </tr>
    </tbody>
</table>
</div>

*   **0/1 Knapsack Problem** — Selects a subset of $n$ items with given weights and values to maximize total value without exceeding capacity $W$. State transition:
    $$DP[i, w] = \max\left(DP[i-1, w],\, DP[i-1, w - w_i] + v_i\right)$$
*   **Longest Common Subsequence (LCS)** — Finds the longest sequence appearing in identical relative order across sequences $X$ and $Y$. Foundational engine for GNU `diff`, version control merge conflict algorithms, and genomic bioinformatics.
*   **Levenshtein Distance (Edit Distance)** — Calculates the minimum operations (insert, delete, replace) required to convert string $S$ to $T$. Standard metric for fuzzy search engines (Elasticsearch, Lucene) and autocorrect engines.
*   **Matrix Chain Multiplication** — Optimizes the associative parenthesization sequence for a chain of matrix multiplications $A_1 A_2 \dots A_n$. Prevents factorial computational explosions by memoizing subchain partitions in $O(n^3)$ time.
*   **Kadane’s Algorithm** — Dynamic programming in linear time $O(n)$ with $O(1)$ space that finds the contiguous subarray within a 1D numerical array having the largest sum.

---

## 4. String Processing, Parsing, & Compression
*Exact substring searching, multi-pattern dictionary automata, and entropy encoding.*

*   **Knuth-Morris-Pratt (KMP)** — Searches for string pattern $P$ of length $m$ inside text $T$ of length $n$ in strict $O(n + m)$ time. Precomputes a prefix-function failure table ($\pi$) enabling the scan pointer to never backtrack across text characters.
*   **Rabin-Karp Algorithm** — Uses polynomial rolling hash functions (Horner's rule) to compare pattern hashes against sliding text windows in $O(n + m)$ average time. Scales to simultaneous multi-pattern search and duplicate document fingerprinting.
*   **Boyer-Moore Algorithm** — Scans pattern characters from right to left, utilizing the **Bad Character Rule** and **Good Suffix Rule** to jump the search window forward multiple characters on mismatch. Sublinear in practice; powers GNU `grep` and system text search utilities.
*   **Aho-Corasick Automaton** — Constructs a finite-state trie with dictionary failure transitions and dictionary output links. Matches an entire dictionary of $k$ keywords against text $T$ simultaneously in linear $O(n + m + z)$ time (fundamental to intrusion detection systems like Snort/Suricata and antivirus signature matchers).
*   **Huffman Coding** — Lossless variable-length prefix entropy coding. Constructs a binary tree with minimum-frequency nodes deepest, assigning shorter bitstrings to high-frequency symbols (powers DEFLATE, ZIP, JPEG, MP3).
*   **LZW (Lempel-Ziv-Welch)** — Dictionary-based lossless compression that builds a phrase translation table dynamically on the fly during single-pass encoding without transmitting the dictionary (engine behind GIF and UNIX `compress`).

---

## 5. Mathematics, Number Theory, & Transforms
*Modular arithmetic, prime generation, discrete transforms, and randomized verification.*

*   **Euclidean & Extended Euclidean Algorithm** — Calculates $\gcd(a, b)$ via recursive division in $O(\log(\min(a, b)))$ steps. The Extended Euclidean algorithm solves for Bézout coefficients $x, y$ such that:
    $$ax + by = \gcd(a, b)$$
    Essential for computing modular multiplicative inverses in asymmetric RSA key generation.
*   **Modular Exponentiation ($a^b \pmod m$)** — Computes powers modulo $m$ in $O(\log b)$ logarithmic time using repeated squaring, preventing integer overflow when computing cryptographic keys with 4096-bit exponents.
*   **Sieve of Eratosthenes** — Generates all prime numbers up to boundary $n$ in $O(n \log \log n)$ time with $O(n)$ space by iteratively crossing off prime multiples. Segmented sieves reduce auxiliary memory consumption to $O(\sqrt{n})$ for cache efficiency.
*   **Fast Fourier Transform (Cooley-Tukey FFT)** — Computes the Discrete Fourier Transform (DFT) of an $n$-length sequence in $O(n \log n)$ time instead of naïve $O(n^2)$ by recursively splitting inputs into even and odd indices using complex roots of unity $e^{-2\pi i / n}$. Powers telecommunications (OFDM/5G), digital audio DSP, and polynomial multiplication.
*   **Miller-Rabin Primality Test** — Probabilistic primality test evaluating properties of strong pseudoprimes in $O(k \log^3 n)$ time, providing negligible error rate $\le 4^{-k}$ for generating massive cryptographic primes.
*   **Monte Carlo & Las Vegas Algorithms** — Randomized computation paradigms: Monte Carlo algorithms guarantee deterministic runtime with bounded error probability (e.g., randomized primality), while Las Vegas algorithms guarantee absolute correctness with randomized runtime (e.g., Randomized QuickSort).

---

## 6. Computational Geometry & Spatial Indexing
*Planar boundary calculation, convex hulls, intersection detection, and spatial partitioning.*

*   **Graham Scan (Convex Hull)** — Computes the minimum convex polygon bounding $n$ planar points in guaranteed $O(n \log n)$ time by angularly sorting coordinates around a pivot and eliminating non-left turns using a stack.
*   **Bentley-Ottmann Sweep Line Algorithm** — Determines all $k$ intersection points among $n$ line segments in $O((n + k) \log n)$ time by sweeping an imaginary vertical line across the plane, maintaining active segments in a self-balancing BST and upcoming events in a priority queue.
*   **Ray Casting & Winding Number (Point-in-Polygon)** — Determines if a point $(x, y)$ resides within an arbitrary polygon by casting an infinite ray from the point and counting boundary edge intersections (odd = inside, even = outside). Fundamental to CAD, 3D game engines, and GIS coordinate systems.
*   **Closest Pair of Points** — Divide-and-conquer algorithm finding the two closest points in a 2D Euclidean coordinate space in $O(n \log n)$ time (improving upon naïve $O(n^2)$ exhaustive comparisons).
*   **K-D Tree (k-Dimensional Tree)** — Binary space-partitioning tree organizing points in $k$-dimensional space. Enables $O(\log n)$ average range queries and nearest-neighbor search for LiDAR, computer vision, and machine learning point clouds.

---

## 7. Cryptography & Security
*Mathematical algorithms enforcing confidentiality, data integrity, and key agreements.*

*   **RSA (Rivest–Shamir–Adleman)** — Asymmetric public-key cryptosystem based on the trapdoor one-way function of integer factorization. Computes public/private exponent pairs $(e, d)$ modulo semiprime $n = pq$ using Euler's totient $\phi(n) = (p-1)(q-1)$:
    $$c \equiv m^e \pmod n,\quad m \equiv c^d \pmod n$$
*   **Diffie-Hellman & ECDH (Elliptic Curve Key Exchange)** — Enables two endpoints to establish a shared symmetric secret over unauthenticated networks without transmitting the secret key. ECDH relies on the discrete logarithm problem over elliptic curve points:
    $$y^2 = x^3 + ax + b$$
*   **AES (Advanced Encryption Standard / Rijndael)** — Symmetric block cipher encrypting 128-bit blocks across 10 (128-bit), 12 (192-bit), or 14 (256-bit) rounds utilizing **SubBytes** (S-Box), **ShiftRows**, **MixColumns**, and **AddRoundKey** transformations. Hardware accelerated via Intel AES-NI.
*   **SHA-256 (Secure Hash Algorithm)** — Cryptographic one-way hash function using a Merkle-Damgård construction with Davies-Meyer compression, producing a 256-bit digest engineered for collision resistance, preimage resistance, and strict avalanche criteria.
*   **HMAC (Hash-based Message Authentication Code)** — Cryptographic message authentication combining a secret cryptographic key with a one-way hash function:
    $$\text{HMAC}(K, m) = H\Big((K \oplus \text{opad}) \parallel H\big((K \oplus \text{ipad}) \parallel m\big)\Big)$$

---

## 8. Big Data, Hashing, & Streaming Algorithms
*Sublinear space approximations, probabilistic counting, distributed map-reduce, and vector retrieval.*

*   **Bloom Filter** — Space-efficient probabilistic data structure querying set membership using $m$-bit array and $k$ independent hash functions. Guarantees **zero false negatives** with tunable false positive probability:
    $$p \approx \left(1 - e^{-kn/m}\right)^k$$
*   **HyperLogLog (HLL)** — Cardinality estimation algorithm calculating the number of unique elements in multi-billion item data streams using $O(\log \log n)$ memory. Evaluates the distribution of leading zeros in hashed identifiers with standard error $1.04 / \sqrt{m}$ (powers Redis HLL, Google BigQuery).
*   **Count-Min Sketch** — Sublinear space streaming sketch estimating event frequencies across high-throughput live data streams using a 2D array of depth $d$ and width $w$, guaranteeing frequency estimates within $\epsilon N$ error bound with probability $1 - \delta$.
*   **Locality-Sensitive Hashing (LSH)** — Probabilistic hashing where similar items in high-dimensional space hash to the same bucket with high probability. Scales approximate nearest-neighbor search (ANN), audio fingerprinting (Shazam), and recommendation vector databases.
*   **PageRank** — Computes stationary probability distributions across hyperlinked graph structures via power iteration of the Markov transition matrix with random damping factor $d \approx 0.85$:
    $$PR(u) = \frac{1 - d}{N} + d \sum_{v \in B_u} \frac{PR(v)}{L(v)}$$
*   **MapReduce** — Distributed programming model that partitions datasets across clusters, executes user-defined `Map()` functions in parallel, shuffles/sorts intermediate keys, and aggregates values via `Reduce()` workers.

---

## 9. Machine Learning, AI, & Meta-Heuristics
*Continuous optimization, gradient calculus, clustering, game theory, and evolutionary search.*

*   **Gradient Descent (SGD, Adam)** — Optimizes model parameters $\theta$ by iteratively descending the loss function gradient $\nabla_\theta L(\theta)$. The **Adam (Adaptive Moment Estimation)** optimizer maintains exponentially decaying moving averages of past gradients ($m_t$) and squared gradients ($v_t$):
    $$\theta_{t+1} = \theta_t - \frac{\eta}{\sqrt{\hat{v}_t} + \epsilon} \hat{m}_t$$
*   **Backpropagation** — Computes the exact partial derivative $\frac{\partial L}{\partial w_{ij}}$ of the loss function with respect to every weight in a deep neural network via recursive application of the multivariable calculus chain rule.
*   **K-Means Clustering (Lloyd's Algorithm)** — Unsupervised vector quantization partitioning $n$ observations into $k$ clusters, alternating between assignment of points to nearest centroids and recalculation of centroid means until convergence.
*   **Support Vector Machines (SVM & SMO)** — Identifies the optimal separating maximum-margin hyperplane $\mathbf{w}^T \mathbf{x} - b = 0$ in high-dimensional feature spaces. Employs the **Kernel Trick** (RBF, Polynomial) to project linearly non-separable data into higher dimensions without explicit coordinate computation.
*   **Minimax with $\alpha\text{-}\beta$ Pruning** — Adversarial search algorithm evaluating zero-sum two-player game trees. Prunes subtrees where $\alpha \ge \beta$ (the maximizer has a guaranteed better alternative), maintaining optimal decision-making while doubling search depth.
*   **Simulated Annealing** — Global optimization meta-heuristic inspired by metallurgy that escapes local minima by accepting inferior candidate states with Metropolis probability:
    $$P(\text{accept}) = e^{-\Delta E / T}$$
    where temperature $T$ decays gradually over time.
*   **Genetic Algorithms (GA)** — Solves multi-dimensional combinatorial optimization problems via simulated Darwinian evolution, iteratively performing fitness evaluation, selection, crossover, and probabilistic mutation.

---

## 10. Distributed Systems & Consensus
*Fault tolerance, state replication, Byzantine agreement, and decentralized ledgers.*

*   **Paxos Protocol (Leslie Lamport)** — Foundational consensus protocol ensuring a cluster of distributed nodes agrees on a single value despite network partitions and message delays. Operates across two phases: **Phase 1 (Prepare/Promise)** and **Phase 2 (Accept/Accepted)**.
*   **Raft Consensus Algorithm** — Understandable leader-based consensus algorithm dividing state machine replication into three formal subproblems: **Leader Election** (heartbeats and randomized timeouts), **Log Replication** (append-entries RPCs), and **Safety Invariants** (election restrictions ensuring committed entries persist).
*   **Practical Byzantine Fault Tolerance (PBFT)** — Reaches deterministic state consensus across distributed networks in $O(n^2)$ message complexity even when up to $f$ nodes act maliciously or collude, requiring:
    $$N \ge 3f + 1$$
*   **Proof of Work (PoW / Nakamoto Consensus)** — Decentralized cryptographic consensus protocol where block proposer rights require expending computational work solving a partial hash inversion inequality ($H(\text{block}) < \text{Target}$). Enforces the longest-chain rule across trustless networks.
*   **Proof of Stake (PoS)** — Consensus protocol where block validators are weighted by their bonded economic stake. Enforces Byzantine fault tolerance through mathematical penalty slashing for malicious equivocation (e.g., Casper FFG).

---

## 11. Quantum Algorithms & Computational Complexity
*Exploiting quantum superposition and entanglement to solve classically intractable problems.*

*   **Shor’s Algorithm** — Quantum algorithm for integer prime factorization and discrete logarithms running in polynomial time $O((\log N)^3)$ with $O(\log N)$ qubits. Utilizes quantum superposition and the **Quantum Fourier Transform (QFT)** to find the modular period $r$ of $a^r \equiv 1 \pmod N$, theoretically breaking classical public-key cryptography (RSA, Diffie-Hellman, ECC).
*   **Grover’s Algorithm** — Quantum search algorithm finding a target element in an unsorted database of $N$ items in quadratic speedup $O(\sqrt{N})$ using repeated application of the **Grover Diffusion Operator** (amplitude amplification).
*   **Deutsch-Jozsa & Simon's Algorithms** — Early quantum algorithms providing exponential speedups over classical algorithms, proving that quantum computing models ($\text{BQP}$) exceed classical bounded-error probabilistic polynomial time ($\text{BPP}$).
*   **Computational Complexity Hierarchy:**
    *   **$\text{P}$ (Polynomial Time):** Decision problems solvable on a deterministic Turing machine in polynomial time $O(n^k)$.
    *   **$\text{NP}$ (Nondeterministic Polynomial Time):** Decision problems whose solutions can be *verified* in polynomial time.
    *   **$\text{NP-Complete}$:** The hardest problems in $\text{NP}$ (e.g., 3-SAT, Traveling Salesperson, Knapsack, Vertex Cover, Clique) to which all other $\text{NP}$ problems reduce in polynomial time via the **Cook-Levin Theorem**.
    *   **$\text{BQP}$ (Bounded-Error Quantum Polynomial Time):** The class of decision problems solvable by a quantum computer in polynomial time with error probability $\le 1/3$.
