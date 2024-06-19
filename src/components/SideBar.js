const Sidebar = (props) => {
    return (
        <>
            {
                props.sidebarShow ?
                    ''
                    :
                    <div className="background-sidebar"></div>
            }

            <aside className={props.sidebarShow ? 'sidebar-desktop' : 'sidebar-responsive'}>
                <h3 className="nav-title">Quake Watch</h3>
                <ul className="nav-list">
                    <li className="nav-item">
                        <a href="/dashboard" className="nav-link">
                            <i className="fa-solid fa-tachometer-alt"></i>
                            Dashboard
                        </a>
                    </li>
                    <p className="nav-subtitle">Products</p>
                    <li className="nav-item">
                        <a href="/dashboard/donation" className="nav-link">
                            <i className="fa-solid fa-dollar"></i>
                            Donation
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/dashboard/blogs" className="nav-link">
                            <i className="fa-solid fa-boxes"></i>
                            Blogs
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="javascript:void(0)" className="nav-link" onClick={props.onClickSidebarShow}>
                            <i className="fa-solid fa-times"></i>
                            Close
                        </a>
                    </li>
                </ul>
            </aside>
        </>
    )
}

export default Sidebar;