export type Publication = {
  type: "Journal" | "Conference" | "Book Chapter";
  title: string;
  authors: string;
  venue: string;
  year: number;
  doi?: string;
  corresponding?: boolean;
};

export const conferenceParticipations = [
  {
    title:
      "International Seminar on Research of IT and Intelligent Systems - ISRITI",
    location: "Yogyakarta, Indonesia",
    year: "2025",
  },
  {
    title:
      "International Conference on Telecommunication Systems, Services & Applications - TSSA",
    location: "Bali, Indonesia",
    year: "2025",
  },
  {
    title: "International Conference on Informatics and Computing - ICIC",
    location: "Makassar, Indonesia",
    year: "2025",
  },
  {
    title:
      "International Conference on Recent Advances & Innovations in Engineering - ICRAIE",
    location: "Kuala Lumpur, Malaysia",
    year: "2025",
  },
  {
    title:
      "International Conference on Advancement in Data Science, E-learning & Information Systems - ICADEIS",
    location: "Bali, Indonesia",
    year: "2025",
  },
  {
    title:
      "International Conference on Information and Communication Technology - ICoICT",
    location: "Bandung, Indonesia",
    year: "2025",
  },
  {
    title:
      "International Seminar on Research of IT and Intelligent Systems - ISRITI",
    location: "Yogyakarta, Indonesia",
    year: "2024",
  },
  {
    title:
      "International Conference on Telecommunication Systems, Services & Applications - TSSA",
    location: "Yogyakarta, Indonesia",
    year: "2024",
  },
  {
    title: "International Conference on Informatics and Computing - ICIC",
    location: "Bali, Indonesia",
    year: "2024",
  },
  {
    title: "International Conference on Electronic Design - ICED",
    location: "Penang, Malaysia",
    year: "2024",
  },
  {
    title:
      "International Conference on AI, Blockchain, Cloud Computing & Data Analytics - ICoABCD",
    location: "Bali, Indonesia",
    year: "2024",
  },
];

export const publications: Publication[] = [
  {
    type: "Journal",
    title:
      "A Deep Learning Approach for Enhancing Internet of Things Forensic Investigation Using DANets",
    authors: "N. Widiyasono, R. Rizal, Ruuhwan",
    venue: "CMC-Q1",
    year: 2026,
  },
  {
    type: "Journal",
    title:
      "GO-X: Gain Ratio and Optuna Driven Optimization for eXtreme Gradient Boosting (XGBoost) in Malware Detection",
    authors: "R. Rizal, S. R. Selamat, A. Bramantoro",
    venue: "IJICIC-Q2",
    year: 2026,
  },
  {
    type: "Journal",
    title:
      "MAnTra: A Transformer-Based Approach for Malware Anomaly Detection in Network Traffic Classification",
    authors:
      "R. Rizal, M. A. Darmawan, S. R. Selamat, A. Rahmatulloh, E. Haerani, G. N. Tarempa",
    venue: "JUTIF-S2",
    year: 2025,
  },
  {
    type: "Journal",
    title:
      "A Transform-Domain Robust Watermarking Model Using Discrete Wavelet Transform for Image Copyright Security",
    authors: "R. Rizal, N. Auliarahman, S. R. Selamat",
    venue: "JICO",
    year: 2025,
  },
  {
    type: "Conference",
    title:
      "Advanced Residual Networks Model for Detecting Cyberattacks in Internet of Things Forensic Investigations",
    authors: "R. Rizal, S. R. Selamat, M. Z. Mas'ud",
    venue: "TSSA Conf",
    year: 2025,
  },
  {
    type: "Conference",
    title:
      "Content-Based Cyberbullying Detection on Facebook Using Support Vector Machine and Feature Selection",
    authors: "S. R. Selamat, R. Rizal, J. Shanggeetha",
    venue: "ICRAIE Conf",
    year: 2025,
  },
  {
    type: "Conference",
    title:
      "Ensemble Learning for Malware Classification: Performance Evaluation Using Random Forest and Hist Gradient Boosting",
    authors: "I. Darmawan, H. Setiaji, R. Rizal, A. Rahmatulloh",
    venue: "ICoICT Conf",
    year: 2025,
  },
  {
    type: "Journal",
    title:
      "Digitograph: A Mobile Digital Signatures Application for PDF Files Using ED25519 and Asymmetric Encryption",
    authors: "A. P. Wahyuni, R. Rizal, S. Elmeftahi",
    venue: "JICO",
    year: 2025,
  },
  {
    type: "Journal",
    title:
      "Advanced Phishing Attack Detection Through Network Forensic Methods and Incident Response Based on Machine Learning",
    authors: "S. R. Selamat, R. Rizal, C. Nursihab",
    venue: "JICO",
    year: 2025,
  },
  {
    type: "Conference",
    title: "Unveiling the Truth: Detecting Fake News Using SVM and TF-IDF",
    authors:
      "R. Rizal, A. Faturahman, A. Impron, I. Darmawan, E. Haerani, A. Rahmatulloh",
    venue: "ICADEIS Conf",
    year: 2025,
  },
  {
    type: "Journal",
    title:
      "Comparative Sentiment Analysis of YouTube Comments on Indonesia's Electric Vehicle Incentive Policy Using TF-IDF and IndoBERTweet",
    authors: "A. S. N. Chairat, R. Rizal, H. Himawan",
    venue: "JUTIF",
    year: 2025,
  },
  {
    type: "Journal",
    title:
      "Investigation of Malware Redline Stealer Using Static and Dynamic Analysis Method Forensic",
    authors: "N. Widiyasono, R. Rizal, A. Sinjaya, S. R. Selamat",
    venue: "JARASET-Q2",
    year: 2024,
  },
  {
    type: "Journal",
    title:
      "A Forensic Intelligence System for Identification of Data Originality Based on Signature Files",
    authors: "N. Widiyasono, R. Rizal, S. R. Selamat",
    venue: "JARASET-Q2",
    year: 2024,
  },
  {
    type: "Journal",
    title:
      "Enhanced Readiness Forensic Framework for the Complexity of Internet of Things (IoT) Investigation Based on AI",
    authors: "R. Rizal, S. R. Selamat, M. Z. Mas'ud",
    venue: "JARASET-Q2",
    year: 2024,
  },
  {
    type: "Conference",
    title:
      "Advanced Malware Analysis Methods: Behaviour-Based Detection and Reverse Engineering",
    authors: "N. Widiyasono, R. Rizal, S. R. Selamat",
    venue: "TSSA Conf",
    year: 2024,
  },
  {
    type: "Journal",
    title:
      "AResNet Model Using Deep Learning for Enhancing the IoT Forensic Readiness Framework",
    authors: "R. Rizal, S. R. Selamat, M. Z. Mas'ud",
    venue: "IJIES-Q2",
    year: 2024,
  },
  {
    type: "Conference",
    title:
      "Performance Comparison of Multinomial and Bernoulli Naive Bayes with Laplace Smoothing for Fake News Classification",
    authors: "F. F. Sabiq, Alam Rahmatulloh, R. Rizal, I. Darmawan",
    venue: "ICoABCD Conf",
    year: 2024,
  },
  {
    type: "Book Chapter",
    title:
      "AI for Modern Researchers: A Practical Guide to Leveraging AI for Research & Publication",
    authors: "Ir. Randi Rizal, Ph.D.",
    venue: "Meta Pustaka Intelektual",
    year: 2026,
  },
  {
    type: "Book Chapter",
    title:
      "IoT Machine Learning Forensics: Concepts, Implementation & Case Studies",
    authors: "Ir. Randi Rizal, Ph.D.",
    venue: "Meta Pustaka Intelektual",
    year: 2025,
  },
  {
    type: "Book Chapter",
    title: "Web Security",
    authors: "Ir. Randi Rizal, Ph.D.",
    venue: "Meta Pustaka Intelektual",
    year: 2025,
  },
  {
    type: "Book Chapter",
    title: "Smart Systems, Smart Decisions",
    authors: "Ir. Randi Rizal, Ph.D.",
    venue: "Meta Pustaka Intelektual",
    year: 2025,
  },
  {
    type: "Book Chapter",
    title:
      "Fundamentals of Information Security: Concepts, Threats & Protection",
    authors: "Ir. Randi Rizal, Ph.D.",
    venue: "Meta Pustaka Intelektual",
    year: 2025,
  },
  {
    type: "Book Chapter",
    title: "Developing Image Deepfake Detection System Using MesoNet Algorithm",
    authors: "Ir. Randi Rizal, Ph.D.",
    venue: "Meta Pustaka Intelektual",
    year: 2025,
  },
  {
    type: "Book Chapter",
    title: "Digital Forensics Laboratory Management",
    authors: "Ir. Randi Rizal, Ph.D.",
    venue: "Meta Pustaka Intelektual",
    year: 2025,
  },
  {
    type: "Book Chapter",
    title: "Effective Research Strategies: From Idea to Publication",
    authors: "Ir. Randi Rizal, Ph.D.",
    venue: "Meta Pustaka Intelektual",
    year: 2024,
  },
];
