import { Container, ListGroup } from "react-bootstrap";

function RoomList() {
  const list = [
    "Room 1",
    "Room 2",
    "Room 3",
    "Room 4",
    "Room 5",
    "Room 6",
    "Room 7",
    "Room 8",
    "Room 9",
    "Room 10",
    "Room 11",
    "Room 12",
    "Room 13",
    "Room 14",
    "Room 15",
  ];
  const isSmallScreen = window.innerWidth < 768;
  const containerHeight = isSmallScreen ? 260 : 580;
  return (
    <div
      style={{
        height: `${containerHeight}px`,
        background: "lightgray",
        overflowY: "scroll",
      }}
      className="mb-5"
    >
      <Container className="pr-4 pl-4 pt-3 pb-3">
        <h4 className="text-center pb-2">List of open rooms</h4>
        <ListGroup>
          {list.map((item, index) => (
            <ListGroup.Item key={index}>{item}</ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </div>
  );
}

export default RoomList;
