import React from "react";
import ContactInfo from "./ContactInfo";
import ContactDetails from "./ContactDetails";
import ContactCreate from "./ContactCreate";

// import update from "react-addons-update";
import update from "immutability-helper";

/**
 * 연락처 메인
 */
export default class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedKey: -1,
            keyword: "",
            contactData: [
                {
                    name: "Abet",
                    phone: "010-0000-0001"
                },
                {
                    name: "Betty",
                    phone: "010-0000-0002"
                },
                {
                    name: "Charlie",
                    phone: "010-0000-0003"
                },
                {
                    name: "David",
                    phone: "010-0000-0004"
                },
                {
                    name: "윽박이",
                    phone: "010-0000-0005"
                }
            ]
        };
        // 이벤트가 발생하는 객체를 지정한다.
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.handleCreate = this.handleCreate.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    /**
     * Component가 DOM위에 생기기 전에 실행되는 메서드
     */
    componentWillMount() {
        /**
         * Local Storage에서 JSON을 가져온다.
         * Data가 있으면 parsing해서 객체로 변환한다.
         */
        const contactData = localStorage.contactData;

        if (contactData) {
            this.setState({
                contactData: JSON.parse(contactData)
            });
        }
    }

    /**
     * Component가 Update될 때마다 실행되는 메서드
     */
    componentDidUpdate(prevProps, prevState) {
        /**
         * 이전 값과 현재 값을 비교한 뒤
         * 값이 바뀌었다면 LocalStorage에 저장한다.
         */
        if (
            JSON.stringify(prevState.contactData) !=
            JSON.stringify(this.state.contactData)
        ) {
            localStorage.contactData = JSON.stringify(this.state.contactData);
        }
    }

    /**
     * 검색창에 입력값 설정
     * @param {*} e - 이벤트객체
     */
    handleChange(e) {
        this.setState({ keyword: e.target.value });
    }

    /**
     * 맴버의 세부 사항 출력
     * @param {*} key - 맴버 배열의 인덱스
     */
    handleClick(key) {
        this.setState({
            selectedKey: key
        });
        console.log(key + " selected key");
    }

    /**
     * 맴버 추가
     * @param {*} contact - 맴버 1명의 정보
     */
    handleCreate(contact) {
        this.setState({
            contactData: update(this.state.contactData, { $push: [contact] })
        });
    }

    /**
     * 맴버 삭제
     */
    handleRemove() {
        // 아무 명단도 클릭하지 않았을경우 삭제하지 않는다.
        if (this.state.selectedKey < 0) {
            return;
        }

        this.setState({
            /**
             * selectedKey부터 1개의 데이터를 삭제한다.
             * selectedKey는 -1로 초기화해준다.
             */
            contactData: update(this.state.contactData, {
                $splice: [[this.state.selectedKey, 1]]
            }),
            selectedKey: -1
        });
    }

    /**
     * 맴버 수정
     * @param {*} name
     * @param {*} phone
     */
    handleEdit(name, phone) {
        // 명단클릭 하지 않았을 시 작동 안한다
        if (this.state.selectedKey < 0) {
            return;
        }

        this.setState({
            contactData: update(this.state.contactData, {
                [this.state.selectedKey]: {
                    name: { $set: name },
                    phone: { $set: phone }
                }
            })
        });
    }

    /**
     * 렌더링
     */
    render() {
        const mapToComponents = data => {
            // 이름 내림차순 정렬
            data.sort((a, b) => {
                return a.name > b.name;
            });

            // (검색시 사용)필터링해서 새로운 배열을 리턴
            data = data.filter(contact => {
                return (
                    contact.name
                        .toLowerCase()
                        .indexOf(this.state.keyword.toLowerCase()) > -1
                );
            });

            return data.map((contact, idx) => {
                return (
                    <ContactInfo
                        contact={contact}
                        key={idx}
                        /**
                         * 이벤트는 컴포넌트에서 실행되지않고
                         * Native From(<div>, <h1>...)에서만 실행된다.
                         * 이벤트는 해당 컴포넌트에 props로 전달된다.
                         */
                        onClick={() => this.handleClick(idx)}
                    />
                );
            });
        };

        return (
            <div>
                <h1>Contacts</h1>
                <input
                    name="keyword"
                    placeholder="Search"
                    value={this.state.keyword}
                    onChange={this.handleChange}
                />
                <div>{mapToComponents(this.state.contactData)}</div>
                <ContactDetails
                    isSelected={this.state.selectedKey != -1}
                    contact={this.state.contactData[this.state.selectedKey]}
                    onRemove={this.handleRemove}
                    onEdit={this.handleEdit}
                />
                <ContactCreate onCreate={this.handleCreate} />
            </div>
        );
    }
}
