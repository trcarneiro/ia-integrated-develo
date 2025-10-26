# Planning Guide

A professional service sales platform for Altus Stratus showcasing expertise in web scraping, AI integration, and system integrations. Designed to convert visitors into clients by demonstrating technical capabilities and providing clear pathways to hire.

**Experience Qualities**:
1. **Professional & Trustworthy** - Clean, modern design that inspires confidence in technical expertise and business reliability
2. **Results-Focused** - Every element emphasizes solutions, outcomes, and value delivered to clients
3. **Action-Oriented** - Clear CTAs and contact options throughout to facilitate sales conversations

**Complexity Level**: Light Application (multiple features with basic state)
- Service showcase with contact forms, project portfolio, and testimonials focused on lead generation and client acquisition

## Essential Features

### Hero Section with Clear Value Proposition
- **Functionality**: Compelling headline, tagline focused on client outcomes, and immediate contact CTA
- **Purpose**: Instantly communicate what services are offered and why visitors should hire
- **Trigger**: Page load
- **Progression**: Page loads → Hero text appears → Value prop highlighted → Primary CTA visible → Click to contact
- **Success criteria**: Clear understanding of services within 3 seconds, obvious next action

### Services Showcase
- **Functionality**: Three main service cards - Web Scraping, AI Integration, System Integrations with descriptions and pricing indicators
- **Purpose**: Detail what's offered, technologies used, and typical use cases to attract qualified leads
- **Trigger**: Scroll to services section
- **Progression**: Scroll → Service cards appear → Hover for details → Click to see examples or contact
- **Success criteria**: Visitors understand service offerings and can envision their project

### Portfolio/Case Studies
- **Functionality**: Showcase real scraping projects, AI implementations, and integrations with results achieved
- **Purpose**: Build trust through proof of expertise and demonstrate capability to deliver
- **Trigger**: Scroll to portfolio section
- **Progression**: Scroll → Projects displayed → Click project → View details/tech stack/results → Contact about similar project
- **Success criteria**: Projects clearly demonstrate expertise relevant to target clients

### Contact Form with Lead Capture
- **Functionality**: Multi-step contact form capturing project type, budget range, timeline, and contact info
- **Purpose**: Qualify leads and gather project details to enable quick, informed responses
- **Trigger**: Click contact CTA or scroll to contact section
- **Progression**: Click contact → Select service type → Describe project → Provide timeline/budget → Submit → Confirmation with response timeframe
- **Success criteria**: Form submissions contain actionable information for sales follow-up

### Technology Stack Display
- **Functionality**: Visual showcase of tools and technologies used - Python, PHP, APIs, AI models, databases
- **Purpose**: Build credibility and help clients understand technical capabilities
- **Trigger**: Scroll to tech stack section
- **Progression**: Scroll → Tech icons appear → Hover for descriptions → Understand breadth of expertise
- **Success criteria**: Clients recognize relevant technologies and trust technical depth

### Testimonials/Social Proof
- **Functionality**: Client testimonials, project outcomes, and success metrics
- **Purpose**: Reduce purchase anxiety and build trust through third-party validation
- **Trigger**: Scroll to testimonials section
- **Progression**: Scroll → Testimonials displayed → Read success stories → Feel confident to hire
- **Success criteria**: Testimonials feel authentic and address common client concerns

## Edge Case Handling
- **No Projects to Display**: Show service offerings prominently with "Contact for Custom Solutions" CTA
- **Form Spam**: Implement basic validation and honeypot fields to reduce spam submissions
- **Mobile Contact Forms**: Use drawer/sheet component for better mobile UX
- **Slow Form Submission**: Show loading state and confirmation message
- **Budget Concerns**: Offer "Request Quote" option for those unsure about pricing
- **International Clients**: Display timezone and response time expectations

## Design Direction
The design should feel professional, modern, and trustworthy - think corporate tech company meets boutique development agency. Clean layouts with strategic use of color to highlight CTAs and guide visitors toward contact. The design should communicate "we can handle complex technical challenges" while remaining approachable.

## Color Selection
Professional palette with trust-building blues and action-driving accents

- **Primary Color**: Corporate Blue (oklch(0.50 0.15 250)) - Professional, trustworthy, tech-focused for primary actions
- **Secondary Colors**: 
  - Deep Navy (oklch(0.15 0.02 250)) - Sophisticated background for authority
  - Light Slate (oklch(0.95 0.01 250)) - Clean, readable foreground
- **Accent Color**: Action Orange (oklch(0.65 0.18 40)) - Energetic highlight for CTAs that drives conversions
- **Foreground/Background Pairings**:
  - Background (Deep Navy oklch(0.15 0.02 250)): Light text oklch(0.95 0.01 250) - Ratio 12.5:1 ✓
  - Card (oklch(0.20 0.02 250)): Light text oklch(0.95 0.01 250) - Ratio 10.2:1 ✓
  - Primary (Corporate Blue oklch(0.50 0.15 250)): White text oklch(1 0 0) - Ratio 5.8:1 ✓
  - Accent (Action Orange oklch(0.65 0.18 40)): Dark text oklch(0.15 0.02 250) - Ratio 8.5:1 ✓
  - Success Green (oklch(0.55 0.15 140)): White text oklch(1 0 0) - Ratio 5.2:1 ✓

## Font Selection
Professional, highly readable typefaces that work across devices and communicate technical competence - Inter for its clean geometric design and Roboto Mono for code/technical elements to emphasize precision.

- **Typographic Hierarchy**:
  - H1 (Main Headline): Inter Bold/48px/tight letter-spacing/-0.01em
  - H2 (Section Titles): Inter SemiBold/36px/normal letter-spacing
  - H3 (Service/Project Titles): Inter SemiBold/24px/normal letter-spacing
  - Body (Descriptions): Inter Regular/16px/relaxed line-height/1.6
  - CTA Buttons: Inter SemiBold/16px/uppercase/letter-spacing/0.05em
  - Small (Metadata/Labels): Inter Medium/14px/normal
  - Code/Tech: Roboto Mono Regular/14px/monospace

## Animations
Purposeful, professional animations that guide attention without distracting from content or sales messaging.

- **Purposeful Meaning**: Smooth fade-ins communicate polish; subtle hover effects invite interaction; form feedback provides reassurance
- **Hierarchy of Movement**: 
  1. CTA buttons (most prominent - hover scale, glow on primary actions)
  2. Service cards (medium - lift on hover, subtle shadows)
  3. Section reveals (subtle - fade and slide up on scroll)
  4. Form interactions (gentle - input focus states, success animations)

## Component Selection
- **Components**: 
  - Card (service offerings, project showcases with professional styling)
  - Button (prominent CTAs with clear hierarchy - primary/secondary/outline)
  - Form components (Input, Textarea, Select for contact/quote forms)
  - Badge (technology tags, service categories)
  - Dialog (project detail modals, contact form on mobile)
  - Tabs (switching between service types or project categories)
  - Accordion (FAQ section, service details)
  - Separator (clean section divisions)
  
- **Customizations**: 
  - Large, prominent CTA buttons with hover glow effects
  - Service cards with subtle shadows and hover lift
  - Form inputs with clear focus states and validation feedback
  - Success indicators for form submissions
  - Professional gradient overlays on hero section
  
- **States**: 
  - Buttons: Default (solid/outline), Hover (scale 1.02 + shadow), Active (scale 0.98), Disabled (opacity 0.5)
  - Cards: Default (subtle shadow), Hover (lift + shadow increase)
  - Inputs: Default (border), Focus (ring + accent color), Error (red border), Success (green indicator)
  - Forms: Empty, Filling, Validating, Success, Error
  
- **Icon Selection**: 
  - @phosphor-icons/react for consistency
  - ChartLineUp for growth/results
  - Robot for AI services
  - Database for scraping/data
  - GitBranch for integrations
  - CheckCircle for success states
  - EnvelopeSimple for contact
  - Phone for call-to-action
  - ArrowRight for navigation/CTAs
  
- **Spacing**: 
  - Container max-width: 1200px
  - Section padding: py-20 (generous but not excessive)
  - Card padding: p-6 to p-8
  - Gap between cards: gap-6
  - CTA spacing: prominent margins to draw attention
  - Consistent 8px grid system (Tailwind's 2/4/6/8/12/16 scale)
  
- **Mobile**: 
  - Mobile-first approach with touch-optimized CTAs
  - Single column layouts on mobile
  - Drawer for contact forms on small screens
  - Stack service cards vertically
  - Reduce font sizes proportionally (H1: 32px mobile vs 48px desktop)
  - Sticky mobile CTA button
  - Touch-friendly button sizes (minimum 44x44px)
