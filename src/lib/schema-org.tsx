// Schema.org JSON-LD para Rich Snippets no Google
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Altostratus - Integração de Sistemas Legados com IA',
    description: 'Especialista em integração de sistemas legados com inteligência artificial, automação e modernização de software.',
    url: 'https://altostratus.com.br',
    logo: 'https://altostratus.com.br/logo.png',
    image: 'https://altostratus.com.br/og-image.png',
    telephone: '+55-31-99307-4190',
    email: 'contato@altostratus.com.br',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BR',
      addressRegion: 'MG',
      addressLocality: 'Belo Horizonte'
    },
    founder: {
      '@type': 'Person',
      name: 'Thiago Carneiro',
      jobTitle: 'Especialista em Integração de Sistemas',
      url: 'https://linkedin.com/in/thiagocarneiro'
    },
    sameAs: [
      'https://github.com/trcarneiro',
      'https://linkedin.com/in/thiagocarneiro'
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      ratingCount: '30',
      bestRating: '5',
      worstRating: '1'
    },
    priceRange: 'R$ 600 - R$ 4.500'
  }
}

export function generateServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Integração de Sistemas Legados com IA',
    provider: {
      '@type': 'ProfessionalService',
      name: 'Altostratus'
    },
    areaServed: {
      '@type': 'Country',
      name: 'Brasil'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Serviços de Integração',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Integração IA + Sistemas Legados',
            description: 'Conecte seus sistemas antigos (ERP, CRM) com APIs modernas de IA como GPT, automação e chatbots inteligentes.'
          },
          price: '2400',
          priceCurrency: 'BRL'
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Automação & Web Scraping',
            description: 'Robôs que fazem trabalho manual: extrair dados de sites, processar documentos, gerar relatórios automáticos.'
          },
          price: '1800',
          priceCurrency: 'BRL'
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Modernização de Sistemas',
            description: 'Sistema legado continua rodando mas ganha camada moderna de APIs, dashboards web e integrações cloud.'
          },
          price: '3200',
          priceCurrency: 'BRL'
        }
      ]
    }
  }
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}

export function generateArticleSchema({
  title,
  description,
  image,
  publishedDate,
  modifiedDate,
  author = 'Thiago Carneiro',
  url
}: {
  title: string
  description: string
  image: string
  publishedDate: string
  modifiedDate?: string
  author?: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: image,
    datePublished: publishedDate,
    dateModified: modifiedDate || publishedDate,
    author: {
      '@type': 'Person',
      name: author
    },
    publisher: {
      '@type': 'Organization',
      name: 'Altostratus',
      logo: {
        '@type': 'ImageObject',
        url: 'https://altostratus.com.br/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    }
  }
}

export function StructuredData({ schema }: { schema: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
