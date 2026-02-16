# Bank Robbery Slot Machine 🎰

Um jogo de caça-níquel (slot machine) com tema de roubo a banco, desenvolvido com Next.js 16, React 19, TypeScript e TailwindCSS 4.

## 🎮 Características

- **Grid 5x3** de símbolos animados
- **10 símbolos únicos**: A, K, Q, J, 10, Bank, Safe, Dynamite, Handcuffs, Cell
- **Sistema de apostas** configurável ($ 100 - $ 10,000)
- **Animações de sprite** suaves para todos os símbolos e personagens
- **Personagem Fox animado** com 61 frames de animação idle
- **Sistema de vitórias** com 4 níveis:
  - Small Win (< $ 50,000)
  - Big Win ($ 50,000 - $ 499,999)
  - Mega Win ($ 500,000 - $ 4,999,999)
  - Super Mega Win (≥ $ 5,000,000)
- **Totalmente responsivo** para desktop e mobile
- **Background temático** de cofre de banco

## 🏗️ Arquitetura

O projeto segue uma **Feature-First Architecture** para melhor organização e escalabilidade:

```
src/
├── features/
│   └── slot-machine/
│       ├── components/      # Componentes da feature
│       ├── hooks/           # Custom hooks
│       ├── types/           # TypeScript types
│       └── utils/           # Funções utilitárias
├── shared/
│   ├── components/          # Componentes compartilhados
│   ├── hooks/               # Hooks compartilhados
│   └── types/               # Types compartilhados
└── components/ui/           # Componentes shadcn/ui
```

## 🚀 Tecnologias

- **Next.js 16** - Framework React com App Router
- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **TailwindCSS 4** - Estilização
- **shadcn/ui** - Componentes UI (Button, Dialog)

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Rodar produção
npm start
```

O jogo estará disponível em [http://localhost:3000](http://localhost:3000)

## 🎯 Como Jogar

1. **Ajuste sua aposta** usando os botões **+** e **-**
2. Clique no botão **SPIN** para girar os rolos
3. Aguarde os rolos pararem
4. Se você conseguir **3 ou mais símbolos iguais em linha**, você ganha!
5. Vitórias maiores ativam modais especiais (**Big Win**, **Mega Win**, **Super Mega Win**)

## 🎨 Assets

Todos os assets de animação estão em `public/bank-slots/animation/_Sequences/`:
- **Personagens**: Fox (Idle, Win)
- **Símbolos**: A, K, Q, J, 10, Bank, Safe, Dynamite, Handcuffs, Cell
- **Moedas**: Bronze, Silver, Golden
- **Vitórias**: Big Win, Mega Win, Super Mega Win, Total Win

## 🧩 Componentes Principais

- **SlotMachineGame**: Componente raiz do jogo
- **SlotGrid**: Grid 5x3 de símbolos
- **SlotSymbol**: Componente individual de símbolo com animação
- **GameControls**: Painel de informações e botões de controle
- **FoxCharacter**: Personagem animado
- **WinModal**: Modal de vitórias especiais
- **GameBackground**: Background temático

## 🎲 Lógica do Jogo

- **Geração de símbolos**: Aleatória para cada posição
- **Detecção de vitórias**: 3+ símbolos consecutivos em qualquer linha
- **Multiplicador**: `2^(número de símbolos consecutivos)`
- **Valor da vitória**: `bet × multiplicador`

## 📝 Scripts

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm start` - Rodar build de produção
- `npm run lint` - Linter ESLint

## 🔧 Configuração

### TypeScript Paths
- `@/*` - Raiz do projeto
- `@/components/*` - Componentes UI
- `@/lib/*` - Utilitários
- `@/features/*` - Features
- `@/shared/*` - Compartilhados

### Next.js Config
- Imagens não otimizadas para melhor performance com sprites

## 🎬 Animações

- **Sprite Animation System**: Custom hook `useSpriteAnimation` para animações frame-by-frame
- **Smooth Transitions**: Animações CSS com TailwindCSS
- **Performance Optimized**: Apenas animações visíveis são renderizadas

## 📱 Responsividade

O jogo é totalmente responsivo com breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🏆 Conquistas Técnicas

- ✅ Código limpo sem redundâncias (DRY)
- ✅ Componentes modulares e reutilizáveis (KISS)
- ✅ TypeScript rigoroso (sem `any`)
- ✅ Feature-First Architecture
- ✅ Commits atômicos e descritivos
- ✅ shadcn/ui usado pragmaticamente
- ✅ Zero código morto

## 📄 Licença

Este projeto é apenas para fins educacionais e demonstração.
