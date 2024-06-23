"use client"
import { useQuery } from '@tanstack/react-query';
import { useState } from "react";
import {useTodos} from "@/components/hooks/todos/useTodos";

export const Demo = () => {
    const [id, setId] = useState(1)

    const { data,
        error,
        isLoading,
        isFetching,
        isError,
        isSuccess } = useTodos(1)
    const handleSubmit = (e: any) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        setId(Number(formData.get('id')))
    }
    console.log('data from todo', data);
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input defaultValue={id} name="id" type="number"/>
                <button type="submit">Submit</button>
            </form>

            <div className="loading">isLoading: {isLoading.toString()}</div>
            <div className="fetching">isFetching: {isFetching.toString()}</div>
            <div className="error">isError: {isError.toString()}</div>
            <div className="success">isSuccess: {isSuccess.toString()}</div>
        </div>
    )
}