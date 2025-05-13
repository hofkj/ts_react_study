import { useState, useEffect } from "react";

type TileType = "x" | "o" | null;

type TileProps = {
  index: number;
  type: TileType;
  onTileClick: (index: number) => void;
};

const boardStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)", // 3개의 열 생성
  gridTemplateRows: "repeat(3, 1fr)", // 3개의 행 생성
  gap: "4px",
  width: "300px",
  height: "300px",
};

const tileStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "2rem",
  fontWeight: "bold",
  background: "#eee",
  cursor: "pointer",
  border: "2px solid gray",
};

const oStyle: React.CSSProperties = {
  color: "white",
  background: "black",
};
const xStyle: React.CSSProperties = {
  color: "black",
  background: "white",
};

function checkWinner(tiles: TileType[]): TileType {
  // 가로 3줄 확인
  for (let i = 0; i < 9; i += 3) {
    if (
      tiles[i] !== null &&
      tiles[i] === tiles[i + 1] &&
      tiles[i] === tiles[i + 2]
    ) {
      return tiles[i];
    }
  }
  // 세로 3줄 확인
  for (let i = 0; i < 3; i++) {
    if (
      tiles[i] !== null &&
      tiles[i] === tiles[i + 3] &&
      tiles[i] === tiles[i + 6]
    ) {
      return tiles[i];
    }
  }
  // 대각선 (좌상->우하)
  if (tiles[0] !== null && tiles[0] === tiles[4] && tiles[0] === tiles[8]) {
    return tiles[0];
  }
  // 대각선 (우상->좌하)
  if (tiles[2] !== null && tiles[2] === tiles[4] && tiles[2] === tiles[6]) {
    return tiles[2];
  }
  // 승자가 없음
  return null;
}

function Tile({ index, type, onTileClick }: TileProps) {
  return (
    <button
      style={{
        ...tileStyle,
        ...(type === null ? {} : type === "o" ? oStyle : xStyle),
      }}
      onClick={() => onTileClick(index)}
    >
      {type ?? "-"}
    </button>
  );
}

function App() {
  const [tiles, setTiles] = useState<TileType[]>(Array(9).fill(null));
  const [currentTurn, setCurrentTurn] = useState<Exclude<TileType, null>>("o");
  const [winner, setWinner] = useState<TileType | "draw">(null);

  useEffect(() => {
    const result = checkWinner(tiles);
    // 승자가 결정되었다면
    if (result) {
      // 상태 업데이트
      setWinner(result);
    } else {
      // 만약, 모든 타일이 채워졌다면
      if (tiles.every((tile) => tile !== null)) {
        // 무승부로 설정
        setWinner("draw");
      }
    }
  }, [tiles]);

  const changeTurn = () => {
    setCurrentTurn((currentTurn) => (currentTurn === "o" ? "x" : "o"));
  };

  const onTileClick = (index: number) => {
    if (tiles[index] === null) {
      setTiles((tiles) => {
        const newTiles = [...tiles];
        newTiles[index] = currentTurn;
        return newTiles;
      });
      changeTurn();
    }
  };

  const restart = () => {
    setTiles(Array(9).fill(null));
    setWinner(null);
    setCurrentTurn("o");
  };

  return (
    <div>
      <h1>현재 차례: {currentTurn}</h1>
      <div style={boardStyle}>
        {tiles.map((tile, index) => {
          return <Tile index={index} type={tile} onTileClick={onTileClick} />;
        })}
      </div>
      {winner && (
        <div>
          {winner === "draw" ? <h1>비겼습니다!</h1> : <h1>Winner: {winner}</h1>}
          <button onClick={restart}>다시하기</button>
        </div>
      )}
    </div>
  );
}

export default App;
