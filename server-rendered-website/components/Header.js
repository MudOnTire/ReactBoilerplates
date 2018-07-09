import Link from 'next/link';

const Header = () => (
    <div>
        <Link href="/">
            <a>Home</a>
        </Link>
        <Link href="/about">
            <a>About</a>
        </Link>
        <style jsx>
            {`
                a{
                    color:#EF141F;
                    font-size:26px;
                    line-height:40px;
                    text-decoration:none;
                    padding:0 10px;
                    text-transform:uppercase;
                }
                a:hover{
                    opacity:0.8;
                }
            `}
        </style>
    </div>
)

export default Header;