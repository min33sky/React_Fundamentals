import React from "react";
import PropTypes from "prop-types";

export default class ContactCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            phone: ""
        };

        // Event binding
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    /**
     * Input에 들어오는 값을 저장한다.
     * nextState[e.target.name] = e.target.value;
     * -> {"name" : "Messi"}
     * @param {*} e
     */
    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    /**
     * Keyboard 입력 사용
     * @param {*} e
     */
    handleKeyPress(e){
        // Press Enter Key
        if(e.charCode === 13){
            this.handleClick();
        }
    }

    /**
     * Create 버튼 클릭 시 맴버 등록
     */
    handleClick() {
        const contact = {
            name: this.state.name,
            phone: this.state.phone
        };

        // 넘어온 onCreate함수 실행
        this.props.onCreate(contact);

        // 초기화
        this.setState({
            name: "",
            phone: ""
        });

        // 커서를 자동으로 Input창에 위치(ref 이용)
        this.nameInput.focus();
    }



    render() {
        return (
            <div>
                <h2>Create Contact</h2>
                <p>
                    <input
                        type="text"
                        name="name"
                        placeholder="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        // ref => Javascript의 id값과 비슷함
                        ref={(ref) => {this.nameInput = ref}}
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="phone"
                        value={this.state.phone}
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}

                    />
                </p>
                <button onClick={this.handleClick}>Create</button>
            </div>
        );
    }
}

// PropType과 Default값 설정
ContactCreate.propTypes = {
    onCreate: PropTypes.func
};

ContactCreate.defaultProps = {
    onCreate: () => {
        console.error("onCreate not defined");
    }
};
