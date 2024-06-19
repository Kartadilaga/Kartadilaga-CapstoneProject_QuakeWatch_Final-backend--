'use client'
import CardStatistic from "@/components/CardStatistic";
import DataTables from "@/components/DataTables";
import Script from "@/assets/script";

export default function HomeComponent() {
    const { handleAlert } = Script()
    return (
        <>
            <div className="paths-wrapper">
                <span>Dashboard</span>
            </div>

            <div className="container gap-3">
                <div className="card">
                    <h1>Welcome to Dashboard</h1>
                </div>
            </div>
        </>
    )
}