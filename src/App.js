import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
    const [blogs, setBlogs] = useState([])
    // const [newTitle, setNewTitle] = useState('')
    // const [newAutor, setNewAuthor] = useState('')
    // const [newUrl, setNewUrl] = useState('')
    // const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)
    const [flag, setFlag] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const blogFormRef = useRef()
    // const [loginVisible, setLoginVisible] = useState(false)

    useEffect(() => {
        blogService.getAll().then(initialblogs =>
            setBlogs( initialblogs )
        )
    }, [errorMessage])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON){
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        //console.log('logging in with', username, password)
        try {
            const user = await loginService.login({
                username, password,
            })

            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )

            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
            setFlag('success')
            setErrorMessage('Logged in successfully')
            setTimeout(() => {
                setErrorMessage(null)
                setFlag('')
            },5000)
        } catch (exception) {
            setFlag('error')
            setErrorMessage(exception.response.data.error)
            setTimeout(() => {
                setErrorMessage(null)
                setFlag('')
            },5000)
        } }


    const loginForm = () => {
        return (
            <Togglable buttonLabel='login'>
                <LoginForm
                    username={username}
                    password={password}
                    handleUsernameChange={({ target }) => setUsername(target.value)}
                    handlePasswordChange={({ target }) => setPassword(target.value)}
                    handleLogin={handleLogin}
                />
            </Togglable>
        )
    }

    const blogForm = () => {return (

        <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <BlogForm createBlog={addBlog}
            // newTitle={newTitle} handleTitleChange={handleTitleChange}
            // newAutor={newAutor} handleAuthorChange={handleAuthorChange}
            // newUrl={newUrl} handleUrlChange={handleUrlChange}
            />
        </Togglable>
    )
    }

    const loggedin = () => (
        <div>
            <h2>blogs</h2>
            <p>{user.name} logged in
                <button onClick={() => window.localStorage.removeItem('loggedBlogappUser')}>logout</button>
            </p>
            {blogForm()}
            {blogs
                .filter(blog => blog.user.username === user.username)
                .sort((a,b) => b.likes - a.likes)
                .map(blog =>
                    <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlogs={deleteBlog}/>
                )}
        </div>
    )

    const updateBlog = async (id, blogObject) => {
        try{
            const returnedBlog = await blogService.update(id, blogObject)
            setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
            setFlag('success')
            setErrorMessage('Blog updated successfully')
            setTimeout(() => {
                setErrorMessage(null)
                setFlag('')
            },5000)
        }catch(exception){
            setFlag('error')
            setErrorMessage(exception.response.data.error)
            setTimeout(() => {
                setErrorMessage(null)
                setFlag('')
            },5000)
        }
    }

    const deleteBlog = async (id) => {
        try{
            await blogService.remove(id)
            setBlogs(blogs.filter(blog => blog.id !== id))
            setFlag('success')
            setErrorMessage('Blog deleted successfully')
            setTimeout(() => {
                setErrorMessage(null)
                setFlag('')
            },5000)
        }catch(exception){
            setFlag('error')
            setErrorMessage(exception.response.data.error)
            setTimeout(() => {
                setErrorMessage(null)
                setFlag('')
            },5000)
        }
    }

    const addBlog = async (blogObject) => {
        try{
            blogFormRef.current.toggleVisibility()
            const returnedBlog = await blogService.create(blogObject)
            setBlogs(blogs.concat(returnedBlog))
            setFlag('success')
            setErrorMessage('New blog added successfully')
            setTimeout(() => {
                setErrorMessage(null)
                setFlag('')
            },5000)
        }catch(exception){
            setFlag('error')
            setErrorMessage(exception.response.data.error)
            setTimeout(() => {
                setErrorMessage(null)
                setFlag('')
            },5000)}

    }
    // const addBlog = async (event) => {
    //   event.preventDefault()
    //   const blogObject = {
    //     title: newTitle,
    //     author: newAutor,
    //     url: newUrl,
    //     likes: 0
    //   }
    //   try{
    //     blogFormRef.current.toggleVisibility()
    //     const returnedBlog = await blogService.create(blogObject)
    //     setBlogs(blogs.concat(returnedBlog))
    //     setNewTitle('')
    //     setNewAuthor('')
    //     setNewUrl('')
    //     setFlag('success')
    //     setErrorMessage('New blog added successfully')
    //     setTimeout(() => {
    //       setErrorMessage(null)
    //       setFlag('')
    //   },5000)
    //   }catch(exception){
    //     setFlag('error')
    //     setErrorMessage(exception.response.data.error)
    //     setTimeout(() => {
    //       setErrorMessage(null)
    //       setFlag('')
    //   },5000)
    //   }

    // }

    // const handleTitleChange = (event) => {
    //   console.log(event.target.value)
    //   setNewTitle(event.target.value)
    // }

    // const handleAuthorChange = (event) => {
    //   console.log(event.target.value)
    //   setNewAuthor(event.target.value)
    // }

    // const handleUrlChange = (event) => {
    //   console.log(event.target.value)
    //   setNewUrl(event.target.value)
    // }

    return (
        <div>
            <h1>Blog App</h1>
            <Notification message={errorMessage} flag={flag}/>
            {user === null ?loginForm() :loggedin()}
            {/* {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )} */}
        </div>
    )
}

export default App