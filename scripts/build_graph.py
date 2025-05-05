# scripts/build_graph.py
import os, json
import numpy as np
from glob import glob
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

# 1) 마크다운 파일 읽기
md_files = glob("posts/*.md")
texts = {}
for fp in md_files:
    with open(fp, encoding="utf-8") as f:
        texts[os.path.basename(fp)] = f.read()

# 2) 벡터 생성
model = SentenceTransformer("all-mpnet-base-v2")
keys = list(texts.keys())
embs = model.encode([texts[k] for k in keys], show_progress_bar=True)

# 3) 유사도 계산 & top-3 이웃 추출
sim = cosine_similarity(embs, embs)
edges = []
for i, row in enumerate(sim):
    idxs = np.argsort(row)[-4:-1]  # 자기 자신 제외, 상위 3개
    for j in idxs:
        edges.append({
            "source": keys[i],
            "target": keys[j],
            "weight": float(row[j])
        })

# 4) JSON 덤프
with open("public/data/graph.json", "w", encoding="utf-8") as f:
    json.dump({
        "nodes": [{"id": k} for k in keys],
        "edges": edges
    }, f, ensure_ascii=False, indent=2)
