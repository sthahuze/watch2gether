import { Tab, Tabs, Container, Row, Col, Stack } from "react-bootstrap"; // Importing Bootstrap components for styling.

function Information() {
  return (
    <Container fluid className="pt-5 pb-5">
      <Row className="justify-content-md-center">
        <Col md="10" lg="8">
          <Stack gap={3}>
            {/* About Watch2Gether section */}
            <div className="pt-4">
              <h2>About Watch2Gether</h2>
              <p>
                With Watch2Gether, you can watch videos together with your
                friends. Create a room, share the link, and you're good to go.
                All videos run synchronously, and you can communicate via the
                built-in chat. Have fun with Watch2Gether!
              </p>
            </div>

            {/* How to use Watch2Gether section */}
            <div className="pb-5">
              <h3>How to use Watch2Gether:</h3>
              {/* Tabs for different usage instructions */}
              <Tabs className="mb-3 my-3" justify>
                {/* Creating Room tab */}
                <Tab eventKey="CreatingRoom" title="Creating room">
                  You can create a room from the Watch2Gether homepage by
                  clicking the "Create new room" button. This immediately
                  places you into a temporary Watch2Gether room.
                </Tab>
                {/* Creating Account tab */}
                <Tab eventKey="CreatingAccount" title="Creating account">
                  1. You can create a free account from the homepage by
                  selecting "Sign Up" from the site's menu. <br />
                  2. After that, you need to enter your registration data
                  (Name, email, password) and click on the "Sign Up" button.{" "}
                  <br />
                  3. After registration, you will have access to the page with
                  your rooms.
                  <br />
                </Tab>
                {/* Authorization tab */}
                <Tab eventKey="Authorization" title="Authorization">
                  1. You can log in to your account by selecting "Log In" from
                  the site's menu. <br />
                  2. After that, you need to enter your email and password and
                  then click on the "Log In" button. <br />
                  3. After authorization, you will have access to the page with
                  your rooms.
                  <br />
                </Tab>
                {/* Inviting Friends tab */}
                <Tab eventKey="InvitingFriends" title="Inviting friends">
                  In a new room, you will be the only user who is present.
                  Although you can use Watch2Gether by yourself, the fun begins
                  when you invite some friends to watch with you. All rooms are
                  private by default. The link to a room is not published
                  anywhere on Watch2Gether, and no random users can join your
                  room. However, you can share the link with as many people as
                  you like.
                </Tab>
                {/* Selecting Videos tab */}
                <Tab eventKey="SelectingVideos" title="Selecting videos">
                  In a Watch2Gether room, you can select and enjoy videos from
                  Youtube. You can simply paste a link to the content you want
                  to watch into the search bar.
                </Tab>
              </Tabs>
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default Information;
