import React, { useState } from 'react'
import "antd/dist/antd.css";
import { Tabs, Modal } from "antd";
import './Campaigns.css'
import { campaign, keywords } from '../Constants/Constants'
import moment from 'moment'
// import Calendar from 'react-calendar';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'moment/locale/de'
import de from "date-fns/locale/de"; // the locale you want
registerLocale("de", de); // register it with the name you want

const { TabPane } = Tabs;

function Campaigns(props) {
    const [campaignData, setCampaignData] = useState([...campaign.data])
    const [modalVisibility, setModalVisibility] = useState(false)
    const [modalData, setModalData] = useState({})
    moment.locale(props.lang)

    let operators = {
        '>': function(a, b){ return a>b},
        '<': function(a, b){ return a<b},
        '=': function(a,b){ return a===b}
    }

    const rescheduleCampaign = (date, name) => {
        console.log(date)
        let tempCampaignData = [...campaignData]
        campaignData.find((o, i) => {
            if (o.name === name) {
                tempCampaignData[i].createdOn = date.valueOf();
                // setCampaignData[...tempCampaignData]
                return true; // stop searching
            }
        });
        setCampaignData([...tempCampaignData])
    }

    const tables = (symbol) => {
        return (
            <div className="overflow">
                <table className="table">
                    <thead className="table-header"> 
                        <tr>
                            <th scope="col">{keywords[props.lang].date}</th>
                            <th scope="col">{keywords[props.lang].campaign}</th>
                            <th scope="col">{keywords[props.lang].view}</th>
                            <th scope="col">{keywords[props.lang].action}</th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {campaignData.map((data, i)=>(
                            operators[symbol](new Date(data.createdOn).setHours(0,0,0,0), new Date().setHours(0,0,0,0))?<tr key={i}>
                                <td className="date" style={{minWidth: '110px'}}>
                                    {moment(data.createdOn).format("MMM YYYY, D")}<br />
                                    <span className="price italic" style={{fontStyle: 'italic'}}>{moment(data.createdOn).fromNow()}</span>
                                </td>
                                <td className="campaign">
                                    <div className="flex">
                                        <img className="img-margin" src={data.image_url} alt="" height='40' />
                                        <span>{data.name}<br /><span className="italic price">{data.region}</span></span>
                                    </div>
                                </td>
                                <td className="price pointer" onClick={()=>{
                                    setModalVisibility(true)
                                    setModalData(data)
                                }}>
                                    <span className="flex-wrap align-center">
                                        <img className="img-margin" src={require('../../images/Price.png')} alt="price" height="24" /> {keywords[props.lang].price}
                                    </span>
                                </td>
                                <td className="actions">
                                    <div className="flex align-center">
                                        <span className="width">
                                            <span className="pointer"><img className="img-margin" src={require('../../images/file.png')} alt="file" height="24" /> {keywords[props.lang].csv}</span>
                                        </span>
                                        <span className="width">
                                            <span className="pointer"><img className="img-margin" src={require('../../images/statistics-report.png')} alt="statistics-report" height="24" /> {keywords[props.lang].report}</span>
                                        </span>
                                        <DatePicker
                                            className="align-center"
                                            locale={props.lang}
                                            selected={data.createdOn}
                                            showMonthDropdown
                                            showYearDropdown
                                            popperModifiers={{
                                                offset: {
                                                    enabled: true,
                                                    offset: "-50px, 10px"
                                                },
                                                preventOverflow: {
                                                    enabled: true,
                                                    escapeWithReference: false,
                                                    boundariesElement: "viewport"
                                                }
                                            }}
                                            onChange={date => rescheduleCampaign(date, data.name)}
                                            customInput={<span className="width">
                                                <span className="pointer flex-wrap align-center"><img className="img-margin" src={require('../../images/calendar.png')} alt="calendar" height="24" /> {keywords[props.lang].schedule}</span>
                                            </span>}
                                        />
                                    </div>
                                </td>
                            </tr>:null
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
    return (
        <div style={{padding: '1% 12%', fontFamily: 'Roboto'}}>
            <h1 className="header-font" >{keywords[props.lang].manage}</h1>
            <Tabs defaultActiveKey="1" className="tabs">
                <TabPane tab={keywords[props.lang].upcoming} key="1">
                    {tables('>')}
                </TabPane>
                <TabPane tab={keywords[props.lang].live} key="2">
                    {tables('=')}
                </TabPane>
                <TabPane tab={keywords[props.lang].past} key="3">
                    {tables('<')}
                </TabPane>
            </Tabs>
            <Modal
                centered
                visible={modalVisibility}
                footer={null}
                onCancel={()=>setModalVisibility(false)}
            >
                <div className="flex" style={{marginBottom: '30px'}}>
                    <img className="img-margin" src={modalData.image_url} alt="" width="137" />
                    <div className="modal-campaign-name">
                        {modalData.name}<br />
                        <span className="italic price">{modalData.region}</span>
                    </div>
                </div>
                <div>
                    <span style={{fontSize: '24px', lineHeight: '32px'}}>{keywords[props.lang].pricing}</span>
                    <div>
                        {modalData.price ? Object.keys(modalData.price).map((key, i) => (
                            <div key={i} className="flex space-between date" >
                                {key}
                                <span className="actions"><b>{modalData.price[key]}</b></span>
                            </div>
                        )): null}
                    </div>
                    <button className="modal-button pointer" onClick={()=>setModalVisibility(false)}>Close</button>
                </div>
            </Modal>
        </div>
    )
}

export default Campaigns
