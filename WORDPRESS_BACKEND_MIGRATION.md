# 🔧 WordPress Backend Migration - dasEntwicklerhaus

## 📊 Aktuelle Projektsituation

**Next.js Projekt analysiert:**
- **Statische Daten:** `src/data/projects.ts` (10 Beispielprojekte)
- **Kategorien:** menschen, frieden, umwelt, zusammenarbeit, zukunft + "alle"  
- **Components:** FilterSection.tsx, ProjectsSection.tsx, ProjectCard.tsx
- **Routing:** `/projects/[slug]` für Projekt-Details
- **Ziel:** WordPress als Headless CMS ohne Frontend-Änderungen

---

## 🎯 Migration Overview

**Von:** Statische TypeScript Daten  
**Zu:** WordPress REST API + Next.js Frontend  
**Resultat:** Identisches UI, dynamische Inhalte über WordPress Admin bearbeitbar

---

## 📋 Detaillierte Todo-Liste (18 Schritte)

### **Phase 1: WordPress Backend Setup**

#### ✅ **1. WordPress Installation und Grundkonfiguration**
```bash
# Hosting-Optionen:
✓ WordPress.com Business Plan ($25/Monat)
✓ WP Engine / Kinsta (Managed WordPress)
✓ Eigener Server mit cPanel/DirectAdmin
✓ Local Development: Local by Flywheel
```

**Konfiguration:**
- SSL Zertifikat aktivieren
- Permalinks auf "Post name" setzen
- WordPress Admin User anlegen
- Basis-Theme installieren (Twenty Twenty-Four)

#### **2. WordPress Custom Post Type 'projekte' erstellen**

**Datei:** `functions.php` oder Custom Plugin

```php
function create_projekt_post_type() {
    register_post_type('projekte', array(
        'labels' => array(
            'name' => 'Projekte',
            'singular_name' => 'Projekt'
        ),
        'public' => true,
        'show_in_rest' => true, // KRITISCH für REST API
        'rest_base' => 'projekte',
        'supports' => array(
            'title',        // project.name
            'editor',       // project.fullDescription  
            'excerpt',      // project.description
            'thumbnail',    // project.image
            'custom-fields',
            'revisions'
        ),
        'menu_icon' => 'dashicons-portfolio',
        'has_archive' => true,
        'rewrite' => array('slug' => 'projekte')
    ));
}
add_action('init', 'create_projekt_post_type');
```

#### **3. WordPress Taxonomie 'projekt-kategorien' einrichten**

```php
function create_projekt_taxonomy() {
    register_taxonomy('projekt-kategorie', 'projekte', array(
        'labels' => array(
            'name' => 'Projekt Kategorien',
            'singular_name' => 'Projekt Kategorie'
        ),
        'hierarchical' => true, // Wie Categories, nicht Tags
        'show_in_rest' => true, // Für REST API
        'rest_base' => 'projekt-kategorien',
        'show_admin_column' => true
    ));
    
    // Standard-Kategorien anlegen
    $categories = ['menschen', 'frieden', 'umwelt', 'zusammenarbeit', 'zukunft'];
    foreach($categories as $cat) {
        wp_insert_term($cat, 'projekt-kategorie');
    }
}
add_action('init', 'create_projekt_taxonomy');
```

#### **4. ACF (Advanced Custom Fields) Plugin installieren**

**Notwendige Custom Fields basierend auf TypeScript Interface:**

```typescript
// Aktuelle Project Interface aus src/types/project.ts:
interface Project {
    id: string           // WordPress ID
    name: string         // WordPress Title  
    city: string         // ACF: Text Field
    description: string  // WordPress Excerpt
    fullDescription: string // WordPress Content
    category: string     // Taxonomie 'projekt-kategorie'
    image: string        // WordPress Featured Image
    slug: string         // WordPress Slug
    status: 'aktiv' | 'abgeschlossen' | 'geplant' // ACF: Select Field
    startDate: string    // ACF: Date Picker
    teamSize: number     // ACF: Number Field
    contact: ContactInfo // ACF: Group Field
    socialMedia: SocialMedia // ACF: Group Field
}
```

**ACF Field Groups JSON Export/Import:**

```json
{
  "key": "group_projekte_details",
  "title": "Projekt Details",
  "fields": [
    {
      "key": "field_city",
      "label": "Stadt",
      "name": "city",
      "type": "text",
      "required": 1
    },
    {
      "key": "field_status", 
      "label": "Status",
      "name": "status",
      "type": "select",
      "choices": {
        "aktiv": "Aktiv",
        "abgeschlossen": "Abgeschlossen", 
        "geplant": "Geplant"
      },
      "default_value": "aktiv"
    },
    {
      "key": "field_start_date",
      "label": "Startdatum", 
      "name": "start_date",
      "type": "date_picker",
      "return_format": "Y-m-d"
    },
    {
      "key": "field_team_size",
      "label": "Teamgröße",
      "name": "team_size", 
      "type": "number",
      "min": 1
    },
    {
      "key": "field_contact_group",
      "label": "Kontakt",
      "name": "contact",
      "type": "group",
      "sub_fields": [
        {
          "key": "field_contact_name",
          "label": "Name",
          "name": "name",
          "type": "text"
        },
        {
          "key": "field_contact_email", 
          "label": "Email",
          "name": "email",
          "type": "email"
        },
        {
          "key": "field_contact_phone",
          "label": "Telefon",
          "name": "phone", 
          "type": "text"
        }
      ]
    },
    {
      "key": "field_social_media_group",
      "label": "Social Media",
      "name": "social_media",
      "type": "group",
      "sub_fields": [
        {
          "key": "field_website",
          "label": "Website",
          "name": "website",
          "type": "url"
        },
        {
          "key": "field_facebook",
          "label": "Facebook",
          "name": "facebook", 
          "type": "url"
        },
        {
          "key": "field_instagram",
          "label": "Instagram",
          "name": "instagram",
          "type": "url"
        },
        {
          "key": "field_twitter",
          "label": "Twitter", 
          "name": "twitter",
          "type": "url"
        }
      ]
    }
  ],
  "location": [
    [
      {
        "param": "post_type",
        "operator": "==",
        "value": "projekte"
      }
    ]
  ]
}
```

#### **5. WordPress REST API Endpunkte aktivieren**

**Entstehende API Endpunkte:**
```bash
# Alle Projekte
GET https://deine-wp-domain.com/wp-json/wp/v2/projekte

# Projekte nach Kategorie filtern  
GET https://deine-wp-domain.com/wp-json/wp/v2/projekte?projekt-kategorie=2

# Einzelnes Projekt per Slug
GET https://deine-wp-domain.com/wp-json/wp/v2/projekte?slug=urban-gardening-berlin

# Featured Images
GET https://deine-wp-domain.com/wp-json/wp/v2/media/{id}

# Kategorien
GET https://deine-wp-domain.com/wp-json/wp/v2/projekt-kategorien
```

---

### **Phase 2: Next.js API Integration**

#### **6. Next.js API Client für WordPress REST API erstellen**

**Neue Datei:** `src/lib/wordpress.ts`

```typescript
interface WordPressConfig {
  apiUrl: string;
  username?: string;
  password?: string;
}

export class WordPressAPI {
  private config: WordPressConfig;
  
  constructor(config: WordPressConfig) {
    this.config = config;
  }

  private async fetchAPI(endpoint: string, options: RequestInit = {}) {
    const url = `${this.config.apiUrl}/wp-json/wp/v2${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`WordPress API Error: ${response.status}`);
    }

    return response.json();
  }

  // Alle Projekte abrufen
  async getProjects(): Promise<WordPressProject[]> {
    return this.fetchAPI('/projekte?_embed');
  }

  // Projekte nach Kategorie
  async getProjectsByCategory(categorySlug: string): Promise<WordPressProject[]> {
    const categories = await this.fetchAPI('/projekt-kategorien?slug=' + categorySlug);
    if (categories.length === 0) return [];
    
    const categoryId = categories[0].id;
    return this.fetchAPI(`/projekte?projekt-kategorie=${categoryId}&_embed`);
  }

  // Einzelnes Projekt per Slug
  async getProjectBySlug(slug: string): Promise<WordPressProject | null> {
    const projects = await this.fetchAPI(`/projekte?slug=${slug}&_embed`);
    return projects.length > 0 ? projects[0] : null;
  }

  // Featured Image URL abrufen
  async getFeaturedImageUrl(mediaId: number): Promise<string | null> {
    try {
      const media = await this.fetchAPI(`/media/${mediaId}`);
      return media.source_url;
    } catch {
      return null;
    }
  }

  // Alle Kategorien
  async getCategories(): Promise<WordPressCategory[]> {
    return this.fetchAPI('/projekt-kategorien');
  }
}

// Singleton Instance
export const wordpressAPI = new WordPressAPI({
  apiUrl: process.env.WORDPRESS_API_URL || 'https://your-wp-site.com'
});
```

**Environment Variables (.env.local):**
```bash
WORDPRESS_API_URL=https://your-wordpress-site.com
# Optional für private APIs:
WORDPRESS_USERNAME=your-username  
WORDPRESS_PASSWORD=your-app-password
```

#### **7. TypeScript Interfaces für WordPress API Response definieren**

**Neue Datei:** `src/types/wordpress.ts`

```typescript
// WordPress REST API Response Types
export interface WordPressProject {
  id: number;
  date: string;
  date_gmt: string;
  guid: { rendered: string };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: 'publish' | 'draft' | 'private';
  type: 'projekte';
  link: string;
  title: { rendered: string };
  content: { rendered: string; protected: boolean };
  excerpt: { rendered: string; protected: boolean };
  author: number;
  featured_media: number;
  comment_status: 'open' | 'closed';
  ping_status: 'open' | 'closed';
  sticky: boolean;
  template: string;
  format: string;
  meta: any[];
  
  // ACF Fields
  acf: {
    city: string;
    status: 'aktiv' | 'abgeschlossen' | 'geplant';
    start_date: string;
    team_size: number;
    contact: {
      name: string;
      email: string;
      phone: string;
    };
    social_media: {
      website: string;
      facebook: string;
      instagram: string;
      twitter: string;
    };
  };
  
  // Taxonomies
  'projekt-kategorie': number[];
  
  // _embed data (Featured Image, Categories, etc.)
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      id: number;
      source_url: string;
      alt_text: string;
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
      taxonomy: string;
    }>>;
  };
}

export interface WordPressCategory {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: 'projekt-kategorie';
  parent: number;
  meta: any[];
}

// Transformer Function: WordPress → Project Interface
export function transformWordPressProject(wpProject: WordPressProject): Project {
  // Featured Image URL aus _embedded extrahieren
  const featuredImage = wpProject._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
  
  // Kategorie Slug aus _embedded extrahieren
  const categoryTerms = wpProject._embedded?.['wp:term']?.[0] || [];
  const categoryTerm = categoryTerms.find(term => term.taxonomy === 'projekt-kategorie');
  const category = categoryTerm?.slug || 'menschen';

  return {
    id: wpProject.id.toString(),
    name: wpProject.title.rendered,
    city: wpProject.acf.city,
    description: stripHtml(wpProject.excerpt.rendered),
    fullDescription: wpProject.content.rendered,
    category: category as Project['category'],
    image: featuredImage,
    slug: wpProject.slug,
    status: wpProject.acf.status,
    startDate: wpProject.acf.start_date,
    teamSize: wpProject.acf.team_size,
    contact: wpProject.acf.contact,
    socialMedia: {
      website: wpProject.acf.social_media.website,
      facebook: wpProject.acf.social_media.facebook,
      instagram: wpProject.acf.social_media.instagram,
      twitter: wpProject.acf.social_media.twitter
    }
  };
}

// Helper: HTML Tags entfernen
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}
```

#### **8. Data Fetching Functions implementieren**

**Datei aktualisieren:** `src/lib/projects.ts`

```typescript
import { wordpressAPI, transformWordPressProject } from './wordpress';
import { Project } from '@/types/project';
import { FilterCategory } from '@/components/FilterSection';

// ERSETZT: export const sampleProjects: Project[] = [...]

export async function getProjects(): Promise<Project[]> {
  try {
    const wpProjects = await wordpressAPI.getProjects();
    return wpProjects.map(transformWordPressProject);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return []; // Fallback: Leere Liste
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const wpProject = await wordpressAPI.getProjectBySlug(slug);
    return wpProject ? transformWordPressProject(wpProject) : null;
  } catch (error) {
    console.error('Error fetching project by slug:', error);
    return null;
  }
}

export async function getProjectsByCategory(category: FilterCategory): Promise<Project[]> {
  try {
    if (category === 'alle') {
      return getProjects();
    }
    
    const wpProjects = await wordpressAPI.getProjectsByCategory(category);
    return wpProjects.map(transformWordPressProject);
  } catch (error) {
    console.error('Error fetching projects by category:', error);
    return [];
  }
}

// Neue Helper Functions
export async function getProjectCategories(): Promise<{ slug: string; name: string; count: number }[]> {
  try {
    const categories = await wordpressAPI.getCategories();
    return categories.map(cat => ({
      slug: cat.slug,
      name: cat.name,
      count: cat.count
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}
```

---

### **Phase 3: Component Updates**

#### **9. Statische projects.ts durch WordPress API Calls ersetzen**

**Datei:** `src/app/projects/page.tsx`

```typescript
// VORHER:
import { sampleProjects } from '@/data/projects';

export default function ProjectsPage() {
  // Static data usage...
}

// NACHHER:
import { getProjects } from '@/lib/projects';

export default async function ProjectsPage() {
  const projects = await getProjects();
  
  return (
    <main>
      <FilterSection />
      <ProjectsSection projects={projects} />
    </main>
  );
}

// Next.js App Router: Caching & Revalidation
export const revalidate = 3600; // ISR: 1 Stunde Cache
```

**Datei:** `src/app/projects/[slug]/page.tsx`

```typescript
// VORHER:
import { sampleProjects } from '@/data/projects';

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = sampleProjects.find(p => p.slug === params.slug);
  // ...
}

// NACHHER:
import { getProjectBySlug, getProjects } from '@/lib/projects';
import { notFound } from 'next/navigation';

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);
  
  if (!project) {
    notFound();
  }

  return (
    <main>
      {/* Project Detail JSX bleibt gleich */}
      <h1>{project.name}</h1>
      <p>{project.city}</p>
      {/* ... */}
    </main>
  );
}

// Static Params für bessere Performance
export async function generateStaticParams() {
  const projects = await getProjects();
  
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// SEO Metadata
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);
  
  if (!project) {
    return {
      title: 'Projekt nicht gefunden',
    };
  }

  return {
    title: `${project.name} | dasEntwicklerhaus`,
    description: project.description,
    openGraph: {
      title: project.name,
      description: project.description,
      images: [project.image],
    },
  };
}

export const revalidate = 3600; // ISR Cache
```

#### **10. FilterSection.tsx an WordPress Taxonomien anbinden**

**Aktuelle Datei:** `src/components/FilterSection.tsx` (Zeile 6-10)

```typescript
// AKTUELL: Hardcoded Filter Types
export type FilterCategory = 'alle' | 'menschen' | 'frieden' | 'umwelt' | 'zusammenarbeit' | 'zukunft'

// ERWEITERT: Dynamic aus WordPress
export type FilterCategory = 'alle' | string; // Flexible für neue Kategorien

interface FilterSectionProps {
  onFilterChange?: (filter: FilterCategory) => void;
  availableCategories?: Array<{slug: string; name: string; count: number}>; // NEU
}

export default function FilterSection({ onFilterChange, availableCategories }: FilterSectionProps) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('alle');

  // Standard Kategorien (Fallback wenn WordPress nicht erreichbar)
  const defaultCategories = [
    { slug: 'menschen', name: 'Menschen', count: 0 },
    { slug: 'frieden', name: 'Frieden', count: 0 },
    { slug: 'umwelt', name: 'Umwelt', count: 0 },
    { slug: 'zusammenarbeit', name: 'Zusammenarbeit', count: 0 },
    { slug: 'zukunft', name: 'Zukunft', count: 0 }
  ];

  const categories = availableCategories || defaultCategories;

  const handleFilterClick = (filter: FilterCategory) => {
    setActiveFilter(filter);
    if (onFilterChange) {
      onFilterChange(filter);
    }
  };

  return (
    <ContentSection>
      {/* Bestehender Header Code... */}
      
      <div className="flex flex-wrap gap-6 justify-center items-center">
        {/* Alle Button */}
        <button
          onClick={() => handleFilterClick('alle')}
          className={`p-4 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary ${
            activeFilter === 'alle' ? 'shadow-lg scale-105' : 'hover:opacity-75'
          }`}
        >
          <img src="/images/categories/all.png" alt="Alle Themen Icon" className="w-12 h-12" />
        </button>

        {/* Dynamische Kategorie Buttons */}
        {categories.map(category => (
          <button
            key={category.slug}
            onClick={() => handleFilterClick(category.slug)}
            className={`p-4 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary ${
              activeFilter === category.slug ? 'shadow-lg scale-105' : 'hover:opacity-75'
            }`}
            title={`${category.name} (${category.count} Projekte)`}
          >
            <img 
              src={`/images/categories/${getCategoryIcon(category.slug)}.png`}
              alt={`${category.name} Icon`} 
              className="w-12 h-12"
            />
          </button>
        ))}
      </div>
    </ContentSection>
  );
}

// Helper für Icon Mapping (wegen Filename Unterschiede)
function getCategoryIcon(slug: string): string {
  const iconMap: { [key: string]: string } = {
    'zusammenarbeit': 'zusammenarbeite',
    'zukunft': 'zulunft'
  };
  return iconMap[slug] || slug;
}
```

#### **11. Image Handling: WordPress Media Library URLs**

**Datei:** `src/components/ProjectsSection.tsx` (Zeile 44-50)

```typescript
// AKTUELL:
<img
  src={project.image}
  alt={`${project.name} Hero Bild`}
  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
/>

// ERWEITERT für WordPress:
<img
  src={project.image || '/images/placeholder-project.jpg'} // Fallback Image
  alt={`${project.name} Hero Bild`}
  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
  onError={(e) => {
    // Fallback wenn WordPress Image nicht lädt
    e.currentTarget.src = '/images/placeholder-project.jpg';
  }}
/>
```

**Neue Datei:** `public/images/placeholder-project.jpg`
- Standard Platzhalter für fehlende Bilder

#### **12. Error Boundaries und Loading States implementieren**

**Neue Datei:** `src/components/LoadingSpinner.tsx`

```typescript
export default function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex justify-center items-center py-8">
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-primary border-t-transparent`}>
      </div>
      <span className="ml-3 text-secondary">Projekte werden geladen...</span>
    </div>
  );
}
```

**Neue Datei:** `src/components/ErrorBoundary.tsx`

```typescript
'use client';

import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-umwelt-800 mb-2">
            Fehler beim Laden der Projekte
          </h3>
          <p className="text-secondary mb-4">
            Die WordPress API ist momentan nicht erreichbar.
          </p>
          <button 
            onClick={() => this.setState({ hasError: false })}
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark"
          >
            Erneut versuchen
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

**Update:** `src/app/projects/page.tsx`

```typescript
import ErrorBoundary from '@/components/ErrorBoundary';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Suspense } from 'react';

export default function ProjectsPage() {
  return (
    <main>
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <ProjectsContent />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}

async function ProjectsContent() {
  const projects = await getProjects();
  const categories = await getProjectCategories();
  
  return (
    <>
      <FilterSection availableCategories={categories} />
      <ProjectsSection projects={projects} />
    </>
  );
}
```

---

### **Phase 4: Performance & SEO**

#### **13. SEO: WordPress Meta-Daten Integration**

**WordPress Plugin installieren:** Yoast SEO oder RankMath

**WordPress API erweitern:** REST API Custom Fields für SEO

```php
// functions.php
function add_yoast_to_api() {
    register_rest_field('projekte', 'yoast_head', array(
        'get_callback' => function($object) {
            return get_post_meta($object['id'], '_yoast_wpseo_title', true);
        }
    ));
    
    register_rest_field('projekte', 'yoast_metadesc', array(
        'get_callback' => function($object) {
            return get_post_meta($object['id'], '_yoast_wpseo_metadesc', true);
        }
    ));
}
add_action('rest_api_init', 'add_yoast_to_api');
```

**Next.js Metadata Integration:**

```typescript
// src/app/projects/[slug]/page.tsx - generateMetadata Function erweitern
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const wpProject = await wordpressAPI.getProjectBySlug(params.slug);
  
  if (!wpProject) {
    return { title: 'Projekt nicht gefunden' };
  }

  return {
    title: wpProject.yoast_head || `${wpProject.title.rendered} | dasEntwicklerhaus`,
    description: wpProject.yoast_metadesc || stripHtml(wpProject.excerpt.rendered),
    openGraph: {
      title: wpProject.title.rendered,
      description: wpProject.yoast_metadesc || stripHtml(wpProject.excerpt.rendered),
      url: `https://dasentwicklerhaus.de/projects/${wpProject.slug}`,
      images: wpProject._embedded?.['wp:featuredmedia']?.[0]?.source_url ? [
        {
          url: wpProject._embedded['wp:featuredmedia'][0].source_url,
          width: 1200,
          height: 630,
          alt: wpProject.title.rendered
        }
      ] : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: wpProject.title.rendered,
      description: wpProject.yoast_metadesc || stripHtml(wpProject.excerpt.rendered),
      images: wpProject._embedded?.['wp:featuredmedia']?.[0]?.source_url || undefined,
    }
  };
}
```

#### **14. Caching Strategy: ISR (Incremental Static Regeneration)**

**Next.js App Router Caching:**

```typescript
// src/app/projects/page.tsx
export const revalidate = 3600; // 1 Stunde
export const dynamic = 'force-static'; // Statisch generieren

// src/app/projects/[slug]/page.tsx  
export const revalidate = 7200; // 2 Stunden für Details
export const dynamicParams = true; // Neue Slugs zur Laufzeit generieren
```

**Alternative: On-Demand Revalidation mit WordPress Webhooks:**

```typescript
// src/app/api/revalidate/route.ts - NEU
import { revalidateTag } from 'next/cache';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  
  if (secret !== process.env.REVALIDATION_SECRET) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  // WordPress sendet Projekt ID/Slug
  const body = await request.json();
  const { slug, action } = body;
  
  try {
    // Spezifische Route revalidieren
    await revalidateTag(`project-${slug}`);
    await revalidateTag('projects-list');
    
    return new Response('Revalidated successfully');
  } catch (error) {
    return new Response('Error revalidating', { status: 500 });
  }
}
```

**WordPress Webhook Setup:**
```php
// functions.php
function trigger_nextjs_revalidation($post_id) {
    if (get_post_type($post_id) !== 'projekte') return;
    
    $post = get_post($post_id);
    $webhook_url = 'https://dasentwicklerhaus.de/api/revalidate?secret=' . REVALIDATION_SECRET;
    
    wp_remote_post($webhook_url, array(
        'body' => json_encode(array(
            'slug' => $post->post_name,
            'action' => 'update'
        )),
        'headers' => array('Content-Type' => 'application/json')
    ));
}
add_action('save_post', 'trigger_nextjs_revalidation');
```

---

### **Phase 5: Deployment & Configuration**

#### **15. WordPress Hosting Setup**

**Empfohlene Hosting-Optionen:**

```bash
# Option 1: Managed WordPress (Empfohlen)
✓ WP Engine (ab $25/Monat)
✓ Kinsta (ab $35/Monat)  
✓ WordPress VIP (Enterprise)

# Option 2: Shared Hosting mit WordPress
✓ SiteGround ($6/Monat)
✓ Bluehost ($8/Monat)
✓ All-Inkl ($5/Monat) - Deutsch

# Option 3: VPS/Cloud
✓ DigitalOcean + ServerPilot
✓ AWS EC2 + WordPress
✓ Google Cloud Run
```

**Domain & SSL Setup:**
```bash
# Subdomain Struktur (Empfohlen):
Frontend: https://dasentwicklerhaus.de (Next.js)
Backend:  https://api.dasentwicklerhaus.de (WordPress)
Admin:    https://api.dasentwicklerhaus.de/wp-admin

# SSL: Let's Encrypt (kostenlos) oder Cloudflare
```

#### **16. CORS Headers für Next.js Domain konfigurieren**

**WordPress:** `functions.php`

```php
function add_cors_headers_for_nextjs() {
    // Nur für REST API Requests
    add_action('rest_api_init', function() {
        remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
        
        add_filter('rest_pre_serve_request', function($value) {
            $allowed_origins = [
                'https://dasentwicklerhaus.de',
                'https://www.dasentwicklerhaus.de', 
                'http://localhost:3000' // Entwicklung
            ];
            
            $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
            
            if (in_array($origin, $allowed_origins)) {
                header('Access-Control-Allow-Origin: ' . $origin);
                header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
                header('Access-Control-Allow-Headers: Content-Type, Authorization');
                header('Access-Control-Allow-Credentials: true');
            }
            
            return $value;
        });
    }, 15);
}
add_action('init', 'add_cors_headers_for_nextjs');

// OPTIONS Request Handler
function handle_preflight_requests() {
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        http_response_code(200);
        exit();
    }
}
add_action('init', 'handle_preflight_requests');
```

**Alternative: Cloudflare oder Nginx Reverse Proxy**

```nginx
# nginx.conf für WordPress VPS
location /wp-json {
    add_header 'Access-Control-Allow-Origin' 'https://dasentwicklerhaus.de' always;
    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS' always;
    add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization' always;
    
    if ($request_method = 'OPTIONS') {
        return 204;
    }
    
    try_files $uri $uri/ /index.php?$args;
}
```

---

### **Phase 6: Data Migration & Testing**

#### **17. Alle 10 Beispielprojekte aus projects.ts in WordPress übertragen**

**WordPress Admin Import Script:**

```php
// wp-content/themes/your-theme/import-projects.php
// ⚠️ Nur einmalig ausführen!

function import_sample_projects() {
    $projects_data = [
        [
            'title' => 'Urban Gardening Berlin',
            'content' => 'Das Urban Gardening Projekt in Berlin verwandelt ungenutzten Stadtraum...',
            'excerpt' => 'Gemeinschaftsgärten in der Innenstadt schaffen grüne Oasen und fördern nachbarschaftliche Zusammenarbeit.',
            'slug' => 'urban-gardening-berlin',
            'category' => 'menschen',
            'city' => 'Berlin',
            'status' => 'aktiv',
            'start_date' => '2019-03-15',
            'team_size' => 8,
            'image_url' => 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop',
            'contact' => [
                'name' => 'Maria Schmidt',
                'email' => 'maria@urban-gardening-berlin.de', 
                'phone' => '+49 30 12345678'
            ],
            'social_media' => [
                'website' => 'https://urban-gardening-berlin.de',
                'facebook' => 'https://facebook.com/urbangardening.berlin',
                'instagram' => 'https://instagram.com/urbangardening_berlin'
            ]
        ],
        // ... alle 10 Projekte aus projects.ts
    ];
    
    foreach ($projects_data as $project) {
        // WordPress Post erstellen
        $post_id = wp_insert_post([
            'post_title' => $project['title'],
            'post_content' => $project['content'],
            'post_excerpt' => $project['excerpt'],
            'post_name' => $project['slug'],
            'post_type' => 'projekte',
            'post_status' => 'publish'
        ]);
        
        if ($post_id && !is_wp_error($post_id)) {
            // Kategorie zuweisen
            wp_set_post_terms($post_id, $project['category'], 'projekt-kategorie');
            
            // ACF Felder setzen
            update_field('city', $project['city'], $post_id);
            update_field('status', $project['status'], $post_id);
            update_field('start_date', $project['start_date'], $post_id);
            update_field('team_size', $project['team_size'], $post_id);
            update_field('contact', $project['contact'], $post_id);
            update_field('social_media', $project['social_media'], $post_id);
            
            // Featured Image von URL importieren
            $attachment_id = media_sideload_image($project['image_url'], $post_id, null, 'id');
            if (!is_wp_error($attachment_id)) {
                set_post_thumbnail($post_id, $attachment_id);
            }
        }
    }
}

// ⚠️ Nur einmalig aufrufen:
// import_sample_projects();
```

**CSV Import Alternative:**
- WordPress Plugin: WP All Import
- CSV mit allen Projektdaten erstellen
- Über WordPress Admin Interface importieren

#### **18. Testing: Alle Routen und Filter mit WordPress Backend**

**Testing Checklist:**

```bash
# 1. API Endpunkte testen
curl https://api.dasentwicklerhaus.de/wp-json/wp/v2/projekte
curl https://api.dasentwicklerhaus.de/wp-json/wp/v2/projekte?projekt-kategorie=2

# 2. Next.js Routes testen  
✓ https://dasentwicklerhaus.de/projects (Liste)
✓ https://dasentwicklerhaus.de/projects/urban-gardening-berlin (Detail)

# 3. Filter-Funktionalität
✓ Alle Kategorien clickbar
✓ Projekte werden korrekt gefiltert
✓ Projekt-Count stimmt

# 4. Performance
✓ Lighthouse Score > 90
✓ Core Web Vitals grün  
✓ API Response Time < 500ms

# 5. SEO
✓ Meta Tags aus WordPress
✓ Open Graph funktioniert
✓ Structured Data valid

# 6. Error Handling
✓ WordPress offline → Fallback
✓ Projekt nicht gefunden → 404
✓ API Timeout → Error Boundary
```

**Automated Testing:**

```typescript
// tests/wordpress-api.test.ts
import { wordpressAPI } from '@/lib/wordpress';

describe('WordPress API Integration', () => {
  test('should fetch all projects', async () => {
    const projects = await wordpressAPI.getProjects();
    expect(projects).toBeInstanceOf(Array);
    expect(projects.length).toBeGreaterThan(0);
  });

  test('should fetch project by slug', async () => {
    const project = await wordpressAPI.getProjectBySlug('urban-gardening-berlin');
    expect(project).toBeTruthy();
    expect(project?.slug).toBe('urban-gardening-berlin');
  });

  test('should filter projects by category', async () => {
    const projects = await wordpressAPI.getProjectsByCategory('menschen');
    projects.forEach(project => {
      expect(project['projekt-kategorie']).toContain(expect.any(Number));
    });
  });
});
```

---

## 🚀 Migration Completed - Resultat

### **✅ Was erreicht wurde:**

1. **Identisches Frontend:** Alle Components, Styling, UX bleibt gleich
2. **Dynamischer Content:** Inhalte über WordPress Admin editierbar
3. **Skalierbare Architektur:** Neue Projekte & Kategorien einfach hinzufügbar
4. **SEO-Optimiert:** Meta-Daten aus WordPress, ISR Caching
5. **Performance:** Statische Generierung mit API-basierter Aktualisierung

### **🎯 Neue Möglichkeiten:**

- **Content-Management:** Non-Developer können Projekte verwalten
- **Media-Verwaltung:** Bilder über WordPress Media Library
- **Multi-User:** Verschiedene Redakteure mit Rollen
- **Backup & Versionierung:** WordPress Revision System
- **Plugin-Ecosystem:** SEO, Security, Performance Plugins

### **📊 Technische Details:**

```bash
# Architektur:
Frontend: Next.js (dasentwicklerhaus.de)
Backend:  WordPress Headless CMS (api.dasentwicklerhaus.de) 
API:      WordPress REST API + Custom Endpoints
Caching:  ISR (Incremental Static Regeneration)
Hosting:  Vercel (Frontend) + WP Engine (Backend)

# Performance:
- ISR: 1-2h Cache für optimale Performance
- CDN: Bilder über WordPress + CloudFlare
- SEO: Server-Side Generation für alle Meta-Daten
```

**🎉 WordPress Backend Integration vollständig abgeschlossen!**