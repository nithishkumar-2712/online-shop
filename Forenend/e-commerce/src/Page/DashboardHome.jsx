import React from 'react'
import {LineChart,Line,XAxis,YAxis,Tooltip,CartesianGrid,ResponsiveContainer} from "recharts";
import"./Dashboardhome.css"
import Customhook from '@/components/Customhook';
 function DashboardHome() {
   const {Data,Loading, Error}=Customhook("/Dashbord");
   console.log(Data);
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const formattedData = Data?.revenueData?.map(item => ({
  month: months[item._id - 1],
  revenue: item.revenue
})) || [];
const totalRevenue = Data?.revenueData?.reduce(
  (sum, item) => sum + item.revenue,
  0
);
if (Loading) {
  return (
    <div className="dashboard-skeleton">

      <div className="sk-cards">
        {[...Array(5)].map((_, i) => (
          <div className="sk-card" key={i}></div>
        ))}
      </div>

      <div className="sk-chart"></div>

    </div>
  );
}

if (Error) {
  return (
    <div className="error-page">

      <div className="error-box">
        <div className="error-icon">⚠️</div>
        <h2>Something went wrong</h2>
        <p>Please try again later</p>
        <button onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>

    </div>
  );
}
  return (
    <>
      <div>
        <div className='dashbord'>
          {/* <div className='dashbordsidebar'></div> */}
          <div className='dashbordHome'>
            <div className='chart-row'>
              <div className='chart'>
                <h4>Total Orders</h4>
                <h2>{Data.totalOrders}</h2>
                <p className="growth">+8%</p>
              </div>
              <div className='chart'>
                <h4>Total user</h4>
                <h2>{Data.totalUsers}</h2>
                <p className="growth">+8%</p>
              </div>
              <div className='chart'>
                <h4>Total Products</h4>
                <h2>{Data.totalProducts}</h2>
                <p className="growth">+5%</p>
              </div>
              <div className='chart'>
                <h4>Total Revenue</h4>
                <h2> ₹{totalRevenue}</h2>
                <p className="growth">+15%</p>
              </div>
              <div className='chart'>
                <h4>Profite</h4>
                <h2>{Data.totalProfit}%</h2>
                <p className="growth">This Month</p>
              </div>
              {/* <div className='chart'>1</div> */}
            </div>
          <div className="line-chart">
            {/* Header */}
            <div className="line-chart-header">
              <h3>Monthly Revenue</h3>
              <span className="badge">+15% Growth</span>
            </div>

            {/* BIG Chart */}
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={formattedData}>

                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />

                <Tooltip
                  contentStyle={{
                    background: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "10px"
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#22c55e"
                  strokeWidth={4}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />

              </LineChart>
            </ResponsiveContainer>
          </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default DashboardHome