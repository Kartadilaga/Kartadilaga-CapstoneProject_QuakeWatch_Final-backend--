'use client'
import DataTable from "react-data-table-component";
import { useState, useEffect, useMemo } from "react";
import BlogControllers from "@/controllers/BlogControllers";

const BlogsComponent = () => {
    const {
        data,
        getAllBlogs,
        deleteBlogs,
        resetBlogs
    } = BlogControllers()

    useEffect(() => {
        getAllBlogs()
    }, [])

    const customStyles = {
        rows: {
            style: {
                minHeight: '72px', // override the row height
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
            },
        },
        cells: {
            style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px'
            },
        },
    };

    const conditionalData = [
        {
            when: row => row.age >= 19,
            style: { color: "red" }
        },
        {
            when: row => row.age < 19,
            style: { color: "green" }
        }
    ]

    const columns = [
        {
            name: "ID",
            selector: row => row.blogid,
            sortable: true
        },
        {
            name: "Gambar",
            selector: row => row.image
        },
        {
            name: "Judul",
            selector: row => row.title
        },
        {
            name: "Deskripsi",
            selector: row => row.description
        },
        {
            name: "Aksi",
            selector: row => (
                <div className="row gap">
                    <a href={"/dashboard/blogs/update/" + row.blogid} className="btn btn-sm btn-primary">Edit</a>
                    <button type="button" className="btn btn-sm btn-danger" onClick={() => deleteBlogs(row.blogid)}>Hapus</button>
                </div>
            )
        }
    ]

    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredItems = data.filter(
        item =>
            item.title && item.title.toLowerCase().includes(filterText.toLowerCase())
            ||
            item.description && item.description.toLowerCase().includes(filterText.toLowerCase())
    );
    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };
        return (
            <div className="row space-between flex-grow mb-3">
                <div className="row gap flex-grow">
                    <button type="button" className="btn btn-danger" onClick={() => resetBlogs()}>Reset Data</button>
                    <a href="/dashboard/blogs/create" type="button" className="btn btn-primary">Tambahkan Blog</a>
                </div>
                <div className="row gap">
                    <input type="text" className="form-ctrl" placeholder="Cari Disini..." value={filterText} onChange={e => setFilterText(e.target.value)} />
                    <button type="text" className="btn btn-primary" onClick={handleClear}>
                        Reset
                    </button>
                </div>
            </div>
        )
    }, [filterText, resetPaginationToggle]);

    return (
        <>
            <div className="paths-wrapper">
                <span>Dashboard</span>
                /
                <span>Blogs</span>
            </div>
            <div className="container">
                <div className="card">
                    <DataTable
                        columns={columns}
                        data={filteredItems}
                        conditionalRowStyles={conditionalData}
                        customStyles={customStyles}
                        dense
                        subHeader
                        subHeaderComponent={subHeaderComponentMemo}
                    />
                </div>
            </div>
        </>
    )
}

export default BlogsComponent;