//This is the Auth token, you will use it to generate a meeting and connect to it
export const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJkNTgxZjdjMy01OGRmLTQzZDYtODE0OS02NmViNTFjNmI5ZmEiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcyMzAyMDYyOCwiZXhwIjoxNzI1NjEyNjI4fQ.rVXTWPYHDX3__-W4Pa3dVG0SwcnkvRPv-8OVPmTi4X8";
console.log(authToken)
// API call to create a meeting
export const createMeeting = async ({ token }) => {
    const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
        method: "POST",
        headers: {
            authorization: `${authToken}`,
            
            "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
    });
    //Destructuring the roomId from the response
    const { roomId } = await res.json();
    // console.log(res.json())
    return roomId;
};