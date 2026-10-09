import { BarChart3, Boxes, BrainCircuit, Globe } from 'lucide-react'

export const projects = [
  {
    id: 'business-analytics-dashboard',
    icon: BarChart3,
    title: 'Business Analytics Dashboard',
    category: 'Data Analytics',
    type: 'Concept Project',
    summary: 'An interactive dashboard designed to organize and visualize business information.',
    description:
      'A concept dashboard built to help businesses monitor performance at a glance — pulling scattered spreadsheet data into a single, interactive view. The focus areas were data visualization, reporting, performance monitoring and interactive filtering, so decision-makers could answer "how are we doing this month" without waiting on a manual report.',
    technologies: ['Power BI', 'Excel', 'SQL'],
    highlights: [
      'Consolidated multiple data sources into one live dashboard',
      'Interactive filters for date range, region and product line',
      'Drill-down views from summary KPIs to transaction-level detail',
      'Automated refresh to remove manual reporting work',
    ],
    outcome: 'Demonstrated how a small business could replace weekly manual reporting with a self-serve dashboard, cutting reporting turnaround from days to minutes.',
  },
  {
    id: 'business-management-platform',
    icon: Boxes,
    title: 'Business Management Platform',
    category: 'Custom Software',
    type: 'Concept Project',
    summary: 'A centralized digital platform concept designed to simplify selected business processes.',
    description:
      'A concept platform exploring how a single web application could centralize the processes that usually get spread across spreadsheets, email threads and paper forms — customer records, task tracking, and basic reporting in one authenticated system.',
    technologies: ['Web Technologies', 'Database Systems'],
    highlights: [
      'Centralized customer and task records in one system',
      'Role-based access for different staff functions',
      'Structured data model designed for future reporting needs',
      'Built with scalability in mind for growing teams',
    ],
    outcome: 'Served as a proof of concept for how much operational overhead a lightweight internal tool could remove for a small growing team.',
  },
  {
    id: 'ai-support-assistant',
    icon: BrainCircuit,
    title: 'AI Support Assistant',
    category: 'Artificial Intelligence',
    type: 'Concept Project',
    summary: 'An intelligent assistant concept designed to support users by responding to common queries.',
    description:
      'An AI-powered assistant concept aimed at reducing first-line support load by answering common, repetitive questions automatically, while escalating anything it can\'t confidently handle to a human.',
    technologies: ['Python', 'AI Technologies'],
    highlights: [
      'Automated responses for frequently asked questions',
      'Clear handoff path to a human for complex queries',
      'Designed to plug into existing support channels',
      'Built with a focus on response accuracy over speed',
    ],
    outcome: 'Explored how much routine support volume a well-scoped assistant could absorb before a human needs to step in.',
  },
  {
    id: 'modern-business-website',
    icon: Globe,
    title: 'Modern Business Website',
    category: 'Web Development',
    type: 'Client Project',
    summary: 'A responsive website solution designed to help organizations establish a professional and effective digital presence.',
    description:
      'A responsive, professional website built for a client that needed a stronger digital presence — fast load times, mobile-first layout, and clear calls to action, without unnecessary complexity.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    highlights: [
      'Fully responsive across desktop, tablet and mobile',
      'Optimized page load performance',
      'Clear navigation and calls to action',
      'SEO-friendly page structure',
    ],
    outcome: 'Gave the client a professional online presence that better reflected their brand and made it easier for prospective customers to reach out.',
  },
]

export function getProjectById(id) {
  return projects.find((p) => p.id === id)
}
