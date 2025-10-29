from flask import Flask, request, jsonify
import psycopg2
from sentence_transformers import SentenceTransformer
import numpy as np
import json

app = Flask(__name__)

model = SentenceTransformer('all-MiniLM-L6-v2')

def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    user_input = data.get('situation', '')

    conn = psycopg2.connect(
        host="localhost",
        database="Nyaaya_Saathi_DB",
        user="postgres",
        password="kahj"
    )
    cur = conn.cursor()

    cur.execute("SELECT title, published_date, commencement_date, url, embedding FROM lawdataset")
    rows = cur.fetchall()

    results = []
    user_emb = model.encode([user_input])[0]

    for title, pub_date, comm_date, url, emb_json in rows:
        emb = np.array(json.loads(emb_json))
        sim = cosine_similarity(user_emb, emb)
        results.append({
            "title": title,
            "publishedDate": pub_date,
            "commencementDate": comm_date,
            "url": url,
            "similarity": float(sim)
        })

    cur.close()
    conn.close()

    # Sort and send top 10
    top_results = sorted(results, key=lambda x: x['similarity'], reverse=True)[:10]
    return jsonify(top_results)

if __name__ == '__main__':
    app.run(port=5000)
