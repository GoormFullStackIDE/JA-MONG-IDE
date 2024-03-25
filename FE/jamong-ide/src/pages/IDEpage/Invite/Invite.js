import { Resizable } from "re-resizable";
import { InviteContainer } from "./Invite.style";

function Invite() {
    return (
        <Resizable
            defaultSize={{
                width: '250px',
                height: '100%',
            }}
            enable={{
                top: false,
                right: true,
                bottom: false,
                left: false,
                topRight: true,
                topLeft: false,
                bottomRight: false,
                bottomLeft: false,
            }}
        >
            <InviteContainer>
                
            </InviteContainer>
        </Resizable>
    );
}

export default Invite;