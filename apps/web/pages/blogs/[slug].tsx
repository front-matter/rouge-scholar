import { omit } from 'lodash'
import { GetStaticPaths } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { getAllBlogs } from 'pages/api/blogs'
import { getSingleBlog } from 'pages/api/blogs/[slug]'
import React from 'react'

import { Blog } from '../../components/Blog'
import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import { Posts } from '../../components/Posts'

export const getStaticPaths: GetStaticPaths = async () => {
  const blogs = await getAllBlogs()
  const paths = blogs.map((blog) => ({
    params: { slug: blog.id },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const blog = await getSingleBlog(params.slug)

  return {
    props: { blog: omit(blog, ['entries']), posts: blog.entries },
  }
}

type Props = {
  blog: any
  posts: any
}

const BlogPage: React.FunctionComponent<Props> = ({ blog, posts }) => {
  return (
    <>
      <Head>
        <title>{blog.title}</title>
        <meta name="og:title" content="Rogue Scholar - {data.title}" />
      </Head>
      <Header />
      <Blog blog={blog} />
      <Posts posts={posts} />
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <div className="my-5 lg:my-8">
          <Link
            href={blog.homePageUrl}
            target="_blank"
            className="mb-3 text-xl font-semibold text-gray-700 hover:text-gray-400 sm:text-xl"
          >
            More posts via the {blog.title} Home Page …
          </Link>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default BlogPage
