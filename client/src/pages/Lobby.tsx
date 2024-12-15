import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useSocket } from "../context/SocketProvider";
import { JoiningCreds } from "../types";
import { useNavigate } from "react-router-dom";

export default function Lobby() {
  const [email, setEmail] = useState("");
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();
  const socket = useSocket();

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      socket.emit("join-room", { email, roomId });
    },
    [email, roomId, socket]
  );

  useEffect(() => {
    socket.on("user-connected", (data: JoiningCreds) => {
      console.log(data.email, data.roomId);
      navigate(`/room/${data.roomId}`);
    });

    return () => {
      socket.off("user-connected");
    };
  }, [socket]);

  return (
    <Card className="w-full max-w-md mx-auto mt-10 animate-fade-in">
      <CardHeader>
        <CardTitle>Meeting Details</CardTitle>
        <CardDescription>Enter your email and meeting room ID</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="roomId">Meeting Room ID</Label>
            <Input
              id="roomId"
              placeholder="Enter room ID"
              value={roomId}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setRoomId(e.target.value)
              }
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full transition duration-300 ease-in-out hover:scale-105"
          >
            Submit
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
