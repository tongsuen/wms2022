
import { Bar,Line } from 'react-chartjs-2';
import React,  {Fragment,useState,useEffect}  from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import {history_data} from '../../actions/chart'


const ChartScreen = ({history_data,type_chart}) => {


    const [color2,setColor2] = useState([])
    const [data2,setData2] = useState([])
    const [users,setUsers] = useState([])

    useEffect(async () => {

        const res2 = await history_data();
        console.log(res2);
        if(res2.success){
            var total = [];
            var name = []
            var colors = []
            res2.data.forEach(item => {
                    total.push(item.total)
                    name.push(item._id.day + "/" + item._id.month + '/' + item._id.year)
                    colors.push(getRandomColor())
            });
            setData2(total);
            setUsers(name)
            setColor2(colors)
        }
        
    },[]);
    useEffect(async () => {

        console.log(type_chart);
        
        
    },[type_chart]);
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        console.log(color);
        return color;
      }
  return (<>
                     <h3>History</h3>
                     {type_chart == 'bar' &&
                      <><Bar data= {{
                        labels: users,
                        datasets: [
                            {
                            label: '#item in stocks',
                            data: data2,
                            backgroundColor: 'rgb(255, 99, 132)',
                            borderWidth: 1,
                            },
                       
                        ],
                        }}/></>
                     }
                        {type_chart == 'line' &&
                      <><Line data= {{
                        labels: users,
                        datasets: [
                            {
                            label: '#item in stocks',
                            data: data2,
                            backgroundColor: 'rgb(255, 99, 132)',
                            borderWidth: 1,
                            },
                       
                        ],
                        }}/></>
                     }
        
            </>)
}

const mapStateToProps = state => ({
    auth:state.auth,

})
export default connect(mapStateToProps,{history_data})(ChartScreen)
