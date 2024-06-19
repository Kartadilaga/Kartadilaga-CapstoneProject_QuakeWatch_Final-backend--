import axios from "axios"
import { useState } from "react"

const DonationsControllers = () => {
    const [data, setData] = useState([])

    const getAllDonations = async () => {
        await axios.get('/api/donation/get-all')
            .then(res => {
                setData(res.data.data)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    const deleteDonations = async (donationid) => {
        await axios.delete('/api/donation/delete?donationid=' + donationid)
            .then(res => {
                if (res.data.status === 200) {
                    alert(res.data.message)
                    getAllDonations()
                }
                alert(res.data.message)
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    return {
        data,
        getAllDonations,
        deleteDonations
    }
}

export default DonationsControllers;