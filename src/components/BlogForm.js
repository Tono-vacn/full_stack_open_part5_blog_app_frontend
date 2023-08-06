import { useState } from 'react'
const BlogForm = ({ createBlog }) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAutor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const handleTitleChange = (event) => {
        console.log(event.target.value)
        setNewTitle(event.target.value)
    }

    const handleAuthorChange = (event) => {
        console.log(event.target.value)
        setNewAuthor(event.target.value)
    }

    const handleUrlChange = (event) => {
        console.log(event.target.value)
        setNewUrl(event.target.value)
    }


    const addBlog = async (event) => {
        event.preventDefault()
        const blogObject = {
            title: newTitle,
            author: newAutor,
            url: newUrl,
            likes: 0
        }

        createBlog(blogObject)
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')

    }

    return (
        <div className='formDiv'>
            <h2>create new blog</h2>
            <form onSubmit={addBlog}>
                <div>
        title:
                    <input
                        value={newTitle}
                        onChange={handleTitleChange}
                        id='title'
                        placeholder='title'
                    />
                </div>
                <div>
        author:
                    <input
                        value={newAutor}
                        onChange={handleAuthorChange}
                        id='author'
                        placeholder='author'
                    />
                </div>
                <div>
        url:
                    <input
                        value={newUrl}
                        onChange={handleUrlChange}
                        id='url'
                        placeholder='url'
                    />
                </div>
                <button type="submit" id='create-button'>create</button>
            </form>

        </div>

    )}

export default BlogForm