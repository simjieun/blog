import { useRef } from 'react'

// export async function getServerSideProps() {
//   return {}
// }

export default function Write() {
  const idRef = useRef(undefined)
  const titleRef = useRef(undefined)
  const contentRef = useRef(undefined)

  const handleSubmit = (event) => {
    event.preventDefault()

    const id = idRef.current.value
    const title = titleRef.current.value
    const content = contentRef.current.value

    if (id && title && content) {
      fetch('/api/post/write', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          title,
          content,
        }),
      })
        .then((response) => response.json())
        .then((data) => alert(data.message))
    }
  }
  return (
    <>
      <Head>
        <title>Write a post</title>
      </Head>
      <h1>Write a post</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="id" placeholder="id" required ref={idRef} />
        <br />
        <br />
        <input
          type="text"
          name="title"
          placeholder="title"
          required
          ref={titleRef}
        />
        <br />
        <br />
        <textarea
          type="text"
          name="content"
          placeholder="content"
          required
          ref={contentRef}
        />
        <br />
        <br />
        <input type="submit" value="Create" />
      </form>
    </>
  )
}

Write.getInitalProps = async () => {
  return {}
}
