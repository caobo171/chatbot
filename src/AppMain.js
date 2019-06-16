import React from 'react';
import logo from './logo.svg';
import botContainer, { IMAGE } from './containers/botContainer'
import { Provider, SubscribeOne } from 'unstated-x'
import './App.css';
import { withRouter } from 'react-router-dom'
import { rootPath } from './App'

class AppMain extends React.Component {

  constructor(props) {
    super(props)
    botContainer.init()
    this.state = {
      text: ''
    }

    document.addEventListener('keydown', (event) => {
      if (event.keyCode === 13) {
        botContainer.sendMessage(this.state.text)
        this.setState({ text: '' })
      } else if (event.keyCode === 32) {
        try {
          botContainer.recognition.start()
        } catch (e) {

        }
      }

    });
  }
  render() {
    return (

      <div className="App">
        <SubscribeOne to={botContainer} bind={['dialog', 'interim', 'image', 'user']}>
          {
            bot => {
              console.log('check bot', bot)
              return (
                <div className="container-fluid h-100" >
                  <div className="row justify-content-center h-100" style={{ paddingTop: '30px' }}>
                    <div className="col-md-8 col-xl-6 chat">
                      <div className="card">
                        <div className="card-header msg_head">
                          <div className="d-flex bd-highlight">
                            <div className="img_cont">
                              <img alt="test" src={bot.state.image} className="rounded-circle user_img" />
                              <span className="online_icon"></span>
                            </div>
                            <div className="user_info">
                              <span>Chat with <img alt="test" src="https://i.imgur.com/7RoEscK.png" style={{ height: '30px', radius: '30%' }} /></span>

                            </div>
                            <div className="video_cam">
                              {/* <span><i className="fas fa-video"></i></span>
                        <span><i className="fas fa-phone"></i></span> */}
                            </div>
                          </div>
                          <div id="action_menu_btn"><button className="btn" onClick={() => {
                            localStorage.removeItem('angelhack');
                            this.props.history.push(`${rootPath}/login`)
                          }}>Logout</button></div>
                        </div>


                        <div className="card-body msg_card_body">

                          {
                            bot.state.interim && (
                              <div className="d-flex justify-content-end mb-4">
                                <div className="msg_cotainer_send">
                                  {bot.state.interim}
                                </div>
                                <div className="img_cont_msg">
                                  <img alt="test" src={bot.state.user.user.userAvatar} className="rounded-circle user_img_msg" />
                                </div>

                              </div>
                            )
                          }

                          {
                            bot.state.image === IMAGE.hearing ? (
                              <div className="d-flex justify-content-start mb-4">
                                <div className="img_cont_msg">
                                  <img alt="test" src="https://i.imgur.com/ilmoJsC.png" className="rounded-circle user_img_msg" />
                                </div>
                                <div className="msg_cotainer">
                                  I'm hearing ...
                                  </div>
                              </div>
                            ) : (bot.state.image === IMAGE.thinking) && (
                              <div className="d-flex justify-content-start mb-4">
                                <div className="img_cont_msg">
                                  <img alt="test" src="https://i.imgur.com/ilmoJsC.png" className="rounded-circle user_img_msg" />
                                </div>
                                <div className="msg_cotainer">
                                  I'm thinking ...
                                </div>
                              </div>
                            )
                          }
                          {
                            bot.state.dialog.sort((a, b) => b.index - a.index).map((e, index) => {
                              return (
                                <React.Fragment key={`${e.question}${index}`}>

                                  {
                                    e.response.map((res, index) => {
                                      return (
                                        res.image ? (
                                          <div key={res.message1} className="d-flex justify-content-start mb-1" >
                                            {
                                              index === 0 && (
                                                <div className="img_cont_msg">
                                                  <img alt="test" src="https://i.imgur.com/ilmoJsC.png" className="rounded-circle user_img_msg" />
                                                </div>
                                              )
                                            }
                                            <div className="msg_cotainer">
                                              <img alt="test" src={res.image} className="user_img_msg" />
                                              {` ${res.message1}`}
                                            </div>

                                          </div>
                                        ) :
                                          (<div key={res} className="d-flex justify-content-start mb-1">
                                            {
                                              index === 0 && (
                                                <div className="img_cont_msg">
                                                  <img alt="test" src="https://i.imgur.com/ilmoJsC.png" className="rounded-circle user_img_msg" />
                                                </div>
                                              )
                                            }

                                            <div className="msg_cotainer">
                                              {res}
                                            </div>
                                          </div>
                                          )

                                      )
                                    })

                                  }
                                  <div className="d-flex justify-content-end mb-4 mt-3">
                                    <div className="msg_cotainer_send">
                                      {e.question}
                                    </div>
                                    <div className="img_cont_msg">
                                      <img alt="test" src={bot.state.user.user.userAvatar} className="rounded-circle user_img_msg" />
                                    </div>

                                  </div>

                                </React.Fragment>
                              )
                            })
                          }


                        </div>

                        <div className="card-footer">
                          <div className="input-group">
                            <div className="input-group-append"
                              onClick={() => {
                                try {
                                  botContainer.recognition.start()
                                } catch (e) {

                                }
                              }}>
                              <span className="input-group-text attach_btn"><i className="fas fa-microphone"></i></span>
                            </div>
                            <textarea value={this.state.text}
                              onChange={(e) => { this.setState({ text: e.target.value }) }}
                              className="form-control type_msg" placeholder="Type your message..."></textarea>
                            <div className="input-group-append">
                              <span className="input-group-text send_btn"
                                onClick={() => {
                                  botContainer.sendMessage(this.state.text)
                                  this.setState({ text: '' })
                                }}
                              ><i className="fas fa-location-arrow"></i></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          }
        </SubscribeOne>
      </div >
    );
  }
}

export default withRouter(AppMain)
