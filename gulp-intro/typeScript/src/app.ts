import {Carro, Vendavel } from './produto';
import { createArrowFunction } from 'typescript';

function exibir(v: Vendavel) {
  console.log(`${v.nome} custa ${v.preco}`);
}

const c = new Carro;
c.nome = 'Civic';
c.preco = 89499.90;
exibir(c);

function soma(a: number, b:number, c:any){
  return a+b + c;
}

soma(5, 7, 9);