import express from 'express';

const app = express();
const host = '0.0.0.0';
const porta = 3000;

app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
    <meta charset="UTF-8">
    <title>Reajuste Salarial</title>
    <style>
    body {
    font-family: couriers, monospace;
    background-color: #f1f7c6;
    margin: 30px;}
    h1 { color: #333;
    text-align: center;}

    p{ text-align: center;
    family: couriers, monospace;
    font-size: 18px;
    color: #555;}
    </style>
    </head>
    <body>
    <h1>Calculadora de Reajuste Salarial</h1>
    <p>Insira os dados na URL, copie e cole fazendo as alterações necessárias.</p>
    <p> EX: http://localhost:3000/calcular?idade=30&sexo=M&salario=2000&ano=2015 </p>
    </body>
    </html>
    `);
});

app.get('/calcular', (req, res) => {
const { idade, sexo, salario, ano } = req.query;
if (!idade || !sexo || !salario || !ano) {
return res.send(`
<h1>Algo deu errado...!</h1>
<p>Preencha todos os dados, corretamente, na URL!</p>`);}

    
const idadeNum = parseInt(idade);
const salarioNum = parseFloat(salario);
const anoContratacao = parseInt(ano);
const anoAtual = new Date().getFullYear();

if (isNaN(idadeNum) || idadeNum < 18 || idadeNum > 99) {
return res.send("<h1>Idade inválida (18 a 99).</h1>"); }

if (sexo !== "M" && sexo !== "F") {
return res.send("<h1>Sexo inválido (use M ou F).</h1>"); }

if (isNaN(salarioNum) || salarioNum <= 0) {
return res.send("<h1>Salário inválido.</h1>");}

if (isNaN(anoContratacao) || anoContratacao > anoAtual) {
return res.send("<h1>Ano de contratação inválido.</h1>");}

const tempo = anoAtual - anoContratacao;

let reaj = 0;
let desc = 0;
let acres = 0;

  
if (idadeNum <= 39) {
if (sexo === "M") {
reaj = 0.10;
tempo <= 10 ? desc = 10 : acres = 17;}
else {
reaj = 0.08;
tempo <= 10 ? desc = 11 : acres = 16;}
}
    
else if (idadeNum <= 69) {
if (sexo === "M") {
reaj = 0.08;
tempo <= 10 ? desc = 5 : acres = 15;}
else {
reaj = 0.10;
tempo <= 10 ? desc = 7 : acres = 14;}}
 else {
if (sexo === "M") {
reaj = 0.15;
    tempo <= 10 ? desc = 15 : acres = 13;
}
else {
reaj = 0.17;
tempo <= 10 ? desc = 17 : acres = 12;}}

const salarioFinal = salarioNum + (salarioNum * reaj) - desc + acres;

res.send(`
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Valor Final </title>
<style>
body {
font-family: couriers, monospace;
background-color: #f1f7c6;
margin: 30px;}
hr {
border: none;
border-top: 2px dotted gray;}
h1 { color: purple;
text-align: center;}
h2 { text-align: center;}

p{ text-align: center;}

</style>
</head>
<body>

<h1>Resultado do Cálculo</h1>
<p><b>Idade:</b> ${idadeNum}</p>
<p><b>Sexo:</b> ${sexo}</p>
<p><b>Salário Base:</b> R$ ${salarioNum.toFixed(2)}</p>
<p><b>Tempo de Empresa:</b> ${tempo} anos</p>
<hr>

<h2> Novo Salário: R$ ${salarioFinal.toFixed(2)} </h2>
<br>
<a href="/">Voltar</a>
</body>
</html>
 `);
});

app.listen(porta, host, () => {
console.log(`Servidor rodando em http://${host}:${porta}`);
});