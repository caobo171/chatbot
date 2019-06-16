import { Container } from 'unstated-x'

import axios from 'axios'
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const SpeechSynthesis = window.SpeechSynthesis
const SpeechSynthesisUtterance = window.SpeechSynthesisUtterance



function capitalize(s) {
    var first_char = /\S/;
    return s.replace(first_char, function (m) { return m.toUpperCase(); });
}

export const IMAGE = {
    'normal': 'https://i.imgur.com/ilmoJsC.png',
    'hearing': 'https://i.imgur.com/uS0pZYx.png',
    'thinking': 'https://i.imgur.com/y5Uc9mL.png'
}
const TRIGGER_END = ['kếtthúc', 'thếthôi', 'hếtrồi', 'xongrồi']
const WARNING = ['màyngu', 'bạnngu', 'bạndốt', 'màydôt']


const FAQs = {
    "luyện nghe": {
        important: ["nghe"],
        sub: ["cảithiện", "nângcao", "nâng", "luyện", "học", "thếcòn", "tăng"],
        responses: [
            "Bạn có thể tham khảo những nguồn sau:",
            `https://nghetienganhpro.com/luyen-nghe-mat-goc-tieng-anh/`,
            `https://ngocbach.com/category/thu-vien/listenting/`,
            `https://www.welevn.com/`
        ]
    },
    "luyện nói": {
        important: ["nói"],
        sub: ["cảithiện", "nângcao", "nâng", "luyện", "thếcòn", "học", "tăng"],
        responses: [
            "Bạn đọc thử  nhé :",
            `https://www.youtube.com/user/proworkshop`,
            `https://engbreaking.com/`,
            'https://ngocbach.com/category/thu-vien/speaking-thu-vien/'
        ]
    },
    "luyện đọc": {
        important: ["đọc"],
        sub: ["cảithiện", "nângcao", "nâng", "luyện", "thếcòn", "học", "tăng"],
        responses: [
            "Bạn có thể tham khảo những nguồn sau:",
            `https://langmaster.edu.vn/10-website-giup-bnaj-luyen-ky-nang-doc-sieu-dang-a15i668.html`,
            `https://x3english.com/cach-doc-tieng-anh`
        ]
    },
    "luyện viết": {
        important: ["viết"],
        sub: ["cảithiện", "nângcao", "nâng", "luyện", "thếcòn", "học", "tăng"],
        responses: [
            "Bạn có tham khảo mấy trang này nhé:",
            `https://ngocbach.com/category/thu-vien/writing-thu-vien/`,
            `https://langmaster.edu.vn/12-loi-khuyen-dat-gia-cho-nguoi-bat-dau-luyen-viet-tieng-anh-a15i951.html`,
            `https://jolo.edu.vn/vi/thu-vien/bi-quyet-ielts/luyen-viet-ielts-cho-nguoi-moi-bat-dau.html`
        ]
    },
    "tự học hay trung tâm": {
        important: ["hay", "trungtâm", "tựhọc"],
        sub: ["trungtâm"],
        responses: [
            "Theo mình thì tự học sẽ tốt hơn !!",
            "Nhưng nếu bạn thấy không hợp và không chủ động được thì nên đi học Trung tâm :))) "
        ]
    },
    "ơi": {
        important: ["ơi"],
        sub: ["bạn", "ơi"],
        responses: [
            "Ơi !!"
        ]
    },
    "bắt đầu": {
        important: [],
        sub: ["từđâu", "thếnào", "ởđâu", "bắtđầu"],
        responses: [
            "Bạn có thể tham khảo những nguồn sau",
            `https://vnexpress.net/giao-duc/sau-loi-khuyen-hoc-tieng-anh-cho-tan-sinh-vien-3275824.html`,
            `http://learningeffortlessenglish.com/huong-dan-hoc/307/huong-dan-hoc-effortless-english-ban-tieng-viet-.html`,
            `https://engbreaking.com/`
        ]
    },
    'trung bình': {
        important: ["học"],
        sub: ["cũngđược", "bìnhthường", "khôngdốt", "tàmtạm"],
        responses: [
            `Mình nghĩ bạn nên tham khảo các nguồn online`,
            `Nếu không lên được thì hãy nghĩ đến nhưng trung tâm uy tín như:`,
            `British Council, IELTS Workshop`
        ]
    },
    'học': {
        important: ['học'],
        sub: ["thếnào", "rasao"],
        responses: [
            `Ừ ,bạn yên tâm, mình sẽ cố gắng hết sức !! Bạn hỏi tiếp đi !!`
        ]
    },
    "có thể": {
        important: ['cóthể', 'gì'],
        sub: ['cóthể'],
        responses: [
            'Mình có thể giúp bạn tìm động bọn và sự phụ để học tiếng Anh !',
            'Bạn có câu hỏi gì khi bắt đầu với Tiếng Anh thì cứ hỏi mình :))',
            'Mình còn dốt nhưng mình sẽ thông minh hơn trong tương lai !! '

        ]
    }

}


export class BotContainer extends Container {
    constructor(props) {
        super(props)
        this.recognition = null
        this.state = {
            dialog: [],
            interim: null,
            image: IMAGE.normal,
            user: null
        }
    }


    processing = async (final_script) => {

        const scriptDeleteSpace = final_script.replace(/\s/g, "").toLocaleLowerCase()
        if (scriptDeleteSpace === '') return
        this.setState({ image: IMAGE.thinking })
        let response = []
        let dialog = this.state.dialog
        console.log('check script', scriptDeleteSpace)


        const res = await axios.post('http://34.87.30.67:8080/chat', {
            message: final_script
        }, {
                headers: {
                    Authorization: `Bearer ${this.state.user.accessToken}`
                }
            })



        window.res = res

        console.log('check res', res)

        const finish = () => {
            dialog.push({
                response,
                question: final_script,
                index: dialog.length
            })

            this.setState({
                image: IMAGE.normal, dialog,
                interim: null
            })
        }



        const keys = Object.keys(FAQs)
        for (let i = 0; i < keys.length; i++) {
            const faq = FAQs[keys[i]]
            if (
                FAQs[keys[i]].important.every(e =>
                    scriptDeleteSpace.indexOf(e) !== -1
                ) &&
                FAQs[keys[i]].sub.some(e =>
                    scriptDeleteSpace.indexOf(e) !== -1)) {
                response = FAQs[keys[i]].responses
                finish()
                return
            }
        }

        for (let i = 0; i < WARNING.length; i++) {
            if (scriptDeleteSpace.indexOf(WARNING[i]) !== -1) {
                response = ['Bạn ăn nói cho cẩn thận , đá giờ']
                finish()
                return
            }
        }

        for (let i = 0; i < TRIGGER_END.length; i++) {
            if (scriptDeleteSpace.indexOf(TRIGGER_END[i]) !== -1) {
                response = ['Chảo bạn nhé !!']
                finish()
                return
            }
        }


        if (res.status === 200) {
            if (res.data.responseData.mentors) {
                response = [
                    res.data.responseData.message,
                    ...res.data.responseData.mentors.map(e => `${e.name} (${e.organization})`),

                ]
                finish()
                return
            } else if (res.data.responseData.users) {
                response = [
                    res.data.responseData.message,
                    ...res.data.responseData.users.map(e => {
                        return {
                            image: e.avatar,
                            message1: `${e.name},địa chỉ ở ${e.address.address}`
                        }
                    }),

                ]
                finish()
                return
            }
            else {
                response = [
                    res.data.responseData.message
                ]
            }

        }

        finish()


    }

    sendMessage = (final_script) => {
        this.processing(final_script)
    }

    init = () => {
        const user = localStorage.getItem('angelhack')
        if (user) {
            this.setState({ user: JSON.parse(user) })
        }
        this.recognition = new SpeechRecognition();
        //recognition.continuous = false;
        this.recognition.lang = 'vi-VN';
        this.recognition.interimResults = true;

        this.recognition.onstart = (event) => {
            this.setState({ image: IMAGE.hearing })
        }
        this.recognition.onresult = (event) => {
            let final_transcript = '';
            var interim_transcript = '';
            if (typeof (event.results) == 'undefined') {
                this.recognition.onend = null;
                this.recognition.stop();
                return;
            }

            for (var i = event.resultIndex; i < event.results.length; ++i) {

                if (event.results[i].isFinal) {
                    console.log('check final', event.results[i][0].transcript)
                    final_transcript += event.results[i][0].transcript;
                    this.processing(final_transcript)
                } else {
                    interim_transcript += event.results[i][0].transcript;

                    this.setState({ interim: interim_transcript })
                }
            }

            final_transcript = capitalize(final_transcript);

            // if (final_transcript || interim_transcript) {
            //     showButtons('inline-block');
            // }

        }

        this.recognition.onend = (event) => {
            this.setState({ image: IMAGE.normal })
        }

        // this.synsthesis = window.speechSynthesis
        // this.utterThis = new SpeechSynthesisUtterance("Hi !! I'm a god. Can you please help me .... tell me what's the weather today? ")
        // this.utterThis.pitch = Number(this.state.pitch)
    }





}

const botContainer = new BotContainer()

export default botContainer
window.bot = botContainer