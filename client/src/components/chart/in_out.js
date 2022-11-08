
import { Bar,Line } from 'react-chartjs-2';
import React,  {Fragment,useState,useEffect}  from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import {stock_in_by_month,stock_out_by_month,history_data} from '../../actions/chart'


const ChartScreen = ({stock_in_by_month,stock_out_by_month,history_data,type_chart,year,}) => {


    const [color,setColor] = useState([])
    const [data,setData] = useState([])
    const [data2,setData2] = useState([])
    const [labels,setLabels] = useState([])

    const get_month = (number) =>{
        if(number == 1){
            return 'JAN'
        }
        else if(number == 2){
            return 'FEB'
        }
        else if(number == 3){
            return 'MAR'
        }
        else if(number == 4){
            return 'APR'
        }
        else if(number == 5){
            return 'MAY'
        }
        else if(number == 6){
            return 'JUN'
        }
        else if(number == 7){
            return 'JUL'
        }
        else if(number == 8){
            return 'AUG'
        }
        else if(number == 9){
            return 'SEP'
        }
        else if(number == 10){
            return 'OCT'
        }
        else if(number == 11){
            return 'NOV'
        }
        else if(number == 12){
            return 'DEC'
        }
        else {
            return '-'
        }
    }
    useEffect(async () => {

        var query ={}
        if(year){
          query.year= year
        }  
        const res = await stock_in_by_month(query);
        console.log(res);
        if(res.success){
            var total = [];
            var name = []
            var colors = []
            res.data.forEach(item => {
                    total.push(item.total)
                    name.push(get_month(item.month))
                    colors.push(getRandomColor())
            });
            setData2(total);
            setLabels(name)
            setColor(colors)
        }

        const res2 = await stock_out_by_month(query);
        console.log(res2);
        if(res2.success){
            var total = [];
            var name = []
            var colors = []
            res2.data.forEach(item => {
                    total.push(item.total)
                    name.push(get_month(item.month))
                    colors.push(getRandomColor())
            });
            setData(total);
            setColor(colors)
        }
    },[year]);
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        //console.log(color);
        return color;
      }
  return (<>
                       {type_chart == 'bar' &&  <Bar data= {{
                                labels: labels,
                                datasets: [
                                    {
                                        label: '#ของเข้าคลัง',
                                        data: data2,
                                        backgroundColor: '#588a8a',
                                        borderWidth: 1,
                                    },
                                    {
                                    label: '#ของออกคลัง',
                                    data: data,
                                    backgroundColor: '#f18f39',
                                    borderWidth: 1,
                                    },
                                  
                               
                                ],options: {
                                
                                    animations: {
                                      radius: {
                                        duration: 400,
                                        easing: 'linear',
                                        loop: (context) => context.active
                                      }
                                    },
                                    hoverRadius: 12,
                                    hoverBackgroundColor: 'yellow',
                                    interaction: {
                                      mode: 'nearest',
                                      intersect: false,
                                      axis: 'x'
                                    },
                                  },
                                }}/>}
                        {type_chart == 'line' &&  <Line data= {{
                                labels: labels,
                                datasets: [
                                    {
                                        label: '#ของเข้าคลัง',
                                        data: data2,
                                        backgroundColor: '#588a8a',
                                        borderWidth: 1,
                                    },
                                    {
                                    label: '#ของออกคลัง',
                                    data: data,
                                    backgroundColor: '#f18f39',
                                    borderWidth: 1,
                                    },
                                  
                               
                                ],options: {
                                    animations: {
                                      radius: {
                                        duration: 400,
                                        easing: 'linear',
                                        loop: (context) => context.active
                                      }
                                    },
                                    hoverRadius: 12,
                                    hoverBackgroundColor: 'yellow',
                                    interaction: {
                                      mode: 'nearest',
                                      intersect: false,
                                      axis: 'x'
                                    },
                                    plugins: {
                                      tooltip: {
                                        enabled: false
                                      }
                                    }
                                  },
                                }}/>}
        
            </>)
}

const mapStateToProps = state => ({
    auth:state.auth,

})
export default connect(mapStateToProps,{stock_in_by_month,stock_out_by_month,history_data})(ChartScreen)
