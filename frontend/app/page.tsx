import Image from 'next/image'
import Link from 'next/link'
import QRGenerator from '@/components/qr-generator'
import { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { getPostMetadata } from '@/lib/mdx'
import FAQ from '@/components/FAQ'
import CTASection from '@/components/CTASection'

export const metadata: Metadata = {
  title: 'QR Code Generator | Create, Customize & Track QR Codes',
  description: 'Create professional QR codes for free. Generate, customize, and track QR codes easily. Perfect for business, marketing, or personal use.',
  openGraph: {
    title: 'QR Code Generator | Create, Customize & Track QR Codes',
    description: 'Create professional QR codes for free. Generate, customize, and track QR codes with our easy-to-use QR code generator.',
  },
}

const jsonLdData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'QR Small - QR Code Generator',
  description: 'Create professional QR codes for free. Generate, customize, and track QR codes with our easy-to-use QR code generator.',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD'
  },
  featureList: [
    'QR Code Generation',
    'Custom Styling',
    'Tracking & Analytics',
    'Dynamic QR Codes'
  ]
}

const faqJsonLdData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a QR code?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A QR code (Quick Response code) is a type of two-dimensional barcode that can store various types of data such as URLs, text, contact information, and more. When scanned with a smartphone camera, it quickly connects users to websites, displays information, or performs specific actions.'
      }
    },
    {
      '@type': 'Question',
      name: 'How can I create a QR code for my business?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Creating a QR code for your business is simple with our generator. Just enter the content (URL, text, contact details, etc.), customize the design if desired, preview it, and download in your preferred format. For business use, consider using dynamic QR codes to track performance metrics.'
      }
    },
    {
      '@type': 'Question',
      name: 'What\'s the difference between static and dynamic QR codes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Static QR codes contain fixed information that cannot be changed after creation. Dynamic QR codes allow you to modify the destination content without changing the physical QR code, making them ideal for marketing campaigns, menus, or any content that may need updating.'
      }
    },
    {
      '@type': 'Question',
      name: 'How can I track QR code scans?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Dynamic QR codes include tracking capabilities that allow you to monitor the number of scans, location of scans, devices used, and other valuable metrics. This data helps you understand user engagement and measure the success of your QR code campaigns.'
      }
    }
  ]
}

async function getRandomPosts(count: number = 3) {
  const posts = await getPostMetadata()
  const shuffled = posts.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

export default async function Home() {
  const randomPosts = await getRandomPosts()

  return (
    <div className="min-h-screen flex flex-col">
      <JsonLd data={jsonLdData} />
      <JsonLd data={faqJsonLdData} />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-slate-800 mb-4">Create Your QR Code</h1>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                Generate professional QR codes instantly with our free QR code generator. Create standard, tracking, or dynamic QR codes with custom styling. Perfect for businesses, marketing campaigns, and personal use.
              </p>
            </div>

            <div className="mb-12" id="generator">
              <QRGenerator />
            </div>

            <section className="mt-16 grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-slate-800 mb-3">Easy to Use</h2>
                <p className="text-slate-600">Create QR codes in seconds with our intuitive interface. No technical skills required.</p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-slate-800 mb-3">Customizable</h2>
                <p className="text-slate-600">Customize colors, add logos, and choose from multiple QR code styles to match your brand.</p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-slate-800 mb-3">Track & Analyze</h2>
                <p className="text-slate-600">Monitor QR code scans and gather valuable insights about your audience engagement.</p>
              </div>
            </section>

            {/* QR Code Types Section */}
            <section className="mt-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-800 mb-4">QR Code Types for Every Need</h2>
                <p className="text-slate-600 max-w-3xl mx-auto">
                  Our QR code generator supports multiple types of QR codes to help you connect with your audience in different ways.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">URL QR Codes</h3>
                  <p className="text-slate-600 mb-4">
                    Link directly to your website, landing page, or any online content. Perfect for marketing materials, business cards, and product packaging.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">vCard QR Codes</h3>
                  <p className="text-slate-600 mb-4">
                    Share contact information instantly. Recipients can save your details directly to their phone contacts with a simple scan.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">Dynamic QR Codes</h3>
                  <p className="text-slate-600 mb-4">
                    Update your QR code's destination without reprinting. Perfect for menus, marketing campaigns, and materials that need regular updates.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">Tracking QR Codes</h3>
                  <p className="text-slate-600 mb-4">
                    Monitor scan analytics including number of scans, location, device type, and time. Ideal for measuring campaign effectiveness.
                  </p>
                </div>
              </div>
            </section>

            {/* Use Cases Section */}
            <section className="mt-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-800 mb-4">Popular QR Code Use Cases</h2>
                <p className="text-slate-600 max-w-3xl mx-auto">
                  QR codes are versatile tools that can enhance customer experience and streamline operations across industries.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">Restaurants & Cafes</h3>
                  <ul className="text-slate-600 space-y-2">
                    <li>• Digital menus accessible via QR</li>
                    <li>• Contactless ordering systems</li>
                    <li>• Customer feedback collection</li>
                    <li>• Loyalty program registration</li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">Retail & E-commerce</h3>
                  <ul className="text-slate-600 space-y-2">
                    <li>• Product information and authenticity</li>
                    <li>• In-store to online shopping experiences</li>
                    <li>• Warranty registration</li>
                    <li>• Easy reordering via product QR codes</li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">Marketing & Events</h3>
                  <ul className="text-slate-600 space-y-2">
                    <li>• Event registration and ticket validation</li>
                    <li>• Interactive print advertising</li>
                    <li>• Location-based promotions</li>
                    <li>• Contest and giveaway participation</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How-To Section */}
            <section className="mt-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-800 mb-4">How to Create Effective QR Codes</h2>
                <p className="text-slate-600 max-w-3xl mx-auto">
                  Follow these best practices to ensure your QR codes are effective and deliver maximum value.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <ol className="space-y-6">
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-semibold">1</div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">Define Your QR Code Purpose</h3>
                      <p className="text-slate-600">Determine exactly what action you want users to take after scanning. Whether it's visiting your website, viewing a menu, or joining your mailing list, a clear purpose ensures effective implementation.</p>
                    </div>
                  </li>
                  
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-semibold">2</div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">Choose the Right QR Code Type</h3>
                      <p className="text-slate-600">Select between static or dynamic QR codes based on your needs. Static codes are permanent, while dynamic codes can be edited after creation, making them ideal for content that changes regularly.</p>
                    </div>
                  </li>
                  
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-semibold">3</div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">Optimize Your Landing Page</h3>
                      <p className="text-slate-600">Ensure the destination is mobile-friendly and loads quickly. Users scanning QR codes are typically on mobile devices, so the experience should be seamless on smaller screens.</p>
                    </div>
                  </li>
                  
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-semibold">4</div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">Test Before Deployment</h3>
                      <p className="text-slate-600">Scan your QR code with multiple devices to verify it works properly. Testing helps avoid frustrating experiences for users who might not try again if the code doesn't work the first time.</p>
                    </div>
                  </li>
                </ol>
              </div>
            </section>

            {/* Blog Section */}
            <section className="mt-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-800 mb-4">Latest QR Code Insights</h2>
                <p className="text-slate-600 max-w-3xl mx-auto">
                  Explore our latest articles and guides about QR codes, their applications, and best practices.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {randomPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden hover:border-emerald-400"
                  >
                    {post.image && (
                      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-xl font-bold mb-2 text-slate-800 group-hover:text-emerald-700 transition-colors">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </time>
                        <span>•</span>
                        <span>{post.readTime} min read</span>
                      </div>
                      <p className="text-slate-600 mb-4 line-clamp-3 flex-1">{post.excerpt}</p>
                      <div className="mt-auto flex items-center gap-2 text-emerald-700 font-semibold group-hover:underline">
                        <span>Read Article</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="text-center mt-8">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold"
                >
                  View All Articles
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>
            </section>


            {/* FAQ Section */}
            <section className="mt-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-800 mb-4">Frequently Asked Questions</h2>
                <p className="text-slate-600 max-w-3xl mx-auto">
                  Everything you need to know about QR code generation and implementation.
                </p>
              </div>
              
              <FAQ faqs={[
                {
                  question: "What is a QR code?",
                  answer: "A QR code (Quick Response code) is a type of two-dimensional barcode that can store various types of data such as URLs, text, contact information, and more. When scanned with a smartphone camera, it quickly connects users to websites, displays information, or performs specific actions."
                },
                {
                  question: "How can I create a QR code for my business?",
                  answer: "Creating a QR code for your business is simple with our generator. Just enter the content (URL, text, contact details, etc.), customize the design if desired, preview it, and download in your preferred format. For business use, consider using dynamic QR codes to track performance metrics."
                },
                {
                  question: "What's the difference between static and dynamic QR codes?",
                  answer: "Static QR codes contain fixed information that cannot be changed after creation. Dynamic QR codes allow you to modify the destination content without changing the physical QR code, making them ideal for marketing campaigns, menus, or any content that may need updating."
                },
                {
                  question: "How can I track QR code scans?",
                  answer: "Dynamic QR codes include tracking capabilities that allow you to monitor the number of scans, location of scans, devices used, and other valuable metrics. This data helps you understand user engagement and measure the success of your QR code campaigns."
                }
              ]} />
            </section>

            {/* CTA Section */}
            <CTASection />

           

            
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">© {new Date().getFullYear()} QR Small. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-slate-500 text-sm hover:text-emerald-600 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-slate-500 text-sm hover:text-emerald-600 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
