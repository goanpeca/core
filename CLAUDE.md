# CLAUDE.md

Datalayer Core - Python SDK and CLI for the Datalayer AI Platform. Hybrid Python/TypeScript codebase with server-side Python and client-side React components.

## Project Structure

- **Source code**: `src/` contains the TypeScript/React library code
- **Examples**: `src/examples/` contains interactive React examples
- **Python**: `datalayer_core/` contains the Python SDK
- **Tests**: `src/__tests__/` for TypeScript, `datalayer_core/tests/` for Python
- **No default Vite files**: Removed App.tsx, main.tsx, public/ - this is a library, not an app

## Development Commands

**Python**: `pip install -e .[test]` | `pytest datalayer_core/tests/` | `mypy datalayer_core/`
**TypeScript Library**: `npm install` | `npm run build:lib` | `npm run lint` | `npm run test`
**Examples**: `npm run example` (starts dev server at http://localhost:3000/)
**Code Quality**: `npm run check` | `npm run check:fix` | `npm run lint` | `npm run format` | `npm run type-check`
**Docs**: `cd docs && make build` | `npm run typedoc` (generates TypeScript API docs)
**Make**: `make build` | `make start` | `make docs`

**CLI Scripts**: `datalayer`/`dla`/`d`, `datalayer-config`, `datalayer-migrate`, `datalayer-server`, `datalayer-troubleshoot`

## Architecture

**Python Core**:

- `DatalayerApp` - Base application class (traitlets)
- `DatalayerClient` - Main SDK class with mixins
- CLI with subcommands: about, console, envs, runtimes, login, secrets, snapshots
- Resource management: runtimes, environments, secrets, snapshots

**TypeScript/React**: NPM package `@datalayer/core`

- **Clean API Layer**: `api2/` provides stateless clients for IAM, Runtimes, and Spacer APIs
- **Domain Models**: All 70+ models moved to `api2/models/` for clean Node.js exports
- **Component Library**: UI, Jupyter, and business logic components
- **State Management**: Zustand for React state, models folder now re-exports from api2
- **Custom Hooks**: Auth, platform integration, UI/UX hooks
- **Universal Navigation**: Auto-detects React Router, Next.js, or native browser navigation

## Configuration

- Environment variables: `DATALAYER_TOKEN`, `DATALAYER_RUN_URL`
- Traitlets configuration with custom Datalayer paths
- Dev setup in `dev/`, examples in `examples/`

## Quality Standards

- **Type checking**: 100% mypy compliance (Python), strict TypeScript checks
- **Testing**: pytest + Vitest with React Testing Library + comprehensive test mocks
- **Linting**: ESLint with React/TypeScript rules, ruff for Python
- **Formatting**: Prettier for consistent code style (80 char width, single quotes)
- **Security**: bandit compliance, replaced `eval()` with `ast.literal_eval()`
- **Documentation**: NumPy-style docstrings, TypeDoc API docs, Docusaurus site
- **Pre-commit**: Updated to latest versions (ruff v0.12.8, bandit 1.8.6, pip-audit v2.9.0)

## Development Tips

- Use npm, not yarn
- Prefer editing over creating files
- Run checks after changes: `npm run check:fix`
- Use playwright MCP servers when you need to check stuff
- Ensure things always build after changes
- Run also npm run format/lint/type-check to ensure all is working properly

## Running Examples

**Start the examples server:**

```bash
npm run example
```

The examples are served at http://localhost:3000/ and include:

- `DatalayerNotebookExample`: Demonstrates Datalayer services integration with Jupyter notebooks
- `NotebookExample`: Basic notebook example
- `CellExample`: Individual cell execution example

**Next.js Notebook Example:**

Located in `examples/nextjs-notebook/`, this is a full Next.js application demonstrating platform integration:

```bash
cd examples/nextjs-notebook
npm install
npm run dev
```

Features:

- Token authentication with Datalayer IAM
- Browse and create notebooks from workspace
- Select compute environments for execution
- Interactive notebook viewer with real-time outputs
- Clean UI with centered empty states and proper spacing
- Welcome page with token authentication
- Navigation between notebooks, environments, and viewer pages
- Error handling for runtime creation failures

**Configuration:**

- The application uses local storage for token management
- Authentication happens through the welcome page where users enter their Datalayer API token
- The app communicates directly with `https://prod1.datalayer.run` API endpoints
- Built with Next.js 14, TypeScript, and GitHub Primer components

## TypeScript/React Services

**DatalayerServiceManager**: Creates and configures ServiceManager for Datalayer infrastructure

- Located in `src/services/DatalayerServiceManager.ts`
- Uses the runtime API (`/api/runtimes/v1/runtimes`) to create kernels
- Internally uses `createRuntime` from the API module for proper auth handling
- Returns configured ServiceManager for use with Jupyter components

**DatalayerCollaborationProvider**: Enables real-time collaboration

- Located in `src/collaboration/DatalayerCollaborationProvider.ts`
- Requires Datalayer credentials (runUrl and token)
- Integrates with Jupyter notebooks for collaborative editing

## API Notes

- **Runtime API**: `POST /api/runtimes/v1/runtimes` - Creates compute runtimes
- **Required Headers**: Authorization (Bearer token), X-External-Token (for some operations)
- **Proxy Setup**: Vite dev server proxies `/api` to `https://prod1.datalayer.run` for CORS
- **API Docs**: Available at https://prod1.datalayer.run/api/runtimes/v1/ui/
- **Pre-commit hooks**: Husky + lint-staged for automatic code quality checks
- **Code Quality Scripts**:
  - `npm run check` - Run all checks (format, lint, type-check)
  - `npm run check:fix` - Auto-fix all issues
  - `npm run lint` / `npm run lint:fix` - ESLint checking
  - `npm run format` / `npm run format:check` - Prettier formatting
  - `npm run type-check` - TypeScript compilation check

## API Architecture Notes

- **api2/**: Clean, stateless API clients for Node.js and browser use
  - `iam/`: Authentication, users, organizations, teams, tokens, secrets, usage
  - `runtimes/`: Environments, compute runtimes, snapshots
  - `spacer/`: Spaces, notebooks, documents, assignments, courses, exercises, datasets
  - `models/`: All domain models (moved from src/models/ for clean exports)
  - `base.ts`: Universal fetch-based HTTP client with auth
  - `types.ts`: API request/response types and model re-exports

- **Backward Compatibility**: `src/models/` now re-exports from `api2/models/`
- **Import Strategy**: All internal code now imports from `api2` for consistency
- **Node.js Safe**: No browser dependencies in api2, safe for server-side use

## AI Notes IMPORTANT

- Use npm, not yarn
- Prefer editing over creating files
- Run checks after changes:
  - npm run format
  - npm run lint
  - npm run type-check
- Import from api2 for models and API clients
- Use playwright MCP to inspect things directly
