This is an e-commerce product listing web application built with [Next.js](https://nextjs.org/) and [Supabase](https://supabase.com/).

## Getting Started

First, clone the repository and install the packages:

```bash
git clone https://github.com/mmesomaokenwa/frontend-test.git
cd frontend-test
npm install
```

Next, create a `.env.local` file in the root of your directory and paste in the following environmental variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://mfgadjucjxcfjhuaebjq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mZ2FkanVjanhjZmpodWFlYmpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODg0OTQsImV4cCI6MjA0MDI2NDQ5NH0.8z3dDUVE_ADLP1TeHDnusFS5tWTiDF4vltu6HLQmxoQ

NEXT_PUBLIC_URL=https://frontend-test-chi-orpin.vercel.app
```

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Or run the production build on your local machine and start the production server:

```bash
npm run build
npm run start
# or
yarn build
yarn start
# or
pnpm build
pnpm start
# or
bun build
bun start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can also check out [the deployed version](https://frontend-test-chi-orpin.vercel.app/).

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Quicksand, a custom Google Font.

## Additional Packages Used

I did not know if I was limited to some particular packages. I tried contacting the hiring team on email but got no replies so I decided to only use packages that are necessary for storage, validation and optimazation:

- [`sharp`](https://sharp.pixelplumbing.com/) for image optimization.
- [`supabase`](https://supabase.com/) for the database and storage system for images.
- [`zod`](https://zod.dev/) for data validation.
- [`react-icons`](https://react-icons.github.io/) for icons.
- [`tailwindcss`](https://tailwindcss.com/) for styling.
- [`typescript`](https://www.typescriptlang.org/) for ensuring type safety.

## SEO Optimization Techniques Used

## Sitemap.xml and Robots.txt

I implemented a `sitemap.xml` and a `robots.txt` file in this project. These are two important files that can help search engines like Google understand the structure and content of your website.

A `sitemap.xml` is an XML file that contains a list of all the pages on your website. It helps search engines discover new pages and understand how your website is structured. It can also help improve the ranking of your website in search engine results.

A `robots.txt` file is a text file that contains a set of instructions that tell search engines which pages on your website they should not crawl. It can be used to prevent search engines from crawling certain pages or directories on your website.

In Next.js, you can easily create and configure a `sitemap.xml` and a `robots.txt` file by adding a `sitemap.ts` and `robots.ts` file in the `/app` directory.

Configuring it this way made it more scalable as every new product created is automatically added to the `sitemap.xml` file generated.

You can visit these files in the repository to understand better.

## Open Graph and Metadata

I implemented static metadata for the static pages like `/product/new` by simply exporting a `metadata` object from the `page.tsx` file.

I also implemented dynamic metadata for the dynamic pages like `/product/[productId]` and `/product/[productId]/edit` by exporting a `generateMetadata` function that returns an object.

I implemented the [Open Graph protocol](https://ogp.me/), which is a protocol for structuring content on web pages. It is important because it allows developers to control the information that is displayed when a user shares a link to their website on social media platforms like Facebook and Twitter.

## Accessibility

I made sure to use the right semantic HTML tags to make the application accessible to screen readers and keyboard users.

I used the `<dialog>` tag for modals instead of `<div>` tags as it is more accessible and semantic. For buttons and links without definitive texts, I used the `aria-label` attribute to provide a description of the element to screen readers. This way, users who rely on screen readers can still use the application without any issues.

I also made sure that all the interactive elements on the page are focusable by keyboard and that the tab order is logical and follows the order of the elements on the page. This makes it easy for users who rely on keyboard navigation to use the application.

I also made the forms progressively enhanced. This is important for users who choose to disable JavaScript in the browser. This way, they can interact with forms to an extent without JavaScript.

## Design Principles Used

I used the principle of [separation of concerns](https://en.wikipedia.org/wiki/Separation_of_concerns#:~:text=In%20computer%20science%2C%20separation%20of,code%20of%20a%20computer%20program) to organize the code in such a way that each component has a single responsibility. This made the development process more efficient and scalable.

I also used custom hooks to abstract away repeated client-side logic and make the code more reusable. For example, I created a custom hook for fetching categories from the API and another for debouncing a response to an input value change.

Using custom hooks allowed me to keep the code organized and easy to understand. It also makes it easier for other developers to understand and build upon the codebase.

## Performance Optimization Techniques Used

I used various performance optimization techniques to improve the performance of the application.

Firstly, I made sure that most of the components were server-side rendered. This ensured that the initial HTML payload sent to the client had all the content already rendered, which improved the page load time and the user experience. This also allowed for search engines to crawl the content of the website.

Secondly, I made sure to limit the amount of JavaScript that gets pushed to the client. This was achieved by using Next.js' built-in support for [server-side rendering](https://nextjs.org/docs/pages/building-your-application/rendering/server-side-rendering) and [static site generation](https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation). This allowed me to generate static HTML files for most of the pages, which reduced the amount of JavaScript that was sent to the client.

Thirdly, I used [Incremental Static Regeneration (ISR)](https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration) to implement caching of pages. This allowed me to determine how long the pages cache can be valid. For example, I could set a page to be cached for 30 minutes, so that if the page is requested again within that time, the cached version is returned instead of generating a new version.

Lastly, I used Next.js' built-in support for Static Site Generation (SSG) to generate static HTML files for most of the pages. This allowed me to take advantage of the benefits of SSG, such as faster page loads and better SEO.

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js which is what I did. You can check out the [deployed version](https://frontend-test-chi-orpin.vercel.app/).
