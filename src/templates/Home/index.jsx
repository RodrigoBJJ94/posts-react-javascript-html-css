// import logo from './logo.svg';

/* class App extends Component { */
// constructor(props) { // Não precisa ser usado
//  super(props); // Não precisa ser usado
// this.handlePClick = this.handlePClick.bind(this); - O bind da função, mas usando arrow function ele não precisa ser mais usado

/*this.*/ // Não precisa ser usado

/* state = {
  name: 'Rodrigo Brentano',
  counter: 0
};

handlePClick = () => {
  this.setState({ name: 'The developer' });
}

handleAClick = (event) => { // Com a arrow function não precisa fazer o bind da função
  event.preventDefault(); // Para prevenir de ser executado o padrão
  const { counter } = this.state;
  this.setState({ counter: counter + 1 });
}

render() {
  const { name, counter } = this.state;
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onClick={this.handlePClick}>
          {name} {counter}
        </p>
        <a
          onClick={this.handleAClick}
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Este é o link
        </a>
      </header>
    </div>
  );
}
} */

/* function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
} */

/* class App extends Component {
  state = {
  //  counter: 0,
    posts: [
      {
        id: 1,
        title: 'O título 1',
        body: 'O corpo 1'
      },
      {
        id: 2,
        title: 'O título 2',
        body: 'O corpo 2'
      },
      {
        id: 3,
        title: 'O título 3',
        body: 'O corpo 3'
      },
    ]
  }; */

// timeOutUpdate = null;

/* componentDidMount() {
//  this.handleTimeOut();
}

componentDidUpdate() {
//  this.handleTimeOut();
}

componentWillUnmount() {
//  clearTimeout(this.timeOutUpdate);
} */

/*  handleTimeOut = () => {
    const { posts, counter } = this.state;
    posts[0].title = 'O título mudou.';
    this.timeOutUpdate = setTimeout(() => {
      this.setState({ posts, counter: counter +1 });
    }, 2000);
  } */


/* componentDidMount() {
  const { posts, counter } = this.state;
  posts[0].title = 'O título mudou.';
  setTimeout(() => {
    this.setState({ posts, counter: counter +1 });
  }, 5000);
} */

/* componentDidMount() {
  setTimeout(() => {  // Setar um tempo para carregar a página
    this.setState({
      posts: [
        {
          id: 1,
          title: 'O título 1',
          body: 'O corpo 1'
        },
        {
          id: 2,
          title: 'O título 2',
          body: 'O corpo 2'
        },
        {
          id: 3,
          title: 'O título 3',
          body: 'O corpo 3'
        },
      ]
    });
  }, 5000) // O tempo em ms
} */

/* render() {
   const { posts, counter } = this.state;
   return (
     <div className="App">
       <h1>{counter}</h1>
       {posts.map(post => (
         <div key={post.id}>
           <h1>{post.title}</h1>
           <p>{post.body}</p>
         </div>
       ))}
     </div>
   );
 }
} 

export default App; */

import { Component } from 'react';

import './styles.css';

import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utils/load-posts';
import { Button } from '../../components/Button/index';
import { TextInput } from '../../components/TextInput';

class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 2,
    searchValue: ''
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos
    });
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  }

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;
    const filteredPosts = !!searchValue ?
      allPosts.filter(post => {
        return post.title.toLowerCase().includes(
          searchValue.toLowerCase()
        );
      })
      : posts;

    return (
      <section className="container">
        <div className="search-container">
          {!!searchValue && (
            <h1>Search value: {searchValue}</h1>
          )}

          <TextInput searchValue={searchValue} handleChange={this.handleChange} />
        </div>

        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}

        {filteredPosts.length === 0 && (
          <p>Post não encontrado!</p>
        )}

        <div className="button-container">
          {!searchValue && (
            <Button
              text="Load more posts"
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    );
  }
}

export default Home;