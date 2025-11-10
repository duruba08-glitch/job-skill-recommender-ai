import re
import json
import sys
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


# -----------------------------------------------------------
# 🧩 Normalize skills (clean, lowercase, remove symbols)
# -----------------------------------------------------------
def normalize_skills_text(skills_list):
    return ' '.join([
        re.sub(r'[^0-9a-zA-Z+#\s]', '', s).lower().strip()
        for s in skills_list
    ])


# -----------------------------------------------------------
# 🔍 Split job required skills string into a clean list
# -----------------------------------------------------------
def parse_job_required_skills(skills_str):
    parts = re.split(r'[;,/|]', skills_str)
    return [p.strip() for p in parts if p.strip()]


# -----------------------------------------------------------
# 🤖 Core recommender function using TF-IDF + Cosine Similarity
# -----------------------------------------------------------
def recommend_jobs(user_skills, jobs, top_k=5):
    job_docs = []
    job_meta = []

    # Prepare text data
    for job in jobs:
        req = job.get('required_skills', '')
        req_list = parse_job_required_skills(req)
        job_docs.append(normalize_skills_text(req_list))
        job_meta.append({
            'id': job.get('id'),
            'title': job.get('title')
        })

    # Combine user and job skill data
    user_doc = normalize_skills_text(user_skills)
    corpus = job_docs + [user_doc]

    # TF-IDF Vectorization
    vectorizer = TfidfVectorizer(ngram_range=(1, 2), analyzer='word', stop_words='english')
    X = vectorizer.fit_transform(corpus)

    job_vectors = X[:-1]
    user_vector = X[-1]

    # Compute cosine similarity
    sims = cosine_similarity(job_vectors, user_vector.reshape(1, -1)).reshape(-1)
    idx_sorted = np.argsort(-sims)

    user_skill_tokens = set([
        re.sub(r'[^0-9a-zA-Z+#]', '', s).lower()
        for s in user_skills if s.strip()
    ])

    recommendations = []

    # Collect top matching jobs
    for idx in idx_sorted[:top_k]:
        score = float(sims[idx])
        meta = job_meta[idx]
        req_list = parse_job_required_skills(jobs[idx]['required_skills'])
        normalized_req_tokens = [
            re.sub(r'[^0-9a-zA-Z+#]', '', s).lower()
            for s in req_list
        ]

        matched = [req_list[i] for i, tok in enumerate(normalized_req_tokens) if tok in user_skill_tokens]
        missing = [req_list[i] for i, tok in enumerate(normalized_req_tokens) if tok not in user_skill_tokens]

        recommendations.append({
            "job_id": meta['id'],
            "job": meta['title'],
            "score": round(score, 4),
            "matched_skills": matched,
            "missing_skills": missing
        })

    return recommendations


# -----------------------------------------------------------
# 🚀 Entry point when executed by Node.js
# -----------------------------------------------------------
if __name__ == "__main__":
    try:
        # Read arguments passed from Node.js
        if len(sys.argv) < 3:
            print(json.dumps({"error": "Missing arguments"}))
            sys.exit(1)

        user_skills = json.loads(sys.argv[1])
        jobs = json.loads(sys.argv[2])
        top_k = int(sys.argv[3]) if len(sys.argv) > 3 else 5

        # Run recommender
        results = recommend_jobs(user_skills, jobs, top_k)
        print(json.dumps(results))

    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)
