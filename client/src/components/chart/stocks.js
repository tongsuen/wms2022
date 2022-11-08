
import { Doughnut } from 'react-chartjs-2';
import React,  {Fragment,useState,useEffect}  from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Chart_User from './user_in_stocks'
import Chart_Zones from './zone_in_stocks'
import Chart_History from './history'
import Chart_Stock_Out from './stocks_out'
import {total_item_in_zone,stock_by_user} from '../../actions/chart'


const ChartScreen = ({total_item_in_zone,stock_by_user}) => {
  

    useEffect(async () => {
     
    },[]);
    
  return (<>
                <div style={{width:200}}>
                    <Chart_Zones />

                </div>
                <div style={{width:200}}>
                    <Chart_User />

                </div>
                <div style={{width:"100%"}}>
                    <Chart_History />

                </div>
                <div style={{width:"100%"}}>
                    <Chart_Stock_Out />

                </div>
            </>)
}

const mapStateToProps = state => ({
    auth:state.auth,

})
export default connect(mapStateToProps,{total_item_in_zone,stock_by_user})(ChartScreen)
