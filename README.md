# Excalidoc

Excalidoc é uma CLI e biblioteca para gerar diagramas no formato Excalidraw a partir de decorators TypeScript em seu projeto.

---

## 📦 Instalação

Instale via npm ou yarn:

```bash
npm install --save-dev excalidoc
# ou
yarn add -D excalidoc
```

> **Requisitos:**
>
> - TypeScript com `experimentalDecorators` e `emitDecoratorMetadata` habilitados no seu `tsconfig.json`
> - Reflect Metadata (`reflect-metadata`)

No seu `tsconfig.json`, confirme:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

---

## CLI

### Gerando o diagrama no NestJS

Use o comando abaixo para varrer todos os arquivos TypeScript (`.ts`) do seu projeto, exceto testes e bootstrap (`main.ts`), e gerar um arquivo **Excalidraw**:

```bash
npx excalidoc "./src/**/!(*.spec|*.test|main).ts" diagram.excalidraw
```

- ``: Glob que inclui todos os `.ts` decorados, excluindo `*.spec.ts`, `*.test.ts` e `main.ts`.
- ``: Nome do arquivo de saída pode omitir a extensão, `.excalidraw` será adicionada.

> **Observação:** Internamente o CLI carrega:
>
> 1. `reflect-metadata` para suportar decorators.
> 2. `ts-node/register` para transpilar `.ts` on-the-fly.

---

## 🎨 Decorators Disponíveis

Excalidoc oferece decorators para marcar classes, propriedades e métodos:

```ts
import { Node, NodeProperty, NodeMethod, Edge, ExcalidocDefaultNodeTypes } from 'excalidoc';

@Node({ type: ExcalidocDefaultNodeTypes.Service })
export class UserService {
  @NodeProperty({ type: 'string' })
  public readonly name: string;

  @NodeMethod({ input: 'CreateUserDto', output: 'User' })
  create(dto: CreateUserDto): User {
    // …
  }
}

@Edge({ from: 'UserService', to: 'UserRepository', label: 'uses' })
export class UserService { /* … */ }
```

- `Node`: Define um novo nó (classe) com um tipo visual predefinido.
- `NodeProperty`: Anota propriedades para exibir no diagrama.
- `NodeMethod`: Anota métodos para exibir assinaturas.
- `Edge`: Desenha conexões entre nós.

---

## 📝 Scripts Úteis

No `package.json` do seu projeto Nest, adicione:

```json
{
  "scripts": {
    "build": "nest build",
    "start": "nest start",
    "generate:diagram": "excalidoc \"src/**/!(*.spec|*.test|main).ts\" diagram.excalidraw"
  }
}
```

Depois, basta executar:

```bash
npm run generate:diagram
```

---

## 🎯 Boas Práticas

- **Exclua** arquivos de bootstrap (`main.ts`) e testes do glob para não inicializar o app.
- **Versione** o diagrama gerado em controle de versão para manter a documentação histórica.