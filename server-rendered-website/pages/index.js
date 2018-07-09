import Link from 'next/link';
import Layout from '../components/Layout';
import fetch from 'isomorphic-unfetch';

const Index = (props) => (
    <Layout>
        <h1>Marvel TV Shows</h1>
        <ul>
            {props.shows.map(({ show }) => {
                return (
                    <li key={show.id}>
                        <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
                            <a className="show-link">{show.name}</a>
                        </Link>
                    </li>
                );
            })}
        </ul>
        <style jsx>
        {`
            *{
                margin:0;
                padding:0;
            }
            h1,a{
                font-family:'Arial';
            }
            h1{
                margin-top:20px;
                background-color:#EF141F;
                color:#fff;
                font-size:50px;
                line-height:66px;
                text-transform: uppercase;
                text-align:center;
            }    
            ul{
                margin-top:20px;
                padding:20px;
                background-color:#000;
            }
            li{
                list-style:none;
                margin:5px 0;
            }
            a{
                text-decoration:none;
                color:#B4B5B4;
                font-size:24px;
            }
            a:hover{
                opacity:0.6;
            }
        `}
        </style>
    </Layout>
);

Index.getInitialProps = async function () {
    const res = await fetch('https://api.tvmaze.com/search/shows?q=marvel');
    const data = await res.json();
    console.log(`Show data fetched. Count: ${data.length}`);
    return {
        shows: data
    }
}

export default Index;