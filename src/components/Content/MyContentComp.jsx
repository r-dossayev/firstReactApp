import React from "react";
import MyContent from "./MyContent";
import {connect} from "react-redux";
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {userProfile, setUserStatus, getStatus} from "../../redux/DialogsReducer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class MyContentComp1 extends React.Component {
    componentDidMount() {
        let userId = this.props.router.params.number;
        if (!userId) {userId = 27705;}
        this.props.getStatus(userId)
        this.props.userProfile(userId)

    }
    render() {
        return <MyContent {...this.props}/>
    }
}

const mapStateToProps = (state) => {
    return {
        newText: state.profilePage.newText,
        posts: state.profilePage.posts,
        user: state.profilePage.user,
        userStatus: state.profilePage.userStatus,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeValue: (text) => {
            return dispatch({type: "NEW-POST-VALUE", newText: text})},
        addPot: () => {
            return dispatch({type: "ADD-POST"});},
        userProfile:(a)=>{return dispatch(userProfile(a))},
        setUserStatus:(status)=>{return dispatch(setUserStatus(status))},
        getStatus:(userId)=> dispatch(getStatus(userId))
    }
}

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{location, navigate, params}}
            />
        );
    }

    return ComponentWithRouterProp;
}
// const MyContentComp = connect(mapStateToProps, mapDispatchToProps)(withRouter(withAuthRedirect(MyContentComp1)));
export default compose(connect(mapStateToProps, mapDispatchToProps),withRouter)(MyContentComp1);