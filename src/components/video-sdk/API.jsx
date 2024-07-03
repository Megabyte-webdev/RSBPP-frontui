//This is the Auth token, you will use it to generate a meeting and connect to it
export const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJkNTgxZjdjMy01OGRmLTQzZDYtODE0OS02NmViNTFjNmI5ZmEiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcyMDAxOTY2NiwiZXhwIjoxNzIwNjI0NDY2fQ.u-j7q3cMvOnYznVzxVWmipTZIRPlrnkkxxJ8Ob-LojY";
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
    return roomId;
};