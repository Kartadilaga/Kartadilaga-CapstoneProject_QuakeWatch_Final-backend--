'use client'
import { useParams } from "next/navigation"
import { useEffect } from "react"

const { default: BlogControllers } = require("@/controllers/BlogControllers")

const BlogsUpdateComponent = () => {
    const params = useParams()
    const {
        title, setTitle, setImage, desc, setDesc,
        getByIdBlogs,
        onUpdate
    } = BlogControllers()

    useEffect(() => {
        getByIdBlogs(params.blogid)
    }, [])

    return (
        <>
            <div className="paths-wrapper">
                <span>Dashboard</span>
                /
                <span>Blogs</span>
                /
                <span>Update</span>
            </div>

            <div className="container">
                <div className="card">
                    <form onSubmit={onUpdate} className="row-column gap-3">
                        <h2>Form Update Blog</h2>
                        <hr />
                        <div className="row gap-3">
                            <input type="text" className="form-ctrl flex-grow" placeholder="Blog title" value={title} onChange={(e) => setTitle(e.target.value)} />
                            <input type="file" className="form-ctrl flex-grow" onChange={(e) => setImage(e.target.files[0])} />
                        </div>
                        <textarea rows={7} className="form-ctrl" placeholder="Write text here..." value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>

                        <button type="submit" className="btn btn-primary ms-auto">Save</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default BlogsUpdateComponent;