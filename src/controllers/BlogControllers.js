import axios from "axios";
import { useState } from "react";

const BlogControllers = () => {
    const [data, setData] = useState([])
    const [blogid, setBlogid] = useState("")
    const [title, setTitle] = useState("")
    const [image, setImage] = useState(null)
    const [desc, setDesc] = useState("")

    const onSave = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('title', title)
        formData.append('image', image)
        formData.append('desc', desc)

        await axios.post('/api/blogs/create', formData)
            .then(res => {
                if (res.data.status === 200) {
                    alert(res.data.message)
                }

                alert(res.data.message)
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    const getAllBlogs = async () => {
        await axios.get('/api/blogs/get-all')
            .then(res => {
                setData(res.data.data)
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    const getByIdBlogs = async (blogid) => {
        await axios.get('/api/blogs/get-by-id?blogid=' + blogid)
            .then(res => {
                setBlogid(res.data.data.blogid)
                setTitle(res.data.data.title)
                setDesc(res.data.data.description)
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    const onUpdate = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('blogid', blogid)
        formData.append('title', title)
        formData.append('image', image)
        formData.append('desc', desc)

        await axios.put('/api/blogs/update', formData)
            .then(res => {
                if (res.data.status === 200) {
                    alert(res.data.message)
                }

                alert(res.data.message)
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    const deleteBlogs = async (blogid) => {
        await axios.delete('/api/blogs/delete?blogid=' + blogid)
            .then(res => {
                if (res.data.status === 200) {
                    alert(res.data.message)
                    getAllBlogs()
                }
                alert(res.data.message)
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    const resetBlogs = async () => {
        await axios.delete('/api/blogs/reset')
            .then(res => {
                if (res.data.status === 200) {
                    alert(res.data.message)
                    getAllBlogs()
                }
                alert(res.data.message)
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    return {
        data, setData, title, setTitle, image, setImage, desc, setDesc,
        onSave,
        getAllBlogs,
        getByIdBlogs,
        onUpdate,
        deleteBlogs,
        resetBlogs
    }
}

export default BlogControllers;