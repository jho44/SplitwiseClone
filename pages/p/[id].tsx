// import React from "react"
// import { GetStaticProps } from "next"
// import Layout from "../components/Layout"
// import Post, { PostProps } from "../components/Post"

// export const getStaticProps: GetStaticProps = async () => {
//   const feed = [
//     {
//       id: "1",
//       title: "Prisma is the perfect ORM for Next.js",
//       content: "[Prisma](https://github.com/prisma/prisma) and Next.js go _great_ together!",
//       published: false,
//       author: {
//         name: "Nikolas Burk",
//         email: "burk@prisma.io",
//       },
//     },
//   ]
//   return {
//     props: { feed },
//     revalidate: 10
//   }
// }

// type Props = {
//   feed: PostProps[]
// }

// const Blog: React.FC<Props> = (props) => {
//   return (
//     <Layout>
//       <div className="page">
//         <h1>Public Feed</h1>
//         <main>
//           {props.feed.map((post) => (
//             <div key={post.id} className="post">
//               <Post post={post} />
//             </div>
//           ))}
//         </main>
//       </div>
//       <style jsx>{`
//         .post {
//           background: white;
//           transition: box-shadow 0.1s ease-in;
//         }

//         .post:hover {
//           box-shadow: 1px 1px 3px #aaa;
//         }

//         .post + .post {
//           margin-top: 2rem;
//         }
//       `}</style>
//     </Layout>
//   )
// }

// export default Blog

import React from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout";
import { PostProps } from "../../components/Post";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = {
    id: "1",
    title: "Prisma is the perfect ORM for Next.js",
    content:
      "[Prisma](https://github.com/prisma/prisma) and Next.js go _great_ together!",
    published: false,
    author: {
      name: "Nikolas Burk",
      email: "burk@prisma.io",
    },
  };
  return {
    props: post,
  };
};

const Post: React.FC<PostProps> = (props) => {
  let title = props.title;
  if (!props.published) {
    title = `${title} (Draft)`;
  }

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <p>By {props?.author?.name || "Unknown author"}</p>
        <ReactMarkdown children={props.content} />
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Post;
