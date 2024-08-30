import { baseUrl } from "@/lib/constants"
import { ProductsResponse } from "@/lib/types"
import { MetadataRoute } from "next"

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const productsRes = await fetch(`${baseUrl}/api/products`)

  const { data: products } = await productsRes.json() as ProductsResponse

  const productsSitemap: MetadataRoute.Sitemap = products?.map(product => ({
    url: `${baseUrl}/product/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.7
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1
    },
    ...productsSitemap
  ]
}

export default sitemap