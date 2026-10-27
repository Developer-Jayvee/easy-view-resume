# Resume Summarizer

A Laravel and Inertia React prototype for exploring resume uploads and retrieval-augmented question answering (RAG). It includes a responsive upload/chat interface and initial document storage schema. The end-to-end upload and RAG workflow is not yet connected.

## Current status

- The home page is an Inertia React page. The upload picker only displays a locally selected filename; it does not submit the file.
- The chatbot displays prompts and a placeholder response in local browser state. It does not retrieve resume passages or call Gemini.
- A Laravel `POST /upload` route, controller, request, and storage service have been started, but the request currently denies authorization and its input field names do not match. The UI is not wired to this route.
- The database schema has `documents` and `document_chunks` tables, with a 1,536-dimensional vector column for planned embeddings. Text extraction, chunking, embedding generation, vector search, and grounded answer generation still need implementation.
- The Gemini Laravel package and `smalot/pdfparser` are installed for planned backend processing.

## Technology

- PHP 8.3+ and Laravel 13
- Inertia.js 3, React 19, and TypeScript
- Vite 8 and Tailwind CSS 4
- PostgreSQL with the `pgvector` extension for the document embedding migration
- Google Gemini Laravel package and `smalot/pdfparser`

## Prerequisites

- PHP 8.3 or later and Composer
- Node.js and npm
- PostgreSQL with `pgvector` installed and enabled for the database used by the vector migration

The checked-in `.env.example` defaults to SQLite. That default is not sufficient for the `vector` column in `document_chunks`; configure PostgreSQL and enable `pgvector` before applying all migrations.

## Local setup

1. Install dependencies and initialize the local environment:

   ```bash
   composer install
   cp .env.example .env
   php artisan key:generate
   npm install
   ```

   If `.env` already exists, keep it and skip the copy command.

2. Set `DB_CONNECTION=pgsql` and configure `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, and `DB_PASSWORD` in `.env`. Ensure `pgvector` is enabled on that PostgreSQL database.

3. Apply migrations and start the development processes:

   ```bash
   php artisan migrate
   composer run dev
   ```

   The Composer development script invokes the Laravel `dev` command. To run only Vite's watcher, use `npm run dev` in a separate terminal.

4. Open the local URL printed by the development server.

To create frontend production assets, run:

```bash
npm run build
```

### Known frontend entry mismatch

The Blade root view loads `resources/js/app.tsx`, but `vite.config.js` currently declares `resources/js/app.js` as its JavaScript input. This mismatch should be resolved before relying on the Inertia React page in a built deployment. The build completing successfully does not confirm that the page entry is included.

## Useful commands

| Command | Purpose |
| --- | --- |
| `composer run dev` | Start the configured Laravel development process |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build frontend assets |
| `php artisan migrate` | Apply database migrations (requires a vector-compatible database) |
| `php artisan test` | Run the PHPUnit test suite |
| `composer run test` | Clear the configuration cache and run tests |

## Project structure

```text
app/
  Http/Controllers/       Home and upload controllers
  Http/Requests/          Upload validation request
  Models/                 Documents and document chunks
  Services/               File storage service
database/migrations/      Documents and document_chunks schemas
resources/js/
  pages/HomePage.tsx       Inertia page and selected-file state
  components/resume-summarizer/
                          Upload, chatbot, page sections, icons, and sample data
  app.tsx                  Inertia React bootstrap
routes/web.php            Home page and upload routes
```

## Configuration and secrets

Configure database credentials and `GEMINI_API_KEY` in the local `.env` file. Do not commit real credentials or expose the Gemini API key through a `VITE_*` variable or browser code. The key is not currently used by the chatbot UI.

## Tests

Run the PHPUnit suite with:

```bash
php artisan test
```

## License

The project declares the MIT license in `composer.json`.
