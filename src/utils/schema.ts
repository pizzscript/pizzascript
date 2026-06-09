/**
 * Structured Data (JSON-LD) Generators for PizzaScript
 * Follows Schema.org standards to optimize search appearance (rich snippets).
 */

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "PizzaScript",
    "image": "https://pizzascript.dev/assets/images/og_preview.png",
    "@id": "https://pizzascript.dev/#organization",
    "url": "https://pizzascript.dev",
    "telephone": "",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "",
      "addressLocality": "Pune",
      "addressRegion": "Maharashtra",
      "postalCode": "",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 18.5204,
      "longitude": 73.8567
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://github.com/pizzascript"
    ]
  };
}

export function getServiceSchema(name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "provider": {
      "@type": "ProfessionalService",
      "name": "PizzaScript",
      "url": "https://pizzascript.dev"
    },
    "url": url,
    "serviceType": "Web Development Service",
    "areaServed": {
      "@type": "Country",
      "name": "Global"
    }
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}
