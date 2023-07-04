import { useParams } from "react-router";

const Room: React.FC = () => {
  const params = useParams<{ key: string }>();
  const key = params.key;

  return (
    <div>
      <h2>Кімната {key}</h2>
    </div>
  );
};

export default Room;
