from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)

# padrões das matrizes A e G 10x10
A_pattern = np.array([
    [0,0,0,0,1,1,0,0,0,0],
    [0,0,0,1,0,0,1,0,0,0],
    [0,0,1,0,0,0,0,1,0,0],
    [0,0,1,0,0,0,0,1,0,0],
    [0,0,1,1,1,1,1,1,0,0],
    [0,0,1,0,0,0,0,1,0,0],
    [0,0,1,0,0,0,0,1,0,0],
    [0,0,1,0,0,0,0,1,0,0],
    [0,0,1,0,0,0,0,1,0,0],
    [0,0,0,0,0,0,0,0,0,0]
])

G_pattern = np.array([
    [0,0,1,1,1,1,0,0,0,0],
    [0,1,0,0,0,0,1,0,0,0],
    [0,1,0,0,0,0,0,0,0,0],
    [0,1,0,0,0,0,0,0,0,0],
    [0,1,0,0,0,0,1,1,1,1],
    [0,1,0,0,0,0,0,0,1,0],
    [0,1,0,0,0,0,0,0,1,0],
    [0,1,0,0,0,0,1,0,1,0],
    [0,0,1,1,1,1,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
])

#calculo dos pesos de acordo com o produto das entradas e saídas
def hebbian_rule(input_pattern, target_pattern):
    weights = np.zeros(input_pattern.shape) #matriz de pesos inicializada com zeros
    for i in range(len(input_pattern)): #aleatorio
        for j in range(len(input_pattern[0])):
            weights[i][j] = input_pattern[i][j] * target_pattern[i][j] # calculo dos pesos
    return weights

#comparação dos pesos das matrizes A e G
def recognize_letter(matrix):
    weights_A = hebbian_rule(matrix, A_pattern) 
    weights_G = hebbian_rule(matrix, G_pattern)
    
    score_A = np.sum(weights_A)
    score_G = np.sum(weights_G)

    if score_A > score_G:
        return "A"
    else:
        return "G"

#rota para recebr a matriz e retornas a letra reconhecida
@app.route('/recognition_matrix', methods=[ 'POST'])
def process_matrix():
        data = request.json
        matrix = np.array(data['matrix'])
        letter = recognize_letter(matrix)
        return jsonify({"letter": letter})