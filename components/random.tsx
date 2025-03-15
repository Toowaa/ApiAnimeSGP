'use client';
import { ApiResponse } from "@/interface/indes";
import {  useEffect } from "react";



  export default function Random({ data }:ApiResponse) {
    useEffect(() => {
        console.log(data);
    }, []);
    return (
        <div className="bg-green-400 ">
           
        </div>
    );
  }