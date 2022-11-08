import React,  {Fragment,useState}  from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {login} from '../../actions/auth'
import { Alert,Row,Col,Button,Form } from 'react-bootstrap';

import * as BASE from '../../utils/const'
const Login  = ({login,setAlert,isAuthenticated}) => {

    const [formData,setFormData] = useState({
        email:'admin@gmail.com',
        password:'123456',
    });
    const [errorMsg,setErrorMsg] = useState('');
    const {email,password} = formData;
    const [loading,setLoading] = useState(false);
    const onChange = e => setFormData({...formData,[e.target.name]:e.target.value});

    const onSubmit = async e => {
        e.preventDefault();
        setLoading(true)
        const res = await login({email,password}); 
        console.log("-->>>");
        console.log(res);
        
        if(!res.success){
            setErrorMsg(res.msg)
            setAlert(email,'danger')
            setLoading(false);
        }    
    }
    //redirect if login
    if(isAuthenticated){//admin_create_inbox
        return <Redirect to='/' />
    }
   
    return (
        <Fragment>
        <Row style={{minHeight:600,backgroundPosition:"center",backgroundRepeat:"no-repeat",backgroundSize:"cover",margin:"auto",display:"block",paddingTop:40}}>
           <Col item={true} xs={12}><p className="semi-bold text-center fs-2">เข้าสู่ระบบ</p></Col> 
           <Col xs ={12} style={{justifyContent:"center"}}>
                <div style={{backgroundColor:"white", maxWidth:400,margin:"auto",border:"2px solid",borderColor:"var(--main-color)",borderRadius:10,padding:20}}>
                    <p className="semi-bold text-center fs-1">TRUST EXPRESS</p>
                    <form className="form" onSubmit={e=>onSubmit(e)}>
        
                        <div className="form-group">
                        <Form.Control type="email" placeholder="Email Address" value={email}  onChange={e => onChange(e)}  name="email" required/>
                    
                        </div>
                        <div className="form-group">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                            minLength="6"
                            value={password}
                            onChange={e => onChange(e)} 
                            required
                        />
                        </div>
                        
                             {errorMsg && <Alert  variant='danger'>{errorMsg} </Alert>}
                       
                        <Link to="/forgot">
                            <Form.Text className="extra-light m-2 text-right" style={{marginTop:-20}}>
                                ลืมรหัสผ่าน? 
                            </Form.Text>
                        </Link>
                            {loading == false ? 
                             <Button type="submit" className="button-register extra-light" style={{borderColor:"black",width:"100%"}} >เข้าสู่ระบบ</Button>
                             :
                             <Button type="submit" className="button-register extra-light" style={{borderColor:"black",width:"100%"}} disabled>กำลังเข้าสู่ระบบ</Button>
                            }
                    </form>

                    <Form.Text className="text-muted text-center extra-light m-2">
                        หรือ
                    </Form.Text>
                        <Button className="button-register extra-light"  style={{borderColor:"black",backgroundColor:"white",width:"100%"}} href={BASE.SERVER + 'api/auth/facebook'}> เข้าสู่ระบบด้วย Facebook</Button>
                        <Form.Text className="text-muted  extra-light fs-1 m-2 text-center">
                             ผู้ใช้ใหม่  <Link to='/register'>สร้างบัญชีผู้ใช้</Link>
                     </Form.Text>
                </div>
                   
           </Col>
        </Row>
        </Fragment>
    )
}
Login.propTypes = {
    login:PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated:state.auth.isAuthenticated,

})
export default connect(mapStateToProps,{login})(Login)