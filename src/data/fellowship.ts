export type Project = {
  number: string;
  slug: string; // folder name inside python-project-series
  title: string;
  type: string;
  concept: string; // what this project taught me
  broke: string[]; // what actually broke, one line each
  live?: string; // deployed URL, rendered as Try it live
  draft: boolean; // draft projects are not rendered
};

export const REPO_URL = "https://github.com/maadan-dev/python-project-series";

export const projectUrl = (slug: string) => `${REPO_URL}/tree/HEAD/${slug}`;

export const fellowshipIntro =
  "A Python project series, one repo, built during the Learn2Earn AI Engineering Fellowship. Each project links to its README for the full writeup.";

export const recurringTheme =
  "Across the first four projects the bugs came down to state ownership, actual types, and execution order. In Project 5, type hints with Pydantic and Pyright caught boundary mismatches before runtime — shifting effort from debugging typos to schema design.";

export const nowBuilding = "Project 6 (Planning)";

export const projects: Project[] = [
  {
    number: "01",
    slug: "01-contact-book",
    title: "Contact Book",
    type: "CLI",
    concept:
      "Dictionaries, JSON persistence, separating validation from actions, ASSUMES / PROMISES / WILL NOT HANDLE",
    broke: [
      "Assigned load_contacts instead of calling it, which caused a TypeError.",
      "Used f.write() on a dict. It needed json.dump().",
      "contact.json vs contacts.json: no error, just a second file and persistence that looked broken.",
    ],
    draft: false,
  },
  {
    number: "02",
    slug: "02-study-planner",
    title: "Study Planner Agent",
    type: "AI agent (Groq)",
    concept:
      "Calling an LLM API from a CLI, persisting chat history, reading an SDK instead of assuming it",
    broke: [
      "Trailing commas turned strings into tuples, more than once.",
      "Carried Gemini SDK assumptions into Groq and called methods on the wrong objects.",
      "Missing commas between function parameters.",
    ],
    draft: false,
  },
  {
    number: "03",
    slug: "03-invoice-generator",
    title: "Invoice Generator",
    type: "CLI + PDF (ReportLab)",
    concept:
      "Classes that own their state, serializing objects to JSON, generating PDFs",
    broke: [
      "Generated the PDF before the item loop finished, so it had no items.",
      "Kept a separate items list instead of letting Invoice own its state.",
      "Used range(num_of_items + 1) on a string from input(): wrong type and an extra iteration.",
    ],
    draft: false,
  },
  {
    number: "04",
    slug: "04-sudoku-game",
    title: "Sudoku",
    type: "Desktop GUI (Flet)",
    concept:
      "Recursive backtracking, puzzle uniqueness by counting solutions, redrawing the UI from state",
    broke: [
      "Generator produced the same solved grid every game. Found in code review, not by testing.",
      "Cell removal could loop forever when no more cells could be removed safely.",
      "is_board_solved reported false conflicts by comparing each cell against itself.",
    ],
    draft: false,
  },
  {
    number: "05",
    slug: "05-invoice-api",
    title: "Invoice API",
    type: "REST API (FastAPI)",
    concept:
      "Route handlers, Pydantic schema validation, relational SQLite with foreign keys & CHECK constraints, on-demand PDF generation, and live cloud deployment",
    broke: [
      "SQLite ignored foreign keys until explicitly activating 'PRAGMA foreign_keys = ON'.",
      "Pydantic validation raised raw 422 errors until structured schemas matched incoming line items.",
      "In-memory PDF generation required explicit buffer rewinds before returning as a streaming response.",
    ],
    live: "https://invoice-api.maadan.dev/docs",
    draft: false,
  },
];
