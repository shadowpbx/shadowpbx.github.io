# CISS 109: Python Programming — Master Study Guide

Welcome to the **CISS 109 (Python Programming) Master Study Guide**. This definitive reference covers the complete undergraduate computer science curriculum at Hudson Valley Community College (HVCC), spanning CPython internals, memory management, algorithmic control flow, functional programming, data structures, GUI event architecture, object-oriented design, scientific analytics, and systems concurrency.

---

## 🐍 Module 1: Python Architecture, Virtual Machine & Development Environment

### 1.1 Python Origins & CPython Architecture
* **CPython Implementation**: The reference implementation of Python written in C. Source code (`.py`) is compiled into intermediate **Bytecode** before execution by the interpreter.
* **Compilation Pipeline**:
  $$\text{Source Code (.py)} \xrightarrow{\text{Parser / Compiler}} \text{Abstract Syntax Tree (AST)} \xrightarrow{\text{Code Generator}} \text{Bytecode (.pyc)} \xrightarrow{\text{Evaluation Loop}} \text{Python Virtual Machine (PVM)}$$
* **Interpreted vs Compiled**: Python is a hybrid bytecode-compiled interpreted language, providing dynamic flexibility while optimizing execution via cached `.pyc` files in `__pycache__/`.

### 1.2 Python Virtual Machine (PVM) & Bytecode
* **Stack-Based Execution**: The PVM is a stack-based virtual machine evaluating bytecode instructions (e.g., `LOAD_CONST`, `STORE_NAME`, `BINARY_OP`, `CALL_FUNCTION`).
* **Bytecode Inspection**: Using the standard library `dis` module to disassemble functions into human-readable opcode instructions:
  ```python
  import dis
  dis.dis(lambda a, b: a + b)
  ```

### 1.3 Interactive Shell & Script Execution
* **REPL (Read-Eval-Print Loop)**: Interactive shell for real-time expression evaluation, introspection (`dir()`, `help()`, `type()`, `id()`), and rapid prototyping.
* **Module Execution Guard**:
  ```python
  if __name__ == '__main__':
      # Executes only when script is run directly, not when imported
      main()
  ```

### 1.4 Virtual Environments & Package Management
* **`venv` Module**: Creates isolated Python runtime environments preventing global package dependency conflicts:
  * `python3 -m venv .venv`
  * `source .venv/bin/activate` (Linux/macOS) or `.venv\Scripts\activate` (Windows)
* **`pip` Package Installer**: `pip install -r requirements.txt`, `pip freeze > requirements.txt`.

### 1.5 Python Error Hierarchy & Tracebacks
* **Exception Inheritance Tree**: All standard exceptions inherit from `BaseException` $\rightarrow$ `Exception`.
  * `SyntaxError`: Caught at parse time before execution begins.
  * `TypeError`: Operation applied to an object of inappropriate type.
  * `ValueError`: Inappropriate value received with correct type.
  * `IndexError` & `KeyError`: Sequence out-of-range or missing dictionary mapping.
  * `NameError` & `AttributeError`: Unbound variable or missing object attribute.

---

## 🔢 Module 2: Data Types, Memory Allocation, Operators & Arithmetic

### 2.1 Variables, Dynamic Typing & Object References
* **Everything is an Object**: In Python, variables are named references (pointers) bound to objects stored on the CPython private heap.
* **Dynamic vs Strong Typing**:
  * **Dynamic**: Variable types are determined at runtime during assignment; a variable name can re-bind to different types.
  * **Strong**: Explicit type conversions are strictly enforced; Python never implicitly converts `'5' + 5` (raises `TypeError`).

### 2.2 CPython Heap Allocation & Reference Counting
* **Automatic Memory Management**:
  * **Reference Counting**: Every object contains an internal `ob_refcnt` header tracking active references. When count reaches zero, memory is freed immediately.
  * **Generational Cyclic Garbage Collector**: Periodically scans for cyclic references (e.g., Object A references B, B references A) across 3 generations ($G_0, G_1, G_2$).
* **Object Identity (`id()`) & Equality (`==` vs `is`)**:
  * `==` checks value equality (calls `__eq__`).
  * `is` checks reference identity (memory address equality `id(a) == id(b)`).
  * Integer small-cache optimization: Integers from `-5` to `256` are pre-allocated singletons in CPython.

### 2.3 Numeric Types & Floating-Point Precision
* **Integers (`int`)**: Arbitrary precision integers (no 32-bit or 64-bit overflow limit; memory grows dynamically).
* **Floats (`float`)**: 64-bit IEEE 754 double-precision floating-point numbers (53 bits significand, $\approx 15\text{–}17$ decimal digits precision).
  * Binary float representation error: `0.1 + 0.2 != 0.3` ($\approx 0.30000000000000004$).
  * Solution for financial calculations: `from decimal import Decimal`.

### 2.4 & 2.5 Operators & Precedence
* **Arithmetic**: `+`, `-`, `*`, `/` (float division), `//` (floor division), `%` (modulo), `**` (exponentiation).
* **Bitwise Operators**: `&` (AND), `|` (OR), `^` (XOR), `~` (NOT / Two's Complement inversion), `<<` (left shift), `>>` (right shift).
* **Precedence Order**: `()` $\rightarrow$ `**` $\rightarrow$ `~, +x, -x` $\rightarrow$ `*, /, //, %` $\rightarrow$ `+, -` $\rightarrow$ `<<, >>` $\rightarrow$ `&` $\rightarrow$ `^` $\rightarrow$ `|` $\rightarrow$ Relational / Logical.

### 2.6 & 2.7 Standard I/O & F-Strings
* **`input()` & Type Casting**: `input()` always returns a string (`str`); explicit conversion required (`int(input())`, `float(input())`).
* **Formatted String Literals (F-Strings)**:
  ```python
  name = "Alice"; balance = 12450.789
  print(f"User: {name:<10} | Balance: ${balance:,.2f}")
  # Output: User: Alice      | Balance: $12,450.79
  ```

---

## 🔀 Module 3: Control Flow, Boolean Logic, Loops & Sequence Traversal

### 3.1 & 3.2 Boolean Logic & Multi-Way Branching
* **Truthy vs Falsy Values**:
  * **Falsy**: `False`, `None`, `0`, `0.0`, `""`, `[]`, `()`, `{}`, `set()`.
  * **Truthy**: Any non-zero number, non-empty sequence or collection.
* **Control Structures**: `if`, `elif`, `else` multi-way branching blocks.
* **Short-Circuit Evaluation**:
  * `A and B`: If `A` is falsy, returns `A` immediately without evaluating `B`.
  * `A or B`: If `A` is truthy, returns `A` immediately without evaluating `B`.

### 3.4 & 3.5 Loops & Sequence Traversal
* **`while` Loop**: Condition-driven loop; requires manual sentinel progression to prevent infinite loops.
* **`for` Loop**: Iterator-driven traversal utilizing Python's Iterator Protocol (`iter()` and `next()`).
* **The `range()` Type**: Immutable sequence generator of integers (`range(start, stop, step)`). Lazy evaluation with $O(1)$ memory consumption.

### 3.6 Loop Control Statements & The `else` Clause
* **`break`**: Immediately terminates loop execution.
* **`continue`**: Skips remainder of current iteration and jumps to next loop cycle.
* **`pass`**: Syntactic null statement (placeholder).
* **`for...else` / `while...else`**: The `else` block executes **only if the loop completed normally without encountering a `break`** (useful for search algorithms).

---

## 📄 Module 4: Strings, Encodings, File I/O & Structured Serialization

### 4.1 & 4.2 String Immutability, Slicing & Methods
* **Immutability**: Strings cannot be modified in place; all string methods return new string objects.
* **Sequence Slicing Formula**: `sequence[start:stop:step]` (negative step reverses sequence: `s[::-1]`).
* **Core String Methods**: `.strip()`, `.split(',')`, `.join(list)`, `.find()`, `.replace()`, `.lower()`, `.upper()`, `.startswith()`, `.isdigit()`.

### 4.3 Unicode UTF-8 & Byte Encodings
* **Text (`str`) vs Raw Bytes (`bytes`)**:
  * `text.encode('utf-8')` converts string characters to UTF-8 encoded byte arrays.
  * `raw_bytes.decode('utf-8')` decodes byte streams back into Unicode strings.

### 4.5 & 4.6 File I/O Streams, Buffering & Context Managers
* **File Open Modes**: `'r'` (read), `'w'` (truncate & write), `'a'` (append), `'b'` (binary mode), `'+'` (read/write).
* **Context Manager (`with` Statement)**: Guarantees deterministic resource cleanup (file closure) even when exceptions occur, invoking `__enter__()` and `__exit__()`:
  ```python
  with open("data.txt", "r", encoding="utf-8") as f:
      for line in f:
          process(line.strip())
  ```
* **Modern `pathlib`**: Object-oriented filesystem paths (`from pathlib import Path; p = Path('.') / 'logs' / 'app.log'`).

### 4.6 & 4.7 Structured Serialization & CLI Arguments
* **`json` Module**: `json.dumps()` (object $\rightarrow$ string), `json.loads()` (string $\rightarrow$ object), `json.dump(obj, f)` (write to file), `json.load(f)` (read from file).
* **`csv` Module**: `csv.reader()`, `csv.DictReader()`, `csv.writer()`, `csv.DictWriter()`.
* **`sys.argv` & `argparse`**: Command-line arguments (`sys.argv[0]` is script name).

---

## 🗃️ Module 5: Collections: Lists, Tuples, Dictionaries, Sets & Comprehensions

### 5.1 & 5.2 Lists & Dynamic Array Mechanics
* **Dynamic Array Memory Model**: Contiguous block of object pointers with over-allocation resizing strategies ($O(1)$ amortized append, $O(n)$ insertion/deletion at arbitrary index).
* **Shallow vs Deep Copy**:
  * **Shallow Copy (`list.copy()`, `l[:]`)**: Creates new outer collection but shares references to nested child objects.
  * **Deep Copy (`import copy; copy.deepcopy()`)**: Recursively duplicates all nested objects and data structures.

### 5.2 & 5.4 Tuples & Sequence Unpacking
* **Immutability & Efficiency**: Fixed-size tuple allocations have lower memory overhead than lists; can serve as dictionary keys if all contained elements are hashable.
* **Tuple Unpacking**: `x, y, *rest = (1, 2, 3, 4, 5)` $\rightarrow$ `x = 1, y = 2, rest = [3, 4, 5]`.

### 5.3 & 5.5 Dictionaries & Hash Tables
* **Hash Table Architecture**: Python dictionaries use sparse open-addressing hash tables with perturbation-based collision resolution ($O(1)$ average lookup, insertion, deletion).
* **Key Hashability Requirement**: Keys must implement `__hash__()` and `__eq__()` and remain immutable throughout their lifecycle.
* **Methods**: `.get(key, default)`, `.items()`, `.keys()`, `.values()`, `.setdefault(key, default)`.

### 5.4 & 5.7 Sets & Mathematical Set Operations
* **Hash Set**: Unordered collection of unique hashable elements.
* **Set Operations**: Union (`|`), Intersection (`&`), Difference (`-`), Symmetric Difference (`^`), Subset (`<=`).

### 5.5 Comprehensions Syntax
* **List Comprehension**: `[x**2 for x in range(10) if x % 2 == 0]`
* **Dictionary Comprehension**: `{k: v for k, v in zip(keys, values)}`
* **Set Comprehension**: `{word.lower() for word in text.split()}`
* **Generator Expression**: `(x**2 for x in range(1000000))` (Memory-efficient lazy streaming).

---

## 🧩 Module 6: Functions, Scopes, Closures, Decorators & Recursion

### 6.1 & 6.2 Function Architecture & Argument Rules
* **First-Class Citizens**: Functions can be passed as arguments, returned from other functions, and stored in data structures.
* **Parameter Ordering Rules**:
  $$\text{Positional} \rightarrow \text{Default} \rightarrow \text{*args (Variable Positional)} \rightarrow \text{Keyword-Only} \rightarrow \text{**kwargs (Variable Keyword)}$$
* **The Mutable Default Argument Trap**: Default arguments are evaluated **once at function definition time**, not at invocation:
  ```python
  # WRONG: Shares list across calls
  def append_to(item, target=[]): ...
  
  # CORRECT:
  def append_to(item, target=None):
      if target is None:
          target = []
      target.append(item)
      return target
  ```

### 6.3 & 6.4 Scopes & The LEGB Rule
* **Lookup Resolution Hierarchy**:
  1. **L - Local**: Names assigned inside the executing function.
  2. **E - Enclosing**: Names in outer enclosing function closures (`nonlocal` keyword).
  3. **G - Global**: Module-level variables (`global` keyword).
  4. **B - Built-in**: Preloaded Python builtins (`len`, `range`, `print`).

### 6.5 Decorators & Metaprogramming
* **Decorator Pattern**: Higher-order function taking a callable, wrapping it with enhanced behavior, and returning the wrapper:
  ```python
  import functools, time
  
  def timer(func):
      @functools.wraps(func)
      def wrapper(*args, **kwargs):
          start = time.perf_counter()
          result = func(*args, **kwargs)
          print(f"{func.__name__} took {time.perf_counter() - start:.6f}s")
          return result
      return wrapper
  ```

### 6.6 Recursion & Stack Frames
* **Call Stack Mechanics**: Every recursive call pushes a new activation record (stack frame) containing local variables and return address onto the call stack.
* **Base Case & Recursion Ceiling**: Must define a terminating base case to prevent `RecursionError: maximum recursion depth exceeded` (default ceiling: 1000 frames).

---

## 🎨 Module 7: Graphics, Vector Geometry, Image Processing & Midterm Synthesis

### 7.1 & 7.2 Vector Geometry & Turtle Graphics
* **Cartesian vs Polar Coordinates**: Translating headings ($\theta$) and distances ($r$) into 2D coordinate space ($x = r\cos\theta, y = r\sin\theta$).
* **Recursive Fractals**: Generating self-similar geometric structures (Sierpinski Triangles, Koch Snowflakes, Fractal Trees) using recursive step reductions.

### 7.3 & 7.4 Digital Image Processing & 2D Grid Algorithms
* **RGB Color Model**: 24-bit TrueColor ($8\text{ bits per channel: Red, Green, Blue} \in [0, 255]$).
* **Matrix Manipulations**: 2D array traversals for image transformations:
  * Grayscale Conversion: $\text{Luminance} = 0.299R + 0.587G + 0.114B$.
  * Image Inversion: $R' = 255 - R, G' = 255 - G, B' = 255 - B$.
  * Convolution Filters: $3 \times 3$ kernel matrix multiplication for spatial blurring, sharpening, and Sobel edge detection.

---

## 🖥️ Module 8: Graphical User Interfaces (GUI) & Tkinter Event Loops

### 8.1 Tkinter Architecture & The Event Loop
* **Event-Driven Architecture**: The main application blocks on `root.mainloop()`, intercepting operating system window events, mouse clicks, and keystrokes from an asynchronous event queue.
* **Root Window & TopLevel**: `tk.Tk()` initializes the master Tcl/Tk interpreter; `tk.Toplevel()` opens secondary dialog windows.

### 8.2 Tkinter Widgets & Geometry Managers
* **Core Widgets**: `Label`, `Button`, `Entry` (single-line input), `Text` (multiline editor), `Frame` (container), `Canvas`, `Checkbutton`, `Radiobutton`.
* **Geometry Managers**:
  * **`grid(row=r, column=c, sticky="nsew", padx=p, pady=p)`**: The standard tabular layout manager.
  * **`pack(side=tk.TOP, fill=tk.BOTH, expand=True)`**: Linear flow layout.
  * **`place(x=px, y=py)`**: Absolute coordinate placement.

### 8.5 & 8.6 Event Binding & MVC Architecture
* **Event Binding**: `widget.bind("<Button-1>", on_click)`, `widget.bind("<Key>", on_keypress)`.
* **MVC Pattern**: Model (Business logic & data storage) separated cleanly from View (Tkinter UI layout) and Controller (Event callbacks and command handlers).

---

## 🏛️ Module 9: Object-Oriented Programming (OOP), Polymorphism & Persistence

### 9.1 & 9.2 Classes, Instances, `self` & Encapsulation
* **Class vs Instance State**:
  * **Class Variable**: Shared across all instances of the class.
  * **Instance Variable**: Bound to a specific instance via `self.attribute`.
* **Encapsulation & Property Decorators**:
  ```python
  class BankAccount:
      def __init__(self, owner: str, balance: float = 0.0):
          self.owner = owner
          self._balance = balance # Protected attribute convention
          
      @property
      def balance(self) -> float:
          return self._balance
          
      @balance.setter
      def balance(self, value: float):
          if value < 0:
              raise ValueError("Balance cannot be negative")
          self._balance = value
  ```

### 9.3 Operator Overloading & Dunder Magic Methods
* `__str__()` (user-friendly string) vs `__repr__()` (unambiguous developer representation).
* Arithmetic: `__add__()`, `__sub__()`, `__mul__()`, `__truediv__()`.
* Comparisons: `__eq__()`, `__lt__()`, `__le__()`, `__gt__()`, `__ge__()`.
* Container Protocol: `__len__()`, `__getitem__()`, `__setitem__()`, `__iter__()`, `__contains__()`.

### 9.4 & 9.5 Inheritance, `super()` & Abstract Base Classes (ABCs)
* **Method Resolution Order (MRO)**: C3 Linearization algorithm resolving method inheritance paths in multiple inheritance hierarchies (`Class.mro()`).
* **Abstract Base Classes (`abc.ABC`)**: Enforces interface contracts requiring derived subclasses to implement `@abc.abstractmethod` decorators.

### 9.7 Object Persistence: SQLite & Serialization
* **`pickle`**: Binary serialization of arbitrary Python object graphs.
* **`sqlite3`**: Embedded relational database engine for structured transactional persistence (`sqlite3.connect()`, `cursor.execute()`, parameterized SQL queries preventing SQL injection).

---

## 🚀 Module 10: Advanced Systems, Concurrency, Scientific Analytics & Final Capstone

### 10.1 Scientific Python: NumPy Vectorization
* **`ndarray` Architecture**: Contiguous, statically-typed multidimensional memory buffers executing SIMD vectorized operations in compiled C/Fortran routines, bypassing Python loop overhead.
* **Broadcasting Rules**: Arithmetic operations across arrays of differing shapes by virtual dimension expansion.

### 10.2 & 10.3 Data Analysis with Pandas & Visualization
* **Pandas Core Structures**:
  * **`Series`**: 1D labeled homogeneous array.
  * **`DataFrame`**: 2D tabular labeled heterogeneous data structure with row indices and column headers.
  * **Data Cleaning & Filtering**: `.dropna()`, `.fillna()`, boolean masking (`df[df['age'] > 21]`), `.groupby().agg()`.
* **Matplotlib & Seaborn**: Figures, subplots, line plots, histograms, scatter plots, and heatmaps.

### 10.1 Threads, The GIL & Network Sockets
* **Global Interpreter Lock (GIL)**: Mutex preventing multiple native OS threads from executing CPython bytecode simultaneously.
  * **I/O-Bound Tasks**: Multithreading (`threading` module) excels by releasing GIL during blocking socket/disk I/O.
  * **CPU-Bound Tasks**: Multiprocessing (`multiprocessing` module) bypasses GIL by spawning distinct OS processes with dedicated memory heaps.
* **Low-Level Socket Programming**:
  ```python
  import socket
  # TCP Server Socket Setup
  with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
      s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
      s.bind(('0.0.0.0', 8080))
      s.listen(5)
      conn, addr = s.accept()
      data = conn.recv(1024)
  ```

### 10.4 Algorithmic Complexity (Big-O) & Algorithms
* **Complexity Hierarchy**:
  $$O(1) < O(\log n) < O(n) < O(n \log n) < O(n^2) < O(2^n) < O(n!)$$
* **Searching & Sorting**:
  * **Binary Search**: $O(\log n)$ time on sorted arrays.
  * **Quicksort & Mergesort**: $O(n \log n)$ divide-and-conquer sorting.
  * **Bubble / Insertion Sort**: $O(n^2)$ quadratic sorting.
