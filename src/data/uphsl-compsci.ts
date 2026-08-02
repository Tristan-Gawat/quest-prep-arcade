// UPHSL BITCF - Computer Science & Data Science Specialization
// Each topic can be learned in any programming language the user picks

import { SpecModule } from "./uphsl-cybersec";

export const compsciModules: SpecModule[] = [
  // ALGORITHMS
  {
    id: "ds-data-structures",
    title: "Data Structures",
    category: "algorithms",
    difficulty: "EASY",
    description: "Master fundamental data structures — arrays, linked lists, stacks, queues, trees, and hash maps.",
    concepts: ["arrays and linked lists", "stacks and queues", "binary trees and BSTs", "hash maps and sets", "heaps and priority queues"],
  },
  {
    id: "ds-sorting-algorithms",
    title: "Sorting Algorithms",
    category: "algorithms",
    difficulty: "EASY",
    description: "Implement and analyze classic sorting algorithms — understand time complexity and when to use each one.",
    concepts: ["bubble, selection, insertion sort", "merge sort", "quicksort", "time complexity analysis (Big-O)", "stability and in-place sorting"],
  },
  {
    id: "ds-graph-algorithms",
    title: "Graph Algorithms",
    category: "algorithms",
    difficulty: "MEDIUM",
    description: "Traverse and analyze graphs — BFS, DFS, shortest paths, and minimum spanning trees.",
    concepts: ["BFS and DFS traversal", "Dijkstra's algorithm", "minimum spanning trees (Prim, Kruskal)", "topological sorting", "graph representations (adjacency list/matrix)"],
  },
  {
    id: "ds-dynamic-programming",
    title: "Dynamic Programming",
    category: "algorithms",
    difficulty: "HARD",
    description: "Solve complex optimization problems by breaking them into overlapping subproblems with memoization and tabulation.",
    concepts: ["memoization vs tabulation", "optimal substructure", "overlapping subproblems", "knapsack and LCS problems", "state transition design"],
  },

  // DATA
  {
    id: "ds-data-cleaning",
    title: "Data Cleaning & Preprocessing",
    category: "data",
    difficulty: "EASY",
    description: "Transform raw messy data into analysis-ready datasets — handle missing values, outliers, and inconsistencies.",
    concepts: ["missing value imputation", "outlier detection", "data normalization/scaling", "encoding categorical variables", "data validation pipelines"],
  },
  {
    id: "ds-statistical-analysis",
    title: "Statistical Analysis",
    category: "data",
    difficulty: "MEDIUM",
    description: "Apply statistical methods to extract insights — hypothesis testing, distributions, and correlation analysis.",
    concepts: ["descriptive statistics", "probability distributions", "hypothesis testing (t-test, chi-square)", "correlation and regression", "confidence intervals"],
  },
  {
    id: "ds-database-design",
    title: "Database Design & SQL",
    category: "data",
    difficulty: "MEDIUM",
    description: "Design efficient relational databases — normalization, indexing, query optimization, and schema design.",
    concepts: ["normalization (1NF-3NF)", "ER diagrams and schema design", "SQL joins and subqueries", "indexing strategies", "query optimization"],
  },
  {
    id: "ds-data-visualization",
    title: "Data Visualization",
    category: "data",
    difficulty: "EASY",
    description: "Communicate data insights effectively through charts, dashboards, and interactive visual storytelling.",
    concepts: ["chart type selection", "color theory for data", "dashboard design principles", "interactive visualizations", "storytelling with data"],
  },

  // ML
  {
    id: "ds-ml-basics",
    title: "Machine Learning Fundamentals",
    category: "ml",
    difficulty: "MEDIUM",
    description: "Understand core ML concepts — supervised vs unsupervised learning, model training, and evaluation metrics.",
    concepts: ["supervised vs unsupervised learning", "train/test splitting", "overfitting and regularization", "evaluation metrics (accuracy, F1, AUC)", "cross-validation"],
  },
  {
    id: "ds-neural-networks",
    title: "Neural Networks & Deep Learning",
    category: "ml",
    difficulty: "HARD",
    description: "Build neural networks from scratch — perceptrons, backpropagation, activation functions, and architectures.",
    concepts: ["perceptrons and layers", "backpropagation algorithm", "activation functions (ReLU, sigmoid)", "CNNs and RNNs overview", "gradient descent optimization"],
  },
  {
    id: "ds-computer-vision",
    title: "Computer Vision",
    category: "ml",
    difficulty: "HARD",
    description: "Teach machines to see — image classification, object detection, and convolutional neural network architectures.",
    concepts: ["image preprocessing and augmentation", "convolutional neural networks", "object detection (YOLO, SSD)", "transfer learning", "image segmentation"],
  },
  {
    id: "ds-nlp-basics",
    title: "Natural Language Processing",
    category: "ml",
    difficulty: "HARD",
    description: "Process and understand human language — tokenization, embeddings, sentiment analysis, and text classification.",
    concepts: ["tokenization and stemming", "word embeddings (Word2Vec, GloVe)", "sentiment analysis", "text classification", "sequence models (LSTM, Transformer basics)"],
  },

  // SYSTEMS
  {
    id: "ds-api-development",
    title: "API Development & Design",
    category: "systems",
    difficulty: "MEDIUM",
    description: "Build robust APIs — RESTful design, authentication, rate limiting, and documentation best practices.",
    concepts: ["RESTful API principles", "authentication (JWT, OAuth)", "rate limiting and throttling", "API versioning", "OpenAPI/Swagger documentation"],
  },
  {
    id: "ds-cloud-computing",
    title: "Cloud Computing & Deployment",
    category: "systems",
    difficulty: "MEDIUM",
    description: "Deploy and scale applications in the cloud — containers, serverless, and infrastructure as code.",
    concepts: ["containerization (Docker)", "cloud services (AWS/GCP/Azure)", "serverless functions", "infrastructure as code", "CI/CD pipelines"],
  },
  {
    id: "ds-big-data",
    title: "Big Data Processing",
    category: "systems",
    difficulty: "EXPERT",
    description: "Process massive datasets — distributed computing, MapReduce, streaming pipelines, and data lakes.",
    concepts: ["MapReduce paradigm", "distributed file systems (HDFS)", "stream processing (Kafka, Spark)", "data lake architecture", "batch vs real-time processing"],
  },
  {
    id: "ds-ethics-ai",
    title: "Ethics in AI & Data Science",
    category: "systems",
    difficulty: "EXPERT",
    description: "Navigate the ethical landscape of AI — bias detection, fairness metrics, privacy, and responsible AI development.",
    concepts: ["algorithmic bias detection", "fairness metrics and mitigation", "data privacy (GDPR, differential privacy)", "explainable AI (XAI)", "responsible AI frameworks"],
  },
];
