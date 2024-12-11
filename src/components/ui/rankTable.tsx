import { Avatar, AvatarImage } from "./avatar"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "./table"


  const mockData = [

    { 
        rank: 1, 
        name: "김종혁",
        score: 1200, 
        image: 'https://cdn-icons-png.flaticon.com/512/159/159833.png' 
    },
    { 
        rank: 2,
        name: "김봉민", 
        score: 1100, 
        image: 'https://cdn-icons-png.flaticon.com/512/159/159833.png' 
    },
    { 
        rank: 3, 
        name: "이지예", 
        score: 1050, 
        image: 'https://cdn-icons-png.flaticon.com/512/159/159833.png' 
    },
    { 
        rank: 3, 
        name: "김도현", 
        score: 1050, 
        image: 'https://cdn-icons-png.flaticon.com/512/159/159833.png' 
    },
    { 
        rank: 5, 
        name: "강전하", 
        score: 1000, 
        image: 'https://cdn-icons-png.flaticon.com/512/159/159833.png' 
    },
   ];
  
  
  export function RankTable() {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>랭크</TableHead>
            <TableHead>프로필</TableHead>
            <TableHead>이름</TableHead>
            <TableHead className="text-right">점수</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockData.map((user) => (
            <TableRow key={user.rank}>
              <TableCell className="font-medium">{user.rank}</TableCell>
              <TableCell>
                  <Avatar>
                        <AvatarImage src = {user.image} />
                    </Avatar>
              </TableCell>
              <TableCell className="text-left">{user.name}</TableCell>
              <TableCell className="text-right">{user.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  