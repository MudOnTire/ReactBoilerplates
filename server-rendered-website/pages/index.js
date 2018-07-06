import Link from 'next/link';
import Layout from '../components/Layout';

const PostLink = (props) => (
    <li>
        <Link as={`/p/${props.id}`} href={`/post?title=${props.title}`}>
            <a>{props.title}</a>
        </Link>
    </li>
);

export default () => (
    <Layout>
        <h1>My Blog</h1>
        <ul>
            <PostLink id="hello-nextjs" title="Hello Next.js" />
            <PostLink id="learn-nextjs" title="Next.js is awesome" />
            <PostLink id="deploy-nextjs" title="Deploy apps with Zeit" />
        </ul>
    </Layout>
);