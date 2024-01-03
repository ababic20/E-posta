import { useLocation } from "react-router-dom";

const MessageDetails = () => {
    const location = useLocation();
    const message = location.state?.message;

    if(!message) {
        return <div>Message not found</div>
    }

    return (
        <div>
            <h1>Message Details</h1>
            <div>
                <h2>{message.title}</h2>
                <h3>{message.sender}</h3>
                <p>{message.content}</p>
            </div>
        </div>
    )
};

export default MessageDetails;