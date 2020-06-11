import React, { useState } from 'react'
import "antd/dist/antd.css";
import { Tabs } from "antd";
import './Campaigns.css'
import { campaign } from '../Constants/Constants'

const { TabPane } = Tabs;

function Tables() {
    const [campaignData, setCampaignData] = useState([...campaign])
    const callback = (key) => {
        console.log(key)
        console.log(new Date().valueOf())
    }
    return (
        <div style={{padding: '1% 12%', fontFamily: 'Roboto'}}>
            <h1 style={{fontSize: '3rem', color: '#2B416C'}}>Manage Campaigns</h1>
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Upcoming Campaigns" key="1">
                    <table className="table">
                        <thead className="table-header"> 
                            <tr>
                                <th>Date</th>
                                <th>Campaign</th>
                                <th>View</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Oct 2019, 28<br /> 5 days ago</td>
                            </tr>
                        </tbody>
                    </table>
                </TabPane>
                <TabPane tab="Live Campaigns" key="2">
                Content of Tab Pane 2
                </TabPane>
                <TabPane tab="Past Campaigns" key="3">
                Content of Tab Pane 3
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Tables
