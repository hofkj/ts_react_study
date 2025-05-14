import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

type User = {
    id: number,
    name: string,
    enail: string
}

type UserDataFetcherProps = {
    id: number,
    render: (data: User|null, loading: boolean) => React.ReactNode
}

function UserDataFetcher({id, render}:UserDataFetcherProps) {
    const [user, setUser] = useState<User | null>(null)   
    const [loading, setLoading] = useState<boolean>(true)

    const useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(response=>{
                if(!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json() as Promise<User>;
            })
            .then(data => {
                setUser(data)
            })
            .finally(()=>{
                setLoading(false)
            })
    }, [])

    return render(user, loading)
}

type MyContainerProps = {
    title: string,
    width: number,
    children: React.ReactNode
}

function MyContainer({ title, width, children }: MyContainerProps) {
  return (
    <div
      style={{
        width,
        maxWidth: "400px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "16px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <h1>{title}</h1>
      <div>{children}</div>
    </div>
  );
}

function App() {
  return (
    <div>
        <UserDataFetcher id={1} render={(data: User|null, loading:boolean)=>{
            return <div>
                {
                    loading  ? '로딩 중' : (data === null) ? <div>무엇이 잘못되었습니다.😭</div>:<div>
                        <h1>{data.id}</h1>
                        <h1>{data.name}</h1>
                    </div>
                }
            </div>
        }}>
        </UserDataFetcher>
        <UserDataFetcher id={1} render={(data: User|null, loading:boolean)=>{
            return <div>
                {
                    loading ? '⭐️' : (data === null) ? <div>무엇이 잘못되었습니다.😭</div>:<div>
                        <h1>{data.email}</h1>
                    </div>
                }
            </div>
        }}>
        </UserDataFetcher>

      <MyContainer title="기본 정보" width={500}>Hello</MyContainer>
      <MyContainer title="기본 정보" width={500}>
        <h2>책 이름 1</h2>
        <p>책 정보드라러아ㅓ아</p>
      </MyContainer>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
