const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());

// Definindo os padrões das letras A e G em uma matriz 10x10
const A_pattern = [
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
];

const G_pattern = [
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
];

// Calcula os pesos a partir da multiplicação entre entradas e saídas pré-definidas
function hebbianRule(inputPattern, targetPattern) {
    const weights = Array.from({ length: inputPattern.length }, () =>
      Array(inputPattern[0].length).fill(0)
    );
  
    for (let i = 0; i < inputPattern.length; i++) {
      for (let j = 0; j < inputPattern[i].length; j++) {
        weights[i][j] = inputPattern[i][j] * targetPattern[i][j];
      }
    }
    return weights;
  }
  
  // Função de comparação para identificar a letra
function recognizeLetter(matrix) {
    const weightsA = hebbianRule(matrix, A_pattern);
    const weightsG = hebbianRule(matrix, G_pattern);

    const scoreA = weightsA.flat().reduce((sum, val) => sum + val, 0);
    const scoreG = weightsG.flat().reduce((sum, val) => sum + val, 0);

    return scoreA > scoreG ? "A" : "G";
}
  
    // matriz de teste letra A
// const testMatrix_A = [
// [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
// [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
// [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
// [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
// [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
// [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
// [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
// [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
// [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// ];
    
// console.log(recognizeLetter(testMatrix_A)); // Resultado esperado: "A"
app.post('/recognition_matrix', (req, res) => {
    const matrix = req.body.matrix;
    const letter = recognizeLetter(matrix);
    console.log(letter);
    res.json({ letter });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});