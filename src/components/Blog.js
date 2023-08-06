import{ useState } from 'react'
const Blog = ({ blog, updateBlog, deleteBlogs }) => {
    const [visible, setVisible] = useState(false)
    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }


    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const addLike = async (event) => {
        event.preventDefault()
        const blogObject = {
            user: blog.user.id,
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes+1
        }
        console.log(blogObject)
        updateBlog(blog.id,blogObject)
    }

    const deleteBlog = async (event) => {
        event.preventDefault()
        if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
            deleteBlogs(blog.id)
        }

    }
    return (
        <div style={blogStyle} className='blog'>
            <div>
                {blog.title}
                <div style={hideWhenVisible} >
                Title: {blog.title} by {blog.author}<br/>
                    <button onClick={() => {setVisible(!visible)}}>view</button>
                </div>
                <div style={showWhenVisible}>
                    {blog.title}<br/>
                    {blog.url}<br/>
                    {blog.likes} likes<button onClick={addLike}>like</button><br/>
                    {blog.author}<br/>
                    <button onClick={deleteBlog}>delete</button>
                    <button onClick={() => {setVisible(!visible)}}>hide</button>
                </div>
            </div>
        </div>
    )
}
export default Blog