import React, { Component } from 'react'
import { Link, Route, Redirect, withRouter } from 'react-router-dom';
export default class DemoAuth extends Component {
    render() {
        return (
            <>
                <ul>
                    <li><Link to="/public">Public Page</Link></li>
                    <li><Link to='/dashboard'>Dashboard Page</Link></li>
                </ul>
                =====================================
                <Route path='/public' component= { Public }/>
                <PrivateRouter path='/dashboard'component={ Dashboard }/>
                <Route path='/login'component={ Login }/>
            </>
        )
    }
}


const Public = () => {
    return <h1>this is public page</h1>
}

class Login extends React.Component{
    state = {
        isLoginRedirect: false
    }

    _handleLogin = () => {
        fakeAuth.login(()=>{
            return this.setState({ isLoginRedirect: true })
        });
    }
    render(){
        const {from} = this.props.location.state || { from: { pathname: '/'}};
        const { isLoginRedirect } = this.state;
        if(isLoginRedirect) return <Redirect to ={from.pathname}/>
        return(
            <> 
                <h1>Ban ko co quyen vao page {from.pathname}</h1> <br/>
                <button onClick={ () => this._handleLogin()}>login</button>
            </>
        )
    }
}

const Dashboard = withRouter(({ history }) => {
    return (
        <>
            <h1>this is Dashboard page</h1>
            <button onClick={ () => fakeAuth.logout(() => { history.push('/public')})}>Logout</button>
        </>
    )
})

const PrivateRouter = ({ component: Component, ...rest}) => {
    return <Route
            {...rest}
            render = {
                (props) => {
                    return fakeAuth.isAhth? <Component {...props}/>: <Redirect to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}/>
                }
            }
    />
}

const fakeAuth = {
    isAhth: false,
    login(cb){
        this.isAhth = true
        cb()
    },
    logout(cb){
        this.isAhth = false
        cb()
    }
}