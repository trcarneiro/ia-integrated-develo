# Planning Guide

A cutting-edge personal portfolio website that uses AI to automatically fetch, analyze, and present GitHub projects with intelligent insights about technologies, architecture, and innovation level.

**Experience Qualities**:
1. **Futuristic** - Interface feels like it's from the future with glass morphism, smooth animations, and AI-powered features
2. **Intelligent** - AI automatically analyzes and categorizes projects, extracting meaningful insights without manual input
3. **Impressive** - Showcases technical expertise through both the projects displayed and the innovative implementation of the site itself

**Complexity Level**: Complex Application (advanced functionality, AI integration, real-time data fetching)
- This site demonstrates technical prowess through its own implementation, using AI to analyze GitHub repos, extract tech stacks, and generate intelligent summaries

## Essential Features

### AI-Powered GitHub Project Analysis
- **Functionality**: Fetches user's GitHub repositories and uses AI to analyze code, extract technologies used, identify project type, and generate intelligent descriptions
- **Purpose**: Automatically maintains an up-to-date portfolio without manual updates, showcasing AI integration expertise
- **Trigger**: Page load or manual refresh button
- **Progression**: Click refresh → Fetch GitHub repos → AI analyzes each project → Extract tech stack → Generate insights → Display in grid with glassmorphic cards
- **Success criteria**: Projects display with accurate tech identification, intelligent categorization, and compelling AI-generated highlights

### Interactive Project Showcase
- **Functionality**: Display projects in an ultra-modern grid with hover effects, tech badges, and expandable details
- **Purpose**: Present work in a visually stunning way that reflects modern development skills
- **Trigger**: User scrolls to projects section or hovers over project cards
- **Progression**: Scroll to section → Cards animate in → Hover on card → Glass effect intensifies → Click card → Expanded view with details → View on GitHub
- **Success criteria**: Smooth animations, clear hierarchy, instant understanding of each project's purpose and tech stack

### Professional Profile Header
- **Functionality**: Display profile with GitHub avatar, name, specialties (Python, PHP, AI Integration), and dynamic tagline
- **Purpose**: Immediately establish credibility and expertise focus
- **Trigger**: Page load
- **Progression**: Page loads → Avatar fades in → Name appears → Specialty badges animate → Tagline types out
- **Success criteria**: Professional first impression, clear value proposition, links to GitHub profile

### Technology Expertise Visualization
- **Functionality**: Visual representation of skills based on actual GitHub usage patterns
- **Purpose**: Provide evidence-based skill showcase rather than self-rated bars
- **Trigger**: Scroll to skills section
- **Progression**: Scroll into view → AI analyzes repo languages → Generate tech frequency → Animate skill indicators → Show primary technologies
- **Success criteria**: Accurate representation of actual tech usage, visually compelling display

## Edge Case Handling
- **No GitHub Projects**: Show sample projects with clear "Connect GitHub" call-to-action
- **AI API Failure**: Gracefully fall back to basic repo data without AI insights, show retry option
- **Rate Limiting**: Cache results in KV store, show cached data with timestamp
- **Large Repo Count**: Filter to most recent/starred repos, allow pagination or "show more"
- **Private Repos**: Only display public repos with clear indicator of additional private work

## Design Direction
The design should feel like a glimpse into the future of web development - think Apple's design language meets sci-fi interfaces with AI integration throughout. Glass morphism, smooth physics-based animations, and subtle gradients create an elegant yet cutting-edge atmosphere that demonstrates mastery of modern web technologies.

## Color Selection
Custom palette with dark, futuristic theme using vibrant accent colors

- **Primary Color**: Deep Electric Blue (oklch(0.45 0.25 250)) - Commands attention for primary actions and communicates technology/innovation
- **Secondary Colors**: 
  - Dark Slate (oklch(0.15 0.01 250)) - Sophisticated background that makes content pop
  - Midnight Blue (oklch(0.20 0.02 250)) - Card backgrounds with depth
- **Accent Color**: Vibrant Cyan (oklch(0.75 0.20 200)) - High-tech highlight for CTAs and interactive elements
- **Foreground/Background Pairings**:
  - Background (Dark Slate oklch(0.15 0.01 250)): Light text oklch(0.95 0.01 250) - Ratio 12.8:1 ✓
  - Card (Midnight Blue oklch(0.20 0.02 250)): Light text oklch(0.95 0.01 250) - Ratio 10.5:1 ✓
  - Primary (Electric Blue oklch(0.45 0.25 250)): White text oklch(1 0 0) - Ratio 5.2:1 ✓
  - Accent (Vibrant Cyan oklch(0.75 0.20 200)): Dark text oklch(0.15 0.01 250) - Ratio 11.2:1 ✓
  - Muted (oklch(0.25 0.01 250)): Muted text oklch(0.60 0.05 250) - Ratio 4.8:1 ✓

## Font Selection
A modern, tech-forward typeface that balances readability with personality - Inter for its geometric precision and excellent screen rendering, paired with JetBrains Mono for code elements to emphasize technical expertise.

- **Typographic Hierarchy**:
  - H1 (Name/Hero): Inter Bold/56px/tight letter-spacing/-0.02em
  - H2 (Section Headers): Inter SemiBold/36px/normal letter-spacing
  - H3 (Project Titles): Inter SemiBold/24px/normal letter-spacing
  - Body (Descriptions): Inter Regular/16px/relaxed line-height/1.6
  - Small (Metadata): Inter Medium/14px/normal letter-spacing
  - Code (Tech Stack): JetBrains Mono Regular/14px/monospace feel

## Animations
Animations should feel physics-based and responsive, creating the impression of a living, intelligent interface that responds naturally to user interaction while guiding attention to AI-powered features.

- **Purposeful Meaning**: Smooth, elastic transitions communicate the fluidity of AI analysis; glow effects pulse subtly to indicate "thinking"; cards float and tilt on hover to feel tangible
- **Hierarchy of Movement**: 
  1. AI analysis indicators (most prominent - pulsing, glowing)
  2. Project card interactions (medium - 3D transforms, glass effects)
  3. Section transitions (subtle - fade and slide)
  4. Micro-interactions (delicate - icon animations, badge appearances)

## Component Selection
- **Components**: 
  - Card (project displays with heavy customization for glass morphism and 3D transforms)
  - Badge (tech stack tags with gradient backgrounds)
  - Button (CTA elements with hover glow effects)
  - Skeleton (loading states during AI analysis)
  - Scroll Area (for project lists if extensive)
  - Avatar (GitHub profile image with border effects)
  - Separator (subtle dividers with gradient)
  
- **Customizations**: 
  - Glass morphic cards with backdrop-blur and semi-transparent backgrounds
  - Gradient overlays on hover states
  - 3D transform effects on project cards (rotateX/rotateY on mouse position)
  - Custom AI "thinking" animation with pulsing gradient rings
  - Floating animation for hero elements
  
- **States**: 
  - Buttons: Default (gradient border), Hover (glow effect + scale 1.05), Active (scale 0.98), Loading (pulsing gradient)
  - Cards: Default (glass effect), Hover (intensified blur + lift + tilt), Active (pressed state)
  - Inputs: Focused (cyan glow ring), Filled (subtle success indicator)
  
- **Icon Selection**: 
  - @phosphor-icons/react throughout for consistency
  - GithubLogo for repo links
  - Sparkle for AI features
  - Code for tech stack
  - Lightning for performance/highlights
  - ArrowRight for CTAs
  - Brain for AI analysis indicator
  
- **Spacing**: 
  - Container max-width: 1280px
  - Section padding: py-24 (large breathing room)
  - Card padding: p-6 to p-8
  - Gap between cards: gap-6 on mobile, gap-8 on desktop
  - Consistent 4/8/16/24/32px rhythm (Tailwind's 1/2/4/6/8 scale)
  
- **Mobile**: 
  - Mobile-first with single column card layout
  - Stack hero content vertically on mobile
  - Reduce font sizes proportionally (Hero 36px mobile vs 56px desktop)
  - Simplify 3D effects on mobile (performance consideration)
  - Bottom sheet for project details on mobile vs modal on desktop
  - Touch-friendly button sizes (min 44x44px)
