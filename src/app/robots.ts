import { baseUrl } from "@/lib/constants"
import { MetadataRoute } from "next"

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/product'],
      disallow: '/api'
    },
    sitemap: `${baseUrl}/sitemap.xml`
  }
}

export default robots