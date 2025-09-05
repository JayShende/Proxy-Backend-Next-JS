"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
const ApiCall = () => {
  async function handleApiCall() {
    const response = await axios({
      method: "post",
      url: "/api/proxy/test-post",
      data:{
        username:"JayShende",
        password:"Jayshende007@"
      }
    });
    console.log(response.data);
  }
  return (
    <div>
      <Button onClick={handleApiCall}>Api Call</Button>
    </div>
  );
};

export default ApiCall;
