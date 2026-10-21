# 🧮 Calculadora React — State Machine & Clean Architecture

![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS Grid](https://img.shields.io/badge/CSS3-Grid_Layout-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![DIO](https://img.shields.io/badge/Desafio-DIO_Trilha_React-7928CA?style=for-the-badge)

> Solução avançada para o **Desafio 01 da Trilha React da Digital Innovation One (DIO)**. Em vez da abordagem tradicional com múltiplos `useState` acoplados, este projeto implementa uma **máquina de estados determinística** utilizando `useReducer`, separação de responsabilidades (SRP) e suporte completo a eventos de teclado.

---

## 🚀 Diferenciais Técnicos e Arquitetura

A maioria das calculadoras de estudo em React falha em *edge cases* básicos (múltiplos zeros à esquerda, dois pontos decimais no mesmo número, falha de precisão em decimais ou quebra ao trocar de operador no meio da conta). Este projeto foi arquitetado para resolver esses problemas na raiz:

* **Gerenciamento de Estado com `useReducer`:** Centralização de todas as transições de estado (`ADD_DIGIT`, `CHOOSE_OPERATION`, `CLEAR`, `DELETE_DIGIT`, `EVALUATE`) em um *reducer* puro, eliminando condições de corrida e estados inconsistentes.
* **Princípio da Responsabilidade Única (SRP):** A lógica matemática e de transição de estado foi extraída para um módulo independente (`src/reducers/calculatorReducer.js`), deixando o componente `App.js` responsável apenas pela camada de interface e ciclo de vida.
* **Correção de Ponto Flutuante (IEEE 754):** Tratamento na função `evaluate` para evitar dízimas binárias clássicas do JavaScript (garantindo que `0.1 + 0.2` retorne exatamente `0.3` e não `0.30000000000000004`).
* **Formatação Desacoplada (`Intl.NumberFormat`):** A formatação de milhares acontece exclusivamente na camada de visualização (`Display.js`), preservando a integridade da *string* numérica no estado e permitindo digitar casas decimais com zeros (ex: `1,000.0005`) sem perda de caracteres.
* **Acessibilidade via Teclado Físico:** Implementação de `keydown` *listener* com `useEffect` (livre de *stale closures* graças à identidade estável do `dispatch`) e bloqueio de comportamentos nativos indesejados (`e.preventDefault()` no `Enter` e `/`).

---

## ⌨️ Mapa de Atalhos do Teclado

A calculadora pode ser operada 100% sem o uso do mouse:

| Tecla Física | Ação na Calculadora |
| :--- | :--- |
| `0` a `9` | Insere dígitos numéricos |
| `.` ou `,` (ABNT2) | Insere separador decimal |
| `+`, `-`, `*`, `/` | Seleciona a operação matemática |
| `Enter` ou `=` | Executa o cálculo final (`EVALUATE`) |
| `Backspace` | Apaga o último dígito (`DEL`) |
| `Escape` ou `C` | Limpa todo o estado da memória (`AC`) |

---

## 🛡️ Edge Cases Blindados

1. **Prevenção de zeros à esquerda:** Impede sequências inválidas como `0000` e substitui o `0` inicial automaticamente ao digitar outro algarismo (evitando `05`).
2. **Controle de ponto decimal:** Converte `.` inicial em `0.` automaticamente e bloqueia a inserção de um segundo ponto no mesmo operando.
3. **Operações em cadeia:** Ao digitar `5 + 5` e pressionar `*` (em vez de `=`), a calculadora resolve o par pendente (`10`) e já prepara a próxima operação (`10 *`).
4. **Flag `overwrite` pós-cálculo:** Após pressionar `=`, digitar um novo número inicia um novo cálculo do zero em vez de concatenar dígitos ao resultado anterior.
5. **Divisão por Zero:** Retorna um estado seguro de `"Erro"` (inclusive em operações encadeadas) e reseta graciosamente na interação seguinte.

---

## 📂 Estrutura do Projeto

```text
src/
├── components/
│   ├── Button.js              # Componente visual de botão (suporte a grid span-2)
│   └── Display.js             # Visor com formatação via Intl.NumberFormat
├── reducers/
│   └── calculatorReducer.js   # Máquina de estados (useReducer) e motor de cálculo
├── App.css                    # Estilização com CSS Grid responsivo
├── App.js                     # Container principal e listener de teclado
└── index.js                   # Ponto de entrada da aplicação
```

---

## 🔧 Como Executar Localmente

### Pré-requisitos
* **Node.js** (v18+ recomendado) e **npm** instalados.

### Passo a passo

```bash
# 1. Clone este repositório
git clone [https://github.com/Peuvictor/calculadora-react.git](https://github.com/Peuvictor/calculadora-react.git)

# 2. Acesse a pasta do projeto
cd calculadora-react

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm start
```

A aplicação abrirá automaticamente em `http://localhost:3000`.

---

## 🔗 Referências

* [Repositório Base do Desafio (DIO)](https://github.com/digitalinnovationone/trilha-react-desafio01-calculadora)

---

Desenvolvido por **Pedro Victor Oliveira Guimarães** — [GitHub](https://github.com/Peuvictor)
