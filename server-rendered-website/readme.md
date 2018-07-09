### next.js简介

最近在学React.js，React官方推荐使用next.js框架作为构建服务端渲染的网站，所以今天来研究一下next.js的使用。

next.js作为一款轻量级的应用框架，主要用于构建静态网站和后端渲染网站。

#### 框架特点
- 使用后端渲染
- 自动进行代码分割（code splitting），以获得更快的网页加载速度
- 简洁的前端路由实现
- 使用webpack进行构建，支持模块热更新（Hot Module Replacement）
- 可与主流Node服务器进行对接（如express）
- 可自定义babel和webpack的配置

### 使用方法

#### 创建项目并初始化

```
mkdir server-rendered-website
cd server-rendered-website
npm init -y
```


#### 安装next.js
使用npm或者yarn安装，因为是创建React应用，所以同时安装react和react-dom

###### npm：

```
npm install --save react react-dom next
```
###### yarn：

```
yarn add react react-dom next
```
在项目根目录下添加文件夹**pages**（一定要命名为pages，这是next的强制约定，不然会导致找不到页面），然后在package.json文件里面添加script用于启动项目：

```
"scripts": {
    "dev": "next"
}
```
如下图![image](https://note.youdao.com/yws/api/personal/file/WEB374296408d551291a1bc675316a3a784?method=download&shareKey=8effaf3e45fec7695f29e59f0df7fb5d)


#### 创建视图
在pages文件夹下创建index.js文件，文件内容：

```
const Index = () => (
  <div>
    <p>Hello next.js</p>
  </div>
)

export default Index
```

#### 运行

```
npm run next
```
在浏览器中打开[http://localhost:3000/](http://localhost:3000/)，网页显示如下：
![image](https://note.youdao.com/yws/api/personal/file/WEB34c7ecd6dc12787f484372bf64d71cc3?method=download&shareKey=1682886dc014a50d8dd1ddbeff56167f)

这样就完成了一个最简单的next网站。

### 前端路由
next.js前端路由的使用方式非常简单，我们先增加一个page，叫about，内容如下：

```
const About = () => (
    <div>
        <p>This is About page</p>
    </div>
)

export default About;
```
当我们在浏览器中请求[https://localhost:3000/about](https://localhost:3000/about)时，可以看到页面展示对应内容。（==这里需要注意：请求url的path必须和page的文件名大小写一致才能访问，如果访问localhost:3000/About的话是找不到about页面的。==）

我们可以使用传统的a标签在页面之间进行跳转，但每跳转一次，都需要去服务端请求一次。为了增加页面的访问速度，推荐使用next.js的前端路由机制进行跳转。

next.js使用next/link实现页面之间的跳转，用法如下：

```
import Link from 'next/link'

const Index = () => (
  <div>
    <Link href="/about">
      <a>About Page</a>
    </Link>
    <p>Hello next.js</p>
  </div>
)

export default Index
```

这样点击index页面的AboutPage链接就能跳转到about页面，而点击浏览器的返回按钮也是通过前端路由进行跳转的。 **官方文档说用前端路由跳转是不会有网络请求的，实际会有一个对about.js文件的请求，而这个请求来自于页面内动态插入的script标签。但是about.js只会请求一次，之后再访问是不会请求的，毕竟相同的script标签是不会重复插入的。** 但是想比于后端路由还是大大节省了请求次数和网络流量。前端路由和后端路由的请求对比如下：

###### 前端路由：
![image](https://note.youdao.com/yws/api/personal/file/WEB467d60a7ab50719dbb2419a6eb013172?method=download&shareKey=9660c243bea269af8691139a304d8afa)

###### 后端路由：

![image](https://note.youdao.com/yws/api/personal/file/WEB33f256db05de3b1601b6cbcb5f5a9a78?method=download&shareKey=ab269115fccfb3f7e50ca3b4cd9e4bd7)

**Link标签支持任意react组件作为其子元素，不一定要用a标签，只要该子元素能响应onClick事件**，就像下面这样：

```
<Link href="/about">
    <div>Go about page</div>
</Link>
```
**Link标签不支持添加style和className等属性，如果要给链接增加样式，需要在子元素上添加**：

```
<Link href="/about">
    <a className="about-link" style={{color:'#ff0000'}}>Go about page</a>
</Link>
```

### Layout
所谓的layout就是就是给不同的页面添加相同的header，footer，navbar等通用的部分，同时又不需要写重复的代码。在next.js中可以通过共享某些组件实现layout。

我们先增加一个公共的header组件，放在根目录的components文件夹下面（页面级的组件放pages中，公共组件放components中）：

```
import Link from 'next/link';

const linkStyle = {
    marginRight: 15
}

const Header = () => (
    <div>
        <Link href="/">
            <a style={linkStyle}>Home</a>
        </Link>
        <Link href="/about">
            <a style={linkStyle}>About</a>
        </Link>
    </div>
)

export default Header;
```

然后在index和about页面中引入header组件，这样就实现了公共的layout的header：

```
import Header from '../components/Header';

const Index = () => (
    <div>
        <Header />
        <p>Hello next.js</p>
    </div>
)

export default Index;

```
如果要增加footer也可以按照header的方法实现。
除了引入多个header、footer组件，我们可以实现一个整体的Layout组件，避免引入多个组件的麻烦，同样在components中添加一个Layout.js文件，内容如下：

```
import Header from './Header';

const layoutStyle = {
    margin: 20,
    padding: 20,
    border: '1px solid #DDD'
}

const Layout = (props) => (
    <div style={layoutStyle}>
        <Header />
        {props.children}
    </div>
)

export default Layout
```

这样我们只需要在页面中引入Layout组件就可以达到布局的目的：

```
import Layout from '../components/Layout';

const Index = () => (
    <Layout>
        <p>Hello next.js</p>
    </Layout>
)

export default Index;
```

### 页面间传值

#### 通过url参数（query string）

next中的页面间传值方式和传统网页一样也可以用url参数实现，我们来做一个简单的博客应用：

首先将index.js的内容替换成如下来展示博客列表：

```
import Link from 'next/link';
import Layout from '../components/Layout';

const PostLink = (props) => (
    <li>
        <Link href={`/post?title=${props.title}`}>
            <a>{props.title}</a>
        </Link>
    </li>
);

export default () => (
    <Layout>
        <h1>My Blog</h1>
        <ul>
            <PostLink title="Hello next.js" />
            <PostLink title="next.js is awesome" />
            <PostLink title="Deploy apps with Zeit" />
        </ul>
    </Layout>
);
```
通过在Link的href中添加`title`参数就可以实现传值。

现在我们再添加博客的详情页`post.js`：

```
import { withRouter } from 'next/router';
import Layout from '../components/Layout';

const Post = withRouter((props) => (
    <Layout>
        <h1>{props.router.query.title}</h1>
        <p>This is the blog post content.</p>
    </Layout>
));

export default Post;

```
上面代码通过withRouter将next的router作为一个prop注入到component中，实现对url参数的访问。

运行后显示如图：

###### 列表页

![image](https://note.youdao.com/yws/api/personal/file/WEBbe0f8a46d46c7ae2f7565bb3508935b4?method=download&shareKey=a213fae3c1b210cebe78cf26555ee4b2)

###### 点击进入详情页：

![image](https://note.youdao.com/yws/api/personal/file/WEB07ea2c7cea2b3fea487bf3ab8d0fd8bc?method=download&shareKey=f0dbbe146a90ba52ca9d47a7b58ce43c)

使用query string可以实现页面间的传值，但是会导致页面的url不太简洁美观，尤其当要传输的值多了之后。所以next.js提供了Route Masking这个特性用于路由的美化。

### 路由伪装（Route Masking）

这项特性的官方名字叫Route Masking，没有找到官方的中文名，所以就根据字面意思暂且翻译成路由伪装。所谓的路由伪装即让浏览器地址栏显示的url和页面实际访问的url不一样。实现路由伪装的方法也很简单，通过`Link`组件的`as`属性告诉浏览器href对应显示为什么url就可以了，index.js代码修改如下：

```
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
            <PostLink id="hello-nextjs" title="Hello next.js" />
            <PostLink id="learn-nextjs" title="next.js is awesome" />
            <PostLink id="deploy-nextjs" title="Deploy apps with Zeit" />
        </ul>
    </Layout>
);
```
运行结果：

![image](https://note.youdao.com/yws/api/personal/file/WEB5bd054c3cb5ebb4fc968d0cc45b63857?method=download&shareKey=67148a528b8ff768ab8011b30caa6448)

浏览器的url已经被如期修改了，这样看起来舒服多了。而且路由伪装对history也很友好，点击返回再前进还是能够正常打开详情页面。但是如果你刷新详情页，确报404的错误，如图：

![image](https://note.youdao.com/yws/api/personal/file/WEBeae036976447e8e537e83371fc1f888e?method=download&shareKey=486ef0784dac7f28205f6d88ced9261d)

这是因为刷新页面会直接向服务器请求这个url，而服务端并没有该url对应的页面，所以报错。为了解决这个问题，需要用到next.js提供的自定义服务接口（custom server API）。

### 自定义服务接口

自定义服务接口前我们需要创建服务器，安装Express:

```
npm install --save express
```

在项目根目录下创建server.js 文件，内容如下：

```
const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        const server = express();
        server.get('*', (req, res) => {
            return handle(req, res);
        });
        server.listen(3000, (err) => {
            if (err) throw err;
            console.log('> Ready on http://localhost:3000');
        });
    })
    .catch((ex) => {
        console.error(ex.stack);
        process.exit(1);
    });
```

然后将package.json里面的dev script改为：

```
"scripts": {
    "dev": "node server.js"
}
```

运行`npm run dev`后项目和之前一样可以运行，接下来我们需要添加路由将被伪装过的url和真实的url匹配起来，在server.js中添加：

```
......
const server = express();
server.get('/p/:id', (req, res) => {
    const actualPage = '/post';
    const queryParams = { title: req.params.id };
    app.render(req, res, actualPage, queryParams);
});
......
```
这样我们就把被伪装过的url和真实的url映射起来，并且query参数也进行了映射。重启项目之后就可以刷新详情页而不会报错了。但是有一个小问题，前端路由打开的页面和后端路由打开的页面title不一样，这是因为后端路由传过去的是id，而前端路由页面显示的是title。这个问题在实际项目中可以避免，因为在实际项目中我们一般会通过id获取到title，然后再展示。作为Demo我们偷个小懒，直接将id作为后端路由页面的title。

之前我们的展示数据都是静态的，接下来我们实现从远程服务获取数据并展示。

### 远程数据获取

next.js提供了一个标准的获取远程数据的接口:`getInitialProps`，通过`getInitialProps`我们可以获取到远程数据并赋值给页面的props。`getInitialProps`即可以用在服务端也可以用在前端。接下来我们写个小Demo展示它的用法。我们打算从[TVMaze API ](http://www.tvmaze.com/api)获取到一些电视节目的信息并展示到我的网站上。首先，我们安装[isomorphic-unfetch](https://github.com/developit/unfetch)，它是基于fetch实现的一个网络请求库：

```
npm install --save isomorphic-unfetch
```

然后我们修改index.js如下：

```
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
                            <a>{show.name}</a>
                        </Link>
                    </li>
                );
            })}
        </ul>
    </Layout>
);

Index.getInitialProps = async function () {
    const res = await fetch('https://api.tvmaze.com/search/shows?q=marvel');
    const data = await res.json();
    return {
        shows: data
    }
}

export default Index;
```

以上代码的逻辑应该很清晰了，我们在`getInitialProps`中获取到电视节目的数据并返回，这样在Index的props就可以获取到节目数据，再遍历渲染成节目列表。

运行项目之后，页面完美展示：

![image](https://note.youdao.com/yws/api/personal/file/WEB2a41e2cc3a354cb8c25623e5a8f6bc46?method=download&shareKey=268860f1e038a6dff1acca9be25ed893)

接下来我们来实现详情页，首先我们把`/p/:id`的路由修改为：

```
...
server.get('/p/:id', (req, res) => {
    const actualPage = '/post';
    const queryParams = { id: req.params.id };
    app.render(req, res, actualPage, queryParams);
});
...
```

我们通过将id作为参数去获取电视节目的详细内容，接下来修改post.js的内容为：

```
import fetch from 'isomorphic-unfetch';
import Layout from '../components/Layout';

const Post = (props) => (
    <Layout>
        <h1>{props.show.name}</h1>
        <p>{props.show.summary.replace(/<[/]?p>/g, '')}</p>
        <img src={props.show.image.medium} />
    </Layout>
);

Post.getInitialProps = async function (context) {
    const { id } = context.query;
    const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
    const show = await res.json();
    return { show };
}

export default Post;

```

重启项目（修改了server.js的内容需要重启），从列表页进入详情页，已经成功的获取到电视节目的详情并展示出来：

![image](https://note.youdao.com/yws/api/personal/file/WEBd7391691dd6b555b8b637047861f9232?method=download&shareKey=ab35a3f2e594d53b5443a91aae86a668)

### 增加样式

到目前为止，咱们做的网页都太平淡了，所以接下来咱们给网站增加一些样式，让它变得漂亮。

对于React应用，有多种方式可以增加样式。主要分为两种：
1. 使用传统CSS文件（包括SASS，PostCSS等）
2. 在JS文件中插入CSS

使用传统CSS文件在实际使用中会用到挺多的问题，所以next.js推荐使用第二种方式。next.js内部默认使用[styled-jsx](https://github.com/zeit/styled-jsx)框架向js文件中插入CSS。这种方式引入的样式在不同组件之间不会相互影响，甚至父子组件之间都不会相互影响。

#### styled-jsx

接下来，我们看一下如何使用styled-jsx。将index.js的内容替换如下：

```
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
```

运行项目，首页变成：
![image](https://note.youdao.com/yws/api/personal/file/WEB3d61f61cc77bde959c98e31893c493e9?method=download&shareKey=d21fb19539b4da56c29f6b99da74933a)

增加了一点样式之后比之前好看了一点点。我们发现导航栏的样式并没有变。因为Header是一个独立的的component，component之间的样式不会相互影响。如果需要为导航增加样式，需要修改Header.js：

```
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
```

效果如下：
![image](https://note.youdao.com/yws/api/personal/file/WEB7a7937faa7e34754dbe89f8ae4fa4f51?method=download&shareKey=f84152a08e067d78556132a8e9ffc1bb)

#### 全局样式

当我们需要添加一些全局的样式，比如rest.css或者鼠标悬浮在a标签上时出现下划线，这时候我们只需要在`style-jsx`标签上增加`global`关键词就行了，我们修改Layout.js如下：

```
import Header from './Header';

const layoutStyle = {
    margin: 20,
    padding: 20,
    border: '1px solid #DDD'
}

const Layout = (props) => (
    <div style={layoutStyle}>
        <Header />
        {props.children}
        <style jsx global>
            {`
                a:hover{
                    text-decoration:underline;
                }
            `}
        </style>
    </div>
)

export default Layout
```
这样鼠标悬浮在所有的a标签上时会出现下划线。

### 部署next.js应用

#### Build

部署之前我们首先需要能为生产环境build项目，在package.json中添加script：

```
"build": "next build"
```

接下来我们需要能启动项目来serve我们build的内容，在package.json中添加script：

```
"start": "next start"
```

然后依次执行：

```
npm run build
npm run start
```
build完成的内容会生成到`.next`文件夹内，`npm run start`之后，我们访问的实际上就是`.next`文件夹的内容。

#### 运行多个实例

如果我们需要进行横向扩展（ [Horizontal Scale](https://stackoverflow.com/questions/11707879/difference-between-scaling-horizontally-and-vertically-for-databases)）以提高网站的访问速度，我们需要运行多个网站的实例。首先，我们修改package.json的start script：

```
"start": "next start -p $PORT"
```

如果是windows系统：

```
"start": "next start -p %PORT%"
```

然后运行build: `npm run build`，然后打开两个命令行并定位到项目根目录，分别运行：

```
PORT=8000 npm start
PORT=9000 npm start
```

运行完成后打开[localhost:8000](localhost:8000)和[localhost:9000](localhost:9000)都可以正常访问：

![image](https://note.youdao.com/yws/api/personal/file/WEB5a53be20603feed8bc5b457dc4dfed82?method=download&shareKey=a01494cb86ff892c83aa1a4af76622f6)

通过以上方法虽然能够打包并部署，但是有个问题，我们的自定义服务server.js并没有运行，导致在详情页刷新的时候依然会出现404的错误，所以我们需要把自定义服务加入app的逻辑中。

#### 部署并使用自定义服务

我们将start script修改为：

```
"start": "NODE_ENV=production node server.js"
```

这样我们就解决了自定义服务的部署。重启项目后刷新详情页也能够正常访问了。


这样，我们就了解了next.js的基本使用方法，如果有疑问可以查看next.js官方文档，也可以给我留言讨论。

- 本文Demo源码： 
- next.js官网：[https://nextjs.org/](https://nextjs.org/)
- next.js官方教程： [https://nextjs.org/learn](https://nextjs.org/learn)
- next.js Github： [https://github.com/zeit/next.js](https://github.com/zeit/next.js)





