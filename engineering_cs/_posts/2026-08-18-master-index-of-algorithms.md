---
title: "Master Index of Algorithms"
date: "2026.08.18"
tags: ["ALGORITHMS", "COMPUTER SCIENCE"]
summary: "A comprehensive master reference cataloging foundational sorting, graph theory, dynamic programming, cryptography, streaming, ML, distributed consensus, and quantum algorithms."
---

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-left: 4px solid #8e44ad; padding: 1.25rem 1.5rem; border-radius: 0 8px 8px 0; margin-bottom: 2rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
    <p style="margin: 0; font-size: 1.05rem; line-height: 1.6; color: #334155; font-style: italic; font-weight: 500;">
        <strong>Purpose:</strong> A master reference index and computational taxonomy covering 11 critical algorithmic domains—spanning foundational divide-and-conquer sorting, shortest-path graph traversals, dynamic programming optimizations, text pattern parsing, modern cryptography, high-throughput streaming heuristics, distributed consensus protocols, and quantum mechanics.
    </p>
</div>

---

## 1. Sorting & Searching (The Foundations)
*The fundamental building blocks of data organization, comparison, and retrieval.*

*   **Binary Search** — Finds a specific item in a *sorted* list in $O(\log n)$ logarithmic time by repeatedly halving the search space.
*   **MergeSort** — A classic divide-and-conquer algorithm that recursively splits an array into individual elements and merges them in sorted order with guaranteed $O(n \log n)$ performance.
*   **QuickSort** — Highly efficient in-place sorting that partitions elements around a selected pivot element, widely used as the default engine across programming language standard libraries.
*   **HeapSort** — An $O(n \log n)$ comparison-based algorithm that builds a binary heap data structure to sequentially extract the maximum or minimum value.
*   **Radix Sort** — A non-comparative integer sorting algorithm that processes data digit by digit from least to most significant, achieving linear time $O(nk)$ for fixed-length keys.
*   **Insertion Sort** — While $O(n^2)$ for massive arrays, it features minimal overhead and acts as the optimal fallback sorting method for small datasets (frequently nested within hybrid sorting algorithms like Timsort and Introsort).
*   **Counting Sort** — An integer sorting algorithm that maps key frequencies directly into an auxiliary array, proving sorting can run in linear $O(n + k)$ time under strict integer range boundaries.

---

## 2. Graph & Network Algorithms (Routing & Relationships)
*Traversing, optimizing, and analyzing complex networked node topologies.*

*   **Breadth-First Search (BFS)** — Traverses a graph level by level outward from the source, guaranteeing the shortest path in unweighted networks.
*   **Depth-First Search (DFS)** — Explores deeply along individual graph branches before backtracking, fundamental for cycle detection, topological sorting, and maze generation.
*   **Dijkstra’s Algorithm** — Solves the single-source shortest path problem on weighted graphs with non-negative edge weights using a priority queue (powers GPS routing engines).
*   **A\* (A-Star) Search** — An extension of Dijkstra's algorithm that utilizes heuristic estimates ($f(n) = g(n) + h(n)$) to drastically accelerate pathfinding in gaming and robotics.
*   **Kruskal’s & Prim’s Algorithms** — Greedy algorithms designed to construct a Minimum Spanning Tree (MST), connecting all network vertices with minimum total edge cost.
*   **Bellman-Ford Algorithm** — Computes single-source shortest paths on arbitrary directed graphs and detects negative-weight cycles.
*   **Floyd-Warshall Algorithm** — A dynamic programming approach that computes all-pairs shortest paths simultaneously across every node pair in $O(V^3)$ time.
*   **Topological Sort** — Linearly orders vertices in a Directed Acyclic Graph (DAG) such that every directed edge $u \to v$ has $u$ appearing before $v$ (critical for build systems and package managers).
*   **Ford-Fulkerson & Edmonds-Karp** — Calculates the maximum possible network flow from a source to a sink across capacity-constrained pipelines.
*   **Tarjan’s Algorithm** — Finds Strongly Connected Components (SCCs) in a directed graph in a single linear-time DFS pass.

---

## 3. Dynamic Programming (Optimization & Memory)
*Breaking complex recursive problems down into overlapping subproblems with memoization.*

*   **0/1 Knapsack Problem** — Optimizes the total value of items placed into a container under strict maximum weight capacity constraints.
*   **Longest Common Subsequence (LCS)** — Identifies the longest sequence appearing in identical relative order across multiple strings (fundamental to DNA sequencing and `git diff`).
*   **Levenshtein Distance** — Measures the minimum number of single-character edits (insertions, deletions, substitutions) required to transform one string into another (powers spellcheckers and fuzzy search).
*   **Matrix Chain Multiplication** — Finds the optimal parenthesization order to minimize total scalar multiplications when multiplying a sequence of matrices.

---

## 4. String Processing, Parsing, & Compression
*High-performance text search, dictionary matching, and lossless data encoding.*

*   **Knuth-Morris-Pratt (KMP)** — Searches for occurrences of a pattern within text by pre-computing a partial match table (π table) to skip redundant character comparisons in $O(n + m)$ time.
*   **Rabin-Karp Algorithm** — Uses rolling hashes to search for pattern strings within text, uniquely suited for multi-pattern lookups and plagiarism detection.
*   **Boyer-Moore Algorithm** — An extremely fast string search engine that scans patterns from right to left and utilizes bad-character and good-suffix shift rules to jump across text (powers GNU `grep` and CTRL+F).
*   **Aho-Corasick Algorithm** — Constructs a finite state trie with failure transitions to search for an entire dictionary of strings concurrently in linear time (powers antivirus virus definition scanners and intrusion detection engines).
*   **Huffman Coding** — A greedy variable-length prefix coding algorithm that compresses data by allocating fewer bits to frequently appearing symbols (underlies ZIP, JPEG, and MP3).
*   **LZW (Lempel-Ziv-Welch)** — A dictionary-based universal lossless compression algorithm that dynamically builds its phrase dictionary from the input stream (the engine of GIF and PDF formats).

---

## 5. Mathematics & Number Theory
*Analytical methods, prime generation, signal transforms, and statistical modeling.*

*   **Euclidean Algorithm & Extended Euclidean** — Rapidly calculates the Greatest Common Divisor ($\gcd$) of two integers and solves linear Diophantine equations (critical for modular inverse computation in RSA).
*   **Sieve of Eratosthenes** — A prime sieve algorithm that finds all prime numbers up to an upper limit $n$ in $O(n \log \log n)$ time by iteratively marking composite multiples.
*   **Fast Fourier Transform (FFT)** — Computes the Discrete Fourier Transform (DFT) in $O(n \log n)$ instead of $O(n^2)$, converting time-domain signals into frequency spectra (powers Wi-Fi, audio DSP, and telecommunications).
*   **Monte Carlo Algorithm** — Utilizes repeated pseudo-random sampling to numerically approximate deterministic systems that are mathematically intractable.

---

## 6. Computational Geometry
*Spatial partitioning, visual collision detection, and planar boundary extraction.*

*   **Graham Scan (Convex Hull)** — Computes the convex hull of a finite set of 2D planar points in $O(n \log n)$ time by sorting points angularly and maintaining a boundary stack.
*   **Sweep Line Algorithm** — Solves 2D geometric problems (such as segment intersections and Voronoi diagram construction) by sweeping an imaginary line across the coordinate space.
*   **Ray Casting Algorithm** — Tests whether a given coordinate point resides inside, outside, or on the boundary of a complex polygon by counting ray-edge intersections (fundamental to 3D rendering and game hit-boxes).

---

## 7. Cryptography & Security
*Mathematical algorithms enforcing confidentiality, data integrity, and key agreements.*

*   **RSA (Rivest–Shamir–Adleman)** — An asymmetric public-key cryptosystem based on the practical difficulty of the prime factorization of large semiprime integers.
*   **AES (Advanced Encryption Standard)** — A symmetric block cipher operating on 128-bit blocks using substitution-permutation networks across 10, 12, or 14 rounds (global enterprise standard).
*   **SHA-256 (Secure Hash Algorithm)** — A cryptographic one-way hash function producing a fixed 256-bit digest with strict preimage resistance and avalanche characteristics.
*   **Diffie-Hellman Key Exchange** — Enables two communicating endpoints to establish a shared cryptographic secret over an untrusted public network without transmitting the secret itself.

---

## 8. Big Data, Hashing, & Streaming Algorithms
*Probabilistic data structures and distributed map-reduce computation at internet scale.*

*   **Bloom Filter** — A space-efficient probabilistic data structure that queries set membership with zero false negatives and tunable false positive probabilities.
*   **HyperLogLog** — Estimates the distinct cardinality of multi-billion element data streams using negligible fixed memory footprints (used for unique visitor counts).
*   **Count-Min Sketch** — A sub-linear space streaming sketch that tracks item frequency estimates across high-velocity live data feeds (calculates real-time trending topics).
*   **Locality-Sensitive Hashing (LSH)** — Hashes high-dimensional vectors so similar items collide into identical buckets with high probability (powers recommendation engines and nearest-neighbor search).
*   **PageRank** — Computes stationary probability distributions across hyperlinked graph structures to rank node importance by modeling random web surfer behavior.
*   **MapReduce** — A distributed execution paradigm that partitions massive datasets, processes map transformations in parallel across clusters, and aggregates results via reduce workers.

---

## 9. Machine Learning, AI, & Meta-Heuristics
*Iterative parameter optimization, cluster classification, and combinatorial search.*

*   **Gradient Descent (SGD, Adam)** — Iteratively updates model weight parameters in the opposite direction of the loss function gradient to minimize prediction error.
*   **Backpropagation** — Computes partial derivatives of the loss function with respect to every neural network weight via the multivariable calculus chain rule.
*   **K-Means Clustering** — An unsupervised vector quantization algorithm that partitions $n$ observations into $k$ clusters based on nearest centroid means.
*   **Support Vector Machines (SVM)** — Identifies the maximum-margin hyperplane that optimally separates distinct categorical feature classes in high-dimensional space.
*   **Minimax (with Alpha-Beta Pruning)** — A recursive adversarial game-tree decision algorithm that maximizes best-case payoffs while pruning branches that cannot influence the final outcome.
*   **Simulated Annealing** — A probabilistic global optimization meta-heuristic that escapes local minima by accepting suboptimal moves with a temperature-decayed probability.
*   **Genetic Algorithms** — Solves constrained multi-variable optimization problems through simulated evolutionary biology (selection, crossover, mutation).

---

## 10. Distributed Systems & Consensus
*Fault-tolerant state replication, decentralized ordering, and cluster coordination.*

*   **Paxos & Raft Algorithms** — Leader-based consensus protocols that maintain a deterministic, fault-tolerant replicated state machine across distributed server clusters.
*   **Proof of Work (PoW) & Proof of Stake (PoS)** — Cryptographic and economic consensus algorithms enabling trustless distributed networks to agree on ledger state without a central authority.

---

## 11. Quantum Algorithms
*Exploiting quantum superposition and entanglement to solve intractable classical problems.*

*   **Shor's Algorithm** — Factors integers in polynomial time $O((\log N)^3)$ using the Quantum Fourier Transform, theoretically breaking classical public-key cryptography (RSA/ECC).
*   **Grover's Algorithm** — Performs unstructured database search in quadratic speedup $O(\sqrt{N})$ using quantum amplitude amplification.
