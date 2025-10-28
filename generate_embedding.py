# generate_embedding.py
import sys
import json
from transformers import AutoTokenizer, AutoModel
import torch

# Load model once
tokenizer = AutoTokenizer.from_pretrained("sentence-transformers/all-MiniLM-L6-v2")
model = AutoModel.from_pretrained("sentence-transformers/all-MiniLM-L6-v2")

def embed_sentence(sentence):
    inputs = tokenizer(sentence, return_tensors='pt', truncation=True, padding=True)
    with torch.no_grad():
        outputs = model(**inputs)
    embeddings = outputs.last_hidden_state.mean(dim=1).squeeze().tolist()
    return embeddings

if __name__ == "__main__":
    import sys
    sentence = input("Enter your situation: ")
    embedding = embed_sentence(sentence)
    print(json.dumps(embedding))  # output as JSON array
