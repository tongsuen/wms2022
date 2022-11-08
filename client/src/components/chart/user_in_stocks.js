
import { Doughnut } from 'react-chartjs-2';
import React,  {Fragment,useState,useEffect}  from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import {total_item_in_zone,stock_by_user} from '../../actions/chart'


const ChartScreen = ({stock_by_user}) => {


    const [color2,setColor2] = useState([])
    const [data2,setData2] = useState([])
    const [users,setUsers] = useState([])

    useEffect(async () => {

        const res2 = await stock_by_user();
        console.log(res2);
        if(res2.success){
            var total = [];
            var name = []
            var colors = []
            res2.data.forEach(item => {
                    total.push(item.total)
                    name.push(item.user[0].name)
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
                        <Doughnut data= {{
                                labels: users,
                                datasets: [
                                    {
                                    label: '#',
                                    data: data2,
                                    backgroundColor: color2,
                                    borderWidth: 1,
                                    },
                                ],
                                }}/>
        
            </>)
}

const mapStateToProps = state => ({
    auth:state.auth,

})
export default connect(mapStateToProps,{stock_by_user})(ChartScreen)
