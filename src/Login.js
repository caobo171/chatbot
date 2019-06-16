import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { withRouter } from 'react-router-dom'
import { rootPath } from './App'


class Login extends React.Component {

    state = {
        user: '',
        password: ''
    }

    onChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmitHandler = async (e) => {
        e.preventDefault()
        console.log('check ', this.state.user, this.state.password)
        const res = await axios.post('http://34.87.30.67:8080/login', {
            userName: this.state.user,
            password: this.state.password
        })

        if (res.status === 200) {
            localStorage.setItem('angelhack', JSON.stringify(res.data.responseData))
            toast.success('Login Successful!!')
            this.props.history.push(`${rootPath}/`)
        }else{
            toast.error('Login Failed')
        }
        console.log('check res', res)

    }
    render() {
        return (
            <div class="wrapper fadeInDown">
                <div id="formContent">
                    <div class="fadeIn first">
                        <img src="https://i.imgur.com/I59lFe8.png" id="icon" alt="User Icon" />
                    </div>

                    <div>
                        <input onChange={this.onChangeHandler} type="text" id="login" class="fadeIn second" name="user" placeholder="login" />
                        <input onChange={this.onChangeHandler} type="password" id="password" class="fadeIn third" name="password" placeholder="password" />
                        <input
                            onClick={this.onSubmitHandler}
                            type="submit" class="fadeIn fourth" value="Log In" />
                    </div>


                    <div id="formFooter">
                        <a class="underlineHover" href="#">Forgot Password?</a>
                    </div>

                </div>
            </div>
        )
    }
}
export default withRouter(Login)