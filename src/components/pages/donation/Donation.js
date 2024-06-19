'use client'
import DonationsControllers from "@/controllers/DonationsControllers";
import { useState, useEffect, useMemo } from "react";
import DataTable from "react-data-table-component";

const DonationComponent = () => {
    const {
        data,
        getAllDonations,
        deleteDonations
    } = DonationsControllers()

    useEffect(() => {
        getAllDonations()
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
    }

    const columns = [
        {
            name: "ID",
            selector: row => row.donationid,
            sortable: true
        },
        {
            name: "Nominal",
            selector: row => row.nominal
        },
        {
            name: "Nama Donatur",
            selector: row => row.name
        },
        {
            name: "Deskripsi",
            selector: row => row.description
        },
        {
            name: "Aksi",
            selector: row => (
                <div className="row gap">
                    <button type="button" className="btn btn-sm btn-danger" onClick={() => deleteDonations(row.donationid)}>Hapus</button>
                </div>
            )
        }
    ]

    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredItems = data.filter(
        item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
    );
    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };
        return (
            <>
                <div className="row gap">
                    <input type="text" className="form-ctrl" placeholder="Cari Disini..." value={filterText} onChange={e => setFilterText(e.target.value)} />
                    <button type="text" className="btn btn-primary" onClick={handleClear}>
                        Reset
                    </button>
                </div>
            </>
        )
    }, [filterText, resetPaginationToggle]);

    return (
        <>
            <div className="paths-wrapper ">
                <span>Dashboard</span>
                /
                <span>Donation</span>
            </div>

            <div className="container">
                <div className="card">
                    <DataTable
                        columns={columns}
                        data={filteredItems}
                        customStyles={customStyles}
                        conditionalRowStyles={false}
                        dense
                        subHeader
                        subHeaderComponent={subHeaderComponentMemo}
                    />
                </div>
            </div>
        </>
    )
}

export default DonationComponent;