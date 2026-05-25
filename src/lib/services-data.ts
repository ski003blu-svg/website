export type ServiceSlug =
  | "ai-machine-learning"
  | "web-development"
  | "software-development"
  | "data-analytics"
  | "digital-marketing"
  | "branding"
  | "api-integration"
  | "devops-cloud";

export type Service = {
  slug: ServiceSlug;
  number: string;
  title: string;
  tagline: string;
  description: string;
  features: { title: string; description: string }[];
  process: { step: string; title: string; description: string }[];
  techStack: string[];
  benefits: string[];
  pricing: {
    name: string;
    price: string;
    description: string;
    features: string[];
    highlighted?: boolean;
  }[];
  faq: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "ai-machine-learning",
    number: "01",
    title: "AI & Machine Learning",
    tagline: "Production-grade intelligence, milled for durability.",
    description:
      "Custom LLM fine-tuning, computer vision, and predictive modeling engineered for manufacturing, logistics, and regulated industries. We move beyond demos into systems your operators trust on day 400.",
    features: [
      { title: "Private LLM Fine-Tuning", description: "Domain-specific models trained on your proprietary corpora — no data leakage." },
      { title: "Computer Vision", description: "Defect detection, OCR, and visual QA pipelines deployed at the edge." },
      { title: "Predictive Maintenance", description: "Time-series models that catch failures weeks before they happen." },
      { title: "Recommendation Engines", description: "Personalization layers that lift conversion without dark patterns." },
      { title: "RAG Architectures", description: "Retrieval-augmented systems grounded in your own knowledge base." },
      { title: "MLOps Pipelines", description: "Reproducible training, evaluation, and rollback for every model in production." },
    ],
    process: [
      { step: "01", title: "Discovery", description: "Map the data, the constraints, and the success metric." },
      { step: "02", title: "Prototype", description: "Two-week spike to validate feasibility on real data." },
      { step: "03", title: "Engineering", description: "Build production training and inference pipelines." },
      { step: "04", title: "Deployment", description: "Rollout with monitoring, drift detection, and on-call." },
      { step: "05", title: "Iteration", description: "Continuous evaluation against business KPIs." },
    ],
    techStack: ["PyTorch", "TensorFlow", "Hugging Face", "LangChain", "vLLM", "Ray", "MLflow", "Weights & Biases", "Triton", "ONNX"],
    benefits: [
      "Reduce manual review labor by 40–70%",
      "Catch defects before they reach customers",
      "Keep proprietary data on your own infrastructure",
      "Auditable models for regulated industries",
    ],
    pricing: [
      { name: "Pilot", price: "$25K", description: "Two-week feasibility spike on a single use case.", features: ["Data audit", "Baseline model", "Go/no-go report"] },
      { name: "Production", price: "$80K+", description: "Full engineering of a deployed model with monitoring.", features: ["Custom architecture", "Training pipeline", "Inference API", "30 days hypercare"], highlighted: true },
      { name: "Platform", price: "Custom", description: "Multi-model MLOps platform for an entire org.", features: ["Multi-tenant infra", "Governance & audit", "Training & enablement", "Quarterly roadmap"] },
    ],
    faq: [
      { q: "Do you use our data to train models for other clients?", a: "Never. All training is air-gapped to your tenant; weights are yours." },
      { q: "Can you work with our existing data warehouse?", a: "Yes — Snowflake, Databricks, BigQuery, Postgres, and bespoke lakes are all supported." },
      { q: "What about model governance and audit?", a: "Every model ships with a model card, evaluation report, and reproducible training lineage." },
    ],
  },
  {
    slug: "web-development",
    number: "02",
    title: "Website Development",
    tagline: "Performance-grade websites that ship trust at first paint.",
    description:
      "Marketing sites, product pages, and bespoke web experiences engineered for sub-second loads and obsessive attention to typography, motion, and accessibility.",
    features: [
      { title: "Bespoke Design Systems", description: "Brand-grade component libraries, not template skins." },
      { title: "Edge-First Architecture", description: "Static where it can be, dynamic where it must." },
      { title: "Headless CMS", description: "Content workflows your marketing team will actually use." },
      { title: "Conversion Engineering", description: "A/B tested funnels with statistical rigor." },
      { title: "SEO Foundations", description: "Schema, Core Web Vitals, and content architecture done right." },
      { title: "Accessibility (WCAG 2.2 AA)", description: "Compliance baked in, not bolted on." },
    ],
    process: [
      { step: "01", title: "Strategy", description: "Audience, brand, and conversion model." },
      { step: "02", title: "Design", description: "Wireframes through high-fidelity prototypes." },
      { step: "03", title: "Build", description: "Component-driven engineering on modern stacks." },
      { step: "04", title: "Launch", description: "Performance audit, SEO sweep, and go-live." },
      { step: "05", title: "Grow", description: "Iteration based on analytics and user research." },
    ],
    techStack: ["Next.js", "TanStack Start", "Astro", "React", "TypeScript", "Tailwind CSS", "Sanity", "Contentful", "Vercel", "Cloudflare"],
    benefits: [
      "Sub-1s First Contentful Paint on 4G",
      "Lighthouse scores of 95+ across the board",
      "Marketing team ships content without a developer",
      "Brand identity expressed pixel-perfect",
    ],
    pricing: [
      { name: "Launch", price: "$18K", description: "Premium marketing site, up to 8 pages.", features: ["Custom design", "CMS integration", "Performance audit"] },
      { name: "Scale", price: "$45K+", description: "Full corporate site with content workflows.", features: ["Design system", "Multilingual", "Advanced analytics", "60 days iteration"], highlighted: true },
      { name: "Enterprise", price: "Custom", description: "Multi-brand or multi-region platforms.", features: ["Multi-region edge", "Custom CMS", "Dedicated team", "SLA"] },
    ],
    faq: [
      { q: "Do you work with our existing brand?", a: "Always preferred. If brand needs refinement we can fold it into the engagement." },
      { q: "Can our team manage content after launch?", a: "Yes — we ship with a CMS and training tailored to your workflow." },
      { q: "What about hosting?", a: "We deploy to Vercel, Cloudflare, or your own infrastructure. Your choice." },
    ],
  },
  {
    slug: "software-development",
    number: "03",
    title: "Software Development",
    tagline: "Bespoke internal tools and SaaS, built to outlast their authors.",
    description:
      "Custom platforms, internal operations tools, and SaaS products engineered with the discipline of a team that has shipped to millions and the agility of a startup.",
    features: [
      { title: "Greenfield SaaS", description: "Build a product from idea to first paying customer." },
      { title: "Internal Tooling", description: "Operations platforms that replace fragile spreadsheets." },
      { title: "Legacy Modernization", description: "Strangler-fig migrations from monoliths to modular systems." },
      { title: "Multi-Tenant Architecture", description: "Isolation, billing, and feature flags from day one." },
      { title: "Type-Safe Backends", description: "Zod, tRPC, and end-to-end type contracts." },
      { title: "Observability", description: "Logs, traces, and metrics wired before launch." },
    ],
    process: [
      { step: "01", title: "Product Brief", description: "Users, workflows, and success metrics." },
      { step: "02", title: "Architecture", description: "Tech selection and system design review." },
      { step: "03", title: "Sprint Cycles", description: "Two-week increments with working software." },
      { step: "04", title: "Hardening", description: "Load testing, security review, and docs." },
      { step: "05", title: "Handover", description: "Knowledge transfer and ongoing support options." },
    ],
    techStack: ["TypeScript", "Node.js", "Go", "Rust", "Postgres", "Redis", "Kafka", "tRPC", "Drizzle", "Prisma"],
    benefits: [
      "Software your engineers will inherit gracefully",
      "Type safety from database to UI",
      "Predictable two-week shipping cadence",
      "Architecture documented for your team",
    ],
    pricing: [
      { name: "Discovery", price: "$15K", description: "Three-week architecture and product brief.", features: ["Stakeholder interviews", "Tech stack proposal", "Build estimate"] },
      { name: "MVP", price: "$120K+", description: "Build to first paying customer or first 100 users.", features: ["End-to-end engineering", "DevOps setup", "90-day warranty"], highlighted: true },
      { name: "Embed", price: "Custom", description: "Dedicated squad embedded with your team.", features: ["3–8 engineers", "Quarterly objectives", "Co-located rituals"] },
    ],
    faq: [
      { q: "Do you take equity?", a: "Cash-first engagements, but we'll consider equity supplements for aligned partnerships." },
      { q: "Can you maintain the software after launch?", a: "Yes — we offer retainer-based support with SLA tiers." },
      { q: "What if our requirements change mid-build?", a: "We work in two-week sprints specifically so the backlog can evolve." },
    ],
  },
  {
    slug: "data-analytics",
    number: "04",
    title: "Data Analytics",
    tagline: "Turn telemetry into decisions executives can defend.",
    description:
      "Modern data stacks, executive dashboards, and analytics engineering. We turn the raw exhaust of your operations into signal that drives quarterly planning.",
    features: [
      { title: "Data Warehouse Design", description: "Snowflake, BigQuery, or Databricks done right." },
      { title: "ELT Pipelines", description: "Fivetran, Airbyte, or custom connectors." },
      { title: "Analytics Engineering", description: "dbt models with tests, lineage, and docs." },
      { title: "Executive Dashboards", description: "BI that the C-suite actually opens." },
      { title: "Self-Serve Analytics", description: "Empower business users to answer their own questions." },
      { title: "Reverse ETL", description: "Push insights back into the tools your team uses." },
    ],
    process: [
      { step: "01", title: "Audit", description: "Map sources, current state, and KPI gaps." },
      { step: "02", title: "Design", description: "Warehouse architecture and semantic layer." },
      { step: "03", title: "Build", description: "Pipelines, models, and tests." },
      { step: "04", title: "Activate", description: "Dashboards, alerts, and operational reverse ETL." },
      { step: "05", title: "Govern", description: "Documentation, access controls, and review cadence." },
    ],
    techStack: ["Snowflake", "BigQuery", "Databricks", "dbt", "Fivetran", "Airbyte", "Looker", "Metabase", "Hex", "Mode"],
    benefits: [
      "Single source of truth across the org",
      "Decision latency reduced from days to hours",
      "Data quality enforced by automated tests",
      "Analytics governance your CFO will sign off on",
    ],
    pricing: [
      { name: "Audit", price: "$12K", description: "Two-week data maturity assessment.", features: ["Source inventory", "Maturity score", "Roadmap"] },
      { name: "Foundation", price: "$60K+", description: "Build a modern data stack end-to-end.", features: ["Warehouse setup", "Core pipelines", "Executive dashboard", "dbt models"], highlighted: true },
      { name: "Platform", price: "Custom", description: "Org-wide analytics platform with governance.", features: ["Multi-domain warehouse", "Self-serve tooling", "Data quality SLAs", "Training program"] },
    ],
    faq: [
      { q: "Do we need to be on the cloud?", a: "We work with cloud, hybrid, and on-prem stacks. Cloud is faster to value." },
      { q: "Can you migrate from our existing BI tool?", a: "Yes — we handle Tableau, Power BI, and Looker migrations regularly." },
      { q: "What about data privacy?", a: "Row-level security, column masking, and PII tokenization are standard." },
    ],
  },
  {
    slug: "digital-marketing",
    number: "05",
    title: "Digital Marketing",
    tagline: "Performance marketing without the dark-pattern playbook.",
    description:
      "SEO foundations, paid acquisition, and content engines designed to compound. Tactics that age into assets, not lines on next quarter's invoice.",
    features: [
      { title: "Technical SEO", description: "Schema, Core Web Vitals, and site architecture." },
      { title: "Content Strategy", description: "Topic clusters mapped to buyer journey." },
      { title: "Paid Acquisition", description: "Google, Meta, and LinkedIn campaigns with rigor." },
      { title: "Marketing Automation", description: "Lifecycle flows in HubSpot, Marketo, or Customer.io." },
      { title: "Attribution Modeling", description: "Multi-touch attribution that survives iOS changes." },
      { title: "Conversion Rate Optimization", description: "Experiment programs with statistical rigor." },
    ],
    process: [
      { step: "01", title: "Audit", description: "Channel mix, funnel, and competitive landscape." },
      { step: "02", title: "Strategy", description: "Channel priorities and content calendar." },
      { step: "03", title: "Build", description: "Tracking, content, and campaigns." },
      { step: "04", title: "Optimize", description: "Weekly experiments and reporting." },
      { step: "05", title: "Scale", description: "Double down on what compounds." },
    ],
    techStack: ["Google Ads", "Meta Ads", "LinkedIn", "HubSpot", "Marketo", "Segment", "GA4", "Ahrefs", "Semrush", "Webflow"],
    benefits: [
      "CAC reductions of 20–40% in first 6 months",
      "Organic traffic that compounds quarter over quarter",
      "Attribution that survives tracking changes",
      "Content team enabled, not replaced",
    ],
    pricing: [
      { name: "Sprint", price: "$8K/mo", description: "Single-channel focus, monthly cadence.", features: ["One channel", "Weekly reporting", "Monthly review"] },
      { name: "Growth", price: "$22K/mo", description: "Multi-channel program with strategy support.", features: ["Up to 3 channels", "Content production", "Bi-weekly strategy"], highlighted: true },
      { name: "Embedded", price: "Custom", description: "Fractional CMO and full marketing org.", features: ["Strategy + execution", "Team enablement", "Quarterly board reports"] },
    ],
    faq: [
      { q: "Do you require long contracts?", a: "Three-month minimum to see results; month-to-month after that." },
      { q: "Who owns the content?", a: "You do, always. We don't hold IP hostage." },
      { q: "What about reporting?", a: "Looker Studio dashboards refreshed daily, plus monthly written reviews." },
    ],
  },
  {
    slug: "branding",
    number: "06",
    title: "Branding",
    tagline: "Identity systems built for ambitious technology companies.",
    description:
      "Naming, visual identity, brand strategy, and the kind of design rigor usually reserved for category-defining companies. Built to scale from seed-stage to IPO.",
    features: [
      { title: "Brand Strategy", description: "Positioning, narrative, and competitive distinction." },
      { title: "Visual Identity", description: "Logo systems, type, color, and motion language." },
      { title: "Naming", description: "Names that are available, defensible, and memorable." },
      { title: "Brand Guidelines", description: "Living systems your team can actually follow." },
      { title: "Sonic Identity", description: "Audio branding for product moments and ads." },
      { title: "Launch Choreography", description: "Brand reveal as a moment, not an upload." },
    ],
    process: [
      { step: "01", title: "Discovery", description: "Stakeholder interviews and competitive scan." },
      { step: "02", title: "Strategy", description: "Positioning and brand foundation." },
      { step: "03", title: "Identity", description: "Visual system through multiple rounds." },
      { step: "04", title: "Application", description: "Web, deck, social, and product touchpoints." },
      { step: "05", title: "Launch", description: "Reveal, rollout, and team training." },
    ],
    techStack: ["Figma", "Adobe CC", "Cinema 4D", "Lottie", "Webflow", "Notion"],
    benefits: [
      "A brand that recruiters and customers remember",
      "Internal alignment on what you stand for",
      "Design system your team can extend",
      "Premium positioning that supports pricing power",
    ],
    pricing: [
      { name: "Refresh", price: "$25K", description: "Identity polish for an established company.", features: ["Logo refresh", "Color & type", "Guidelines"] },
      { name: "Identity", price: "$75K", description: "Full brand build for a Series A through C.", features: ["Strategy", "Naming optional", "Full identity system", "Launch kit"], highlighted: true },
      { name: "Category Brand", price: "Custom", description: "Multi-quarter brand build for category leaders.", features: ["Strategy + identity", "Narrative arc", "Multi-touchpoint rollout"] },
    ],
    faq: [
      { q: "Do you do naming?", a: "Yes, with linguistic and trademark screening." },
      { q: "How many logo rounds?", a: "Typically three rounds with structured feedback frameworks." },
      { q: "Can you help with the launch?", a: "Yes — launch choreography is part of category-brand engagements." },
    ],
  },
  {
    slug: "api-integration",
    number: "07",
    title: "API Integration",
    tagline: "Connective tissue between systems that were never meant to talk.",
    description:
      "Integration platforms, middleware, and bespoke connectors. We bridge legacy ERPs with modern AI layers, third-party SaaS with your internal tools, and everything in between.",
    features: [
      { title: "Legacy Bridging", description: "Modernize 20-year-old systems without downtime." },
      { title: "Middleware Engineering", description: "Event-driven backbones that scale to millions of events/day." },
      { title: "Bespoke Connectors", description: "Custom integrations for systems no Zapier covers." },
      { title: "Webhook Reliability", description: "Idempotency, retries, and dead-letter queues done right." },
      { title: "API Design", description: "REST, GraphQL, and gRPC contracts that age well." },
      { title: "Integration Platform (iPaaS)", description: "Centralized observability for every integration." },
    ],
    process: [
      { step: "01", title: "Integration Map", description: "Inventory systems, contracts, and SLAs." },
      { step: "02", title: "Design", description: "Choose patterns: sync, async, batch, streaming." },
      { step: "03", title: "Build", description: "Connectors, middleware, and tests." },
      { step: "04", title: "Observe", description: "Logging, alerting, and runbooks." },
      { step: "05", title: "Iterate", description: "Adapt as upstream contracts evolve." },
    ],
    techStack: ["Node.js", "Go", "Kafka", "RabbitMQ", "Temporal", "Workato", "MuleSoft", "Postman", "Hookdeck", "Inngest"],
    benefits: [
      "Eliminate brittle spreadsheet-driven workflows",
      "Real-time data flow between systems",
      "Integration health visible at a glance",
      "Vendor lock-in dramatically reduced",
    ],
    pricing: [
      { name: "Connector", price: "$20K", description: "One bespoke integration, soup to nuts.", features: ["Discovery", "Build", "Monitoring"] },
      { name: "Hub", price: "$70K+", description: "Multi-system integration backbone.", features: ["Up to 6 systems", "Event bus", "Observability"], highlighted: true },
      { name: "Platform", price: "Custom", description: "Enterprise iPaaS with governance.", features: ["Unlimited systems", "Self-serve connectors", "SLA"] },
    ],
    faq: [
      { q: "Do you work with legacy SOAP/XML systems?", a: "Yes — half our integration work involves systems older than the internet." },
      { q: "What about data residency?", a: "All middleware can run in your VPC or on-prem." },
      { q: "Can you maintain integrations long-term?", a: "Yes — retainer-based maintenance with on-call options." },
    ],
  },
  {
    slug: "devops-cloud",
    number: "08",
    title: "DevOps & Cloud",
    tagline: "Infrastructure as a craft, not a cost center.",
    description:
      "Cloud architecture, CI/CD pipelines, and SRE practices for teams who want infrastructure that's boring, predictable, and ruthlessly efficient.",
    features: [
      { title: "Cloud Architecture", description: "AWS, GCP, and Azure designs that scale and stay cheap." },
      { title: "Kubernetes", description: "Production-grade clusters with GitOps and observability." },
      { title: "CI/CD Pipelines", description: "Sub-15-minute deployments with automated rollback." },
      { title: "Infrastructure as Code", description: "Terraform, Pulumi, and CDK with proper review." },
      { title: "FinOps", description: "Cloud spend optimization that reclaims 20–40%." },
      { title: "Site Reliability", description: "SLOs, error budgets, and on-call practices." },
    ],
    process: [
      { step: "01", title: "Audit", description: "Current state, cost, and risk assessment." },
      { step: "02", title: "Architecture", description: "Target state design and migration plan." },
      { step: "03", title: "Build", description: "IaC, pipelines, and platform services." },
      { step: "04", title: "Migrate", description: "Phased cutover with zero-downtime." },
      { step: "05", title: "Operate", description: "Runbooks, training, and ongoing partnership." },
    ],
    techStack: ["AWS", "GCP", "Azure", "Kubernetes", "Terraform", "Pulumi", "ArgoCD", "Datadog", "Grafana", "PagerDuty"],
    benefits: [
      "Deploys go from weekly to hourly",
      "Cloud bills reduced by 20–40%",
      "Incidents resolved in minutes, not hours",
      "Platform your engineers love operating",
    ],
    pricing: [
      { name: "Assessment", price: "$15K", description: "Two-week cloud and DevOps maturity review.", features: ["Architecture review", "FinOps audit", "Roadmap"] },
      { name: "Migration", price: "$95K+", description: "Cloud migration or modernization project.", features: ["IaC", "CI/CD", "Observability", "Cutover plan"], highlighted: true },
      { name: "Platform Team", price: "Custom", description: "Embedded platform engineering squad.", features: ["Dedicated SREs", "On-call coverage", "Quarterly reviews"] },
    ],
    faq: [
      { q: "Do you support multi-cloud?", a: "Yes, but we'll honestly tell you when it's not worth the complexity." },
      { q: "What about regulated workloads?", a: "We have experience with HIPAA, SOC 2, PCI, and FedRAMP environments." },
      { q: "Can you co-build with our team?", a: "Yes — embedded engagements are our preferred mode for platform work." },
    ],
  },
];

export const getService = (slug: ServiceSlug) => services.find((s) => s.slug === slug)!;
