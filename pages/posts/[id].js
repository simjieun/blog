import { getAllPostIds, getPostData } from '../../lib/posts'
// import Button from '../../components/Button'
import dynamic from 'next/dynamic'
import { MDXRemote } from 'next-mdx-remote'
import { useRouter } from 'next/router'
import CodeBlock from '@components/CodeBlock'
import Date from '@components/Date'
import { siteTitle } from 'pages/_document'

const Button = dynamic(() => import('@components/Button'), {
  loading: () => <div>Loading..</div>,
})

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({ params, preview }) {
  console.log(`>>>>>>>>>${preview}`)
  const postData = await getPostData(params.id)
  return {
    props: {
      postData,
    },
  }
}

const components = { Button, CodeBlock }

export default function Post({ postData, pathname }) {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }
  return (
    <>
      <Head>
        <title>{`${postData.title} - ${siteTitle}`}</title>
      </Head>
      <article>
        <h2>pathname: {pathname}</h2>
        {postData.title}
        <br />
        {postData.id}
        <br />
        <Date dateString={postData.date} />
        <br />
        {postData.contentHtml && (
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        )}
        {postData.mdxSource && (
          <MDXRemote {...postData.mdxSource} components={components} />
        )}
      </article>
    </>
  )
}
