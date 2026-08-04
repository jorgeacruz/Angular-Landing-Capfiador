# Cap Fiador — Landing Page (Angular)

Landing page institucional desenvolvida em **Angular (standalone components)** com **Tailwind CSS**, contendo carrossel promocional, FAQ dinâmico, formulário de contato com validações e integração de envio de e-mail.

---

## 🚀 Tecnologias

- **Angular 21+** (standalone components, sem NgModules)
- **Tailwind CSS**
- **daisyUI** (componentes `collapse`, `modal`)
- **RxJS**
- **API pública do IBGE** (estados e municípios)
- **EmailJS** (envio de e-mail via front-end)

---

## 📁 Estrutura do projeto

```
public/
  assets/
    faq-data.json          # Perguntas e respostas do FAQ (editável)
src/
  app/
    components/
      caroussel/            # Carrossel de banners promocionais
        caroussel.ts
        caroussel.html
        caroussel.css
      faq-questions/         # Accordion de Dúvidas Comuns (dinâmico via JSON)
        faq-accordion.ts
        faq-accordion.html
        faq-accordion.css
      formulario/            # Formulário de contato com validações
        formulario.ts
        formulario.html
        formulario.css
        custom-validators.ts
        localidades.service.ts
        contato.service.ts
      menu/                  # Menu de navegação com âncoras
      footer/
    pages/
      home/                  # Página principal, contém as seções ancoradas
    app.config.ts
    app.routes.ts
    app.ts
```

---

## ✨ Funcionalidades implementadas

### 🎠 Carrossel de banners (`caroussel`)

- Rotação automática a cada **6 segundos**, com pausa ao passar o mouse (`mouseenter` / `mouseleave`).
- Navegação manual por setas (◀ ▶) e indicadores (dots).
- Imagens **responsivas** (`aspect-video` + `object-cover`).
- Cada slide é **clicável e configurável** via array `slides`, com suporte a:
  - Link externo (`https://...`, abre em nova aba opcionalmente);
  - Rota interna do Angular;
  - Slide sem link (`linkUrl: null`).

### ❓ FAQ dinâmico (`faq-questions`)

- Perguntas e respostas carregadas de um arquivo **JSON externo** (`public/assets/faq-data.json`) via `HttpClient` — não fica hardcoded no componente.
- **Adicionar ou remover perguntas** é feito apenas editando o JSON, sem alterar código.
- Estados de **carregamento** e **erro** tratados na interface.
- Suporte a remoção de itens em tempo de execução (`removeQuestion()`), para uso futuro em um painel administrativo.

### 🧭 Navegação por âncoras (`menu` + `app.routes.ts`)

- Rotas configuradas com **scroll automático até fragmentos** (`withInMemoryScrolling`).
- Links do menu (e botões, quando necessário) usam `[routerLink]` + `fragment` para rolar até seções específicas da Home (`Contato`, `Privacidade`, etc.).
- `scroll-margin-top` aplicado às seções para compensar o header fixo.

### 📋 Formulário de contato (`formulario`)

Formulário reativo (`ReactiveFormsModule`) com validação e máscara em tempo real:

| Campo                  | Regra                                                                                        |
| ---------------------- | -------------------------------------------------------------------------------------------- |
| **Nome**               | Obrigatório                                                                                  |
| **Celular**            | Obrigatório, máscara `(xx) xxxxx-xxxx`                                                       |
| **CPF**                | Obrigatório, máscara `000.000.000-00` com **validação matemática dos dígitos verificadores** |
| **Data de Nascimento** | Obrigatório, máscara `dd/mm/aaaa`, valida se a data existe e não é futura                    |
| **Estado**             | Select com os 27 estados do Brasil                                                           |
| **Município**          | Carregado dinamicamente via **API do IBGE** ao selecionar o Estado                           |
| **E-mail**             | Validação de formato (`Validators.email`)                                                    |

- **Modal de sucesso**: ao enviar o formulário com êxito, exibe um modal (`daisyUI modal`) com a mensagem "Email enviado com sucesso" e recarrega a página ao confirmar.
- **Envio de e-mail** via `ContatoService`, integrado com **EmailJS** (sem necessidade de backend próprio) — facilmente adaptável para uma API própria.

---

## ⚙️ Configuração

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar o EmailJS

Em `src/app/components/formulario/contato.service.ts`, substitua:

```typescript
private readonly serviceId = 'SEU_SERVICE_ID';
private readonly templateId = 'SEU_TEMPLATE_ID';
private readonly publicKey = 'SUA_PUBLIC_KEY';
```

pelos valores gerados na sua conta [EmailJS](https://www.emailjs.com/).

> 💡 O e-mail de **destino** é definido no campo "To Email" do template criado no painel do EmailJS, não no código.

### 3. Arquivo de FAQ

Edite `public/assets/faq-data.json` para adicionar ou remover perguntas:

```json
{
  "id": 4,
  "question": "Nova pergunta aqui?",
  "answer": "Resposta correspondente."
}
```

### 4. Rodar o projeto

```bash
ng serve
```

Acesse em `http://localhost:4200`.

---

## 🗂️ Observação sobre assets (Angular 17+)

Arquivos estáticos (como o `faq-data.json`) devem ficar na pasta **`public/`**, na raiz do projeto — e não em `src/assets`, que não é servida por padrão nessa versão do Angular.

---

## 📄 Licença

Este projeto é de uso interno / institucional. Ajuste esta seção conforme a licença aplicável ao seu repositório.
