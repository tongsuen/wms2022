
import { Bar } from 'react-chartjs-2';
import React,  {Fragment,useState,useEffect}  from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import {stock_out} from '../../actions/chart'


const ChartScreen = ({stock_out}) => {


    const [color2,setColor2] = useState([])
    const [data2,setData2] = useState([])
    const [users,setUsers] = useState([])

    useEffect(async () => {

        const res2 = await stock_out();
        console.log(res2);
        if(res2.success){
            var total = [];
            var name = []
            var colors = []
            res2.data.forEach(item => {
                    total.push(item.total)
                    name.push(item._id.month + '/' + item._id.year)
                    colors.push(getRandomColor())
            });
            setData2(total);
            setUsers(name)
            setColor2(colors)
        }
        
    },[]);
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
                     <h3>Stocks Out</h3>
                        <Bar data= {{
                                labels: users,
                                datasets: [
                                    {
                                    label: '#item out',
                                    data: data2,
                                    backgroundColor: 'rgb(22, 99, 132)',
                                    borderWidth: 1,
                                    },
                               
                                ],
                                }}/>
        
            </>)
}

const mapStateToProps = state => ({
    auth:state.auth,

})
export default connect(mapStateToProps,{stock_out})(ChartScreen)
