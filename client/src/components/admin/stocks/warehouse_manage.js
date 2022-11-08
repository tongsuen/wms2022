import React,  {Fragment,useState,useEffect}  from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { DataGrid } from '@mui/x-data-grid';
import {create_stock,inventory_waiting,get_zones,create_zone,save_to_history,zone_with_stock,set_loading} from '../../../actions/manager'

import Typography from '@mui/material/Typography';

import * as COLOR from '../../../utils/color';
import moment from 'moment'

import Dialog from '../../custom/dialog_zone'
import DialogZone from '../../custom/dialog_zone';

const Screen  = ({auth,create_stock,inventory_waiting,get_zones,create_zone,set_loading,zone_with_stock}) => {
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

    const [zone, setZone] = useState({});
    const [listA, setListA] = useState([]);
    const [listB, setListB] = useState([]);
    const [listC, setListC] = useState([]);
    const [listD, setListD] = useState([]);
    const [listE, setListE] = useState([]);
    const [listF, setListF] = useState([]);
    const [listG, setListG] = useState([]);
    const [listH, setListH] = useState([]);
    const [listI, setListI] = useState([]);
    const [listJ, setListJ] = useState([]);
    const [listK, setListK] = useState([]);
    const [listL, setListL] = useState([]);
    const [listM, setListM] = useState([]);
    const [listN, setListN] = useState([]);
    const [listP, setListP] = useState([]);
    
    const [selectInventory, setSelectInventory] = useState({id:null,amount:0});
    const [selectZone, setSelectZone] = useState(null);
    
    
    const [row, setRow] = useState([]);

    const [zones, setZones] = useState([]);
    const [zonesFill, setZonesFill] = useState({});
    var temp = 0


    const onClickZone = (zone) =>{
        console.log(zone)
        setSelectZone(zone)
        setOpen(true)
    }
    const getStockofZone = async (z) =>{
        const res = await zone_with_stock({zone_id:zone._id})
        if(res.success){
            if(res.data.length > 0){
                console.log(zone)
                setZonesFill({...zonesFill,[zone._id]:'filled'})
                return <Typography align='center' style={{fontFamily:'kanit-medium',fontSize:12,color:COLOR.brown}}>filled</Typography>
            }
            else{

                setZonesFill({...zonesFill,[zone._id]:'empty'})
                return <Typography align='center' style={{fontFamily:'kanit-medium',fontSize:12,color:COLOR.brown}}>empty</Typography>
            }
        }
        return  <Typography align='center' style={{fontFamily:'kanit-medium',fontSize:12,color:COLOR.brown}}>empty</Typography>
    }
    const getListofZone = async (main) =>{
        const res = await get_zones({main:main})
        if(res.success){
            console.log(res)
            if(main == 'A') setListA(res.data)
            if(main == 'B') setListB(res.data)
            if(main == 'C') setListC(res.data)
            if(main == 'D') setListD(res.data)
            if(main == 'E') setListE(res.data)
            if(main == 'F') setListF(res.data)
            if(main == 'G') setListG(res.data)
            if(main == 'H') setListH(res.data)
            if(main == 'I') setListI(res.data)
            if(main == 'J') setListJ(res.data)
            if(main == 'K') setListK(res.data)
            if(main == 'L') setListL(res.data)
            if(main == 'M') setListM(res.data)
            if(main == 'N') setListN(res.data)
            if(main == 'P') setListP(res.data)
       
        }
    }

    const return_pos_style_5 = (n) =>{
        if((n)%5 == 0){
            return {marginBottom:10,marginRight:5,marginLeft:0,width:50,maxWidth:50}
        }
        else if((n+1)%5 ==0){
            return {marginBottom:10,marginLeft:5,marginRight:0,width:50,maxWidth:50}
        }
        else{
            return {marginBottom:10,marginLeft:5,marginRight:5,width:50,maxWidth:50}
        }
    }
    const return_pos_style_4 = (n) =>{
        if((n)%4 == 0){
            return {marginBottom:10,marginRight:5,marginLeft:0,width:50,maxWidth:50}
        }
        else if((n+1)%4 ==0){
            return {marginBottom:10,marginLeft:5,marginRight:0,width:50,maxWidth:50}
        }
        else{
            return {marginBottom:10,marginLeft:5,marginRight:5,width:50,maxWidth:50}
        }
    }
    const return_pos_style_3 = (n) =>{
        if((n-1)%3 == 0){
            return {marginBottom:10,marginRight:10,marginLeft:10,width:50,maxWidth:50}
        }
        else{
            return {marginBottom:10,marginLeft:0,marginRight:0,width:50,maxWidth:50}
        }
    }
    useEffect(async () => {
        getListofZone('B');
        getListofZone('A');
        getListofZone('C');
        getListofZone('D');
        getListofZone('E');
        getListofZone('F');
        getListofZone('G');
        getListofZone('H');
        getListofZone('I');
        getListofZone('J');
        getListofZone('K');
        getListofZone('L');
        getListofZone('M');
        getListofZone('N');
        getListofZone('P');
       

       
    },[]);
   
    const zones_a = ['1A01','2A01','2A01','1A02','2A02','3A03']
    const A_P = '#a44b3f'
    const B_N = '#c7553d'
    const C_M = '#f18e3a'
    const D_L = '#f19b79'
    const E = '#f4f2d1'
    const F_K = '#cbdebd'
    const G_J = '#d3df9a'
    const H_I = '#254653'
    const font_style_zone = {textAlign:'center',fontFamily:'galvji',fontSize:18}
    const block_3 = {width:170,marginRight:10}
    const block_4 = {width:230,marginRight:10}
    const block_5 = {width:290,marginRight:0}
    const filled_block = (color) => {
        return <div style={{backgroundColor:COLOR.white,border:'1px solid black',height:28}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill={color} viewBox="0 0 24 24" color={color} strokeWidth={2} style={{height:"100%",width:"100%"}}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div> 
                
    }

    return (
        <Grid container style={{ minHeight:400,marginBottom:20,width:1930,paddingTop:10,paddingBottom:10,justifyContent:'center',backgroundColor:'rgb(169 169 169)'}}>
            <Grid style={block_3}>
                <Typography style={{fontFamily:'kanit-medium',textAlign:'center',backgroundColor:COLOR.white,marginBottom:10,height:40,paddingTop:5,fontSize:20}}>A</Typography>
                <Grid container style={{backgroundColor:COLOR.white,}}>
                    {listA.map ( (a,index)=> {
                        return  <Grid xs={4} style={return_pos_style_3(index)} onClick={()=>onClickZone(a)}>
                                        {a.stocks.length > 0 ? 
                                            <div>
                                                {filled_block(A_P)}
                                            </div>
                                        :
                                        <div style={{backgroundColor:A_P,border:'1px solid black'}}>
                                            <Typography style={font_style_zone}> {a.name}</Typography>
                                        </div>
                                        }
                                    </Grid>  
                    })}
                   
                   
                </Grid>
            </Grid>
            <Grid style={block_4}>
                <Typography style={{fontFamily:'kanit-medium',textAlign:'center',backgroundColor:COLOR.white,marginBottom:10,height:40,paddingTop:5,fontSize:20}}>B</Typography>
                <Grid container style={{backgroundColor:COLOR.white,}}>
                    {listB.map ( (a,index) => {
                        return  <Grid xs={3} style={return_pos_style_4(index)} onClick={()=>onClickZone(a)}>
                                        {a.stocks.length > 0 ? 
                                            <div>
                                                {filled_block(A_P)}
                                            </div>
                                        :
                                        <div style={{backgroundColor:B_N,border:'1px solid black'}}>
                                            <Typography style={font_style_zone}>{a.name}</Typography>
                                        </div>
                                        }
                                    </Grid>  
                    })}
                   
                   
                </Grid>
            </Grid>
            <Grid style={block_4}>
                <Typography style={{fontFamily:'kanit-medium',textAlign:'center',backgroundColor:COLOR.white,marginBottom:10,height:40,paddingTop:5,fontSize:20}}>C</Typography>
                <Grid container style={{backgroundColor:COLOR.white,}}>
                    {listC.map ( (a,index) => {
                        return  <Grid xs={3} style={return_pos_style_4(index)} onClick={()=>onClickZone(a)}>
                                       {a.stocks.length > 0 ? 
                                            <div>
                                                {filled_block(C_M)}
                                            </div>
                                        :
                                        <div style={{backgroundColor:C_M,border:'1px solid black'}}>
                                            <Typography style={font_style_zone}> {a.name}</Typography>
                                        </div>
                                        }
                                    </Grid>  
                    })}
                   
                   
                </Grid>
            </Grid>
            <Grid style={block_4}>
                <Typography style={{fontFamily:'kanit-medium',textAlign:'center',backgroundColor:COLOR.white,marginBottom:10,height:40,paddingTop:5,fontSize:20}}>D</Typography>
                <Grid container style={{backgroundColor:COLOR.white,}}>
                    {listD.map ( (a,index) => {
                        return  <Grid xs={3} style={return_pos_style_4(index)} onClick={()=> onClickZone(a)}>
                                         {a.stocks.length > 0 ? 
                                            <div>
                                                {filled_block(D_L)}
                                            </div>
                                        :
                                        <div style={{backgroundColor:D_L,border:'1px solid black'}}>
                                            <Typography style={font_style_zone}> {a.name}</Typography>
                                        </div>
                                        }
                                    </Grid>  
                    })}
                   
                   
                </Grid>
            </Grid>
            <Grid style={block_4}>
                <Typography style={{fontFamily:'kanit-medium',textAlign:'center',backgroundColor:COLOR.white,marginBottom:10,height:40,paddingTop:5,fontSize:20}}>E</Typography>
                <Grid container style={{backgroundColor:COLOR.white,}}>
                    {listE.map ( (a,index) => {
                        return  <Grid xs={3} style={return_pos_style_4(index)} onClick={()=> onClickZone(a)}>
                                        {a.stocks.length > 0 ? 
                                            <div>
                                                {filled_block(E)}
                                            </div>
                                        :
                                        <div style={{backgroundColor:E,border:'1px solid black'}}>
                                            <Typography style={font_style_zone}> {a.name}</Typography>
                                        </div>
                                        }
                                    </Grid>  
                    })}
                   
                   
                </Grid>
            </Grid>
            <Grid style={block_4}>
                <Typography style={{fontFamily:'kanit-medium',textAlign:'center',backgroundColor:COLOR.white,marginBottom:10,height:40,paddingTop:5,fontSize:20}}>F</Typography>
                <Grid container style={{backgroundColor:COLOR.white,}}>
                    {listF.map ( (a,index) => {
                        return  <Grid xs={3} style={return_pos_style_4(index)} onClick={()=> onClickZone(a)}>
                                         {a.stocks.length > 0 ? 
                                            <div>
                                                {filled_block(F_K)}
                                            </div>
                                        :
                                        <div style={{backgroundColor:F_K,border:'1px solid black'}}>
                                            <Typography style={font_style_zone}> {a.name}</Typography>
                                        </div>
                                        }
                                    </Grid>  
                    })}
                   
                   
                </Grid>
            </Grid>
            <Grid style={block_4}>
                <Typography style={{fontFamily:'kanit-medium',textAlign:'center',backgroundColor:COLOR.white,marginBottom:10,height:40,paddingTop:5,fontSize:20}}>G</Typography>
                <Grid container style={{backgroundColor:COLOR.white,}}>
                    {listG.map ( (a,index) => {
                        return  <Grid xs={3} style={return_pos_style_4(index)} onClick={()=> onClickZone(a)}>
                                        {a.stocks.length > 0 ? 
                                            <div>
                                                {filled_block(G_J)}
                                            </div>
                                        :
                                        <div style={{backgroundColor:G_J,border:'1px solid black'}}>
                                            <Typography style={font_style_zone}> {a.name}</Typography>
                                        </div>
                                        }
                                    </Grid>  
                    })}
                   
                   
                </Grid>
            </Grid>
            <Grid style={block_5}>
                <Typography style={{fontFamily:'kanit-medium',textAlign:'center',backgroundColor:COLOR.white,marginBottom:10,height:40,paddingTop:5,fontSize:20}}>H</Typography>
                <Grid container style={{backgroundColor:COLOR.white,}}>
                    {listH.map ( (a,index) => {
                        return  <Grid style={return_pos_style_5(index)} onClick={()=> onClickZone(a)}>
                                         {a.stocks.length > 0 ? 
                                            <div>
                                                {filled_block(H_I)}
                                            </div>
                                        :
                                        <div style={{backgroundColor:H_I,border:'1px solid black'}}>
                                            <Typography style={font_style_zone}> {a.name}</Typography>
                                        </div>
                                        }
                                    </Grid>  
                    })}
                   
                   
                </Grid>
            </Grid>
            {/* END OF ROW */}
             <div style={{minWidth:2000,height:40}}></div>
            <Grid style={block_3}>
                <Grid container style={{backgroundColor:COLOR.white,}}>
                    {listP.map ( (a,index) => {
                        return  <Grid xs={4} style={return_pos_style_3(index)} onClick={()=> onClickZone(a)}>
                                        {a.stocks.length > 0 ? 
                                            <div>
                                                {filled_block(A_P)}
                                            </div>
                                        :
                                        <div style={{backgroundColor:A_P,border:'1px solid black'}}>
                                            <Typography style={font_style_zone}>{a.name}</Typography>
                                        </div>
                                        }
                                    </Grid>  
                    })}  
                </Grid>
                <Typography style={{fontFamily:'kanit-medium',textAlign:'center',backgroundColor:COLOR.white,marginTop:10,height:40,paddingTop:5,fontSize:20}}>P</Typography>
            </Grid>

            <Grid style={block_4}>
                <Grid container style={{backgroundColor:COLOR.white,}}>
                    {listN.map ( (a,index) => {
                        return  <Grid xs={3} style={return_pos_style_4(index)} onClick={()=> onClickZone(a)}>
                                        {a.stocks.length > 0 ? 
                                            <div>
                                                {filled_block(B_N)}
                                            </div>
                                        :<div style={{backgroundColor:B_N,border:'1px solid black'}}>
                                            <Typography style={font_style_zone}>{a.name}</Typography>
                                        </div>
                                         }
                                    </Grid>  
                    })}  
                </Grid>
                <Typography style={{fontFamily:'kanit-medium',textAlign:'center',backgroundColor:COLOR.white,marginTop:10,height:40,paddingTop:5,fontSize:20}}>N</Typography>
            </Grid>
            <Grid style={block_4}>
                <Grid container style={{backgroundColor:COLOR.white,}}>
                    {listM.map ( (a,index) => {
                        return  <Grid xs={3} style={return_pos_style_4(index)} onClick={()=> onClickZone(a)}>
                                        {a.stocks.length > 0 ? 
                                            <div>
                                                {filled_block(C_M)}
                                            </div>
                                        :<div style={{backgroundColor:C_M,border:'1px solid black'}}>
                                            <Typography style={font_style_zone}>{a.name}</Typography>
                                        </div>
                                        }
                                    </Grid>  
                    })}  
                </Grid>
                <Typography style={{fontFamily:'kanit-medium',textAlign:'center',backgroundColor:COLOR.white,marginTop:10,height:40,paddingTop:5,fontSize:20}}>M</Typography>
            </Grid>

            <Grid style={{width:230,marginRight:250}}>
                <Grid container style={{backgroundColor:COLOR.white,}}>
                    {listL.map ( (a,index) => {
                        return  <Grid xs={3} style={return_pos_style_4(index)} onClick={()=> onClickZone(a)}>
                                        {a.stocks.length > 0 ? 
                                            <div>
                                                {filled_block(D_L)}
                                            </div>
                                        :<div style={{backgroundColor:D_L,border:'1px solid black'}}>
                                            <Typography style={font_style_zone}>{a.name}</Typography>
                                        </div>
                                         }
                                    </Grid>  
                    })}  
                </Grid>
                <Typography style={{fontFamily:'kanit-medium',textAlign:'center',backgroundColor:COLOR.white,marginTop:10,height:40,paddingTop:5,fontSize:20}}>L</Typography>
            </Grid>

            <Grid style={block_4}>
                <Grid container style={{backgroundColor:COLOR.white,}}>
                    {listK.map ( (a,index) => {
                        return  <Grid xs={3} style={return_pos_style_4(index)} onClick={()=> onClickZone(a)}>
                                        {a.stocks.length > 0 ? 
                                            <div>
                                                {filled_block(F_K)}
                                            </div>
                                        :<div style={{backgroundColor:F_K,border:'1px solid black'}}>
                                            <Typography style={font_style_zone}>{a.name}</Typography>
                                        </div>
                                        }
                                    </Grid>  
                    })}  
                </Grid>
                <Typography style={{fontFamily:'kanit-medium',textAlign:'center',backgroundColor:COLOR.white,marginTop:10,height:40,paddingTop:5,fontSize:20}}>K</Typography>
            </Grid>
            <Grid style={block_4}>
                <Grid container style={{backgroundColor:COLOR.white,}}>
                    {listJ.map ( (a,index) => {
                        return  <Grid xs={3} style={return_pos_style_4(index)} onClick={()=> onClickZone(a)}>
                                        {a.stocks.length > 0 ? 
                                            <div>
                                                {filled_block(G_J)}
                                            </div>
                                        :<div style={{backgroundColor:G_J,border:'1px solid black'}}>
                                            <Typography style={font_style_zone}>{a.name}</Typography>
                                        </div>
                                        }
                                    </Grid>  
                    })}  
                </Grid>
                <Typography style={{fontFamily:'kanit-medium',textAlign:'center',backgroundColor:COLOR.white,marginTop:10,height:40,paddingTop:5,fontSize:20}}>J</Typography>
            </Grid>

            <Grid style={block_5}>
                <Grid container style={{backgroundColor:COLOR.white,}}>
                    {listI.map ( (a,index) => {
                        return  <Grid style={return_pos_style_5(index)} onClick={()=> onClickZone(a)}>
                                        {a.stocks.length > 0 ? 
                                            <div>
                                                {filled_block(H_I)}
                                            </div>
                                        :<div style={{backgroundColor:H_I,border:'1px solid black'}}>
                                            <Typography style={font_style_zone}>{a.name}</Typography>
                                        </div>
                                        }
                                    </Grid>  
                    })}
                   
                   
               
                   </Grid>
                <Typography style={{fontFamily:'kanit-medium',textAlign:'center',backgroundColor:COLOR.white,marginTop:10,height:40,paddingTop:5,fontSize:20}}>I</Typography>
            </Grid>


            <DialogZone  zone = { selectZone} open={open} onClose={()=> {
                setOpen(false); 
                setSelectZone(null);}}/>

        </Grid>
    )
}


const mapStateToProps = state => ({
    auth:state.auth,

})
export default connect(mapStateToProps,{create_stock,inventory_waiting,save_to_history,create_zone,get_zones,zone_with_stock,set_loading})(Screen)
