
import { Doughnut } from 'react-chartjs-2';
import React,  {Fragment,useState,useEffect}  from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {total_item_in_zone,stock_by_user} from '../../actions/chart'


const ChartScreen = ({auth,total_item_in_zone,stock_by_user}) => {
    const [data,setData] = useState([])
    const [zones,setZones] = useState([])

    const [color,setColor] = useState([])

    useEffect(async () => {
        if(auth.user){
            const res = await total_item_in_zone({user:auth.user});
            console.log(res);
            if(res.success){
                var total = [];
                var name = []
                var colors = []
                res.data.forEach(item => {
                        total.push(item.total)
                        const temp = item.zones[0].name
                        name.push(temp)
                        colors.push(getRandomColor(item.zones[0].main))
                });
                setData(total);
                setZones(name)
                setColor(colors)
            }
        }
     
        
        
    },[]);
    function getRandomColor(name) {
        const A_P = '#a44b3f'
        const B_N = '#c7553d'
        const C_M = '#f18e3a'
        const D_L = '#f19b79'
        const E = '#f4f2d1'
        const F_K = '#cbdebd'
        const G_J = '#d3df9a'
        const H_I = '#254653'
        console.log(name)
        var letters = '0123456789ABCDEF';
        if(name =='A' || name == 'P'){
            return A_P;
        }
        else if(name =='B' || name == 'N'){
            return B_N;
        }
        else if(name =='C' || name == 'M'){
            return C_M;
        }
        else if(name =='D' || name == 'L'){
            return D_L;
        }
        else if(name =='E'){
            return E;
        }
        else if(name =='F' || name == 'K'){
            return F_K;
        }
        else if(name =='G' || name == 'J'){
            return G_J;
        }
        else if(name =='H' || name == 'I'){
            return H_I;
        }
        return E;
      }
  return (<>

                        <Doughnut data= {{
                                labels: zones,
                                datasets: [
                                    {
                                    label: '#',
                                    data: data,
                                    backgroundColor: color,
                                    borderWidth: 1,
                                    },
                                ],
                                }}/>
             
            </>)
}

const mapStateToProps = state => ({
    auth:state.auth,

})
export default connect(mapStateToProps,{total_item_in_zone,stock_by_user})(ChartScreen)
