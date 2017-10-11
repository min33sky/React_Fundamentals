import React from "react";
import PropTypes from "prop-types";

export default class ContactDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEdit: false,
            name: "",
            phone: ""
        };

        this.handleToggle = this.handleToggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleToggle() {
        /**
         * setState가 비동기 메서드이기 때문에
         * setState메서드가 끝나기전에 console.log()가 실행
         * 그래서 false부터 출력된다.
         */
        if (!this.state.isEdit) {
            // 수정할 맴버 불러오기
            this.setState({
                name: this.props.contact.name,
                phone: this.props.contact.phone
            });
        } else {
            // 맴버 수정
            this.handleEdit();
        }

        this.setState({
            isEdit: !this.state.isEdit
        });

        console.log(this.state.isEdit);
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
     * Contact Component의 onEdit 메서드 호출
     */
    handleEdit() {
        this.props.onEdit(this.state.name, this.state.phone);
    }

    handleKeyPress(e) {
        if (e.charCode === 13) {
            this.handleToggle();
        }
    }

    render() {
        const details = (
            <div>
                <p>{this.props.contact.name}</p>
                <p>{this.props.contact.phone}</p>
            </div>
        );

        const edit = (
            <div>
                <p>
                    <input
                        type="text"
                        name="name"
                        placeholder="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                    />
                </p>
                <p>
                    <input
                        type="text"
                        name="phone"
                        placeholder="phone"
                        value={this.state.phone}
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                    />
                </p>
            </div>
        );

        const view = this.state.isEdit ? edit : details;
        const blank = <div>Not Selected</div>;

        return (
            <div>
                <h2>Details</h2>
                {this.props.isSelected ? view : blank}
                <p>
                    <button onClick={this.handleToggle}>
                        {this.state.isEdit ? "OK" : "Edit"}
                    </button>
                    <button onClick={this.props.onRemove}>Remove</button>
                </p>
            </div>
        );
    }
}

// Default Value Setting
ContactDetails.defaultProps = {
    contact: {
        name: "",
        phone: ""
    },
    onRemove: () => {
        console.error("onRemove not defined");
    },
    onEdit: () => {
        console.error("onEdit not defined");
    }
};

ContactDetails.propTypes = {
    contact: PropTypes.object,
    onRemove: PropTypes.func,
    onEdit: PropTypes.func
};
